import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Steps,
  Card,
  Input,
  Button,
  Select,
  Divider,
  Typography,
  InputNumber,
  message,
  Alert,
  Spin,
  Result,
} from 'antd';
import router from 'umi/router';
import styles from './index.less';

import { queryBalanceListByMerchant } from '@/components/api/remit/merchant';
import { allocationPay } from '@/components/api/remit/account';

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailFormItemLayout = {
  wrapperCol: {
    offset: 8,
  },
};

class Transfer extends Component {
  state = {
    currentStep: 0, //
    accountList: [],
    params: {},
    transLoading: false,
  };

  async componentDidMount() {
    const { data: accountList = [] } = await queryBalanceListByMerchant();
    this.setState({
      accountList,
    });
  }

  backstep = (step?: number) => {
    const { currentStep } = this.state;
    const { form } = this.props;
    // 再转一笔
    if (step === 0) {
      this.setState({
        currentStep: 0,
      });
      form.resetFields();
      return;
    }
    // 返回上一步
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  handleSubmit = async e => {
    const { currentStep, params } = this.state;
    e.preventDefault();
    if (currentStep === 0) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        const { accountNo, outAccountNo } = values;
        if (!err) {
          if (accountNo === outAccountNo) {
            message.error('出款账户与入款账户不能一致！');
            return;
          }
          this.setState({
            params: values,
            currentStep: currentStep + 1,
          });
        }
      });
    } else if (currentStep === 1) {
      this.setState({
        transLoading: true,
      });
      setTimeout(() => {
        this.setState({
          transLoading: false,
        });
      }, 5000);
      const res = await allocationPay(params);
      if (res.code == 0) {
        this.setState({
          transLoading: false,
          currentStep: currentStep + 1,
        });
      }
    }
  };

  transferInfo = (step?: number) => {
    const { accountList, currentStep } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {step == 1 && (
          <Alert
            className={styles.alert}
            message="确认转账后，资金将转入对方账户，请谨慎操作。"
            type="info"
            showIcon
            closable
          />
        )}
        {step == 2 && <Result status="success" title="操作成功" subTitle="预计两分钟内到账" />}
        <Form.Item label="出款账户">
          {getFieldDecorator('outAccountNo', {
            rules: [{ required: true, message: '请选择出款账户!' }],
          })(
            <Select placeholder="请选择出款账户" disabled={!!step}>
              {accountList.map(({ acctNo, acctName, availBalance }) => (
                <Option key={acctNo} value={acctNo}>
                  {`${acctName} [可用余额${availBalance}元]`}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="入款账户">
          {getFieldDecorator('accountNo', {
            rules: [{ required: true, message: '请选择入款账户!' }],
          })(
            <Select placeholder="请选择入款账户" disabled={!!step}>
              {accountList.map(({ acctNo, acctName, availBalance }) => (
                <Option key={acctNo} value={acctNo}>
                  {`${acctName} [可用余额${availBalance}元]`}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="转账金额">
          {getFieldDecorator('amount', {
            rules: [
              {
                required: true,
                message: '请输入转账金额!',
              },
              {
                validator: (rule, value, callback) => {
                  /^[+-]?\d+(\.\d+)?$/g.test(value) ? callback() : callback('必须为数字');
                },
              },
            ],
          })(<Input prefix="￥" disabled={!!step}  />)}
        </Form.Item>
        {currentStep === 0 ? (
          <Form.Item label="备注">{getFieldDecorator('memo')(<TextArea rows={4} />)}</Form.Item>
        ) : null}

        <Form.Item {...tailFormItemLayout}>
          {currentStep == 0 ? (
            <Button type="primary" htmlType="submit">
              下一步
            </Button>
          ) : null}

          {currentStep == 1 ? (
            <div className={styles.operate}>
              {' '}
              <Button className={styles.gap} type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={this.backstep}>上一步</Button>
            </div>
          ) : null}

          {currentStep == 2 ? (
            <div className={styles.operate}>
              {' '}
              <Button
                onClick={() => this.backstep(0)}
                className={styles.gap}
                type="primary"
                htmlType="submit"
              >
                再转一笔
              </Button>
              <Button
                onClick={() => {
                  router.push('/fund_mange/account');
                }}
              >
                查看详情
              </Button>
            </div>
          ) : null}
        </Form.Item>
        {currentStep == 0 && <Divider />}

        {currentStep == 0 && (
          <Typography>
            <Text>说明</Text>
            <br />
            <Text strong>内部转账</Text>
            <br />
            <Text type="secondary">
              同一商户号下账户间转账，账户归属的商户主体和代征主体相同，仅打款通道不同。
            </Text>
            <br />
            <br />
            <Text strong>外部转账</Text>
            <br />
            <Text type="secondary">
              跨商户号的账户间转账，账户归属的商户主体或代征主体不同。如需外部转账，请联系您的商务经理，申请工单流程。
            </Text>
          </Typography>
        )}
      </Form>
    );
  };

  render() {
    const { currentStep, transLoading } = this.state;
    return (
      <PageHeaderWrapper>
        <Spin spinning={transLoading} tip="正在转账...">
          <Card>
            <Steps type="navigation" current={currentStep}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>

            <div className={styles.content}>
              {currentStep === 0 ? this.transferInfo() : ''}
              {currentStep === 1 ? this.transferInfo(1) : ''}
              {currentStep === 2 ? this.transferInfo(2) : ''}
            </div>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create({ name: 'transfer' })(Transfer);
