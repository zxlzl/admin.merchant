
import React from 'react';
import moment from 'moment';

import { CaretRightOutlined } from '@ant-design/icons';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import {
  Card,
  Typography,
  Divider,
  Statistic,
  Button,
  Modal,
  Collapse,
  Input,
  Result,
  message,
  Alert,
} from 'antd';
import { connect } from 'dva';

import QueryTable from '@/components/QueryTable';
import NoPass from './NoPass'
import BatchInfo from '../common/batchInfo'
import { GlobalContextProps, GlobalContext } from '@/components/GlobalContext';
import { TableStateFilters } from 'antd/lib/table';
import ModalBox from '../common/modal'
import { credentialEnum,submitModeEnum } from '@/utils/enums';
import { PayTableProps, PayTableState, PayTableRow } from './data'
import { ajax, API_URL } from '@/utils/request'
import { queryPayChanleByMerchantNo } from '@/components/api/remit/merchantproduct'
import { queryPayDetailsList, updateStatusByPayBatchNo, applyPay, payDetail, queryPayBatchByPayBatchNo, queryPayBathSummary, revoke,detailPayStatus } from '@/components/api/remit/paybatch'
import { updateTaxPayBatchDetail, updateStatusById, queryOrderCostDetail } from '@/components/api/remit/paybatchdetail'
import { queryAllAvailable } from '@/components/api/remit/collectedsubject';

const { Panel } = Collapse;
const { Text } = Typography;
const { confirm } = Modal;
const FormItem = Form.Item;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};



interface EditFormProps extends FormComponentProps {
  /** 修改数据源 */
  data: PayTableRow;
  /** 请求状态 */
  loading: boolean;
  /** 弹窗确认按钮事件 */
  onOk: (e: any) => any;
  /** 弹窗取消事件 */
  onCancel: (e: any) => any;
  /** 显隐状态 */
  visible: boolean;
}

