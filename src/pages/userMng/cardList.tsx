import React from 'react';
import QueryTable from '@/components/QueryTable';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { CheckCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { Modal, Descriptions, Steps } from 'antd';
import moment from 'moment';
import { idType, authType, status } from "../../components/Enum"
import { getEnumArray } from "@/utils/utils"
import { GlobalContext } from '@/components/GlobalContext';

import { queryNaturalPersonList, queryNaturalPersonDetail } from "@/components/api/remit/natural";
import { queryAllAvailable } from "@/components/api/supervisor/merchant";
import { queryAllAvailable as queryAllAvailable2 } from "@/components/api/supervisor/collectedsubject";

export default class CardList extends React.Component {
  static contextType = GlobalContext;
  querys = [
    {
      type: "rangedatepicker", label: "认证时间", name: "gmtCreate", attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: 'text', label: '用户名称', name: 'name' },
    { type: 'select', label: '证件类型', name: 'idType' },
    { type: "text", label: "证件号码", name: "identityNo" },
    { type: 'text', label: '银行账号', name: 'bankAccountNo' },
    { type: 'select', label: '认证类型', name: 'authType' },
    { type: 'select', label: '认证状态', name: 'status' },
  ]

  columns = [
    { title: '用户名称', dataIndex: 'name' },
    { title: '证件类型', render: (row: any) => idType[row.idType] },
    { title: '证件号码', dataIndex: 'identityNo' },
    { title: '银行账号', dataIndex: 'bankAccountNo' },
    { title: '认证类型', render: (row: any) => authType[row.authType] },
    { title: '认证状态', render: (row: any) => status[row.status] },
    { title: '认证时间', dataIndex: 'gmtCreate' },
    {
      title: '操作',
      render: (row: any) => <div>
        <a onClick={() => this.detail(row)}>详情</a>
      </div>,
    },
  ]

  queryTable: any;

  state = {
    entry: this.props.match.params.id,
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 0 } },
  }
  options = {
    idType: getEnumArray(idType),
    authType: getEnumArray(authType),
    status: getEnumArray(status),
  }

  render() {
    // console.log(this.options)
    const { tableData } = this.state;
    const tableProps = {
      tableData, // 表格数据
      onRef: (e: any) => (this.queryTable = e),
      rowSelectType: null,
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      options: this.options, // 表格筛选条件下拉枚举配置
      rowKey: 'id', // 表格行ID
      onLoad: this.loadData, // 加载表格数据函数
    };
    return (
      <PageHeaderWrapper>
        <QueryTable {...tableProps} />
      </PageHeaderWrapper>
    );
  }

  loadData = async (options: any) => {
    // console.log(options)
    // 拼装请求参数
    const cloneOptions = { ...options } as any;

    if (options.gmtCreate && options.gmtCreate.length) {
      cloneOptions.startDate = moment(options.gmtCreate[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.endDate = moment(options.gmtCreate[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page
    delete cloneOptions.pageSize
    delete cloneOptions.gmtCreate
    const params = {
      query: cloneOptions,
      page: {
          curPage: options.page,
          pageSize: options.pageSize
      }
    }
    this.setState({
      tableLoading: true
    });
    const { data: { list = [], recordCount } } = await queryNaturalPersonList(params);

    this.setState({
        tableLoading: false,
        tableData: { rows: list, pagination: { total: recordCount } },
    });
  };

  detail = async (row: any) => {
    const { showModal, closeModal } = this.context;
    const { data = {} } = await queryNaturalPersonDetail(row.id)

    showModal((props: any) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        data,
        title: '查看卡验证详情',
        onOk: () => closeModal(),
        onCancel: () => closeModal(),
      };
      return <CardDetail {...modalProps} />
    });
  }
}

const CardDetail = ((props: any) => {
  const { loading, onCancel, onOk, visible, title, data} = props;

  const modalProps = {
    title,
    visible,
    onOk,
    onCancel,
    width: 1000,
    destroyOnClose: true,
    okButtonProps: { loading },
  };
  const { Step } = Steps;

  return (
    <Modal {...modalProps}>
      <Steps current={status != undefined ? 1 : 0}>
        <Step title="已创建" description={data.gmtCreate} icon={<CheckCircleOutlined />}  />
        <Step title="认证结果" description={data.gmtModified} icon={<HistoryOutlined />}  />
      </Steps><br/>
      <Descriptions title="卡验证信息" bordered column={2} size="small">
        <Descriptions.Item label="商户ID">{data.merchantNo}</Descriptions.Item>
        <Descriptions.Item label="商户名称">{data.merchantName}</Descriptions.Item>
        <Descriptions.Item label="主体ID">{data.collectedSubjectNo}</Descriptions.Item>
        <Descriptions.Item label="代征主体">{data.collectedSubjectName}</Descriptions.Item>
        <Descriptions.Item label="用户姓名">{data.name}</Descriptions.Item>
        <Descriptions.Item label="证件类型">{idType[data.idType]}</Descriptions.Item>
        <Descriptions.Item label="证件号码">{data.identityNo}</Descriptions.Item>
        <Descriptions.Item label="银行账号">{data.bankAccountNo}</Descriptions.Item>
        <Descriptions.Item label="银行预留手机号">{data.mobile}</Descriptions.Item>
        <Descriptions.Item label="验证类型">{authType[data.authType]}</Descriptions.Item>
        <Descriptions.Item label="商户订单号">{data.outTradeNo}</Descriptions.Item>
        <Descriptions.Item label="平台订单号">{data.id}</Descriptions.Item>
        <Descriptions.Item label="验证状态">{status[data.status]}</Descriptions.Item>
        <Descriptions.Item label="状态描述">{data.returnMessage}</Descriptions.Item>
      </Descriptions>

    </Modal>
  );
})

