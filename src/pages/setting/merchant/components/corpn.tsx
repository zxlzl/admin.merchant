import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select} from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { CorpnData } from '../data';

const FormItem = Form.Item;
const { Option } = Select;

import { queryLegalPerson } from '@/components/api/remit/merchantLegalPerson'

interface CorpnProps extends FormComponentProps {
  merchantNo?: string;
  merchantId?: string;
  setParentState: (commonState: {}) => void
}

class Corpn extends Component<CorpnProps> {
  view: HTMLDivElement | undefined = undefined;
  cityPicker: HTMLDivElement | undefined = undefined;
  state = { positionValue: [], isEdit: false }

  componentDidMount() {
    this.setCorpnData()
  }

  setCorpnData = async () => {
    console.log(this.props);
    const {merchantNo=""} = this.props
    const {data} = await queryLegalPerson()
    console.log(data);
    return
    const { corpnData, form } = this.props;

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

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <Form {...formItemLayout}>
          <FormItem label="法人姓名">
            {getFieldDecorator('legalName', {
              rules: [
                { required: true, message: '法人姓名' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="法人性别">
            {getFieldDecorator('legalGender', {
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="法人手机号">
            {getFieldDecorator('legalMobile', {
              rules: [
                { required: true, message: '请填写法人手机号！' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="法人邮箱">
            {getFieldDecorator("legalEmail", {
            })(<Input readOnly />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create<CorpnProps>()(Corpn);
