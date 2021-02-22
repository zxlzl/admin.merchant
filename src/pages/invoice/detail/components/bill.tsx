import React, { Component } from 'react';

import { GlobalContext } from '@/components/GlobalContext';
import QueryTable from '@/components/QueryTable';


import getQuery from '@/utils/query';


import { invoiceBillDetail } from '@/components/api/remit/invoiceInfo'

interface BillProps {
  invoiceDetail: {},
  setParentState: (commonState: {}) => void
}

class Bill extends Component<BillProps> {
  view: HTMLDivElement | undefined = undefined;
  static contextType = GlobalContext;
  state = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 0 } },
    tableLoading: false, //表格loading
  }

  columns = [
    { title: "账单编号", dataIndex: "billNo", fixed: 'left' },
    { title: "商户名称", dataIndex: "merchantName", },
    { title: "代征主体", dataIndex: "collectedSubjectName", },
    { title: "账单类型", dataIndex: "billTypeName",  },
    { title: "账单金额", dataIndex: "billAmount", },
    { title: "账单明细", dataIndex: "billContent", },
    { title: "可开票金额", dataIndex: "canInvoicingAmount", },
    { title: "账单发生时间", dataIndex: "billDate", },
  ]

  async componentDidMount() {
  }


  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  /**
 * 分页查询表格数据
 *
 */
  loadData = async (options: any = {}) => {
    // 拼装请求参数
    const cloneOptions = { ...options } as any;
    const applyNo = getQuery('applyNo') || ''

    delete cloneOptions.page
    delete cloneOptions.pageSize
    delete cloneOptions.createTime

    const params = {
      ...cloneOptions,
      curPage: options.page,
      pageSize: options.pageSize,
      applyNo: applyNo
    }

    this.setState({ tableLoading: true });
    try {
      const { data: { list = [], recordCount } } = await invoiceBillDetail(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
        tableLoading: false
      });
    } catch (error) {
      this.setState({ tableLoading: false });
    }
  }

  render() {
    const { tableData, tableLoading } = this.state
    const { invoiceDetail = {} } = this.props


    const tableProps = {
      tableData, // 表格数据
      bodyStyle: { padding: 0 },
      tableHeader: () => <div>申请开票总金额：{invoiceDetail.invoiceAmount}</div>,
      loading: tableLoading,
      rowSelectType: null,
      columns: this.columns, // 表格列配置
      onLoad: this.loadData, // 加载表格数据函数
      rowKey: 'id', // 表格行ID
    };
    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <QueryTable {...tableProps} />
      </div>
    );
  }
}

export default Bill;
