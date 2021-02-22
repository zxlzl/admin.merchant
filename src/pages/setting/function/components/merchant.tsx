import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Select,
  Modal,
  message,
  Radio,
  InputNumber,
  Table,
  Popover,
  List,
  Divider,
  Space,
  Typography,
  Descriptions,
} from 'antd';
import React, { Component } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

import { GlobalContext } from '@/components/GlobalContext';
import { getDropDownList, getOne } from '@/components/api/remit/discountPackageData';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { BaseData, MerchantRuleData, MerchantExtendData } from '../data';

const FormItem = Form.Item;
const { Option } = Select;
const { Title, Text } = Typography;

import {
  add,
  queryByMerchantNo as queryFeeRule,
  delById,
} from '@/components/api/remit/merchanttaxrule';
import { queryAll } from '@/components/api/remit/rebatepackage';
import { add as addExtend } from '@/components/api/supervisor/merchantextend';
import { querySelectOptions } from '@/components/api/selectOption';
import {queryEnumsListByType} from '@/components/api/common/enums'

interface MerchantProps extends FormComponentProps {
  merchantNo?: string;
  baseData?: BaseData;
  merchantExtend?: MerchantExtendData;
  merchantId?: string;
  setParentState: (commonState: {}) => void;
}

interface AddFeeModalProps extends FormComponentProps {
  loading: boolean;
  onOk: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
}

const AddFeeModal = Form.create<AddFeeModalProps>()((props: AddFeeModalProps) => {
  const { form, loading, onOk, onCancel, visible, title } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const okHandle = () => {
    validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          vatRate: (parseFloat(values.vatRate) / 100).toFixed(4),
          taxRate: (parseFloat(values.taxRate) / 100).toFixed(4),
          discountRate: (parseFloat(values.discountRate) / 100).toFixed(4),
        };
        onOk(params);
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
    title,
    visible,
    onCancel,
    width: 600,
    onOk: okHandle,
    destroyOnClose: true,
    okButtonProps: { loading },
  };

  return (
    <Modal {...modalProps}>
      <Form {...formItemLayout}>
        <FormItem label="增值税">
          {getFieldDecorator('vatRate', {
            rules: [{ required: true, message: '请填写增值税！' }],
          })(
            <InputNumber
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => (value ? value.replace('%', '') : '')}
            />,
          )}
        </FormItem>
        <FormItem label="打款金额下限">
          {getFieldDecorator('minAmt', {
            rules: [{ required: true, message: '请填写打款金额下限！' }],
          })(<InputNumber min={0} />)}
        </FormItem>
        <FormItem label="打款金额上限">
          {getFieldDecorator('maxAmt', {
            rules: [{ required: true, message: '请填写打款金额上限！' }],
          })(<InputNumber min={getFieldValue('minAmt')} />)}
        </FormItem>
        <FormItem label="个税税率">
          {getFieldDecorator('taxRate', {
            rules: [{ required: true, message: '请填写个税税率！' }],
          })(
            <InputNumber
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => (value ? value.replace('%', '') : '')}
            />,
          )}
        </FormItem>
        <FormItem label="优惠减免">
          {getFieldDecorator('discountRate', {
            rules: [{ required: true, message: '请填写优惠减免！' }],
          })(
            <InputNumber
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => (value ? value.replace('%', '') : '')}
            />,
          )}
        </FormItem>
      </Form>
    </Modal>
  );
});

class Merchant extends Component<MerchantProps> {
  view: HTMLDivElement | undefined = undefined;
  static contextType = GlobalContext;
  state = { feeRules: [], rebatePackage: [], querys: {}, visible: false, discountDetail: {},invoiceEnum:[],billTypeEnum:[] };

  async componentDidMount() {
    this.setMerchantData();
    this.fetchFeeRules();
    this.fetchQuerys();
    this.fetchRebate();
    this.fetchInvoiceAndBillType()
  }

  async fetchRebate() {
    const { data = [] } = await getDropDownList();
    this.setState({ rebatePackage: data });
  }

  async fetchInvoiceAndBillType() {
    const [invoiceEnum, billTypeEnum] = await Promise.all([queryEnumsListByType('invoiceMode'),  queryEnumsListByType('billType')]);
    this.setState({
      invoiceEnum:invoiceEnum.data,
      billTypeEnum:billTypeEnum.data
    })
  }

