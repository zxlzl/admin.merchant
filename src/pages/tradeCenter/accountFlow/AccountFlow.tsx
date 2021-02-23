import React from 'react';
import { connect } from 'dva';
import moment from 'moment';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DownloadOutlined } from '@ant-design/icons';
import QueryTable from '@/components/QueryTable';
import { transformBlobToFile } from '@/utils/utils';
import { ConnectState } from '@/models/connect';
import { TableStateFilters } from 'antd/lib/table';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Descriptions, Steps, Spin,Button } from 'antd';
import { GlobalContextProps, GlobalContext } from '@/components/GlobalContext';

import { queryCapitalFlowPage,queryTransSubCodeList } from '@/components/api/remit/capitalflow';
import { queryAllAvailable } from '@/components/api/remit/account';
import { exportAccountDetail } from '@/components/api/remit/export';

const { Step } = Steps;

const accountType = {
  '1': '收入',
  '2': '支出',
};

class AccountFlow extends React.Component<AccountFlowProps, AccountFlowState> {
  static contextType = GlobalContext;

  state: AccountFlowState = {
    queryOptions: {
      payType: [
        { code: '100', desc: '线下充值' },
        { code: '101', desc: '线上提现' },
        { code: '102', desc: '转账扣费' },
      ],
      changeDirection: [
        { code: '2', desc: '支出' },
        { code: '1', desc: '收入' },
      ],
    },
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    exportFileloading: false
  };

  queryTable: any;

