import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { Spin,Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import QueryTable from '@/components/QueryTable';
import { GlobalHooks, GlobalContextProps, GlobalContext } from '@/components/GlobalContext';
import { DownloadOutlined } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';
import { credentialEnum, submitModeEnum } from '@/utils/enums';
import ModalBox from '../common/modal';
import { TableStateFilters } from 'antd/lib/table';
import { transformBlobToFile } from '@/utils/utils';

import { previewBankReceipt } from '@/components/api/remit/bankReceipt';
import { queryOrderCostDetail } from '@/components/api/remit/paybatchdetail';
import { queryPayDetailsList, payDetail, detailPayStatus } from '@/components/api/remit/paybatch';
import { exportPayOrderDetail } from '@/components/api/remit/export';
import { queryPayChanleByMerchantNo } from '@/components/api/remit/merchantproduct';
import { queryAllAvailable } from '@/components/api/remit/collectedsubject';


class Order extends React.Component<OrderProps, OrderState> {
  static contextType = GlobalContext;

  state: OrderState = {
    options: {},
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    exportFileloading: false,
  };

  queryTable: any;

  async componentDidMount() {
    const { data: payStatus = [] } = await detailPayStatus();
    const { data: payChannels = [] } = await queryPayChanleByMerchantNo();
    const { data: subjects = [] } = await queryAllAvailable();

    this.setState(prev => {
      const { options = {} } = prev;
      return {
        options: {
          ...options,
          payChannelCode: [
            { code: '', desc: '全部' },
            ...payChannels.map((s: {}) => {
              return { code: s['key'], desc: s['value'] };
            }),
          ],
          identityType: Object.keys(credentialEnum).map(key => {
            return { code: key, desc: credentialEnum[key] };
          }),
          payStatus: payStatus.map(key => {
            return { code: key.status, desc: key.desc };
          }),
          submitMode: [
            { code: '', desc: '全部' },
            ...Object.keys(submitModeEnum).map(key => {
              return { code: key, desc: submitModeEnum[key] };
            }),
          ],
          collectedSubjectNo: [
            ...subjects.map((s: {}) => {
              return { code: s['collectedSubjectNo'], desc: s['collectedSubjectName'] };
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
    const { toggleLoading } = this.context;
    // 拼装请求参数
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
      query: {
        ...cloneOptions,
      },
      page: {
        curPage: options.page,
        pageSize: options.pageSize,
      },
    };
    this.setState({ params });
    toggleLoading(true);
    try {
      const {
        data: { list = [], recordCount },
      } = await queryPayDetailsList(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
      });
      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
    }
  };

  /**
   * 详情
   */
  detailModal = async (row: any) => {
    const { data = {} } = await payDetail(row.id);
    this.setState({
      modalData: data,
      modalshow: true,
      modalType: 1,
    });
  };

  hideModal = () => {
    this.setState({
      modalshow: false,
    });
  };

  /**
   * 费用单
   */
  feeModal = async (row: any) => {
    const { data = {} } = await queryOrderCostDetail({ id: row.id });
    this.setState({
      modalData: data,
      modalshow: true,
      modalType: 2,
    });
  };

  exportRecord = async () => {
    const { query = {} } = this.state?.params || { query: {} };
    this.setState({
      exportFileloading: true,
    });
    setTimeout(() => {
      this.setState({
        exportFileloading: false,
      });
    }, 10000);
    const file = await exportPayOrderDetail(query, undefined, undefined, { responseType: 'blob' });
    this.setState({
      exportFileloading: false,
    });
    let timeRange = '全量';
    if (query.startDate) {
      const { startDate, endDate } = query;
      timeRange = startDate.slice(0, 10) + '-' + endDate.slice(0, 10);
    }
    const { merchant_no } = localStorage;
    transformBlobToFile(file, `财云科技打款明细文件_${merchant_no}_${timeRange}`);
  };

  /** 表格筛选条件 */
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
    { type: "text", label: "商户名称", name: "merchantName" },
    { type: 'select',label: '代征主体',name: 'collectedSubjectNo',   },
    { type: "select", label: "打款通道", name: "payChannelCode" },
    { type: "text", label: "平台订单号", name: "payDetailNo" },
    { type: "text", label: "商户订单号", name: "merchantOrderNo" },
    { type: "text", label: "收款用户姓名", name: "accountName" },
    { type: "text", label: "收款用户手机号", name: "mobile" },
    { type: "select", label: "证件类型", name: "identityType" },
    { type: "text", label: "证件号码", name: "identityNo" },
    { type: "text", label: "收款账号", name: "accountNo" },
    { type: "rangeData", label: "商户打款金额", names: ['startAmount','endAmount'] },
    { type: 'select', label: '订单来源', name: 'submitMode', options: { initialValue: '0' } },
    { type: "select", label: "订单状态", name: "payStatus" },
  ];

  /** 表格列配置 */
  columns = [
    { title: '创建时间', dataIndex: 'gmtCreate' },
    { title: '商户名称', dataIndex: 'merchantName' },
    { title: '代征主体', dataIndex: 'collectedSubjectName' },
    { title: '打款通道', dataIndex: 'payChannelCodeName' },
    { title: '平台订单号', dataIndex: 'payDetailNo' },
    { title: '商户订单号', dataIndex: 'merchantOrderNo' },
    { title: '收款用户姓名', dataIndex: 'accountName' },
    { title: '收款用户手机号', dataIndex: 'mobile' },
    { title: '证件类型', dataIndex: 'identityType', render: (item: any) => credentialEnum[item] },
    { title: '证件号码', dataIndex: 'identityNo' },
    { title: '收款账号', dataIndex: 'accountNo' },
    { title: '收款银行/渠道', dataIndex: 'bankName' },
    { title: '商户打款金额(元)', dataIndex: 'amount' },
    { title: '用户实收金额(元)', dataIndex: 'userActualReceiveAmount' },
    { title: '商户应付服务费(元)', dataIndex: 'merchantShouldFeeCost' },
    { title: '商户已抵扣服务费(元)', dataIndex: 'merchantOffsetFeeCost' },
    { title: '商户实付服务费(元)', dataIndex: 'vatAmount' },
    { title: '用户实付服务费(元)', dataIndex: 'deductAmount' },
    { title: '商户服务费差额(元)', dataIndex: 'merchantFeeCostRegionDiffer' },
    { title: '用户服务费差额(元)', dataIndex: 'userFeeCostRegionDiffer' },
    { title: '订单来源', dataIndex: 'submitMode', render: (item: any) => submitModeEnum[item] },
    { title: '订单状态', dataIndex: 'payStatusDesc' },
    { title: '状态描述', dataIndex: 'statusDesc' },
    {
      fixed: 'right',
      title: '操作',
      key: 'opt',
      render: (row: any) => (
        <div>
          <a
            style={{ marginRight: 12 }}
            onClick={() => {
              this.detailModal(row);
            }}
          >
            详情
          </a>
          {/* <a style={row.previewBankReceipt?{ marginRight: 12 }:{}} onClick={() => { this.feeModal(row) }}>费用单</a> */}
          {row.previewBankReceipt && (
            <a onClick={() => this.showBankReceipt(row.payDetailNo)}>预览回单</a>
          )}
        </div>
      ),
    },
  ];

  /**
   * 预览回单
   */
  showBankReceipt = async payDetailNo => {
    const { data: href } = await previewBankReceipt(payDetailNo);
    window.open(href, 'blank');
  }

  render() {
    const { tableData, options, modalshow, modalType, modalData, exportFileloading } = this.state;
    const { loading } = this.context;

    const tableProps = {
      cardTitle: '发放明细记录',
      extra: <Button type="primary" onClick={this.exportRecord} icon={<DownloadOutlined />} >下载发放明细文件</Button>,
      tableData, // 表格数据
      loading, // 请求状态
      options,
      onRef: (e: any) => (this.queryTable = e),
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'payDetailNo', // 表格行ID
    };

    const modalProps = {
      visible: modalshow,
      modalType,
      hideModal: this.hideModal,
      data: modalData,
    };

    return (
      <PageHeaderWrapper>
        <Spin spinning={exportFileloading} tip="正在导出文件...">
          <QueryTable {...tableProps} />
          <ModalBox {...modalProps}></ModalBox>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default Order;
