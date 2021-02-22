import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Upload, message, Radio, Cascader } from 'antd';
import React, { Component, Fragment } from 'react';

import CityPicker from '@/components/CityPicker'

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { ContactData } from '../data.d';

const FormItem = Form.Item;
const { Option } = Select;

import { add, update } from '@/components/api/supervisor/contact'

interface ContactProps extends FormComponentProps {
  merchantNo?: string;
  contactData?: ContactData;
  merchantId?: string;
  setParentState: (commonState: {}) => void
}

class Contact extends Component<ContactProps> {
  view: HTMLDivElement | undefined = undefined;
  cityPicker: HTMLDivElement | undefined = undefined;
  state = { positionValue: [], isEdit: false }

  componentDidMount() {
    this.setContactData()
  }

  componentDidUpdate(prevProps: ContactProps) {

    if (this.props.contactData !== prevProps.contactData) {
      this.setContactData()
    }
  }

  setContactData = () => {
    const { contactData, form } = this.props;

    if (contactData) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = contactData[key] || null;
        if (key === 'position') {
          obj[key] = `${contactData['province'] || ''} / ${contactData['city'] || ''} / ${contactData['district'] || ''}`
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
    const { form, merchantNo, setParentState, contactData } = this.props;
    const { positionValue = [] } = this.state
    form.validateFields(async (err, value) => {
      if (!err) {
        const params = {
          ...value,
          merchantNo,
          province: positionValue[0] ? positionValue[0]['label'] : contactData ? contactData.province : '',
          provinceCode: positionValue[0] ? positionValue[0]['value'] : contactData ? contactData.provinceCode : '',
          city: positionValue[1] ? positionValue[1]['label'] : contactData ? contactData.city : '',
          cityCode: positionValue[1] ? positionValue[1]['value'] : contactData ? contactData.cityCode : '',
          district: positionValue[2] ? positionValue[2]['label'] : contactData ? contactData.district : '',
          districtCode: positionValue[2] ? positionValue[2]['value'] : contactData ? contactData.districtCode : '',
        }
        delete params.position
        if (contactData) {
          params.merchantNo = contactData['merchantNo']
          params.id = contactData['id']
          const { data } = await update(params)
          message.success('保存成功！')
          setParentState({ contactData: data })
        } else {
          const { data } = await add(params)
          message.success('保存成功！')
          setParentState({ contactData: data })
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      contactData = {}
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <Form {...formItemLayout}>
          <FormItem label="业务联系人姓名">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '业务联系人姓名' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="业务联系人手机号">
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: '业务联系人手机号' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="业务联系人邮箱">
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '请填写业务联系人邮箱！' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          {/* {
            this.state.isEdit || !Object.keys(contactData).length
              ? <FormItem label="联系人所在地区">
                {getFieldDecorator("position", {
                  getValueFromEvent: (...args) => {
                    const [code, origin] = args
                    this.setState({ positionValue: origin })
                    return code
                  },
                  rules: [{
                    type: 'array',
                    required: true,
                    message: '请选择省市区！'
                  }]
                })(
                  <CityPicker />)
                }
              </FormItem>
              : <FormItem label="联系人所在地区">
                {getFieldDecorator("position", {
                })(<Input addonAfter={<Icon onClick={() => this.setState({ isEdit: true })} type="setting" />} />)}
              </FormItem>
          } */}
          <FormItem label="联系人所在地区">
            {getFieldDecorator("position", {
            })(<Input readOnly />)}
          </FormItem>

          <FormItem label="联系人详细地址">
            {getFieldDecorator('detailAddr', {
              rules: [
                { required: true, message: '请填写联系人详细地址！' },
              ],
            })(<Input readOnly />)}
          </FormItem>

          {/* <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </FormItem> */}
        </Form>
      </div>
    );
  }
}

export default Form.create<ContactProps>()(Contact);
