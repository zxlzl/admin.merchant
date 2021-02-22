import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Upload, message, Radio, Cascader } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { MerchantExtendData, BaseData } from '../data';

const FormItem = Form.Item;

import { add as addExtend } from '@/components/api/supervisor/merchantextend'
import { querybyCollectedSubjectNo } from '@/components/api/remit/collectedsubject'

interface RiskProps extends FormComponentProps {
  baseData?: BaseData,
  merchantNo?: string;
  merchantExtend?: MerchantExtendData;
  merchantId?: string;
  setParentState: (commonState: {}) => void
}

class Risk extends Component<RiskProps> {
  view: HTMLDivElement | undefined = undefined;
  state = {}

  async componentDidMount() {
    this.setRiskData()
    const { baseData: { collectedSubjectNo }, form } = this.props
    const { data } = await querybyCollectedSubjectNo(collectedSubjectNo)
    form.setFieldsValue({ maxAmtSingle: data.maxAmtSingle, maxAmount: data.maxAmount });
  }

  async componentDidUpdate(prevProps: RiskProps) {
    if (this.props.merchantExtend !== prevProps.merchantExtend) {
      this.setRiskData()
    }
    // if (this.props.baseData !== prevProps.baseData) {
    //   console.log(this.props.baseData)
    //   const { baseData: { collectedSubjectNo }, form } = this.props
    //   const { data } = await querybyCollectedSubjectNo(collectedSubjectNo)
    //   form.setFieldsValue({ maxAmtSingle: data.maxAmtSingle, maxAmount: data.maxAmount });
    // }
  }

  setRiskData = () => {
    const { merchantExtend, form } = this.props;

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
          ...value,
          merchantNo,
        }
        await addExtend(params)
        setParentState({ merchantExtend: { ...merchantExtend, ...params } })
        message.success('保存成功！')
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      merchantExtend = {},
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <Form {...formItemLayout}>
          <FormItem label="平台单笔限额">
            {getFieldDecorator('maxAmtSingle', {
            })(<Input readOnly suffix="元" />)}
          </FormItem>
          <FormItem label="平台单人单月限额">
            {getFieldDecorator('maxAmount', {
            })(<Input readOnly suffix="元" />)}
          </FormItem>
          <FormItem label="商户单日累计限额">
            {getFieldDecorator('maxSumAmtDaily', {
              rules: [
                { required: true, message: '请填写商户单日累计限额！' },
              ],
            })(<Input readOnly suffix="元" />)}
          </FormItem>


          {/* <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </FormItem> */}
        </Form>
      </div>
    );
  }
}

export default Form.create<RiskProps>()(Risk);
