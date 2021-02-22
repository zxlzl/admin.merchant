import React from 'react';
import QueryTable from '@/components/QueryTable';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import moment from 'moment';
import { idType, signStatus, signSource } from "../../components/Enum"
import { getEnumArray } from "@/utils/utils"
import { GlobalContext } from '@/components/GlobalContext';
import { CheckCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { Modal, Descriptions, message, Table, Steps } from 'antd';
import styles from "./style.less"

import { batchInvite, detail } from "@/components/api/contract/admin";
import { page } from "@/components/api/contract/merchant";
const { confirm } = Modal

export default class SignMng extends React.Component {
  static contextType = GlobalContext;
  querys = [
    {
      type: "rangedatepicker", label: "创建时间", name: "gmtCreate", attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: 'text', label: '用户名称', name: 'userName' },
    { type: 'select', label: '证件类型', name: 'certType' },
    { type: "text", label: "证件号码", name: "certNo" },
    { type: 'select', label: '签约类型', name: 'signSource' },
    { type: 'text', label: '文件名称', name: 'contractName' },
    { type: 'select', label: '签约状态', name: 'status' },
  ]

  options = {
    certType: getEnumArray(idType),
    signSource: getEnumArray(signSource),
    status: getEnumArray(signStatus),
  }

  operators = [
    { name: "批量邀请", attr: { type: "primary", onClick: () => this.batchInvite() }, }
  ]

  columns = [
    { title: '用户名称', dataIndex: 'userName' },
    { title: '证件类型', render: (row: any) => idType[row.certType] },
    { title: '证件号码', dataIndex: 'certNo' },
    { title: '用户手机号', dataIndex: 'mobile' },
    { title: '签约类型', render: (row: any) => signSource[row.signSource] },
    { title: '文件名称', dataIndex: 'contractName' },
    { title: '创建时间', dataIndex: 'gmtCreate' },
    { title: '签约状态', render: (row: any) => signStatus[row.status] },
    {
      title: '操作',
      key: 'opt',
      render: (row: any) => <div>
        <a onClick={() => this.detail(row)}>详情</a>
        {row.status == 'I' || row.status == 'F' ? ['|', <a onClick={() => this.invite(row)}>邀请</a>] : ''}
        |<a onClick={() => window.open(row.contractViewUrl, '_blank')}>文件</a>
      </div>,
    },
  ]

  queryTable: any;

  state = {
    entry: this.props.match.params.id,
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 0 } },
  }

  selectedRows = []

  render() {
    const { tableData, entry } = this.state;
    const tableProps = {
      tableData, // 表格数据
      onRef: (e: any) => (this.queryTable = e),
      // rowSelectType: true,
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      operators: this.operators, // 操作按钮
      options: this.options, // 表格筛选条件下拉枚举配置
      rowKey: 'id', // 表格行ID
      onLoad: this.loadData, // 加载表格数据函数
      onSelectRow: (rows: any) => { this.selectedRows = rows }
      // tableHeader: () => `累计充值 ${}元，实际到账 ${}元`,
      // loading, // 请求状态
    };
    return (
      <PageHeaderWrapper>
        <QueryTable {...tableProps} />
      </PageHeaderWrapper>
    );
  }

  loadData = async (options: any) => {
    // 拼装请求参数
    const cloneOptions = { ...options } as any;

    if (options.gmtCreate && options.gmtCreate.length) {
      cloneOptions.gmtCreateStart = moment(options.gmtCreate[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.gmtCreateEnd = moment(options.gmtCreate[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page
    delete cloneOptions.gmtCreate
    const params = {
      ...cloneOptions,
      curPage: options.page,
    }
    this.setState({
      tableLoading: true
    });
    // console.log(params)
    const { data: { list = [], recordCount } } = await page(params);

    this.setState({
      tableLoading: false,
      tableData: { rows: list, pagination: { total: recordCount } },
    });
  };

  /**
   * 邀请
   *
   * @memberof SignMng
   */
  invite = (data) => {
    confirm({
      title: '确定邀请该用户进行签约吗？',
      content: <Descriptions column={1} size="small">
        <Descriptions.Item label="用户姓名">{data.userName}</Descriptions.Item>
        <Descriptions.Item label="证件类型">{idType[data.certType]}</Descriptions.Item>
        <Descriptions.Item label="证件号码">{data.certNo}</Descriptions.Item>
        <Descriptions.Item label="用户手机号">{data.mobile}</Descriptions.Item>
        <Descriptions.Item label="签约文件">{data.contractName}</Descriptions.Item>
      </Descriptions>,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        batchInvite({
          signIds: [data.id]
        } as any)
          .then(data => message.success(data))
      },
      onCancel() { },
    });
  }

  /**
   * 批量邀请
   *
   * @memberof SignMng
   */
  batchInviteModal: any
  batchInvite = () => {
    if (!this.selectedRows.length) {
      message.warning('请至少选择一条数据')
      return false
    }
    const { Column } = Table
    const selectedRows = this.selectedRows
    class List extends React.Component {
      render() {
        return <div>
          <p className={styles.desc}>提交签约邀请后，将发送短信给选中用户，提醒用户签约</p>
          <div>签约邀请名单</div><br />
          <Table dataSource={selectedRows}>
            <Column title="用户姓名" dataIndex="userName" key="userName" />
            <Column
              title="证件类型"
              key="certType"
              render={tags => idType[tags.certType]}
            />
            <Column title="证件号码" dataIndex="certNo" key="certNo" />
            <Column title="用户手机号" dataIndex="mobile" key="mobile" />
            <Column
              title="签约类型"
              key="signSource"
              render={tags => signSource[tags.signSource]}
            />
            <Column title="文件名称" dataIndex="contractName" key="contractName" />
            <Column title="创建时间" dataIndex="gmtCreate" key="gmtCreate" />
          </Table>
        </div>
      }
    }

    const m = confirm({
      title: '批量邀请',
      content: <List />,
      okText: '确定',
      cancelText: '取消',
      width: 1000,
      icon: null,
      onOk: (e) => {
        batchInvite({
          signIds: selectedRows.map(x => x.id)
        } as any)
          .then(data => {
            message.success('邀请成功！')
            this.queryTable.reload()
            m.destroy()
          })
      },
      onCancel() { },
    })
  }

  /**
   * 签约详情
   *
   * @memberof SignMng
   */
  detail = async (row: any) => {
    const { showModal, closeModal } = this.context;
    const { data = {} } = await detail(row.id)

    showModal((props: any) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        data,
        title: '查看签约详情',
        onOk: () => closeModal(),
        onCancel: () => closeModal(),
      };
      return <SignDetail {...modalProps} />
    });
  }
}

const SignDetail = ((props: any) => {
  const { loading, onCancel, onOk, visible, title, data } = props;

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
      <Steps current={data.status == 'CG' ? 1 : 2}>
        <Step title="已创建" description={data.gmtCreate} icon={<CheckCircleOutlined />} />
        <Step title="主体签约" icon={<HistoryOutlined />} />
        <Step title={data.status == 'CG' ? '用户签约' : signStatus[data.status]} icon={<HistoryOutlined />} />
      </Steps><br />
      <Descriptions title="免验证信息" bordered column={2} size="small">
        <Descriptions.Item label="商户ID">{data.merchantId}</Descriptions.Item>
        <Descriptions.Item label="商户名称">{data.merchantName}</Descriptions.Item>
        <Descriptions.Item label="主体ID">{data.collectedSubjectNo}</Descriptions.Item>
        <Descriptions.Item label="代征主体">{data.signEntity}</Descriptions.Item>
        <Descriptions.Item label="用户姓名">{data.userName}</Descriptions.Item>
        <Descriptions.Item label="证件类型">{idType[data.certType]}</Descriptions.Item>
        <Descriptions.Item label="证件号码">{data.certNo}</Descriptions.Item>
        <Descriptions.Item label="用户手机号">{data.mobile}</Descriptions.Item>
        {/* <Descriptions.Item label="商户订单号">{data.identityNo}</Descriptions.Item> */}
        {/* <Descriptions.Item label="平台订单号">{data.identityNo}</Descriptions.Item> */}
        <Descriptions.Item label="签约类型">{signSource[data.signSource]}</Descriptions.Item>
        <Descriptions.Item label="文件ID">{data.contractId}</Descriptions.Item>
        <Descriptions.Item label="文件名称">{data.contractName}</Descriptions.Item>
        <Descriptions.Item label="模板ID">{data.templateId}</Descriptions.Item>
        {/* <Descriptions.Item label="模板名称">{data.identityNo}</Descriptions.Item> */}
        <Descriptions.Item label="签约状态">{signStatus[data.status]}</Descriptions.Item>
        <Descriptions.Item label="状态描述">{data.statusDesc}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
})
