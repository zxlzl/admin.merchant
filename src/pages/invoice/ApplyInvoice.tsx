import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, message, Radio, Card, Alert } from 'antd';
import React, { Component } from 'react';
import { GlobalContext } from '@/components/GlobalContext';
import router from 'umi/router';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import getQuery from '@/utils/query';

import { invoicingApply, confirmInvoicing } from '@/components/api/remit/billingInfo';
import { queryBankList } from '@/components/api/remit/bankInfo';
import {queryPrepaidInvoicingInfo } from '@/components/api/remit/merchantInvoicingInfo';

interface ApplyInvoiceProps extends FormComponentProps {}

const FormItem = Form.Item;
const { Option } = Select;

class ApplyInvoice extends Component<ApplyInvoiceProps> {
  static contextType = GlobalContext;
  view: HTMLDivElement | undefined = undefined;
  state = {
    billNoJson: '',
    billDetail: {},
    isEditReceiverArea: false,
    bankList: [],
    otherQualificateCert: '',
    taxRegistCert: '',
    receiverArea: [],
    amount: '', // 预充开票金额
  };

  async componentDidMount() {
    const billNoJson = getQuery('billNoJson') || getQuery('billNoJson', location.hash) || '';
    const amount = getQuery('amount') || getQuery('amount', location.hash) || ''; //预充开票
    const { data = [] } = await queryBankList();
    let billDetail = {};
    if (amount) {
      const { data = {} } = await queryPrepaidInvoicingInfo();
      billDetail = data;
    } else {
      const { data = {} } = await invoicingApply(billNoJson);
      billDetail = data;
    }
    this.setInvoiceData(billDetail);
    this.setState({ bankList: data, billNoJson, billDetail, amount });
  }

