import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import moment from 'moment';
import QueryTable from '@/components/QueryTable';
import { TableStateFilters } from 'antd/lib/table';
import { GlobalHooks, GlobalContextProps, GlobalContext } from '@/components/GlobalContext'


import { queryServiceOrderPage } from '@/components/api/remit/serviceOrder'

export default class Service extends React.Component{
  static contextType = GlobalContext;

  state = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
  }

  queryTable: any

  /** 表格筛选条件 */
  querys = [
    {
      label: '接单时间', name: 'filterTime',
      type: 'rangedatepicker',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: "text", label: "服务单号", name: "serviceNo" },
    { type: "text", label: "项目名称", name: "projectName" },
    { type: "text", label: "接单人", name: "receiptName" },
  ]

  /** 表格列配置 */
  columns = [
    { title: '服务单号', dataIndex: 'serviceNo' },
    { title: '项目名称', dataIndex: 'projectName' },
    { title: '服务类型', dataIndex: 'serviceTypeName' },
    { title: '预算金额(元)', dataIndex: 'budgetAmount' },
    { title: '服务主体', dataIndex: 'collectedSubjectName' },
    { title: '接单人', dataIndex: 'receiptName' },
    { title: '接单时间', dataIndex: 'receiptTime' },
    { title: '订单状态', dataIndex: 'statusDesc' },
    {
      fixed: 'right',
      width: 100,
      title: '操作',
      render: (row: any) => <div>
        <a style={{ marginRight: 10 }} onClick={() => router.push({ pathname: "/send_single/project_detail", query: { projectNo: row.projectNo } })}>查看项目</a>
        <a onClick={() => router.push({ pathname: "/send_single/service_detail", query: { id: row.id }})}>订单详情</a>
      </div>
    }
  ]

  /**
   * 异步加载表格数据
   *
   * @memberof ActionTable
   */
  loadData = async (options: TableStateFilters) => {
    const { toggleLoading } = this.context
    // 拼装请求参数
    // 拼装请求参数
    const cloneOptions = { ...options } as any;
    // 格式化时间段

    if (options.filterTime && options.filterTime.length) {
      cloneOptions.receiptTimeStart = moment(options.filterTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.receiptTimeEnd = moment(options.filterTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page
    delete cloneOptions.pageSize
    delete cloneOptions.filterTime
    const params1 = {
      query: {
        ...cloneOptions,
      },
      page: {
        curPage: options.page,
        pageSize: options.pageSize
      }
    }
    const params = {
        ...cloneOptions,
        curPage: options.page,
        pageSize: options.pageSize
    }
    toggleLoading(true)
    try {
      const { data: { list = [], recordCount } } = await queryServiceOrderPage(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
      });
      toggleLoading(false)
    } catch (error) {
      toggleLoading(false)
    }
  };

  render() {
    const { tableData } = this.state
    const { loading } = this.context
    const tableProps = {
      tableData, // 表格数据
      loading, // 请求状态
      onRef: (e: any) => this.queryTable = e,
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'serviceNo', // 表格行ID
      // options: queryOptions, // 表格筛选条件下拉枚举配置
      // operators: this.renderOperators(roles), // 表格操作栏按钮配置
      // onSelectRow: this.handleSelectRow, // 表格行选中事件
    };
    return (
      <PageHeaderWrapper>
        <QueryTable {...tableProps} />
      </PageHeaderWrapper>
    )
  }
  
}