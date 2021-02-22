import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import router from 'umi/router';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Card, Descriptions, Table } from 'antd';
import QueryTable from '@/components/QueryTable';
import { TableStateFilters } from 'antd/lib/table';
import getQuery from '@/utils/query';
import { GlobalHooks, GlobalContextProps, GlobalContext } from '@/components/GlobalContext'

import { queryServiceOrderDetail, queryOrderSettlePage } from '@/components/api/remit/serviceOrder'


const FormItem = Form.Item;

class ServiceDetail extends React.Component {
  static contextType = GlobalContext;

  state = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    serviceData: {}
  }

  queryTable: any

  /** 表格筛选条件 */
  querys = [
  ]

  /** 表格列配置 */
  columns = [
    { title: '结算单号', dataIndex: 'settleOrderNo' },
    { title: '结算方式', dataIndex: 'settleTypeName' },
    { title: '结算金额(元)', dataIndex: 'settleAmount' },
    { title: '结算时间', dataIndex: 'settleDate' },
    { title: '结算状态', dataIndex: 'settleStatusDesc' },
  ]
  /** 项目需求表格列配置 */
  projectColumns = [
    { title: '项目编号', dataIndex: 'projectNo' },
    { title: '项目名称', dataIndex: 'projectName' },
    { title: '结算金额(元)', dataIndex: 'budgetAmount' },
    { title: '数量', dataIndex: 'numbers' },
    { 
      fixed: 'right', width: 100, title: '操作', 
      render: (row: Row) => 
      <div>
        <a onClick={() => router.push({ pathname: "/send_single/project_detail", query: { projectNo: this.state.taxProjectDTO.projectNo } })}>项目详情</a>
      </div>
  },
  ]


  /**
   * 异步加载表格数据
   *
   * @memberof ActionTable
   */
  loadData = async (options: TableStateFilters) => {
    const id = getQuery('id')
    const { data = {} } = await queryServiceOrderDetail(id)
    const { taxServiceOrderDTO = {},taxProjectDTO = {} } = data
    this.setState({
      serviceData: data,
      taxProjectDTO
    })
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
    const params = {
      ...cloneOptions,
      serviceNo: taxServiceOrderDTO?.serviceNo,
      receiptName: taxServiceOrderDTO?.receiptName,
      receiptIdNo: taxServiceOrderDTO?.receiptIdNo,
      curPage: options.page,
      pageSize: options.pageSize,
    }
    toggleLoading(true)
    try {
      const { data: { list = [], recordCount } } = await queryOrderSettlePage(params);
      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
      });
      toggleLoading(false)
    } catch (error) {
      toggleLoading(false)
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { serviceData, tableData } = this.state
    const { taxProjectDTO = {}, taxServiceOrderDTO = {} } = serviceData
    const { loading } = this.context

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };

    const tableProps = {
      cardTitle: '结算明细',
      tableData, // 表格数据
      loading, // 请求状态
      onRef: (e: any) => this.queryTable = e,
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      // querys: this.querys, // 表格筛选条件配置
      rowKey: 'settleOrderNo', // 表格行ID
      // options: this.options, // 表格筛选条件下拉枚举配置
      // operators: this.renderOperators(roles), // 表格操作栏按钮配置
      // onSelectRow: this.handleSelectRow, // 表格行选中事件
    };
    return (
      <PageHeaderWrapper>
        <Card title="项目需求" >
          <Table dataSource={[taxProjectDTO]} columns={this.projectColumns}  pagination={false}></Table>
          {/* <Descriptions title="项目需求" bordered>
            <Descriptions.Item label="项目编号">{taxProjectDTO?.projectNo}</Descriptions.Item>
            <Descriptions.Item label="项目名称">{taxProjectDTO?.projectName}</Descriptions.Item>
            <Descriptions.Item label="预算金额(元)">{taxProjectDTO?.budgetAmount}</Descriptions.Item>
            <Descriptions.Item label="数量">{taxProjectDTO?.numbers}</Descriptions.Item>
            <Descriptions.Item label="操作" span={2}><a onClick={() => router.push({ pathname: "/send_single/project_detail", query: { projectNo: taxProjectDTO.projectNo } })}>项目详情</a></Descriptions.Item>
          </Descriptions> */}
        </Card>
        <br />
        <Card>
          <Descriptions title="订单信息" bordered>
            <Descriptions.Item label="服务单号">{taxServiceOrderDTO?.serviceNo}</Descriptions.Item>
            <Descriptions.Item label="接单方式">{taxServiceOrderDTO?.receiptTypeName}</Descriptions.Item>
            <Descriptions.Item label="接单时间">{taxServiceOrderDTO?.receiptTime}</Descriptions.Item>
            <Descriptions.Item label="订单状态">{taxServiceOrderDTO?.statusDesc}</Descriptions.Item>
            <Descriptions.Item label="备注">{taxServiceOrderDTO?.remark}</Descriptions.Item>
          </Descriptions>
        </Card>
        <br />
        <Card>
          <Descriptions title="接单人信息" bordered>
            <Descriptions.Item label="服务主体">{taxServiceOrderDTO?.collectedSubjectName}</Descriptions.Item>
            <Descriptions.Item label="接单人姓名">{taxServiceOrderDTO?.receiptName}</Descriptions.Item>
            <Descriptions.Item label="证件类型">{taxServiceOrderDTO?.receiptIdTypeName}</Descriptions.Item>
            <Descriptions.Item label="证件号码">{taxServiceOrderDTO?.receiptIdNo}</Descriptions.Item>
            <Descriptions.Item label="联系手机">{taxServiceOrderDTO?.receiptMobile}</Descriptions.Item>
          </Descriptions>
        </Card>
        <br />
        <QueryTable {...tableProps} />

      </PageHeaderWrapper>
    )
  }

}



export default Form.create()(ServiceDetail);