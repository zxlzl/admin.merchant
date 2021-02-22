import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Upload, message, Radio, DatePicker, Card, Modal } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import { GlobalContext } from '@/components/GlobalContext';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { InvoiceData } from '../data.d';
import * as Utils from '@/utils/utils';
import CityPicker from '@/components/CityPicker';

const FormItem = Form.Item;

import {
  addInvoicingInfo,
  updateInvoicingInfo,
} from '@/components/api/supervisor/merchantInvoicingInfo';
import { queryBankList } from '@/components/api/remit/bankInfo';
import { uploadAttachment } from '@/components/api/supervisor/atachment';

interface InvoiceProps extends FormComponentProps {
  merchantNo?: string;
  invoiceData?: InvoiceData;
  merchantId?: string;
  setParentState: (commonState: {}) => void;
}

class Invoice extends Component<InvoiceProps> {
  static contextType = GlobalContext;
  view: HTMLDivElement | undefined = undefined;
  state = {
    isEditReceiverArea: false,
    bankList: [],
    otherQualificateCert: '',
    taxRegistCert: '',
    receiverArea: [],
  };

  async componentDidMount() {
    this.setInvoiceData();
    // const { data = [] } = await queryBankList()
    // this.setState({ bankList: data })
  }

  componentDidUpdate(prevProps: InvoiceProps) {
    if (this.props.invoiceData !== prevProps.invoiceData) {
      this.setInvoiceData();
    }
  }

  setInvoiceData = () => {
    const { invoiceData, form } = this.props;

    if (invoiceData) {
      const obj = {};
      Object.keys(form.getFieldsValue()).forEach(key => {
        // console.log(key, invoiceData[key])
        obj[key] = invoiceData[key] || null;
        if (key === 'receiverArea') {
          obj[key] = `${invoiceData['receiverAreaProvince'] || ''} / ${invoiceData[
            'receiverAreaCity'
          ] || ''} / ${invoiceData['receiverAreaDistrict'] || ''}`;
        }
        if (key === 'becomeTaxpayerDate') {
          obj[key] = moment(invoiceData.becomeTaxpayerDate);
        }
        if (key === 'taxRegistCert') {
          obj[key] = invoiceData.taxRegistCert ? [{ url: invoiceData.taxRegistCert, uid: 1 }] : [];
          this.setState({ taxRegistCert: invoiceData.taxRegistCert });
        }
        if (key === 'otherQualificateCert') {
          obj[key] = invoiceData.otherQualificateCert
            ? [{ url: invoiceData.otherQualificateCert, uid: 1 }]
            : [];
          this.setState({ otherQualificateCert: invoiceData.otherQualificateCert });
        }
        if (key === 'invoiceCategory') {
          if (invoiceData[key]) {
            obj[key] = invoiceData[key].split(',');
          }
        }
      });
      form.setFieldsValue(obj);
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  /**
   * 上传图片
   */
  handleUpload = async (options: any, stateName: string) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await uploadAttachment(undefined, undefined, { data: formData });
      this.setState({ [stateName]: data });
      onSuccess('ok');
    } catch (e) {
      onError(e);
    }
  };

  /**
   * 文件数据更改
   */
  handleChange = (res: any) => {
    const { fileList = [] } = res;
    this.setState({ fileList });
  };

  /**
   * 图片预览
   *
   */
  handlePreview = async (file: any) => {
    const { showModal, closeModal } = this.context;

    if (!file.url && !file.preview) {
      file.preview = await Utils.getBase64(file.originFileObj);
    }

    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '图片预览',
        footer: null,
        onCancel: () => closeModal(), // 取消事件
      };