  async componentDidMount() {
    const { data = [] } = await queryAllAvailable();
    const {data:subCodeList=[]} = await queryTransSubCodeList()
    this.setState(prev => {
      const { queryOptions = {} } = prev;
      return {
        queryOptions: {
          ...queryOptions,
          accountId: data.map(d => {
            return { code: d.merchantAccountNo, desc: d.merchantAccountName };
          }),
          transSubCode: subCodeList.map(({code,name}) => {
            return { code, desc: name };
          }),
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

    if (!options.accountId) {
      message.info('请选择查询账户')
      return
    }

    if (options.filterTime && options.filterTime.length) {
      cloneOptions.startTime = moment(options.filterTime[0])
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.endTime = moment(options.filterTime[1])
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    if (!cloneOptions.startTime) {
      message.info('开始时间或结束时间不能为空')
      return
    }
    delete cloneOptions.page;
    delete cloneOptions.pageSize;
    delete cloneOptions.filterTime;

    const params = {
      request: { ...cloneOptions },
      // request: {
      //   endTime: '2020-09-16 23:59:59',
      //   startTime: '2020-09-01 00:00:00',
      //   accountId: '22500201911120060302',
      // },
      page: {
        curPage: options.page,
        pageSize: options.pageSize,
      },
    };
    
    const { toggleLoading } = this.context;
    toggleLoading(true);
    try {
      const {
        data: { list = [], recordCount },
      } = await queryCapitalFlowPage(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
        params
      });
    } finally {
      toggleLoading(false);
    }
  };

  /** 表格筛选条件 */
  querys = [
    {
      label: '记账时间',
      name: 'filterTime',
      type: 'rangedatepicker',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { label: '账户名称', type: 'select', name: 'accountId' },
    { label: '收支类型', name: 'changeDirection', type: 'select' },
    { label: '业务订单号', name: 'orderId', type: 'text', },
    { label: '业务流水号', name: 'acctSn', type: 'text', },
    { label: '对方账户', name: 'objAcctNo', type: 'text', },
    { label: '业务类型', name: 'transSubCode', type: 'select', },
    { label: '金额范围', names: ['amountStart','amountEnd'], type: 'rangeData' },
    // { label: '起始金额', name: 'amountStart', type: 'text', },
    // { label: '截止金额', name: 'amountEnd', type: 'text', },
  ];

  /** 表格列配置 */
  columns = [
    { title: '记账时间', dataIndex: 'accountingDate' },
    { title: '发起账户', dataIndex: 'accountId' },
    { title: '业务单号', dataIndex: 'orderId' },
    { title: '流水单号', dataIndex: 'acctSn' },
    { title: '对方账户', dataIndex: 'objAcctNo' },
    { title: '业务类型', dataIndex: 'transSubCodeName' },
    { title: '业务摘要', dataIndex: 'memo'},
    { title: '收支类型', dataIndex: 'changeDirectionName' },
    { title: '收支金额(元)', dataIndex: 'changeAmount' },
    { title: '账户结余(元)', dataIndex: 'currentAmount' },
    {
      title: '操作',
      key: 'opt',
      fixed: 'right',
      render: (row: any) => (
        <div>
          <a onClick={() => this.showAcountFlowRecord(row)}>详情</a>
        </div>
      ),
    },
  ];

  /**
   * 展示资金操作记录详情
   * @param row
   */
  showAcountFlowRecord = async (row: Row) => {
    const { showModal, closeModal } = this.context;
    const data = row;
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '资金操作记录详情',
        footer: null,
        width: 1000,
        onCancel: () => closeModal(), // 取消事件
      };
      return (
        <Modal {...modalProps}>
          <div>
            <Steps style={{padding: '0 40px'}} current={1}>
              <Step title="已发起" description={data?.gmtCreate} />
              <Step title="已完成" description={data?.gmtUpdate} />
            </Steps>
          </div>
          <Descriptions style={{ marginTop: '30px' }} title="资金操作业务记录" bordered column={2}>
            <Descriptions.Item label="商户ID">{data.merchantNo ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="商户名称">{data.merchantName ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="代征主体">{data.collectedSubjectName ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="发起账户">{data.accountId ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="业务单号">{data.orderId ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="流水单号">{data.acctSn ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="对方账户">{data.objAcctNo ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="业务类型">{data.transSubCodeName ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="业务摘要">{data.memo ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="收支类型">{data.changeDirectionName ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="收支金额(元)">
              {data.changeAmount ?? '--'}
            </Descriptions.Item>
            <Descriptions.Item label="账户结余(元)">{data.currentAmount ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="最近修改时间">{data.gmtUpdate ?? '--'}</Descriptions.Item>
          </Descriptions>
        </Modal>
      );
    });
  };

  exportRecord = async () => {
    const query = this.state?.params || {}
    const {request={}} = query
    if (!request.accountId) {
      message.info('请选择查询账户')
      return
    }
    this.setState({
      exportFileloading: true,
    });
    const res = await exportAccountDetail(query, undefined, undefined, { responseType: 'blob' });
    res &&
      this.setState({
        exportFileloading: false,
      });
    let timeRange = '全量';
    if (request.startTime) {
      const { startTime, endTime } = request;
      timeRange = startTime.slice(0, 10) + '-' + endTime.slice(0, 10);
    }
    const { merchant_no } = localStorage;
    transformBlobToFile(res, `财云科技账务明细文件_${merchant_no}_${timeRange}`);
  }

  render() {
    const { tableData, queryOptions,exportFileloading } = this.state;
    const { loading } = this.context;

    const tableProps = {
      cardTitle: '资金账务',
      extra: <Button type="primary" onClick={this.exportRecord} icon={<DownloadOutlined />} >下载账务明细文件</Button>,
      tableData, // 表格数据
      loading, // 请求状态
      noInitLoad: true,
      options: queryOptions, // 表格筛选条件下拉枚举配置
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'id', // 表格行ID
      // options: queryOptions, // 表格筛选条件下拉枚举配置
      // onSelectRow: this.handleSelectRow, // 表格行选中事件
    };
    return (
      <PageHeaderWrapper>
        <Spin spinning={exportFileloading} tip="正在导出文件...">
        <QueryTable {...tableProps} />
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ global, settings }: ConnectState) => ({}))(Form.create()(AccountFlow));
