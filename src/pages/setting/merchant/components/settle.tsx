import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Upload, message, Radio, Cascader } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { SettleData } from '../data.d';

const FormItem = Form.Item;

import { addSettleInfo, updateSettleInfo } from '@/components/api/supervisor/merchantSettleInfo'
import { queryBankList } from '@/components/api/remit/bankInfo'

interface SettleProps extends FormComponentProps {
  merchantNo?: string;
  settleData?: SettleData;
  merchantId?: string;
  setParentState: (commonState: {}) => void
}

class Settle extends Component<SettleProps> {
  view: HTMLDivElement | undefined = undefined;
  state = { isEdit: false, bankList: [] }

  async componentDidMount() {
    this.setSettleData()
    const { data = [] } = await queryBankList()
    this.setState({ bankList: data })
  }

  componentDidUpdate(prevProps: SettleProps) {

    if (this.props.settleData !== prevProps.settleData) {
      this.setSettleData()
    }
  }

  setSettleData = () => {
    const { settleData, form } = this.props;

    if (settleData) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = settleData[key] || null;
        obj['bankInfo'] = { key: settleData.bankCode, label: settleData.bankName }
        form.setFieldsValue(obj);
      });
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { form, merchantNo, setParentState, settleData } = this.props;
    form.validateFields(async (err, value) => {
      if (!err) {
        const params = {
          ...value,
          merchantNo,
        }
        params['bankCode'] = params['bankInfo']['key']
        params['bankName'] = params['bankInfo']['label']

        if (settleData) {
          params.merchantNo = settleData['merchantNo']
          params.id = settleData['id']
          await updateSettleInfo(params)
          setParentState({ settleData: params })
        } else {
          await addSettleInfo(params)
          setParentState({ settleData: params })
        }
        message.success('保存成功！')
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      settleData = {}
    } = this.props;
    const { bankList } = this.state
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <Form {...formItemLayout}>
          <FormItem label="银行户名">
            {getFieldDecorator('bankAccountName', {
              rules: [
                { required: true, message: '请填写银行户名！' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="银行账号">
            {getFieldDecorator('bankAccountNo', {
              rules: [
                { required: true, message: '请填写银行账号！' },
              ],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem label="开户银行">
            {getFieldDecorator('bankInfo', {
              rules: [
                { required: true, message: '请选择开户银行！' },
              ],
            })(<Select disabled labelInValue>
              {bankList.map(b => (<Select.Option key={b['code']}>{b['name']}</Select.Option>))}
            </Select>)}
          </FormItem>

          <FormItem label="开户支行">
            {getFieldDecorator('branchName', {
              rules: [
                { required: true, message: '请填写开户支行！' },
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

export default Form.create<SettleProps>()(Settle);
