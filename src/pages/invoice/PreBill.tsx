import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { GlobalContext } from '@/components/GlobalContext';
import { Card, Row, Col, Statistic, Popover, Form, Input, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import router from 'umi/router';

// api
import { PrepaidInvoice } from '@/components/api/remit/invoiceInfo';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

class PreBill extends React.Component {
  static contextType = GlobalContext;

  state = {
    prePaidInvoice: {},
  };

  async componentDidMount() {
    
    const { data } = await PrepaidInvoice();
    this.setState({
      prePaidInvoice: data,
    });
  }

  // 跳转申请开票
  handleApply = (amount: number) => {
    router.push({
      pathname: '../apply',
      query: {
        amount
      },
    });
  };

  handleTabChange = (key: string) => {
    switch (key) {
      case 'bill':
        router.push('/invoice/application');
        break;
      case 'pre-charge':
        router.push('/invoice/application/pre_bill');
        break;
      default:
        break;
    }
  };

  onFinish = values => {
    const {amount} = values
    this.handleApply(amount)
  };

  render() {
    const {prePaidInvoice={}} = this.state
    const tabList = [
      {
        key: 'bill',
        tab: '账单开票',
      },
      {
        key: 'pre-charge',
        tab: '预充值开票',
      },
    ];

    const content =
      '发票由宫薪记开具（包括服务费发票）。开票主体为合作代征主体。可索取发票金额=累计可开票金额-已索取金额。累计可开票金额=累计充值金额-累计提现金额';
    const available = (
      <div>
        可索取发票金额{' '}
        <Popover placement="top" overlayStyle={{ width: '300px' }} content={content}>
          <InfoCircleOutlined />
        </Popover>
      </div>
    );

    return (
      <PageHeaderWrapper
        tabList={tabList}
        onTabChange={this.handleTabChange}
        tabActiveKey="pre-charge"
      >
        <Card title="预充值开票" style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic prefix={'￥'} title={available} value={prePaidInvoice?.availableInvoiceAmount} />
            </Col>
            <Col span={8}>
              <Statistic prefix={'￥'} title="已索取发票金额" value={prePaidInvoice?.claimedInvoiceAmount} />
            </Col>
            <Col span={8}>
              <Statistic prefix={'￥'} title="累计可开票金额" value={prePaidInvoice?.cumulativeInvoiceAmount} />
            </Col>
          </Row>
        </Card>

        <Card title="索取发票">
          <Form {...layout} onFinish={this.onFinish}>
            <Form.Item
              label="填写开票金额"
              name="amount"
              rules={[{ required: true, message: '请填写开票金额!' },{pattern:/^[+]?\d+(\.\d{0,2})?$/,message: '请正确输入金额!'}]}
              
            >
              <Input placeholder="支持小数点后两位" suffix="元" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                下一步
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}


export default PreBill