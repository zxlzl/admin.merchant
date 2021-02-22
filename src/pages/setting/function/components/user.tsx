import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Upload, message, Radio, Cascader } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { MerchantExtendData } from '../data';

const FormItem = Form.Item;

import { add as addExtend } from '@/components/api/supervisor/merchantextend';
import { updateInviteCode } from '@/components/api/remit/merchantextend';

interface UserProps extends FormComponentProps {
  merchantNo?: string;
  merchantExtend?: MerchantExtendData;
  merchantId?: string;
  setParentState: (commonState: {}) => void;
}

class User extends Component<UserProps> {
  view: HTMLDivElement | undefined = undefined;
  state = { bankList: [] };

  async componentDidMount() {
    this.setUserData();
  }

  componentDidUpdate(prevProps: UserProps) {
    if (this.props.merchantExtend !== prevProps.merchantExtend) {
      this.setUserData();
    }
  }

  setUserData = () => {
    const { merchantExtend, form } = this.props;
    const {signSource,inviteCode} = merchantExtend
    this.setState({signSource,inviteCode})

    if (merchantExtend) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = merchantExtend[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { form, merchantNo, setParentState, merchantExtend } = this.props;
    form.validateFields(async (err, value) => {
      if (!err) {
        const params = {
          // ...merchantExtend,
          inviteCode: value?.inviteCode,
          merchantNo,
        };
        const inviteCode = value?.inviteCode
        await updateInviteCode(inviteCode)
        // await addExtend(params);
        setParentState({ merchantExtend: { ...merchantExtend, ...params } });
        message.success('更新成功！');
      }
    });
  };

  render() {
    const {signSource,inviteCode} = this.state
    const { form: { getFieldDecorator }, merchantExtend = {}, } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    const more = (
      <div>
        收款个人在微信主动签约，需输入商户签约邀请码。短小易记的邀请码有助于记忆和传播。{' '}
        <a href="https://www.yuque.com/docs/share/44bbf18e-2589-47fa-bce9-3575468efc37?#" target="_blank">了解更多</a>
      </div>
    );

    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <Form {...formItemLayout}>
          <FormItem label="用户签约方式">
            {getFieldDecorator('signSource', {
              rules: [{ required: true, message: '请选择用户签约方式！' }],
            })(
              <Radio.Group disabled>
                <Radio value="2">纸质签约</Radio>
                <Radio value="0">微信签约</Radio>
                <Radio value="1">线上签约</Radio>
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem label="打款前是否签约">
            {getFieldDecorator('needSign', {
              rules: [{ required: true, message: '请选择打款前是否签约！' }],
            })(
              <Select disabled>
                <Select.Option key="Y">强校验(打款时必须签约否则挂起)</Select.Option>
                <Select.Option key="O">弱校验(打款时未签约则发起短信通知)</Select.Option>
                <Select.Option key="N">不校验(不限制)</Select.Option>
              </Select>,
              // <Radio.Group disabled>
              //   <Radio value="N">否(打款前不需要签约)</Radio>
              //   <Radio value="Y">是(打款前必须签约)</Radio>
              // </Radio.Group>,
            )}
          </FormItem>
          {signSource == 0 && <FormItem label="商户签约邀请码" extra={more}>
            {getFieldDecorator('inviteCode', {
              rules: [
                { required: true, message: '请填写商户签约邀请码' },
                {
                  pattern: new RegExp(/^[A-Za-z\d]*$/, 'g'),
                  message: '只能输入大小写字母或数字，4-8个字符',
                },
                { max: 8, message: '不超过8个字符' },
                { min: 4, message: '不低于4个字符' },
              ],
              initialValue: inviteCode
            })(<Input placeholder="4-8位大小写字母或数字" />)}
          </FormItem>}

          {signSource == 0 &&<FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" onClick={this.handlerSubmit}>更新</Button>
          </FormItem>}
        </Form>
      </div>
    );
  }
}

export default Form.create<UserProps>()(User);
