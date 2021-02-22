import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import QueryTable from '@/components/QueryTable';
import { message } from 'antd';
import { GlobalContext } from '@/components/GlobalContext';

import router from 'umi/router';

import moment from 'moment';

import { InvoiceStatus } from './enums';
import { getCurrentMerchant } from '@/components/api/remit/merchant';
// api
import {
  pageBillingInfo,
  queryInvoiceStatusList,
} from '@/components/api/remit/billingInfo';
import { queryAllAvailable } from '@/components/api/remit/collectedsubject';
import { queryEnumsListByType } from '@/components/api/common/enums';

class Application extends React.Component {
  static contextType = GlobalContext;

  state = {
    options: {},
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 0 } },
    tableLoading: false, //表格loading
    detailTableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 0 } },
  };

  async componentDidMount() {
    const { data: subjects = [] } = await queryAllAvailable();
    const { data: invoiceStatusList } = await queryInvoiceStatusList();
    const {
      data: { invoiceMode = '' },
    } = await getCurrentMerchant();
    const { data: billTypeEnum } = await queryEnumsListByType('billType');

    this.setState(prevState => {
      return {
        invoiceMode,
        options: {
          ...prevState['options'],
          billType: [
            { code: '', desc: '全部' },
            ...billTypeEnum.map(item => {
              return { code: item.code, desc: item.name };
            }),
          ],
          collectedSubjectNo: [
            { code: '', desc: '全部' },
            ...subjects.map((s: {}) => {
              return { code: s['collectedSubjectNo'], desc: s['collectedSubjectName'] };
            }),
          ],
          invoiceStatus: [
            ...invoiceStatusList.map(({ code, name }: { code: string; name: string }) => {
              return { code, desc: name };
            }),
          ],
        },
      };
    });
  }

  querys = [
    {
      type: 'rangedatepicker',
      label: '发生时间',
      name: 'createTime',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: 'text', label: '账单编号', name: 'billNo' },
    { type: 'select', label: '账单类型', name: 'billType' },
    { type: 'select', label: '代征主体', name: 'collectedSubjectNo' },
    { type: 'select', label: '开票状态', name: 'invoiceStatus', options: { initialValue: '1' } },
  ];

  operators = [
    {
      name: '合并开票',
      attr: {
        onClick: () => {
          this.handleBatchApply();
        },
      },
    },
  ];

  columns = [
    { title: '账单编号', dataIndex: 'billNo', fixed: 'left' },
    { title: '商户名称', dataIndex: 'merchantName' },
    { title: '代征主体', dataIndex: 'collectedSubjectName' },
    { title: '账单类型', dataIndex: 'billTypeName' },
    { title: '账单金额', dataIndex: 'billAmount' },
    { title: '账单明细', dataIndex: 'billContent' },
    { title: '可开票金额', dataIndex: 'canInvoicingAmount' },
    { title: '账单发生时间', dataIndex: 'billDate' },
    { title: '备注', dataIndex: 'statusDesc' },
    {
      title: '操作',
      fixed: 'right',
      key: 'opt',
      render: (row: {}) => {
        const { invoiceStatus } = row;
        return (
          <div>
            <a style={{ marginRight: 10 }} onClick={() => this.showDetail(row)}>
              详情
            </a>
            {invoiceStatus == InvoiceStatus.INIT ||
            invoiceStatus == InvoiceStatus.CANCEL ||
            invoiceStatus == InvoiceStatus.REJECT ||
            invoiceStatus == InvoiceStatus.OBSOLETE ? (
              <a style={{ marginRight: 10 }} onClick={() => this.handleApply(row.billNo)}>
                开票
              </a>
            ) : (
              ''
            )}
          </div>
        );
      },
    },
  ];

  queryTable: any;

  handleTabChange = (key: string) => {
    switch (key) {
      case 'bill':
        router.push('/invoice/application');
        break;
      case 'pre-charge':
        router.push('/invoice/application/pre_bill');
        break;
      default:
        break;
    }
  };

  /**
   * 分页查询表格数据
   *
   * @memberof Visitor
   */
  loadData = async (options: any = {}) => {
    // 拼装请求参数
    const cloneOptions = { ...options } as any;

    if (cloneOptions.invoiceStatus === undefined) {
      cloneOptions.invoiceStatus = '1';
    }

    // 格式化时间段
    if (options.createTime && options.createTime.length) {
      cloneOptions.billDateStart = moment(options.createTime[0])
        .startOf('day')
        .format('YYYY/MM/DD');
      cloneOptions.billDateEnd = moment(options.createTime[1])
        .endOf('day')
        .format('YYYY/MM/DD');
    }
    delete cloneOptions.page;
    delete cloneOptions.pageSize;
    delete cloneOptions.createTime;

    const params = {
      ...cloneOptions,
      curPage: options.page,
      pageSize: options.pageSize,
    };

    this.setState({ tableLoading: true });
    try {
      const {
        data: { list = [], recordCount },
      } = await pageBillingInfo(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
        tableLoading: false,
      });
    } catch (error) {
      this.setState({ tableLoading: false });
    }
  };

  // 跳转申请开票
  handleApply = (billNo: string) => {
    router.push({
      pathname: 'apply',
      query: {
        billNoJson: billNo,
      },
    });
  };

  // 批量申请开票
  handleBatchApply = () => {
    const {
      // props: { form },
      state: { selectedRow = [] },
    } = this.queryTable;
    if (!selectedRow.length) {
      message.info('请选择需合并开票的账单！');
      return false;
    }

    router.push({
      pathname: 'apply',
      query: {
        billNoJson: selectedRow
          .map((r: {}) => {
            return r['billNo'];
          })
          .join(';'),
      },
    });
  };

  showDetail = (row) => {
    router.push({
      pathname: 'application/detail',
      query: {
        billNo: row.billNo,
      },
    });
  }

  render() {
    const { invoiceMode } = this.state;
    const { tableData, tableLoading, options = {} } = this.state;
    const tableProps = {
      tableData, // 表格数据
      options,
      loading: tableLoading,
      operators: this.operators,
      onRef: (e: any) => (this.queryTable = e),
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      onLoad: this.loadData, // 加载表格数据函数
      rowKey: 'id', // 表格行ID
    };
    const tabList =
      invoiceMode == 2
        ? [
            {
              key: 'bill',
              tab: '账单开票',
            },
            {
              key: 'pre-charge',
              tab: '预充值开票',
            },
          ]
        : [];

    return (
      <PageHeaderWrapper tabList={tabList} onTabChange={this.handleTabChange}>
        <QueryTable {...tableProps} />
      </PageHeaderWrapper>
    );
  }
}

// export default connect(({ user }: ConnectState) => ({
//   currentUser: user.currentUser,
// }))(Application);
export default Application;
