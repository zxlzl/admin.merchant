import React from 'react';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Steps, Button, Input, Collapse, Typography, Result, Divider } from 'antd';
import { connect } from 'dva';
import { formatCurrency } from '@/utils/utils';
import router from 'umi/router';
import { GlobalContext } from '@/components/GlobalContext';
import { ModalConnectState, ResultTableProps, ResultTableState } from './data';

const { Text, Title } = Typography;

class ResultTable extends React.Component {
  static contextType = GlobalContext;

  state = {};

  // 继续打款
  continue = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'batchPayment/nextStep',
      payload: 0,
    });
  };

  render() {
    const { payBatchNo, batchPayment = {} } = this.props;
    const { amount, count, merchantPayBatchNo, payChannelCodeName, payChannelCode } = batchPayment;
    let title = '操作成功';

    const isPingan = payChannelCode === 'PINGANYI';

    const oprateButtons = [
      <Button type="primary" key="console" onClick={this.continue}>
        再打一批
      </Button>,
      <Button
        key="buy"
        onClick={() =>
          router.push({ pathname: 'batch_payment_record_detail', query: { payBatchNo } })
        }
      >
        查看详情
      </Button>,
    ];

    if (isPingan) {
      title = '操作成功，请登录平安橙e网审核';
      oprateButtons.push(
        <Button key="buy" onClick={() => window.open('http://www.orangebank.com.cn/', '_blank')}>
          去橙e网审核
        </Button>,
      );
    }

    return (
      <>
        <Result
          status="success"
          title={title}
          subTitle="预计两小时内到账，实际时间取决于收款银行/渠道"
          extra={oprateButtons}
        >
          {isPingan && (
            <Form labelCol={{ span: 9 }} wrapperCol={{ span: 9 }}>
              <Form.Item label="打款通道">
                <Input value={payChannelCodeName} disabled />
              </Form.Item>
              <Form.Item label="商户批次号">
                <Input value={merchantPayBatchNo} disabled />
              </Form.Item>
              <Form.Item label="打款金额(元)">
                <Input value={formatCurrency(amount, 'zh-CN', 'CNY')} disabled />
              </Form.Item>
              <Form.Item label="打款笔数(笔)">
                <Input value={count} disabled />
              </Form.Item>
            </Form>
          )}
        </Result>

        <Divider />
        <Typography>
          <Title type="secondary" level={5}>
            说明
          </Title>
          <Title type="secondary" level={5}>
            银行卡通道到账时间
          </Title>
          <Text type="secondary">
            1.同行收款：实时到账。
            <br />
            2.他行收款：单笔资金5万以内的实时到帐；5万及5万以上的，法定工作日前一个自然日20:30-当日17:15预计2小时内到帐，其他时间预计第二个工作日到账。
            <br />
            3.各银行系统的处理时间不同，资金到账时间以各收款银行入账时间为准，请您根据自身需要合理安排打款时间。
          </Text>
          <Title type="secondary" level={5}>
            支付宝通道到账时间
          </Title>
          <Text type="secondary">1.实时到账：资金实时到账，付款资金实时到账，方便安全快捷。</Text>
          <Title type="secondary" level={5}>
            微信支付通道到账时间
          </Title>
          <Text type="secondary">
            1.实时到账。正常情况下企业付款至用户零钱为准实时到账，付款后稍等片刻用户即可收到付款。
            由于系统可能出现拥堵或异常，微信支付不对到账时间进行担保，具体到账时间以付款单据状态为准。
          </Text>
          <Title type="secondary" level={5}>
            平安易监管通道到账时间
          </Title>
          <Text type="secondary">
            1. 同行收款：实时到账。
            <br />
            2.他行收款：单笔资金5万以内的实时到帐；5万及5万以上的，法定工作日23:30-次日17:15预计2小时内到帐，其他时间预计第二个工作日到账。
            <br />
            3.各银行系统的处理时间不同，资金到账时间以各收款银行入账时间为准，请您根据自身需要合理安排打款时间。
            <br />
            4.注意：平安易监管通道打款后，必须登录平安橙e网审核打款订单。点击进入
            <a href="http://www.orangebank.com.cn/" target="_blank">
              平安橙e网
            </a>
            。
          </Text>
        </Typography>
      </>
    );
  }
}

export default connect(({ global, settings, batchPayment }: ModalConnectState) => ({
  batchPayment,
}))(Form.create<ResultTableProps>()(ResultTable));
