import React from 'react';
import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, message, Upload, Input, Radio, Select, Collapse, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import QueryTable from '@/components/QueryTable';
import { GlobalContext } from '@/components/GlobalContext';
import { FormComponentProps } from '@ant-design/compatible/es/form';

import router from 'umi/router';
import moment from 'moment';

import * as Utils from '@/utils/utils'

import { invoiceStatus, InvoiceStatus, invoiceType } from "./enums"

// api
import { uploadAttachment } from '@/components/api/supervisor/atachment'
import { pageInvoiceInfo, refundInvoiceApply, cancelApply, cancelRefundApply } from '@/components/api/remit/invoiceInfo'
import { queryAllAvailable } from '@/components/api/remit/collectedsubject'

const { Panel } = Collapse;
const { Text } = Typography;
const FormItem = Form.Item;

interface AuditModalProps extends FormComponentProps {
  loading?: boolean;
  onOk: (value: {}) => void;
  onCancel?: () => void;
  handlePreview: (file: any) => void;
  handleRemove: (stateName: string) => void;
  handleUpload: (options: {}, stateName: string) => void;
  visible?: boolean;
  title: string;
  data?: object;
  mountedData?: {};
}

interface ApplyRefundProps extends FormComponentProps {
  loading?: boolean;
  onOk: (value: {}) => void;
  onCancel?: () => void;
  visible?: boolean;
  title: string;
  data?: object;
  mountedData?: {};
}

interface RefundAuditProps extends FormComponentProps {
  loading?: boolean;
  onOk: (value: {}) => void;
  onCancel?: () => void;
  visible?: boolean;
  title: string;
  data?: object;
  mountedData?: {};
}