  async fetchFeeRules() {
    const { data = [] } = await queryFeeRule(this.props.merchantNo);
    this.setState({ feeRules: data });
  }

  componentDidUpdate(prevProps: MerchantProps) {
    if (this.props.merchantExtend !== prevProps.merchantExtend) {
      this.setMerchantData();
    }
  }

  fetchQuerys = async () => {
    const { data = {} } = await querySelectOptions();
    this.setState({ querys: data });
  };

  setMerchantData = () => {
    const { merchantExtend, form } = this.props;

    function strip(num: number, precision = 12) {
      return +parseFloat(num.toPrecision(precision));
    }

    if (merchantExtend) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = merchantExtend[key] || null;
        if (key === 'feeRate') {
          obj[key] = strip((merchantExtend[key] || 0) * 100, 12);
        }
        if (key === 'rebatePackageId') {
          obj[key] = merchantExtend[key]
        }
        form.setFieldsValue(obj);
      });
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  addTaxFee = () => {
    const { showModal, closeModal } = this.context;
    showModal((props: any) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '设置合作税费',
        onOk: async (params: any) => {
          params['merchantNo'] = this.props.merchantNo;
          await add(params);
          message.success('保存成功！');
          this.fetchFeeRules();
          closeModal();
        }, // 确定事件
        onCancel: () => closeModal(), // 取消事件
      };

      return <AddFeeModal {...modalProps} />;
    });
  };

  deleteTaxFee = async (row: any) => {
    const { id } = row;
    await delById(id);
    message.success('操作成功！');
    this.fetchFeeRules();
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { form, merchantNo, setParentState, merchantExtend } = this.props;
    form.validateFields(async (err, value) => {
      if (!err) {
        const params = {
          ...value,
          merchantNo,
          feeRate: (parseFloat(value['feeRate']) / 100).toFixed(4),
        };
        const { data } = await addExtend(params);
        message.success('保存成功！');
        setParentState({ merchantExtend: params });
      }
    });
  };

  serviceFeeDes = [
    '•商户服务费：是指商户承担的费用。',
    '•用户服务费：是指用户承担的费用。',
    '•用户实收金额=商户打款金额-用户实付服务费（备注：商户打款金额是指商户发起的金额）',
    '•商户实付服务费=商户应付服务费-商户已抵扣服务费',
    '•商户应付服务费=商户打款金额*商户服务费率',
    '•商户服务费差额=第1档金额*差额费率=第1档金额*（第2档费率-第1档费率）（备注：判断累计用户实收超过限额，则计算差额）',
    '•用户服务费差额=第1档金额*差额费率=第1档金额*（第2档费率-第1档费率）（备注：判断累计用户实收超过限额，则计算差额）',
    '•商户已抵扣服务费==min{商户抵扣账户余额，商户应付服务费}',
    '•用户实付服务费=商户打款金额*用户服务费率',
  ];

  discountColumn = [
    { title: '层级', dataIndex: 'level' },
    {
      title: '商户单月流水(元)',
      key: 'liushui',
      render: row => `${row['minAmt']}~${row['maxAmt']}`,
    },
    {
      title: '优惠费率',
      dataIndex: 'discountFeeRate',
      render: val => `${(val * 100).toPrecision(3)}%`,
    },
    {
      title: '计算出的返点费率',
      dataIndex: 'rebateRate',
      render: val => `${(val * 100).toPrecision(3)}%`,
    },
  ];

  showDetail = async id => {
    const { data: discountDetail = {} } = await getOne(id);
    this.setState({
      discountDetail,
    });

    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      merchantExtend = {},
    } = this.props;
    const { rebatePackageId } = merchantExtend;
    const { rebatePackage, querys, visible, discountDetail,invoiceEnum ,billTypeEnum} = this.state;
    const { list = [] } = discountDetail || {};
    const {
      remitMode: remitModeEnum = {},
      signUpAuditMode: signUpAuditModeEnum = {},
      signUpConclusion: signUpConclusionEnum = {},
      signUpMode: signUpModeEnum = {},
    } = querys;
    
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    }

    const text = (
      <List
        size="small"
        header={<div>服务费说明</div>}
        dataSource={this.serviceFeeDes}
        renderItem={item => <List.Item>{item}</List.Item>}
      ></List>
    );

    const feeRuleLabel = (
      <span>
        服务费费率{' '}
        <Popover color="#fff" placement="bottom" content={text}>
          <InfoCircleOutlined />
        </Popover>
      </span>
    );

    const discountTableProps = {
      bordered: true,
      pagination: false,
      columns: this.discountColumn,
      dataSource: list,
    };
    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <Form {...formItemLayout}>
          <FormItem label={feeRuleLabel}>
            {getFieldDecorator('feeRule', { rules: [{ required: true }] })(
              <div>
                {/* <Button onClick={this.addTaxFee}>新增</Button> */}
                <Table
                  rowKey="id"
                  size="small"
                  bordered={true}
                  dataSource={this.state.feeRules}
                  pagination={false}
                  columns={[
                    {
                      title: '单月不含税收入(用户实收)',
                      key: 'range',
                      width: 190,
                      render: row => `${row['minAmt']}~${row['maxAmt']}`,
                    },
                    {
                      title: '商户服务费(外扣)',
                      dataIndex: 'merchantFeeRate',
                      render: val => `${(val * 100).toPrecision(6)}%`,
                    },
                    {
                      title: '用户服务费(内扣)',
                      dataIndex: 'userFeeRate',
                      render: val => `${(val * 100).toPrecision(6)}%`,
                    },
                    { title: '计费方式', dataIndex: 'calculateModeName' },
                    // {
                    //   title: "操作", key: "opt", width: 80,
                    //   render: row => <>
                    //     <a onClick={() => this.deleteTaxFee(row)}>删除</a>
                    //   </>
                    // },
                  ]}
                />
              </div>,
            )}
          </FormItem>

          {rebatePackageId !== undefined && (
            <FormItem
              label="优惠套餐"
              extra={<a onClick={() => this.showDetail(rebatePackageId)}>查看套餐详情</a>}
            >
              {getFieldDecorator('rebatePackageId', {
                rules: [{ required: true, message: '请选择合作阶梯套餐！' }],
              })(
                <Select disabled>
                  {rebatePackage.map((p: any) => {
                    return (
                      <Option key={p.id} value={(p.id)}>
                        {p.packageName}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </FormItem>
          )}
          {/* <FormItem label="合作服务费">
            {getFieldDecorator('feeRate', {
              rules: [{ required: true, message: '请填写合作服务费！' }],
            })(
              <InputNumber
                readOnly
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => (value ? value.replace('%', '') : '')}
              />,
            )}
          </FormItem> */}
          <FormItem label="扣费模式">
            {getFieldDecorator('deductFeesMode', {
              rules: [{ required: true, message: '请选择扣费模式！' }],
            })(
              <Radio.Group disabled>
                <Radio value={1}>实时扣费</Radio>
                <Radio value={2}>预付费</Radio>
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem label="开票模式">
            {getFieldDecorator('invoiceMode', {
              rules: [{ required: true, message: '请选择开票模式！' }],
            })(
              <Radio.Group disabled>
                {invoiceEnum.map(item => {
                  return (
                    <Radio key={item.code} value={item.code}>
                      {item.name}
                    </Radio>
                  );
                })}
              </Radio.Group>,
            )}
          </FormItem>
          {merchantExtend?.invoiceMode==1 && ( <FormItem label="账单类型">
            {getFieldDecorator('billType', {
              rules: [{ required: true, message: '请选择账单类型！' }],
            })(
              <Radio.Group disabled>
                {billTypeEnum.map(item => {
                  return (
                    <Radio key={item.code} value={item.code}>
                      {item.name}
                    </Radio>
                  );
                })}
              </Radio.Group>,
            )}
          </FormItem>)}
          <FormItem label="纳税模式">
            {getFieldDecorator('payTaxMode', {
              rules: [{ required: true, message: '请选择缴税模式！' }],
            })(
              <Radio.Group disabled>
                {/* <Radio value={1}>手动申请缴税【暂无】(需在商户平台自行申请缴税)</Radio> */}
                <Radio value={2}>自动按月缴税</Radio>
              </Radio.Group>,
            )}
          </FormItem>

          <FormItem label="结算模式">
            {getFieldDecorator('settleMode', {
              rules: [{ required: true, message: '请选择结算模式！' }],
            })(
              <Radio.Group disabled>
                <Radio value={1}>手动结算</Radio>
                <Radio value={2}>自动结算</Radio>
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem label="误差调整模式">
            {getFieldDecorator('adjustMode', {
              rules: [{ required: true, message: '请选择打款试算误差调整！' }],
            })(
              <Radio.Group disabled>
                <Radio value={1}>手动调整</Radio>
                <Radio value={2}>自动调整</Radio>
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem label="报名审核方式">
            {getFieldDecorator('signUpMode', {
              rules: [{ required: true }],
            })(
              <Radio.Group disabled>
                {Object.keys(signUpModeEnum).map(item => (
                  <Radio key={item} value={Number(item)}>
                    {signUpModeEnum[item]}
                  </Radio>
                ))}
              </Radio.Group>,
            )}
          </FormItem>
          {merchantExtend?.signUpConclusion && (
            <FormItem label="报名审核结论">
              {getFieldDecorator('signUpConclusion', {
                rules: [{ required: true }],
              })(
                <Radio.Group disabled>
                  {Object.keys(signUpConclusionEnum).map(item => (
                    <Radio key={item} value={Number(item)}>
                      {signUpConclusionEnum[item]}
                    </Radio>
                  ))}
                </Radio.Group>,
              )}
            </FormItem>
          )}
          <FormItem label="报名验收方式">
            {getFieldDecorator('signUpAuditMode', {
              rules: [{ required: true }],
            })(
              <Radio.Group disabled>
                {Object.keys(signUpAuditModeEnum).map(item => (
                  <Radio key={item} value={Number(item)}>
                    {signUpAuditModeEnum[item]}
                  </Radio>
                ))}
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem label="打款审核方式">
            {getFieldDecorator('remitMode', {
              rules: [{ required: true }],
            })(
              <Radio.Group disabled>
                {Object.keys(remitModeEnum).map(item => (
                  <Radio key={item} value={Number(item)}>
                    {remitModeEnum[item]}
                  </Radio>
                ))}
              </Radio.Group>,
            )}
          </FormItem>

          <Modal
            title="商户优惠套餐详情"
            visible={visible}
            onOk={this.closeModal}
            onCancel={this.closeModal}
            width={600}
          >
            <Descriptions column={2} title="优惠套餐信息">
              <Descriptions.Item label="套餐编号">
                {discountDetail.packageNo ?? '--'}
              </Descriptions.Item>
              <Descriptions.Item label="套餐名称">
                {discountDetail.packageName ?? '--'}
              </Descriptions.Item>
              <Descriptions.Item label="套餐类型">
                {discountDetail.packageTypeName ?? '--'}
              </Descriptions.Item>
              <Descriptions.Item label="套餐状态">
                {discountDetail.packageStatusName ?? '--'}
              </Descriptions.Item>
              <Descriptions.Item label="生效时间">
                {discountDetail.effectDate ?? '--'}
              </Descriptions.Item>
                <Descriptions.Item label="到期时间">{discountDetail?.failureDate}(到期有效，自动续约)</Descriptions.Item>
            </Descriptions>
            <h3 style={{ marginTop: '10px', marginBottom: '20px' }}>优惠套餐明细</h3>
            <Table {...discountTableProps}></Table>

            <Space direction="vertical" style={{ marginTop: '30px' }}>
              <Title level={5} type="secondary">
                说明
              </Title>
              <Text type="secondary">
                1.优惠阶梯套餐：按商户上个自然月打款流水情况，判断所属优惠费率，计算返点金额，返点可用于下次打款时抵扣商户服务费；
              </Text>
              <Text type="secondary">
                2.商户单月流水：是指商户上个自然月商户累计发起的打款金额，即Σ(商户打款金额)；
              </Text>
              <Text type="secondary">3.优惠费率：是指双方业务合同中约定的优惠费率；</Text>
              <Text type="secondary">
                4.计算出的返点费率：返点费率=限额内商户服务费率-优惠费率，限额内商户服务费率，是指0～99000档次配的商户服务费。若返点费率为负数，计为0
              </Text>
              <Text type="secondary">
                5.返点金额：商户上月流水*应返点费率，应返点费率为商户上月流水归属层级所判定的返点费率
              </Text>
              <Text type="secondary">
                6.返点时间：自然月第1天返点，其中系统会撤销任何状态打款订单，然后计算返点；
              </Text>
              <Text type="secondary">
                7.抵扣逻辑：打款时优先使用可用返点金额来抵扣商户服务费，不可抵扣用户费。
              </Text>
            </Space>
          </Modal>

          {/* <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </FormItem> */}
        </Form>
      </div>
    );
  }
}

export default Form.create<MerchantProps>()(Merchant);
