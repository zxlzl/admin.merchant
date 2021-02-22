import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Card } from 'antd';
import QueryTable from '@/components/QueryTable';
import { TableStateFilters } from 'antd/lib/table';
import getQuery from '@/utils/query';
import { GlobalHooks, GlobalContextProps, GlobalContext } from '@/components/GlobalContext'

import { queryDispatchProjectDetail } from '@/components/api/remit/dispathProject'

const { TextArea } = Input;


const FormItem = Form.Item;

class ProjectDetail extends React.Component {
  static contextType = GlobalContext;

  state = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
  }

  async componentDidMount() {
    const projectNo = getQuery('projectNo')
    const { data= {} } = await queryDispatchProjectDetail(projectNo)

    this.setState({
      projectData: data,
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
      render: (row: any) => <div>
        <a onClick={() => {}}>详情</a>
      </div>
    }
  ]


  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const {projectData = {}} = this.state

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    return (
      <PageHeaderWrapper>
        <Form {...formItemLayout}>
          <Card title="项目内容">
            {/* <p>杭州乐刻网络技术有限公司发布</p>
            <h3>健身自助教练</h3>
            <p>技术服务</p> */}
            <FormItem label="服务主体">
              {getFieldDecorator('collectedSubjectName', {
                initialValue: projectData?.collectedSubjectName,
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="项目编号">
              {getFieldDecorator('projectNo', {
                initialValue: projectData?.projectNo
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="项目描述">
              {getFieldDecorator('projectDesc', {
                initialValue: projectData?.projectDesc
              })(<TextArea rows={4} readOnly />)}
            </FormItem>
            <FormItem label="项目模式">
              {getFieldDecorator('projectModelName', {
                initialValue: projectData?.projectModelName
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="预算金额">
              {getFieldDecorator('budgetAmount', {
                initialValue: projectData?.budgetAmount
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="项目周期">
              {getFieldDecorator('gmtCreate', {
                initialValue: projectData?.gmtCreate + '至' +projectData?.effectiveEndTime
              })(<Input readOnly />)}
            </FormItem>
          </Card>
          <br />

          <Card title="项目状态">
            <FormItem label="发起时间">
              {getFieldDecorator('bankAccountName', {
                initialValue: projectData?.gmtCreate
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="生效时间">
              {getFieldDecorator('bankAccountName', {
                initialValue: projectData?.effectiveStartTime
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="失效时间">
              {getFieldDecorator('bankAccountName', {
                initialValue: projectData?.effectiveEndTime
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="项目状态">
              {getFieldDecorator('bankAccountName', {
                initialValue: projectData?.projectStatusDesc
              })(<Input readOnly />)}
            </FormItem>
          </Card>
        </Form>
      </PageHeaderWrapper>
    )
  }

}



export default Form.create()(ProjectDetail);