
import React from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { CaretRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Card,
  Typography,
  Button,
  Modal,
  Collapse,
  Input,
  message,
  Descriptions,
  Statistic,
  Divider,
} from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';

import QueryTable from '@/components/QueryTable';
import ModalBox from '../common/modal'
import { GlobalContextProps, GlobalContext } from '@/components/GlobalContext';
import { TableStateFilters } from 'antd/lib/table';
import { LockTableProps, LockTableState, LockTableRow, ModalConnectState } from './data'
import axios from 'axios'
import { ajax, API_URL } from '@/utils/request'
import { queryPayChanleByMerchantNo } from '@/components/api/remit/merchantproduct'
import { queryPayDetailsList, updateStatusByPayBatchNo, lockBatch, payDetail,queryPayBatchByPayBatchNo,revoke,detailPayStatus } from '@/components/api/remit/paybatch'
import { updateTaxPayBatchDetail, updateStatusById } from '@/components/api/remit/paybatchdetail'

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

// 提交方式
const submitWay = {
  '0': '商户平台', '1': 'api'
}

// 证件类型
const credentialEnum = {
  "00": "居民身份证",
  "01": "中国护照",
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
        {
          data['bankCode'] == 'BANKCHANNEL'
            ? <FormItem {...formItemLayout} label="银行预留手机号码">
              {getFieldDecorator('mobile', {
                initialValue: data.mobile,
                rules: [{ required: true, message: '请填写银行预留手机号码' }],
              })(<Input />)}
            </FormItem>
            : ''
        }
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
class LockTable extends React.Component<LockTableProps, LockTableState> {
  static contextType = GlobalContext;

  state: LockTableState = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
  };

  queryTable: any;

  async componentDidMount() {
    const { payBatchNo } = this.props
    const {data:payStatus=[]} = await detailPayStatus()
    const { data: payChannels = [] } = await queryPayChanleByMerchantNo()
    const { data: batchData = {} } = await queryPayBatchByPayBatchNo(payBatchNo)
    // const batchData = {}
    this.setState({
      batchData
    })
    this.setState((prev) => {
      const { options } = prev
      return {
        options: {
          ...options,
          identityType: Object.keys(credentialEnum).map(key => {
            return { code: key, desc: credentialEnum[key] }
          }),
          payChannelCode: [
            { code: '', desc: "全部" },
            ...payChannels.map((s: {}) => { return { code: s['key'], desc: s['value'] } })
          ],
          payStatus: payStatus.map(key => {
            return { code: key.status, desc:key.desc }
          }),
        }
      }
    })
  }

  /**
   * 异步加载表格数据
   *
   * @memberof LockTable
   */
  loadData = async (options: TableStateFilters) => {
    // 拼装请求参数
    const { payBatchNo } = this.props
    const { toggleLoading } = this.context
    const cloneOptions = { ...options } as any;

    const merchantNo = localStorage.getItem('merchant_no')
    delete cloneOptions.page
    delete cloneOptions.pageSize
    delete cloneOptions.filterTime
    const params = {
      query: {
        payBatchNo, merchantNo,...cloneOptions
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
   * 挂单
   *
   * @memberof LockTable
   */
  handleHangUp = (row: LockTableRow) => {
    confirm({
      width: 540,
      title: '确定挂起该笔批次吗？挂起后请在挂起订单页面修改订单信息',
      content: <div>
        <p style={{ marginBottom: 0 }}>{`商户订单号:${row.merchantOrderNo}`}</p>
        <p style={{ marginBottom: 0, wordBreak: 'break-all' }}>{`平台订单号:${row.payDetailNo}`}</p>
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

  /**
   * 锁定批次
   *
   * @memberof LockTable
   */
  handleLock = () => {
    const { dispatch, payBatchNo, merchantNo } = this.props;
    const { batchData } = this.state
    const content =
      <>
        <Card
          bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Statistic title="总笔数（笔）" value={batchData?.count} />
          <Divider type="vertical" />
          <Statistic title="校验成功笔数（笔）" value={batchData?.count} />
          <Divider type="vertical" />
          <Statistic title="校验异常笔数（笔）" value={0} />
        </Card>
        <br />
        <h4>请确定打款信息无误，校验成功的{batchData?.count}笔将发起锁定，锁定后打款明细将不可修改</h4>
        <div>商户批次号：{batchData?.merchantPayBatchNo}</div>
        <div>平台批次号：{batchData?.payBatchNo}</div>
      </>
    confirm({
      width: 800,
      title: '确定锁定批次',
      content: content,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        axios.post(
					`${API_URL}/remit/paybatch/lockBatch`,
					{merchantNo,payBatchNo},
					{
						headers: {
							Device: '1',
							Authorization: localStorage.getItem('merchant_token'),
						}
					})
					.then(res => {
						const { data = {} } = res
						if (data.code == 90001) {
							message.success('正在锁定！')
							dispatch({
								type: 'batchPayment/fetchCurrentBatch'
							})
						} else {
								message.error(data.message)
						}
					})
      },
    });
  };

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
      onOk: async () => {
        await revoke({ merchantNo, payBatchNo })
        message.success('撤销锁定成功！')
        dispatch({
          type: 'batchPayment/fetchCurrentBatch'
        })
      },
    });
  };


  /**
   * 重新上传
   *
   * @memberof LockTable
   */
  reUpload = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'batchPayment/nextStep',
      payload: 0,
    });
    dispatch({ type: 'batchPayment/reUpload', payload: true });
  }

  /**
 * 编辑订单
 *
 * @author shixin.deng
 * @param {object} [row={}]
 */
  handleEdit = (row: LockTable) => {
    const { showModal, closeModal, toggleLoading } = this.context;
    // 弹窗确定事件，发起编辑请求
    const onOk = async (value: LockTableRow) => {
      const updateParams = {
        accountNo: value.accountNo,      // 收款账号
        mobile: value.mobile,            // 银行预留手机号码
        memo: value.memo,                // 打款备注
        id: row.id                      // 主键
      }
      toggleLoading(true)
      await updateTaxPayBatchDetail(updateParams)
      toggleLoading(false)
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
    { type: 'select',label: '代征主体',name: 'collectedSubjectNo',   },
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
    { title: '创建时间', dataIndex: 'gmtCreate' },
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
      title: '更多',
      key: "opt",
      render: (row: any) => <div>
        <a style={{ marginRight: 12 }} onClick={() => {this.handleHangUp(row) }}>挂起</a>
        <a onClick={() => { this.detailModal(row) }}>详情</a>
      </div>
    },
  ]

  /**
	 * 详情
	 */
	detailModal = async (row: any) => {
		const {data} = await payDetail(row.id)
		this.setState({
			modalData:data,
			modalshow:true,
			modalType: 1
		})
  }

  hideModal = () => {
		this.setState({
			modalshow: false
		})
  }

  render() {
    const { statistics = {}, showLockButton, payStatus } = this.props
    const { tableData, batchData,modalshow ,modalType,modalData,options} = this.state;
    const { loading } = this.context

    if (payStatus == '07' && this.columns[this.columns.length - 1].title == '操作') { this.columns.pop() }

    const tableHeader = () => (
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Typography style={{ flex: 1 }}>
          <Text>商户打款请求共{statistics.numbers}条，总金额 {statistics.amount}元</Text>
          <br />
          <Text>系统实际可打款共{statistics.canPayNumbers}条，总金额{statistics.canPayAmount}元；实际打款以平台实时计算为准</Text>
        </Typography>
        {showLockButton ? <Button style={{ marginRight: 12 }} onClick={this.reUpload}>重新上传</Button> : ''}
        <Button disabled={payStatus == '07'} type="primary" onClick={this.handleLock}>{payStatus == '07' ? '锁定中...' : '锁定批次'}</Button>
      </div>
    );

    const tableProps = {
      // tableHeader,
      tableData, // 表格数据
      loading, // 请求状态
      onRef: (e: any) => this.queryTable = e,
      bodyStyle: { padding: '24px 0' },
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      rowKey: 'id', // 表格行ID
      querys: this.querys, // 表格筛选条件配置
      options, // 表格筛选条件下拉枚举配置
    };

    const modalProps = {
			visible:modalshow,
			modalType,
			hideModal: this.hideModal,
			data:modalData
		}

    return <>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header="锁定批次规则说明" key="1" style={customPanelStyle}>
          <Typography>
            <Text>
            1.核对信息：请仔细核对打款订单信息。批次未锁定前，可修改和撤销打款订单，锁定后只能撤销批次无法修改订单；
            </Text>
            <br />
            <Text>
            2.锁定批次：批次锁定后，系统将校验打款订单的收款方身份、税务风险、打款限额，并试算应收税费和服务费，校验异常 的订单将被挂起；
            </Text>
            <br />
            <Text>
            3.撤销批次：批次撤销后，系统将撤销该批次打款，您可以重新操作批量打款。
            </Text>
          </Typography>
        </Panel>
      </Collapse>

      {/* <Card
        bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Statistic title="通过验证订单（笔/元）" value={112893} precision={2} prefix={'4 /'} />
        <Divider type="vertical" />
        <Statistic title="失败订单（笔/元）" value={0} precision={2} prefix={'0 /'} />
        <Divider type="vertical" />
        <Statistic title="风险订单(笔/元)" value={0} precision={2} prefix={'0 /'} />
        <Divider type="vertical" />
        <Statistic title="服务费(元)" value={500} precision={2} />
      </Card> */}


      <Descriptions title="打款批次" bordered style={{ marginTop: 20, marginBottom: 30 }}>
        <Descriptions.Item label="商户名称" span={2}>{batchData?.merchantName}</Descriptions.Item>
        <Descriptions.Item label="代征主体">{batchData?.collectedSubjectName}</Descriptions.Item>

        <Descriptions.Item label="打款通道" span={2}>{batchData?.payChannelCodeName}</Descriptions.Item>
        <Descriptions.Item label="打款账户名">{batchData?.payChannelCodeName}</Descriptions.Item>

        <Descriptions.Item label="商户批次号" span={2}>{batchData?.merchantPayBatchNo}</Descriptions.Item>
        <Descriptions.Item label="平台批次号">{batchData?.payBatchNo}</Descriptions.Item>

        <Descriptions.Item label="提交方式" span={2}>{submitWay[batchData?.submitMode]}</Descriptions.Item>
        <Descriptions.Item label="批次状态">{batchData?.payStatusDesc}</Descriptions.Item>

        <Descriptions.Item label="总笔数（笔）" span={2}>{batchData?.count}</Descriptions.Item>
        <Descriptions.Item label="总金额(元)">{batchData?.totalAmount}</Descriptions.Item>

        <Descriptions.Item label="状态描述">{batchData?.statusDesc}</Descriptions.Item>

      </Descriptions>
      <Button style={{marginRight:10}} type="primary" onClick={this.handleLock}>锁定批次</Button>
      <Button onClick={this.rescindBatch}>撤销批次</Button>
      <Divider />
      <h3 style={{marginTop: 20}}>打款明细</h3>
      <QueryTable {...tableProps} />
      <ModalBox {...modalProps}></ModalBox>
    </>;
  }
}

export default connect(({ global, settings, batchPayment }: ModalConnectState) => ({
  batchPayment
}))(Form.create<LockTableProps>()(LockTable));