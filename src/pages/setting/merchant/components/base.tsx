import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Upload, message, Radio, Modal } from 'antd';
import React, { Component, Fragment } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { GlobalContext } from '@/components/GlobalContext';

import * as Utils from '@/utils/utils';

import { BaseData } from '../data.d';

const FormItem = Form.Item;
const { Option } = Select;

import { uploadAttachment } from '@/components/api/supervisor/atachment';
import { belongMerchant } from '@/components/api/remit/merchant';
import { addMerchant, updateMerchant } from '@/components/api/supervisor/merchant';
import { queryAllAvailable } from '@/components/api/remit/collectedsubject';

interface BaseViewProps extends FormComponentProps {
  merchantNo?: string;
  baseData?: BaseData;
  setParentState: (commonState: {}) => void;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;
  static contextType = GlobalContext;
  state = {
    licenseUrl: '',
    subjects: [],
    qualificationUrl: ''
  };

  async componentDidMount() {
    this.setBaseInfo();
    const { data: subjects = [] } = await queryAllAvailable();
    const { data: merchants = [] } = await belongMerchant();
    this.setState({ subjects, merchants });
  }

  componentDidUpdate(prevProps: BaseViewProps) {
    if (this.props.baseData !== prevProps.baseData) {
      this.setBaseInfo();
    }
  }

  setBaseInfo = () => {
    const { baseData, form } = this.props;
    if (baseData) {

      
      const obj = {};
      Object.keys(form.getFieldsValue()).forEach(key => {
        obj[key] = baseData[key] || null;
        if (key === 'licenseUrl') {
          obj[key] = baseData.licenseUrl ? [{ url: baseData.licenseUrl, uid: 1 }] : [];
          this.setState({ licenseUrl: baseData.licenseUrl });
        }
        if (key === 'qualificationUrl') {
          obj[key] = baseData.qualificationUrl ? [{ url: baseData.qualificationUrl, uid: 2 }] : [];
          this.setState({ qualificationUrl: baseData.qualificationUrl });
        }
        if (key==='businessCategory'&&baseData?.businessCategory1) {
          obj[key] = [`${baseData?.businessCategory1} / ${baseData.businessCategory2}`]
        }
      });
      form.setFieldsValue(obj);
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { form, setParentState, baseData = {} } = this.props;
    const { licenseUrl } = this.state;
    form.validateFields(async (err, value) => {
      if (!err) {
        value.licenseUrl = licenseUrl || baseData['licenseUrl'];
        let ajax;
        if (baseData) {
          value['merchantNo'] = baseData['merchantNo'];
          value['id'] = baseData['id'];
          ajax = updateMerchant;
        } else {
          ajax = addMerchant;
        }
        const { data } = await ajax(value);
        message.success('保存成功');
        setParentState({ merchantNo: data.merchantNo, baseData: data });
      }
    });
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

  

  render() {
    const {
      form: { getFieldDecorator },
      baseData,
    } = this.props;
    console.log(baseData);
    const {merchantType=''} = baseData || {}
    const { subjects,merchants=[] } = this.state;
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
          <Form.Item label="商户类型">
            {getFieldDecorator('merchantType', {
              rules: [{ required: true, message: '请选择商户类型' }],
            })(
              <Radio.Group disabled>
                <Radio value="1">普通商户</Radio>
                <Radio value="2">特约商户</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {merchantType==2?
          <Form.Item label="归属服务商">
            {getFieldDecorator('belongMerchant', {
              rules: [{ required: true, message: '请选择归属服务商' }],
            })(
              <Select disabled>
                {merchants.map((s: any) => (
                    <Option key={s.status}>{s.desc}</Option>
                  ))}
              </Select>,
            )}
          </Form.Item>:null}
          <FormItem label="商户全称">
            {getFieldDecorator('merchantName', {
              rules: [{ required: true, message: '请填写商户全称' }],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="商户简称">
            {getFieldDecorator('merchantAbbr', {
              rules: [{ required: true, message: '请填写商户简称！' }],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="经营类目">
            {getFieldDecorator('businessCategory', {
              rules: [{ required: true, message: '请选择经营类目！' }],
            })(
              <Input readOnly />
            )}
          </FormItem>
          <FormItem label="营业执照注册号">
            {getFieldDecorator('registrationNumber', {
              rules: [{ required: true, message: '请填写营业执照注册号！' }],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="营业执照注册地址">
            {getFieldDecorator('registeredAddress', {
              rules: [
                { required: true, message: '请填写注册地址！' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="企业实际经营地址">
            {getFieldDecorator('businessAddress', {
              rules: [
                { required: true, message: '请填写营业地址！' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="营业执照影像件">
            {getFieldDecorator('licenseUrl', {
              valuePropName: 'fileList',
              getValueFromEvent: (e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
              rules: [
                {
                  required: true,
                  message: '请上传营业执照影像件！',
                },
              ],
            })(
              <Upload
                disabled
                listType="picture-card"
                // fileList={fileList}
                onPreview={this.handlePreview}
              >
                {this.state.licenseUrl ? null : uploadButton}
              </Upload>,
            )}
          </FormItem>

          {baseData?.qualificationUrl&&<FormItem label="补充资质材料" extra={<a href="https://www.yuque.com/docs/share/5a02251a-083a-405a-a0d1-980286562898?#" target="_blank">查看资质要求</a>}>
            {getFieldDecorator('qualificationUrl', {
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
                listType="picture-card"
                onPreview={this.handlePreview}
              >
              </Upload>,
            )}
          </FormItem>}
          
          {/* <FormItem label="纳税人类型">
            {getFieldDecorator('taxpayerType', {
              rules: [
                { required: true, message: '请选择纳税人类型！' },
              ],
            })(
              <Radio.Group>
                <Radio value="01">一般纳税人</Radio>
                <Radio value="02">小规模纳税人</Radio>
              </Radio.Group>,
            )}
          </FormItem> */}
          <FormItem label="签约代征主体">
            {getFieldDecorator('collectedSubjectNo', {
              rules: [{ required: true, message: '请选择签约代征主体！' }],
            })(
              <Select disabled>
                {subjects.map((s: any) => (
                  <Option key={s.collectedSubjectNo}>{s.collectedSubjectName}</Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem label="归属销售">
            {getFieldDecorator('belongSalesman', {
              rules: [{ required: true, message: '请填写归属销售！' }],
            })(<Input />)}
          </FormItem>
          {/* <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </FormItem> */}
        </Form>
      </div>
    );
  }
}

export default Form.create<BaseViewProps>({})(BaseView);