/** 编辑订单弹窗 */
const EditModal = Form.create<EditFormProps>()((props: EditFormProps) => {
  const { form, loading, onOk, onCancel, visible, data } = props;
  const { getFieldDecorator, validateFields } = form;
  const okHandle = () => {
    validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
    },
  };

  const modalProps = {
    visible,
    onCancel,
    onOk: okHandle,
    title: '修改订单',
    destroyOnClose: true,
    okButtonProps: { loading },
  };

  return (
    <Modal {...modalProps}>
      <Form>
        <FormItem {...formItemLayout} label="收款账号">
          {getFieldDecorator('accountNo', {
            initialValue: data.accountNo,
            rules: [{ required: true, message: '请填写收款账号' }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="收款户名">
          {getFieldDecorator('accountName', {
            initialValue: data.accountName,
            rules: [{ required: true, message: '请填写收款户名' }],
          })(<Input readOnly />)}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证号">
          {getFieldDecorator('identityNo', {
            initialValue: data.identityNo,
            rules: [{ required: true, message: '请填写身份证号' }],
          })(<Input readOnly />)}
        </FormItem>
        <FormItem {...formItemLayout} label="银行预留手机号码">
          {getFieldDecorator('mobile', {
            initialValue: data.mobile,
            rules: [{ required: true, message: '请填写银行预留手机号码' }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="打款金额">
          {getFieldDecorator('amount', {
            initialValue: data.amount,
            rules: [{ required: true, message: '请填写打款金额' }],
          })(<Input readOnly />)}
        </FormItem>
        <FormItem {...formItemLayout} label="打款备注">
          {getFieldDecorator('memo', {
            initialValue: data.memo,
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

/** 锁定批次、开始打款模块 */
class PayTable extends React.Component<PayTableProps, PayTableState> {
  static contextType = GlobalContext;

  state: PayTableState = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    nopassModalshow: false,
    options: {}
  };

  async componentDidMount() {
    const { payBatchNo } = this.props
    const { data: payChannels = [] } = await queryPayChanleByMerchantNo()
    const {data:payStatus=[]} = await detailPayStatus()
    const { data: batchData = {} } = await queryPayBatchByPayBatchNo(payBatchNo)
    const { data: subjects = [] } = await queryAllAvailable();
    // const batchData = {}
    this.setState({
      batchData,
    })
    this.setState((prev) => {
      const { options } = prev
      return {
        options: {
          ...options,
          payChannelCode: [
            { code: '', desc: "全部" },
            ...payChannels.map((s: {}) => { return { code: s['key'], desc: s['value'] } })
          ],
          identityType: Object.keys(credentialEnum).map(key => {
            return { code: key, desc: credentialEnum[key] }
          }),
          payStatus: payStatus.map(key => {
            return { code: key.status, desc:key.desc }
          }),
          collectedSubjectNo: [
            { code: '', desc: '全部' },
            ...subjects.map((s: {}) => {
              return { code: s['collectedSubjectNo'], desc: s['collectedSubjectName'] };
            }),
          ],
          submitMode: [
            { code: '', desc: '全部' },
            ...Object.keys(submitModeEnum).map(key => {
              return { code: key, desc: submitModeEnum[key] };
            }),
          ],
        }
      }
    })

  }

  queryTable: any;

  /**
   * 异步加载表格数据
   *
   * @memberof PayTable
   */
  loadData = async (options: TableStateFilters) => {
    const cloneOptions = { ...options } as any;
    const { toggleLoading } = this.context
    // 拼装请求参数
    const { payBatchNo } = this.props
    const merchantNo = localStorage.getItem('merchant_no')
    if (options.createTime && options.createTime.length) {
      cloneOptions.startDate = moment(options.createTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.endDate = moment(options.createTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page
    delete cloneOptions.pageSize
    delete cloneOptions.createTime
    const params = {
      query: {
        payBatchNo, merchantNo, ...cloneOptions
      },
      page: {
        curPage: options.page,
        pageSize: options.pageSize
      }
    }
    toggleLoading(true)
    try {
      const { data: { list = [], recordCount } } = await queryPayDetailsList(params);
      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
      });
    } finally {
      toggleLoading(false)
    }

  };

  /**
   * 编辑订单
   *
   * @author shixin.deng
   * @param {object} [row={}]
   */
  handleEdit = (row: PayTableRow) => {
    const { showModal, closeModal } = this.context;
    // 弹窗确定事件，发起编辑请求
    const onOk = async (value: PayTableRow) => {
      const updateParams = {
        accountNo: value.accountNo,      // 收款账号
        mobile: value.mobile,            // 银行预留手机号码
        memo: value.memo,                // 打款备注
        id: row.id                      // 主键
      }
      await updateTaxPayBatchDetail(updateParams)
      message.success('修改成功！')
      this.queryTable.reload()
      closeModal();
    };
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        onOk, // 确认事件
        data: row,
        onCancel: () => closeModal(), // 取消事件
      };
      return <EditModal {...modalProps} />;
    });
  };

  /** 表格筛选条件 */
  querys = [
    {
      type: "rangedatepicker", label: "创建时间", name: "createTime", attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: "text", label: "商户名称", name: "merchantName" },
    { label: '代征主体', name: 'collectedSubjectNo', type: 'select' },
    { type: "select", label: "打款通道", name: "payChannelCode" },
    { type: "text", label: "平台订单号", name: "payDetailNo" },
    { type: "text", label: "商户订单号", name: "merchantOrderNo" },
    { type: "text", label: "收款用户姓名", name: "accountName" },
    { type: "text", label: "收款用户手机号", name: "mobile" },
    { type: "select", label: "证件类型", name: "identityType" },
    { type: "text", label: "证件号码", name: "identityNo" },
    { type: "text", label: "收款账号", name: "accountNo" },
    { type: "rangeData", label: "商户打款金额", names: ['startAmount','endAmount'] },
    { type: 'select',label: '订单来源', name: 'submitMode', },
    { type: "select", label: "订单状态", name: "payStatus" },
  ]

  /** 表格列配置 */
  columns = [
    { width: 200, title: '创建时间', dataIndex: 'gmtCreate' },
    { title: '商户名称', dataIndex: 'merchantName' },
    { title: '代征主体', dataIndex: 'collectedSubjectName' },
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
    { title: '订单状态', dataIndex: 'payStatusDesc' },
    { title: '状态描述', dataIndex: 'statusDesc' },
    {
      fixed: 'right',
      title: "操作",
      key: "opt",
      render: (row: any) => <div>
        <a style={{ marginRight: 12 }} onClick={() => { this.detailModal(row) }}>详情</a>
        {/* <a onClick={() => { this.feeModal(row) }}>费用单</a> */}
      </div>
    },
  ];

  /**
   * 挂单
   *
   */
  handleHangUp = (row) => {
    confirm({
      title: '确认提示',
      content: <div>
        <p style={{ marginBottom: 0 }}>确定挂起该笔订单吗？</p>
        <p style={{ marginBottom: 0, wordBreak: 'break-all' }}>{`[订单流水号:${row.payDetailNo}]`}</p>
      </div>,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await updateStatusById({ status: '06', id: row.id })
        message.success('订单挂起成功！')
        this.queryTable.reload()
      },
    });
  }

  handlePay = () => {
    const { payBatchNo, dispatch } = this.props;
    const { batchData } = this.state
    const merchantNo = localStorage.getItem('merchant_no')
    const content =
      <>
        <Card
          bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Statistic title="总笔数（笔）" value={batchData?.count} />
          <Divider type="vertical" />
          <Statistic title="可打款笔数（笔）" value={batchData?.canPayNumbers} />
          <Divider type="vertical" />
          <Statistic title="异常挂起笔数（笔）" value={batchData?.hangupNumbers} />
        </Card>
        <br />
        <h4>请确定打款信息无误，锁定成功的{batchData?.canPayNumbers}笔将发起打款，打款后钱将转入收款方账户，无法退款</h4>
        <div>商户批次号：{batchData?.merchantPayBatchNo}</div>
        <div>平台批次号：{batchData?.payBatchNo}</div>
      </>
    confirm({
      width: 800,
      title: '确认打款',
      content: content,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const res = await applyPay({merchantNo, payBatchNo })
        if(res.code == 0) {
          message.success('申请打款成功')
          dispatch({
            type: 'batchPayment/fetchCurrentBatch',
            payload: true,
            payBatchNo
          })
        } else {
          message.error(res.message)
        }
      }
    });
  };

  showPayResult = () => {
    const { showModal, closeModal } = this.context;
    // const { data = {} } = await uploadMerchantDetail()
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        data: {},
        title: '打款申请结果',
        width: 800,
        footer: null,
        onOk: () => closeModal(), // 确认事件
        onCancel: () => closeModal(), // 取消事件
      };
      return <Modal {...modalProps}>
        <Result
          status="success"
          title="打款申请成功"
          subTitle={<>
            单笔打款资金在5万以内的实时到帐；
            <br />
            5万及5万以上，工作日8:00-17:00间发起汇款，汇款资金预计2小时内到帐，其他时间次日到账。
            <br />
            具体时间以银行到账为准
          </>}
        />
      </Modal>;
    });
  }

  /**
	 * 查看异常挂起/打款失败详情
	 */
  noPassModal = async (type: number) => {
    const { payBatchNo, merchantNo } = this.props;
    const params = {
      payBatchNo, merchantNo,
      payStatus: type == 1 ? '04' : '06'
    }
    const { data = {} } = await queryPayBathSummary(params)
    // const data = {list:[{discountRate:0}]}
    this.setState({
      noPassData: data,
      nopassModalshow: true,
      noPassType: type,
    })
  }

  hideNoPass = () => {
    this.setState({
      nopassModalshow: false
    })
  }

  /**
	 * 详情
	 */
  detailModal = async (row: any) => {
    const { data } = await payDetail(row.id)
    this.setState({
      modalData: data,
      modalshow: true,
      modalType: 1
    })
  }

  hideModal = () => {
    this.setState({
      modalshow: false
    })
  }

  /**
	 * 费用单
	 */
  feeModal = async (row: any) => {
    const { data = {} } = await queryOrderCostDetail({ id: row.id })
    this.setState({
      modalData: data,
      modalshow: true,
      modalType: 2
    })
  }

  /**
   * 撤销批次
   */
  rescindBatch = () => {
    const { batchData } = this.state
    const { dispatch, payBatchNo, merchantNo } = this.props;
    confirm({
      content: <>
        <h4>确定撤销该打款批次吗？撤销后不可更改</h4>
        <div>商户批次号：{batchData?.merchantPayBatchNo}</div>
        <div>平台批次号：{batchData?.payBatchNo}</div>
      </>,
      okText: '确定',
      cancelText: '取消',
      width: 500,
      onOk: async () => {
        await revoke({ merchantNo, payBatchNo })
        message.success('撤销锁定成功！')
        dispatch({
          type: 'batchPayment/fetchCurrentBatch'
        })
      },
    });
  };

  test = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'batchPayment/fetchCurrentBatch',
      payload: true
    })
  }

  render() {
    const { statistics = {}, showPayButton, batchPayment: { showFreshButton } } = this.props
    const { tableData, batchData, noPassType, noPassData, nopassModalshow, modalshow, modalType, modalData,options } = this.state;
    const { loading } = this.context

    const tableHeader = () => (
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Typography style={{ flex: 1 }}>
          <Text>商户打款请求共{statistics.numbers}条，总金额 {statistics.amount}元</Text>
          <br />
          <Text>系统实际可打款共{statistics.canPayNumbers}条，总金额{statistics.canPayAmount}元；实际打款以平台实时计算为准</Text>
        </Typography>
        {showPayButton ? <Button type="primary" onClick={this.handlePay}>打款</Button> : ''}
      </div>
    );

    const tableProps = {
      // tableHeader,
      tableData, // 表格数据
      loading, // 请求状态
      bodyStyle: { padding: '24px 0' },
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      rowKey: 'id', // 表格行ID
      querys: this.querys, // 表格筛选条件配置
      options, // 表格筛选条件下拉枚举配置
    }

    const batchInfoProps = {
      noPassModal: this.noPassModal,
      batchData,
      noStep: true
    }

    const noPassProps = {
      visible: nopassModalshow,
      hideModal: this.hideNoPass,
      type: noPassType,
      data: noPassData,
    }

    const modalProps = {
      visible: modalshow,
      modalType,
      hideModal: this.hideModal,
      data: modalData
    }

    return <>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header="确认打款规则说明" key="1" style={customPanelStyle}>
          <Typography>
            <Text>
              1.刷新状态：请刷新页面状态，直至全部打款订单校验完成，才能继续确认打款；
            </Text>
            <br />
            <Text>
              2.确认打款：打款确认后，系统将校验余额是否足够，若余额不足请充值后重试；
            </Text>
            <br />
            <Text>
              3.撤销批次：批次锁定超过24小时，系统将自动撤销该批次。
            </Text>
          </Typography>
        </Panel>
      </Collapse>
      {
        showFreshButton ?
          <Alert message="批次锁定中...预计2分钟完成全部锁定，请刷新页面查询" type="warning" showIcon />
          : null
      }
      {
        showFreshButton ?
          <Button style={{ marginTop: 10,marginBottom: 10 }} type="primary" onClick={() => { location.reload() }}>刷新</Button>
          : null
      }
      <BatchInfo {...batchInfoProps} />
      {/* <Card
        bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Statistic title="通过验证订单（笔/元）" value={112893} precision={2} prefix={'4 /'} />
        <Divider type="vertical" />
        <Statistic title="失败订单（笔/元）" value={0} precision={2} prefix={'0 /'} />
        <Divider type="vertical" />
        <Statistic title="风险订单（笔/元）" value={0} precision={2} prefix={'0 /'} />
        <Divider type="vertical" />
        <Statistic title="服务费(元)" value={500} precision={2} />
      </Card> */}
      <Button style={{ marginRight: 10,marginTop:30 }} type="primary" onClick={this.handlePay} disabled={batchData?.payStatus == '01' ? false : true}>去打款</Button>
      <Button style={{ marginBottom: 30 }}  onClick={this.rescindBatch}>撤销批次</Button>

      <h3 style={{ marginTop: 20 }}>打款明细记录</h3>
      <QueryTable ref={(e: QueryTable) => (this.queryTable = e)} {...tableProps} />

      <NoPass {...noPassProps}></NoPass>
      <ModalBox {...modalProps}></ModalBox>
      {/* <Button onClick={this.test}>test</Button> */}
    </>;
  }
}

export default connect(({ global, user, batchPayment }: ModalConnectState) => ({
  user,
  batchPayment
}))(Form.create<PayTableProps>()(PayTable));