import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import router from 'umi/router';
import QueryTable from '@/components/QueryTable';
import { TableStateFilters } from 'antd/lib/table';
import { GlobalHooks, GlobalContextProps, GlobalContext } from '@/components/GlobalContext'
import { ServiceType,ProjectStatus } from '@/utils/enums';


import { queryDispatchProjectList } from '@/components/api/remit/dispathProject'

export default class Service extends React.Component{
  static contextType = GlobalContext;

  state = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    queryOptions: {}
  }

  async componentDidMount() {

    this.setState((prev) => {
      const { queryOptions } = prev
      return {
        queryOptions: {
          ...queryOptions,
          serviceType: Object.keys(ServiceType).map(key => {
            return { code: key, desc: ServiceType[key] }
          }),
          projectStatus: Object.keys(ProjectStatus).map(key => {
            return { code: key, desc: ProjectStatus[key] }
          })
        }
      }
    })
  }

  queryTable: any

  /** 表格筛选条件 */
  querys = [
    {
      label: '发起时间', name: 'filterTime',
      type: 'rangedatepicker',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: "text", label: "项目名称", name: "projectName" },
    { type: "select", label: "服务类型", name: "serviceType" },
    { type: "select", label: "项目状态", name: "projectStatus" },
    
  ]

  /** 表格列配置 */
  columns = [
    { title: '项目编号', dataIndex: 'projectNo' },
    { title: '项目名称', dataIndex: 'projectName' },
    { title: '服务类型', dataIndex: 'serviceTypeName' },
    { title: '发起商户', dataIndex: 'merchantName' },
    { title: '服务主体', dataIndex: 'collectedSubjectName' },
    { title: '发起时间', dataIndex: 'gmtCreate' },
    { title: '项目状态', dataIndex: 'projectStatusDesc' },
    {
      fixed: 'right',
      width: 100,
      title: '操作',
      key:'opt',
      render: (row: any) => <div>
        <a onClick={() => router.push({ pathname: "/send_single/project_detail", query: { projectNo: row.projectNo } })}>详情</a>
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
      cloneOptions.gmtCreateBegin = moment(options.filterTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.gmtCreateEnd = moment(options.filterTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
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
      const { data: { list = [], recordCount } } = await queryDispatchProjectList(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
      });
      toggleLoading(false)
    } catch (error) {
      toggleLoading(false)
    }
  };

  render() {
    const { tableData,queryOptions } = this.state

    const { loading } = this.context
    const tableProps = {
      tableData, // 表格数据
      loading, // 请求状态
      onRef: (e: any) => this.queryTable = e,
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'projectNo', // 表格行ID
      options: queryOptions
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