      return (
        <Modal {...modalProps}>
          <img alt="example" style={{ width: '100%' }} src={file.url || file.preview} />
        </Modal>
      );
    });
  };

  /**
   * 删除照片重置链接
   */
  handleRemove = (stateName: string) => {
    this.setState({ [stateName]: '' });
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { form, merchantNo, setParentState, invoiceData } = this.props;
    const { taxRegistCert, otherQualificateCert, receiverArea = [] } = this.state;
    form.validateFields(async (err, value) => {
      if (!err) {
        const params = {
          ...value,
          merchantNo,
          receiverAreaProvince: receiverArea[0]
            ? receiverArea[0]['label']
            : invoiceData
            ? invoiceData.receiverAreaProvince
            : '',
          receiverAreaCity: receiverArea[1]
            ? receiverArea[1]['label']
            : invoiceData
            ? invoiceData.receiverAreaCity
            : '',
          receiverAreaDistrict: receiverArea[2]
            ? receiverArea[2]['label']
            : invoiceData
            ? invoiceData.receiverAreaDistrict
            : '',
        };

        if (params.becomeTaxpayerDate) {
          params.becomeTaxpayerDate = params.becomeTaxpayerDate.format('YYYY/MM/DD');
        }
        params.taxRegistCert = taxRegistCert;
        params.otherQualificateCert = otherQualificateCert;
        // 开票类型，01:增值税专用发票，02:增值税普通发票
        params.invoiceType = params.taxpayerType === '01' ? '01' : '02';
        // console.log(params)

        if (invoiceData) {
          params.id = invoiceData.id;
          await updateInvoicingInfo(params);
        } else {
          await addInvoicingInfo(params);
        }
        setParentState({ invoiceData: params });
        message.success('保存成功！');
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      invoiceData = {},
    } = this.props;
    const { bankList } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <Form {...formItemLayout}>
          <FormItem
            label="纳税人类型"
            extra="一般增值税纳税人开具增值税专用发票；小规模纳税人开具增值税普通发票"
          >
            {getFieldDecorator('taxpayerType', {
              initialValue: '01',
              rules: [{ required: true, message: '请选择纳税人类型！' }],
            })(
              <Radio.Group disabled>
                <Radio value="01">一般纳税人</Radio>
                <Radio value="02">小规模纳税人</Radio>
              </Radio.Group>,
            )}
          </FormItem>
          {getFieldValue('taxpayerType') === '01' ? (
            <FormItem
              label="成为一般纳税人时间"
              extra="请如实填写一般纳税人的认定时间。根据相关法规规定，成为一般纳税人之前的费用不能作为进项税抵扣。"
            >
              {getFieldDecorator('becomeTaxpayerDate', {
                rules: [{ required: true, message: '请选择成为一般纳税人时间！' }],
              })(<DatePicker disabled format="YYYY/MM/DD" />)}
            </FormItem>
          ) : (
            <FormItem label="发票介质">
              {getFieldDecorator('invoiceMedium', {
                initialValue: invoiceData['invoiceMedium'],
                rules: [{ required: true, message: '请选择发票介质！' }],
              })(
                <Radio.Group disabled>
                  <Radio value="01">纸质发票</Radio>
                  <Radio value="02">电子发票</Radio>
                </Radio.Group>,
              )}
            </FormItem>
          )}

          <Card title="纳税人开票信息" size="small" bordered={false}>
            <FormItem label="开票类型">
              <span>
                {getFieldValue('taxpayerType') === '01' ? '增值税专用发票' : '增值税普通发票'}
              </span>
            </FormItem>
            <FormItem label="发票抬头">
              {getFieldDecorator('invoiceTitle', {
                rules: [
                  {
                    required: true,
                    message: '请填写发票抬头！',
                  },
                ],
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="纳税人识别号">
              {getFieldDecorator('taxpayerRegistNo', {
                rules: [
                  {
                    required: getFieldValue('taxpayerType') === '01',
                    message: '请填写纳税人识别号！',
                  },
                ],
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="营业执照注册地址">
              {getFieldDecorator('busiLicenseRegistAddr', {
                rules: [
                  {
                    required: getFieldValue('taxpayerType') === '01',
                    message: '请填写营业执照注册地址！',
                  },
                ],
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="发票打印电话">
              {getFieldDecorator('invoicePrintingPhone', {
                rules: [
                  {
                    required: getFieldValue('taxpayerType') === '01',
                    message: '请填写发票打印电话！',
                  },
                ],
              })(<Input readOnly />)}
            </FormItem>
            <FormItem label="开户银行">
              {getFieldDecorator('bankName', {
                rules: [
                  { required: getFieldValue('taxpayerType') === '01', message: '请选择开户银行！' },
                ],
              })(<Input readOnly />)}
            </FormItem>

            <FormItem label="银行账号">
              {getFieldDecorator('bankAccountNo', {
                rules: [
                  { required: getFieldValue('taxpayerType') === '01', message: '请填写银行账号！' },
                ],
              })(<Input readOnly />)}
            </FormItem>

            <FormItem label="允许的开票类目">
              {getFieldDecorator('invoiceCategory', {
                rules: [{ required: true, message: '请选择开票类目！' }],
                // getValueFromEvent: (e: any) => {
                //   return e.join(',')
                // },
              })(<Input.TextArea readOnly />)}
            </FormItem>

            {this.state.taxRegistCert ? (
              <FormItem label="税务登记证" extra="支持jpg, jpeg, png, bmp格式文件">
                {getFieldDecorator('taxRegistCert', {
                  valuePropName: 'fileList',
                  getValueFromEvent: (e: any) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  },
                })(
                  <Upload
                    disabled
                    customRequest={options => this.handleUpload(options, 'taxRegistCert')}
                    onRemove={() => this.handleRemove('taxRegistCert')}
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    // onChange={this.handleChange}
                  >
                    {this.state.taxRegistCert ? null : uploadButton}
                  </Upload>,
                )}
              </FormItem>
            ) : (
              ''
            )}

            {this.state.otherQualificateCert ? (
              <FormItem
                label="其他资质证明"
                extra="可补充上传营业执照，行业资质等证明材料，支持jpg, jpeg, png, bmp格式文件"
              >
                {getFieldDecorator('otherQualificateCert', {
                  valuePropName: 'fileList',
                  getValueFromEvent: (e: any) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  },
                })(
                  <Upload
                    disabled
                    customRequest={options => this.handleUpload(options, 'otherQualificateCert')}
                    onRemove={() => this.handleRemove('otherQualificateCert')}
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    // onChange={this.handleChange}
                  >
                    {this.state.otherQualificateCert ? null : uploadButton}
                  </Upload>,
                )}
              </FormItem>
            ) : (
              ''
            )}
          </Card>

          <Card title="发票收件人信息" size="small" bordered={false}>
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
            {/* {
              this.state.isEditReceiverArea || !Object.keys(invoiceData).length
                ? <FormItem label="收件人所在地区">
                  {getFieldDecorator("receiverArea", {
                    getValueFromEvent: (...args) => {
                      const [code, origin] = args
                      this.setState({ receiverArea: origin })
                      return code
                    },
                    rules: [{
                      type: 'array',
                      required: true,
                      message: '请选择收件人所在地区！'
                    }]
                  })(
                    <CityPicker />)
                  }
                </FormItem>
                : <FormItem label="收件人所在地区">
                  {getFieldDecorator("receiverArea", {
                  })(<Input addonAfter={<Icon onClick={() => this.setState({ isEditReceiverArea: true })} type="setting" />} />)}
                </FormItem>
            } */}
            <FormItem label="收件人所在地区">
              {getFieldDecorator('receiverArea', {})(<Input readOnly />)}
            </FormItem>

            <FormItem label="收件人详细地址">
              {getFieldDecorator('receiverDetailAddress', {
                rules: [{ required: true, message: '请填写收件人详细地址！' }],
              })(<Input readOnly />)}
            </FormItem>
          </Card>

          <Card title="开票方式设置" size="small" bordered={false}>
            <FormItem label="服务费开票方式">
              {getFieldDecorator('serviceChargeInvoicing', {
                rules: [{ required: true, message: '请选择纳税人类型！' }],
              })(
                <Radio.Group disabled>
                  <Radio value="01">手动申请开票(需在商户平台自行申请开票)</Radio>
                  <Radio value="02">自动按月开票(仅支持实时扣费模式的账单开票)</Radio>
                </Radio.Group>,
              )}
            </FormItem>
          </Card>

          {/* <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </FormItem> */}
        </Form>
      </div>
    );
  }
}

export default Form.create<InvoiceProps>()(Invoice);