  setInvoiceData = (invoiceData: {}) => {
    const { form } = this.props;
    if (invoiceData) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = invoiceData[key] || null;
        if (key === 'receiverArea') {
          obj[key] = `${invoiceData['receiverAreaProvince'] || ''} / ${invoiceData[
            'receiverAreaCity'
          ] || ''} / ${invoiceData['receiverAreaDistrict'] || ''}`;
        }
        if (key === 'invoiceContent') {
          obj[key] = [];
        }
        form.setFieldsValue(obj);
      });
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { form } = this.props;
    const { billNoJson, amount } = this.state;
    form.validateFields(async (err, value) => {
      if (!err) {
        const commonParams = {
          invoiceMedium: value.invoiceMedium,
          invoiceContent: value.invoiceContent.join('*'),
          applyRemark: value.applyRemark,
        };
        let params = {};
        if (amount) {
          params = {
            ...commonParams,
            invoiceAmount: amount,
            invoiceMode: 2,
          };
        } else {
          params = {
            ...commonParams,
            billNo: billNoJson,
            invoiceMode: 1,
          };
        }
        await confirmInvoicing(params);
        message.success('开票申请成功！');
        router.goBack();
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { bankList, billDetail = {}, amount } = this.state;
    const { invoiceCategoryList = [] } = billDetail;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    const children = [];
    invoiceCategoryList.map(item =>
      children.push(
        <Option key={item} value={item}>
          {item}
        </Option>,
      ),
    );

    const invoiceText = amount ? (
      <span>
        本次申请将开具“1张”发票，包含“1笔”费用，总计开票金额
        {amount}元
      </span>
    ) : (
      <span>
        本次申请将开具“{billDetail['invoiceNumber'] || '__'}张”发票，包含“
        {billDetail['feeNumbers'] || '__'}笔”费用，总计开票金额
        {billDetail['totalAmount'] || '__'}元
      </span>
    );

    return (
      <div ref={this.getViewDom}>
        <Form {...formItemLayout}>
          <Card title="确认开票信息" bordered={false} style={{ marginBottom: 20 }}>
            <Alert
              message="注意事项"
              style={{ margin: '20px 0' }}
              description={
                <div>
                  增值税专用发票，可以用于抵扣进项税额，适用于一般纳税人企业。
                  <br />
                  增值税专用发票为纸质发票，申请后，代征主体将会在7个工作日内寄出。
                  <br />
                  增值税普通发票，不能用于抵扣进项税额，适用于小规模纳税人企业。
                  <br />
                  增值税普通发票以电子发票形式开具，申请后，服务主体将会在3个工作日内通过短信或邮件的方式告知开票结果。
                </div>
              }
              type="warning"
              showIcon
              closable
            />
            <FormItem label="开票类型">
              {getFieldDecorator('invoiceType')(
                <Radio.Group disabled>
                  <Radio value="01">增值税专用发票</Radio>
                  <Radio value="02">增值税普通发票</Radio>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem label="开票明细">{invoiceText}</FormItem>
            <FormItem label="发票抬头">
              {getFieldDecorator('invoiceTitle')(<Input readOnly />)}
            </FormItem>
            <FormItem label="纳税人识别号">
              {getFieldDecorator('taxpayerRegistNo')(<Input readOnly />)}
            </FormItem>
            <FormItem label="营业执照注册地址">
              {getFieldDecorator('busiLicenseRegistAddr')(<Input readOnly />)}
            </FormItem>
            <FormItem label="发票打印电话">
              {getFieldDecorator('invoicePrintingPhone')(<Input readOnly />)}
            </FormItem>
            <FormItem label="开户银行">
              {getFieldDecorator('bankName')(
                <Select disabled>
                  {bankList.map(b => (
                    <Select.Option key={b['name']}>{b['name']}</Select.Option>
                  ))}
                </Select>,
              )}
            </FormItem>

            <FormItem label="银行账号">
              {getFieldDecorator('bankAccountNo')(<Input readOnly />)}
            </FormItem>

            <FormItem label="发票介质">
              {getFieldDecorator('invoiceMedium', {
                rules: [{ required: true, message: '请选择发票介质！' }],
              })(
                <Radio.Group disabled>
                  <Radio value="01">纸质发票</Radio>
                  <Radio value="02">电子发票</Radio>
                </Radio.Group>,
              )}
            </FormItem>

            <FormItem
              label="开票类目"
              extra={
                <a
                  href="https://www.yuque.com/docs/share/0999e255-f32d-4d39-81cb-c3723d6e3550?#"
                  target="_blank"
                >
                  查看开票内容规则
                </a>
              }
            >
              {getFieldDecorator('invoiceContent', {
                rules: [{ required: true, message: '请选择开票类目！' }],
              })(<Select mode="multiple">{children}</Select>)}
            </FormItem>
            <FormItem label="备注">
              {getFieldDecorator('applyRemark')(
                <Input.TextArea
                  rows={3}
                  placeholder="该备注信息会展示早发票上，如有需要请录入，否则无需录入任何信息。建议不要超过40-50（数字+汉字），否则盖章的时候有可能压到。"
                />,
              )}
            </FormItem>
          </Card>

          <Card title="确认发票收件地址" bordered={false}>
            <FormItem label="收件人姓名">
              {getFieldDecorator('receiverName', {
                rules: [{ required: true, message: '请填写收件人姓名！' }],
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="收件人联系电话">
              {getFieldDecorator('receiverPhone', {
                rules: [{ required: true, message: '请填写收件人联系电话！' }],
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="收件人所在地区">
              {getFieldDecorator('receiverArea', {})(<Input readOnly />)}
            </FormItem>

            <FormItem label="收件人详细地址">
              {getFieldDecorator('receiverDetailAddress', {
                rules: [{ required: true, message: '请填写收件人详细地址！' }],
              })(<Input readOnly />)}
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
              <Button style={{ marginRight: 10 }} type="primary" onClick={this.handlerSubmit}>
                确定开票
              </Button>
              <Button onClick={() => router.goBack()}>取消</Button>
            </FormItem>
          </Card>
        </Form>
      </div>
    );
  }
}

export default Form.create<ApplyInvoiceProps>()(ApplyInvoice);
