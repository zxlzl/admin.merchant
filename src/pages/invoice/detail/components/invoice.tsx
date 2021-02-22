import { Descriptions } from 'antd';
import React, { Component } from 'react';

import { GlobalContext } from '@/components/GlobalContext';

import { Steps } from 'antd';


import { taxpayerType, invoiceMedium, invoiceType, InvoiceStatus } from '../../enums';

interface InvoiceProps {
  invoiceDetail: {};
  setParentState: (commonState: {}) => void;
}

const { Step } = Steps;

class Invoice extends Component<InvoiceProps> {
  view: HTMLDivElement | undefined = undefined;
  static contextType = GlobalContext;
  state = {};

  async componentDidMount() {}

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  render() {
    const { invoiceDetail = {} } = this.props;
    const { invoiceStatus } = invoiceDetail;
    const currentStep = {
      [InvoiceStatus.INIT]: 0, // 初始
      [InvoiceStatus.INVOICING]: 1, // 开票中
      [InvoiceStatus.INVOICED]: 2, // 已开票
      [InvoiceStatus.CANCEL]: 1, // 已撤销
      [InvoiceStatus.REJECT]: 1, // 已驳回
      [InvoiceStatus.REFUNDING]: 2, // 退票中
      [InvoiceStatus.OBSOLETE]: 2, // 已作废
    };
    let title = '已开票';
    let timeStr = 'invoicingTime';
    if (invoiceStatus) {
      switch (Number(invoiceStatus)) {
        case 4:
          title = '退票中';
          break;
        case 5:
          title = '已作废';
          timeStr='refundTime'
          break;
        case 6:
          title = '已撤销';
          timeStr='cancelTime'
          break;
        case 7:
          title = '已驳回';
          timeStr='rejectedTime'
          break;
        default:
          break;
      }
    }

    const renderStep = () => {
      return (
        <div>
          <Steps current={currentStep[invoiceStatus] || 0} style={{ marginBottom: 24 }}>
            <Step title="已申请" description={invoiceDetail['applyTime']} />
            <Step title="开票中" />
            <Step title={title} description={invoiceDetail[timeStr]} />
          </Steps>
        </div>
      )
    };
    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        {renderStep()}
        <Descriptions title="商户信息" column={2}>
          <Descriptions.Item label="商户ID">{invoiceDetail['merchantNo']}</Descriptions.Item>
          <Descriptions.Item label="商户名称">{invoiceDetail['merchantName']}</Descriptions.Item>
          <Descriptions.Item label="代征主体">
            {invoiceDetail['collectedSubjectName']}
          </Descriptions.Item>
          <Descriptions.Item label="纳税人主体类型">
            {invoiceDetail['taxpayerType'] ? taxpayerType[invoiceDetail['taxpayerType']] : ''}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="申请信息" column={2}>
          <Descriptions.Item label="申请单号">{invoiceDetail['applyNo']}</Descriptions.Item>
          <Descriptions.Item label="发票总金额">{invoiceDetail['invoiceAmount']}</Descriptions.Item>
          <Descriptions.Item label="发票数量">{invoiceDetail['invoiceQuantity']}</Descriptions.Item>
          <Descriptions.Item label="开票内容">{invoiceDetail['invoiceContent']}</Descriptions.Item>
          <Descriptions.Item label="发票介质">
            {invoiceMedium[invoiceDetail['invoiceMedium']]}
          </Descriptions.Item>
          <Descriptions.Item label="开票模式">{invoiceDetail['invoiceModeName']}</Descriptions.Item>
          <Descriptions.Item label="物流公司">
            {invoiceDetail['logisticsCompany']}
          </Descriptions.Item>
          <Descriptions.Item label="快递编号">{invoiceDetail['fastMailNo']}</Descriptions.Item>
          <Descriptions.Item label="备注">{invoiceDetail['applyRemark']}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="纳税人开票信息" column={2}>
          <Descriptions.Item label="开票类型">
            {invoiceType[invoiceDetail['invoiceType']]}
          </Descriptions.Item>
          <Descriptions.Item label="发票抬头">{invoiceDetail['invoiceTitle']}</Descriptions.Item>
          <Descriptions.Item label="纳税人识别号">
            {invoiceDetail['taxpayerRegistNo']}
          </Descriptions.Item>
          <Descriptions.Item label="营业执照注册地址">
            {invoiceDetail['busiLicenseRegistAddr']}
          </Descriptions.Item>
          <Descriptions.Item label="发票打印电话">
            {invoiceDetail['invoicePrintingPhone']}
          </Descriptions.Item>
          <Descriptions.Item label="开户银行">{invoiceDetail['bankName']}</Descriptions.Item>
          <Descriptions.Item label="银行账号">{invoiceDetail['bankAccountNo']}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="发票收件人信息" column={2}>
          <Descriptions.Item label="收件人姓名">{invoiceDetail['receiverName']}</Descriptions.Item>
          <Descriptions.Item label="收件人联系电话">
            {invoiceDetail['receiverPhone']}
          </Descriptions.Item>
          <Descriptions.Item label="收件人所在地区">{`${invoiceDetail['receiverAreaProvince'] ||
            ''} / ${invoiceDetail['receiverAreaCity'] || ''} / ${invoiceDetail[
            'receiverAreaDistrict'
          ] || ''}`}</Descriptions.Item>
          <Descriptions.Item label="收件人详细地址">
            {invoiceDetail['receiverDetailAddress']}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default Invoice;