const AuditModal = Form.create<AuditModalProps>()((props: AuditModalProps) => {
  const { form, mountedData, loading, onOk, onCancel, handlePreview, handleRemove, handleUpload, visible, title, data = {} } = props;
  const { getFieldDecorator, validateFields } = form;


  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const customPanelStyle = {
    destroyOnClose: true,
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );

  const okHandler = () => {
    form.validateFields(async (err, value) => {
      if (!err) {
        value['invoiceUrl'] = mountedData ? mountedData['invoiceUrl'] : ''
        onOk(value)
      }
    })
  }

  const modalProps = {
    onOk: okHandler, onCancel, visible, title
  }

  return (
    <Modal {...modalProps} width={600}>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header="开票核销注意事项" key="1" style={customPanelStyle}>
          <Typography>
            <Text>1.请务必仔细核对商户发票申请信息，确认无误。</Text>
            <br />
            <Text>2.请确保发票已成功开具，并已寄出发票或者已预约快递公司。</Text>
            <br />
            <Text>3.开票核销后不可退回，除非收到商户寄回发票。</Text>
          </Typography>
        </Panel>
      </Collapse>

      <Form {...formItemLayout}>
        <FormItem label="申请单号">
          {getFieldDecorator('applyNo', {
            initialValue: data['applyNo'],
            rules: [{ required: true, message: '申请单号！' }]
          })(<Input readOnly />)}
        </FormItem>
        <FormItem label="核销结论">
          {getFieldDecorator("verifyResult",
            { rules: [{ required: true, message: '请选择核销结论！' }] },
          )(
            <Radio.Group>
              <Radio value={3}>已开票</Radio>
              <Radio value={7}>开票驳回</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="物流公司">
          {getFieldDecorator('logisticsCompany')(<Input />)}
        </FormItem>
        <FormItem label="快递单号">
          {getFieldDecorator('fastMailNo')(<Input />)}
        </FormItem>
        <FormItem label="核销备注">
          {getFieldDecorator('verifyRemark')(<Input.TextArea rows={3} placeholder="最多400字符" />)}
        </FormItem>
        <FormItem label="发票影像件" extra="支持jpg, jpeg, png, bmp格式文件，不超过1MB，最多上传一张">
          {getFieldDecorator("invoiceUrl", {
            valuePropName: 'fileList',
            getValueFromEvent: (e: any) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            },
          })(<Upload
            accept="image/*"
            customRequest={(options) => handleUpload(options, 'invoiceUrl')}
            onRemove={() => handleRemove('invoiceUrl')}
            listType="picture-card"
            onPreview={handlePreview}
          >
            {mountedData ? mountedData['invoiceUrl'] ? null : uploadButton : uploadButton}
          </Upload>)}
        </FormItem>
      </Form>
    </Modal>
  );
})

const ApplyRefund = Form.create<ApplyRefundProps>()((props: ApplyRefundProps) => {
  const { form, onOk, onCancel, visible, title } = props;
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const customPanelStyle = {
    destroyOnClose: true,
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };


  const okHandler = () => {
    form.validateFields(async (err, value) => {
      if (!err) {
        onOk(value)
      }
    })
  }

  const modalProps = {
    onOk: okHandler, onCancel, visible, title
  }

  return (
    <Modal {...modalProps} width={600}>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header="请按照提示地址进行邮寄，否则可能会影响退票进度" key="1" style={customPanelStyle}>
          <Typography>
            <Text>邮寄地址：海南省海口市龙华区玉沙路国贸中心18E</Text>
            <br />
            <Text>收件人：邱晓玲</Text>
            <br />
            <Text>收件电话：18664777955</Text>
          </Typography>
        </Panel>
      </Collapse>

      <Form {...formItemLayout}>
        <FormItem label="退票类型">
          {getFieldDecorator('refundType',
            { rules: [{ required: true, message: '请选择退票类型！' }] })
            (<Select>
              <Select.Option key="1">发票信息错误</Select.Option>
              <Select.Option key="2">发票类型错误</Select.Option>
              <Select.Option key="3">退款</Select.Option>
            </Select>)
          }
        </FormItem>
        <FormItem label="退票原因">
          {getFieldDecorator('refundReason',
            { rules: [{ required: true, message: '请填写退票原因！' }] })
            (<Input.TextArea rows={3} placeholder="最多400字符" />)
          }
        </FormItem>
        <FormItem label="发票邮寄物流公司">
          {getFieldDecorator('refundLogisticsCompany')(<Input />)}
        </FormItem>
        <FormItem label="运单号">
          {getFieldDecorator('refundFastMailNo')(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
})

const RefundAuditModal = Form.create<RefundAuditProps>()((props: RefundAuditProps) => {
  const { form, onOk, onCancel, visible, title, data = {} } = props;
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const customPanelStyle = {
    destroyOnClose: true,
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };

  const okHandler = () => {
    form.validateFields(async (err, value) => {
      if (!err) {
        onOk(value)
      }
    })
  }

  const modalProps = {
    onOk: okHandler, onCancel, visible, title
  }

  return (
    <Modal {...modalProps} width={600}>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header="开票核销注意事项" key="1" style={customPanelStyle}>
          <Typography>
            <Text>1.请务必仔细核对商户发票申请信息，确认无误。</Text>
            <br />
            <Text>2.请确保发票已成功开具，并已寄出发票或者已预约快递公司。</Text>
            <br />
            <Text>3.开票核销后不可退回，除非收到商户寄回发票。</Text>
          </Typography>
        </Panel>
      </Collapse>

      <Form {...formItemLayout}>
        <FormItem label="申请单号">
          {getFieldDecorator('applyNo', {
            initialValue: data['applyNo'],
            rules: [{ required: true, message: '申请单号！' }]
          })(<Input readOnly />)}
        </FormItem>
        <FormItem label="退票类型">
          {getFieldDecorator('refundType',
            {
              initialValue: data['refundType'],
              rules: [{ required: true, message: '请选择退票类型！' }]
            })
            (<Select disabled>
              <Select.Option key="1">发票信息错误</Select.Option>
              <Select.Option key="2">发票类型错误</Select.Option>
              <Select.Option key="3">退款</Select.Option>
            </Select>)
          }
        </FormItem>
        <FormItem label="退票原因">
          {getFieldDecorator('refundReason',
            {
              initialValue: data['refundReason'],
              rules: [{ required: true, message: '请填写退票原因！' }]
            })
            (<Input.TextArea readOnly rows={3} placeholder="最多400字符" />)
          }
        </FormItem>
        <FormItem label="发票邮寄物流公司">
          {getFieldDecorator('refundLogisticsCompany', {
            initialValue: data['refundLogisticsCompany'],
          })(<Input readOnly />)}
        </FormItem>
        <FormItem label="运单号">
          {getFieldDecorator('refundFastMailNo', {
            initialValue: data['refundFastMailNo'],
          })(<Input readOnly />)}
        </FormItem>
        <FormItem label="核销结论">
          {getFieldDecorator("refundVerifyResult",
            { rules: [{ required: true, message: '请选择核销结论！' }] },
          )(
            <Radio.Group>
              <Radio value={5}>发票作废</Radio>
              <Radio value={3}>退票驳回</Radio>
            </Radio.Group>
          )}
        </FormItem>

        <FormItem label="核销备注">
          {getFieldDecorator('refundVerifyRemark')(<Input.TextArea rows={3} placeholder="最多400字符" />)}
        </FormItem>
      </Form>
    </Modal>
  );
})

class List extends React.Component<FormComponentProps> {
  static contextType = GlobalContext;

  state = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 0 } },
    tableLoading: false, //表格loading
    options: {},
    previewModalVisible: false,
    file: {},
    invoiceUrl: ''
  };

  querys = [
    {
      type: "rangedatepicker", label: "申请时间", name: "createTime", attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: "text", label: "申请单号", name: "applyNo" },
    { type: "select", label: "发票类型", name: "invoiceType" },
    { type: "select", label: "发票状态", name: "invoiceStatus" },
    { type: "select", label: "代征主体", name: "collectedSubjectNo" },
  ]

  columns = [
    { title: "申请单号", dataIndex: "applyNo" },
    { title: "商户名称", dataIndex: "merchantName", },
    { title: "代征主体", dataIndex: "collectedSubjectName", },
    { title: "开票模式", dataIndex: "invoiceModeName", },
    { title: "发票类型", dataIndex: "invoiceType", render: (val: string) => invoiceType[val] },
    { title: "开票内容", dataIndex: "invoiceContent", },
    { title: "发票总额", dataIndex: "invoiceAmount" },
    { title: "数量", dataIndex: "invoiceQuantity", },
    { title: "申请时间", dataIndex: "applyTime", },
    { title: "发票状态", dataIndex: "statusDesc", },
    {
      title: "操作", fixed: 'right', key: "opt", render: (row: {}) => {
        const { invoiceStatus } = row
        return <div>
          <a style={{ marginRight: 10 }} onClick={() => { this.jump2Detail(row) }}>详情</a>
          {invoiceStatus == InvoiceStatus.INVOICING ? <a style={{ marginRight: 10 }} onClick={() => { this.handleCancel(row) }}>开票撤销</a> : ''}
          {invoiceStatus == InvoiceStatus.REFUNDING ? <a style={{ marginRight: 10 }} onClick={() => { this.handleCancel(row) }}>退票撤销</a> : ''}
          {invoiceStatus == InvoiceStatus.INVOICED ? <a style={{ marginRight: 10 }} onClick={() => { this.applyRefund(row) }}>退票</a> : ''}
        </div>
      }
    },
  ]

  queryTable: any

  render() {
    const { tableData, tableLoading, options = {}, file = {}, previewModalVisible } = this.state
    const tableProps = {
      tableData, // 表格数据
      options,
      loading: tableLoading,
      onRef: (e: any) => this.queryTable = e,
      rowSelectType: null,
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      onLoad: this.loadData, // 加载表格数据函数
      rowKey: 'id', // 表格行ID
    };

    return (
      <PageHeaderWrapper>
        <QueryTable {...tableProps} />

        <Modal title="图片预览" visible={previewModalVisible} footer={null} onCancel={() => { this.setState({ file: {}, previewModalVisible: false }) }}>
          <img alt="example" style={{ width: '100%' }} src={file['url'] || file['preview']} />
        </Modal>
      </PageHeaderWrapper>
    )
  }

  async componentDidMount() {
    const { data: subjects = [] } = await queryAllAvailable()

    this.setState((prevState) => {
      return {
        options: {
          ...prevState['options'],
          invoiceStatus: [
            { code: '', desc: "全部" },
            ...Object.keys(invoiceStatus).map(key => {
              return { code: key, desc: invoiceStatus[key] }
            })
          ],
          invoiceType: [
            { code: '', desc: "全部" },
            ...Object.keys(invoiceType).map(key => {
              return { code: key, desc: invoiceType[key] }
            })
          ],
          collectedSubjectNo: [
            { code: '', desc: "全部" },
            ...subjects.map((s: {}) => { return { code: s['collectedSubjectNo'], desc: s['collectedSubjectName'] } })
          ]
        }
      }
    })
  }

  /**
   * 分页查询表格数据
   *
   */
  loadData = async (options: any = {}) => {
    // 拼装请求参数
    const cloneOptions = { ...options } as any;
    // 格式化时间段

    if (options.createTime && options.createTime.length) {
      cloneOptions.applyTimeStart = moment(options.createTime[0]).startOf('day').format('YYYY/MM/DD');
      cloneOptions.applyTimeEnd = moment(options.createTime[1]).endOf('day').format('YYYY/MM/DD');
    }
    delete cloneOptions.page
    delete cloneOptions.pageSize
    delete cloneOptions.createTime

    const params = {
      ...cloneOptions,
      curPage: options.page,
      pageSize: options.pageSize
    }

    this.setState({ tableLoading: true });
    try {
      const { data: { list = [], recordCount } } = await pageInvoiceInfo(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
        tableLoading: false
      });
    } catch (error) {
      this.setState({ tableLoading: false });
    }
  }

  jump2Detail = (row = {}) => {
    router.push({
      pathname: 'detail',
      query: {
        applyNo: row['applyNo'],
        invoiceMode:row['invoiceMode']
      }
    })
  }

  // 开票/退票撤销
  handleCancel = (row = {}) => {
    const { invoiceStatus } = row
    if (invoiceStatus == InvoiceStatus.INVOICING) {
      Modal.confirm({
        title: '确认提示',
        content: `确定撤销该笔开票申请（申请单号：${row['applyNo']}）吗？撤销后不可撤回。发票撤销后可以在待开票页面中重新申请`,
        okText: '确认',
        onOk: async () => {
          await cancelApply(row['applyNo'])
          message.success('操作成功！')
          this.queryTable.reload()
        },
        cancelText: '取消',
      })
    }
    if (invoiceStatus == InvoiceStatus.REFUNDING) {
      Modal.confirm({
        title: '确认提示',
        content: `确定撤销该笔退票申请（申请单号：${row['applyNo']}）吗？撤销后不可撤回。退票撤销后可以在发票列表页面中重新申请`,
        okText: '确认',
        onOk: async () => {
          await cancelRefundApply(row['applyNo'])
          message.success('操作成功！')
          this.queryTable.reload()
        },
        cancelText: '取消',
      })
    }
  }

  // 开票核销
  handleAudit = (row = {}) => {
    const { showModal, closeModal } = this.context;
    showModal((props: {}) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '开票核销',
        data: row,
        mountedData: props['mountedData'],
        handlePreview: this.handlePreview,
        handleRemove: this.handleRemove,
        handleUpload: this.handleUpload,
        onOk: async (value: {}) => {
          await invoicingVerify(value)
          message.success('操作成功！')
          closeModal()
          this.queryTable.reload()
        },
        onCancel: () => closeModal(), // 取消事件
      };

      return <AuditModal {...modalProps} />
    })
  }

  // 申请退票
  applyRefund = (row = {}) => {
    const { showModal, closeModal } = this.context;

    showModal((props: {}) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '退票申请',
        onOk: async (value: {}) => {
          const params = {
            ...value,
            applyNo: row['applyNo']
          }
          await refundInvoiceApply(params)
          message.success('操作成功！')
          closeModal()
          this.queryTable.reload()
        },
        onCancel: () => closeModal(), // 取消事件
      };

      return <ApplyRefund {...modalProps} />
    })
  }

  // 退票核销
  handleRefundAudit = (row = {}) => {
    const { showModal, closeModal } = this.context;

    showModal((props: {}) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '退票核销',
        data: row,
        onOk: async (value: {}) => {
          await refundVerify(value)
          message.success('操作成功！')
          closeModal()
          this.queryTable.reload()
        },
        onCancel: () => closeModal(), // 取消事件
      };

      return <RefundAuditModal {...modalProps} />
    })
  }

  /**
  * 上传图片
  */
  handleUpload = async (options: any, stateName: string) => {
    const { file, onSuccess, onError } = options
    const formData = new FormData()
    formData.append('file', file)

    try {
      const { mountAsyncData } = this.context;
      const { data } = await uploadAttachment(undefined, undefined, { data: formData })
      mountAsyncData({ invoiceUrl: data })
      this.setState({ [stateName]: data })

      onSuccess('ok')
    } catch (e) {
      onError(e)
    }
  }

  /**
   * 图片预览
   *
   */
  handlePreview = async (file: any) => {
    // const { showModal, closeModal } = this.context;

    if (!file.url && !file.preview) {
      file.preview = await Utils.getBase64(file.originFileObj);
    }

    this.setState({ file, previewModalVisible: true })
    // showModal((props: {}) => {
    //   const modalProps = {
    //     ...props, // 挂载到context的公共参数，visible，loading
    //     title: '图片预览',
    //     footer: null,
    //     onCancel: () => closeModal(), // 取消事件
    //   };

    //   return <Modal {...modalProps}>
    //     <img alt="example" style={{ width: '100%' }} src={file.url || file.preview} />
    //   </Modal>
    // })
  };

  /**
   * 删除照片重置链接
   */
  handleRemove = (stateName: string) => {
    const { mountAsyncData } = this.context;

    this.setState({ [stateName]: '' })
    mountAsyncData({ invoiceUrl: '' })
  }
}

export default Form.create<FormComponentProps>()(List);