import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';

import '@ant-design/compatible/assets/index.css';

import { Divider, Spin, Popconfirm, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { transformBlobToFile } from '@/utils/utils';

import QueryTable from '@/components/QueryTable';
import { ConnectState } from '@/models/connect';
import { TableStateFilters } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';

import { queryPayBatchList, batchPayStatus } from '@/components/api/remit/paybatch';
import { queryAllAvailable } from '@/components/api/remit/collectedsubject';
import { queryPayChanleByMerchantNo } from '@/components/api/remit/merchantproduct';
import { exportPayBatch, exportPayBatchDetail } from '@/components/api/remit/export';
import PayBaseModal from '../common/payBaseModal';
import { revoke, lockBatch,applyPay } from '@/components/api/remit/paybatch';

//订单来源
const submitModeEnum = {
  '1': 'API',
  '0': '商户站',
  // "": "默认商户站"
};

class BatchPaymentRecord extends React.Component<BatchPaymentRecordProps, BatchPaymentRecordState> {
  state: BatchPaymentRecordState = {
    tableData: { row: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    queryOptions: {},
    loading: false,
    payBaseModalVisible: false,
    payBaseInfo: {},
  };

  queryTable: any;

  async componentDidMount() {
    const { data: subjects = [] } = await queryAllAvailable();
    const { data: payChannels = [] } = await queryPayChanleByMerchantNo();
    const { data: payStatus } = await batchPayStatus();

    this.setState((prev: BatchPaymentRecordState) => {
      const { queryOptions } = prev;
      return {
        queryOptions: {
          ...queryOptions,
          payStatus: payStatus.map(key => {
            return { code: key.status, desc: key.desc };
          }),
          collectedSubjectNo: [
            { code: '', desc: '全部' },
            ...subjects.map((s: {}) => {
              return { code: s['collectedSubjectNo'], desc: s['collectedSubjectName'] };
            }),
          ],
          payChannelCode: [
            { code: '', desc: '全部' },
            ...payChannels.map((s: {}) => {
              return { code: s['key'], desc: s['value'] };
            }),
          ],
          submitMode: [
            { code: '', desc: '全部' },
            ...Object.keys(submitModeEnum).map(key => {
              return { code: key, desc: submitModeEnum[key] };
            }),
          ],
        },
      };
    });
  }

  /**
   * 异步加载表格数据
   *
   * @memberof ActionTable
   */
  loadData = async (options: TableStateFilters) => {
    // 拼装请求参数
    const cloneOptions = { ...options } as any;
    // 格式化时间段

    if (cloneOptions.submitMode === undefined) {
      cloneOptions.submitMode = '0';
    }

    if (options.filterTime && options.filterTime.length) {
      cloneOptions.startDate = moment(options.filterTime[0])
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.endDate = moment(options.filterTime[1])
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page;
    delete cloneOptions.pageSize;
    delete cloneOptions.filterTime;
    const params = {
      query: { ...cloneOptions },
      page: {
        curPage: options.page,
        pageSize: options.pageSize,
      },
    };

    const {
      data: { list = [], recordCount },
    } = await queryPayBatchList(params);

    this.setState({
      tableData: { rows: list, pagination: { total: recordCount } },
      params,
    });
  };

  operators = [
    {
      name: '导出打款批次文件',
      attr: {
        type: 'primary',
        onClick: () => {
          this.exportRecord();
        },
        icon: <DownloadOutlined />,
      },
    },
  ];

  exportRecord = async () => {
    const { query = {} } = this.state?.params || { query: {} };
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 5000);
    const file = await exportPayBatch(query, undefined, undefined, { responseType: 'blob' });
    if (file) {
      this.setState({
        loading: false,
      });
    }

    let timeRange = '全量';
    if (query.startDate) {
      const { startDate, endDate } = query;
      timeRange = startDate.slice(0, 10) + '-' + endDate.slice(0, 10);
    }
    const { merchant_no } = localStorage;
    const title = `财云科技打款批次文件_${merchant_no}_${timeRange}`;
    transformBlobToFile(file, title);
  };

  /**
   * 导出单条批次详情
   */
  exportItem = async (item: any) => {
    const { merchantNo, payBatchNo } = item;
    const params = {
      payBatchNo,
      merchantNo,
    };
    const res = await exportPayBatchDetail(params, undefined, undefined, { responseType: 'blob' });
    const title = `财云科技批次详情文件_${payBatchNo}`;
    transformBlobToFile(res, title);
  };

  querys = [
    {
      label: '创建时间',
      name: 'filterTime',
      type: 'rangedatepicker',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { label: '商户名称', name: 'merchantName', type: 'text' },
    { label: '代征主体', name: 'collectedSubjectNo', type: 'select' },
    { label: '打款通道', name: 'payChannelCode', type: 'select' },
    { label: '平台批次号', name: 'payBatchNo' },
    { label: '商户批次号', name: 'merchantPayBatchNo' },
    { label: '订单来源', name: 'submitMode', type: 'select', options: { initialValue: '0' } },
    { label: '批次状态', name: 'payStatus', type: 'select' },
  ];

  /** 表格列配置 */
  columns = [
    { width: 200, title: '创建时间', dataIndex: 'gmtCreate' },
    { title: '商户名称', dataIndex: 'merchantName' },
    { title: '代征主体', dataIndex: 'collectedSubjectName' },
    { title: '打款通道', dataIndex: 'payChannelCodeName' },
    { title: '平台批次号', dataIndex: 'payBatchNo' },
    { title: '商户批次号', dataIndex: 'merchantPayBatchNo' },
    { title: '商户打款总笔数(笔)', dataIndex: 'count' },
    { title: '商户打款成功笔数(笔)', dataIndex: 'sucNumbers' },
    { title: '商户打款总金额(元)', dataIndex: 'amount', key: 'amount' },
    { title: '商户打款成功金额(元)', dataIndex: 'sucAmount', key: 'sucAmount' },
    { title: '商户实付服务费(元)', dataIndex: 'taxFee' },
    { title: '订单来源', dataIndex: 'submitMode', render: (item: any) => submitModeEnum[item] },
    { title: '批次状态', dataIndex: 'payStatusDesc' },
    { title: '状态描述', dataIndex: 'statusDesc' },
    {
      fixed: 'right',
      width: 100,
      title: '操作',
      render: (row: Row) => (
        <div>
          <a
            onClick={() =>
              router.push({
                pathname: 'batch_payment_record_detail',
                query: { payBatchNo: row.payBatchNo },
              })
            }
          >
            详情
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              this.exportItem(row);
            }}
          >
            导出
          </a>
          {row?.payStatus == '00' ||
            (row?.payStatus == '01' && (
              <>
                <Divider type="vertical" />
                <Popconfirm title="确定撤销该批次吗？" onConfirm={() => this.rescindBatch(row)}>
                  <a href="#">撤销</a>
                </Popconfirm>
              </>
            ))}
          {row?.payStatus == '00' && (
            <>
              <Divider type="vertical" />
              <Popconfirm
                title="确定锁定该批次吗？"
                placement="topRight"
                onConfirm={() => this.handleLock(row)}
              >
                <a href="#">锁定</a>
              </Popconfirm>
            </>
          )}
          {row?.payStatus == '01' && (
            <>
              <Divider type="vertical" />
              <Popconfirm
                title="确定申请打款吗？"
                placement="topRight"
                onConfirm={() => this.handlePay(row)}
              >
                <a href="#">申请打款</a>
              </Popconfirm>
            </>
          )}
          {row?.paymentBasisDocument && (
            <>
              <Divider type="vertical" />
              <a onClick={() => this.controlPayBase(true, row)}>打款依据</a>
            </>
          )}
        </div>
      ),
    },
  ];

  rescindBatch = async (row: any) => {
    const { merchantNo, payBatchNo } = row;
    await revoke({ merchantNo, payBatchNo });
    message.success('操作成功！');
    this.queryTable.reload();
  };

  handleLock = async (row: any) => {
    const { merchantNo, payBatchNo } = row;
    const data = await lockBatch({ merchantNo, payBatchNo });
    if (data.code == '90001') {
      message.success('正在锁定！');
      this.queryTable.reload();
    } else {
      message.error(data.message);
    }
  };

  handlePay = async (row: any) => {
    const { merchantNo, payBatchNo } = row;
    await applyPay({ merchantNo, payBatchNo });
    message.success('操作成功！');
    this.queryTable.reload();
  };

  controlPayBase = (visible: boolean, row?: any) => {
    const defaultFileList = [
      {
        uid: row?.id,
        name: row?.paymentBasisDocumentName,
        url: row?.paymentBasisDocument,
      },
    ];
    const payBaseInfo = {
      allowAudit: row?.allowAudit,
      defaultFileList: row?.paymentBasisDocument && defaultFileList,
      payBatchNo: row?.payBatchNo,
    };
    this.setState({
      payBaseInfo,
      payBaseModalVisible: visible,
    });
  };

  render() {
    const { tableData, queryOptions, loading, payBaseModalVisible, payBaseInfo } = this.state;

    const tableProps = {
      tableData, // 表格数据
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      onRef: (e: any) => (this.queryTable = e),
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'payBatchNo', // 表格行ID
      options: queryOptions, // 表格筛选条件下拉枚举配置
      operators: this.operators, // 表格操作栏按钮配置
      // onSelectRow: this.handleSelectRow, // 表格行选中事件
    };

    const payBaseProps = {
      modalVisible: payBaseModalVisible,
      onCancel: this.controlPayBase,
      payBaseInfo,
    };
    return (
      <PageHeaderWrapper>
        <Spin spinning={loading} tip="正在导出文件...">
          <QueryTable {...tableProps} />
        </Spin>
        <PayBaseModal {...payBaseProps}></PayBaseModal>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ global, settings }: ConnectState) => ({}))(BatchPaymentRecord);
