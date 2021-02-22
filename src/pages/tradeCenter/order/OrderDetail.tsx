import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';

import { Card, Collapse, Modal } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import QueryTable from '@/components/QueryTable';
import { GlobalHooks } from '@/components/GlobalContext'
import { ConnectState } from '@/models/connect';

const { Panel } = Collapse;

var template = {
  'accountName': '微贷金服',
  'payAmount': '1,000,000.00',
  'flowNo': '652222112133320',
  'orderNo': '3352442112133320',
  'createTime': '2019-09-20 20:33:42',
  'modifyTime': '2019-09-21 15:23:32',
  'uid': 112356334,
  'payChannel': '平安银行',
  'bizTypeDesc': '银企直连',
  'batchNo': '66534422445758',
  'accountNo': '6442888177772289',
  'bankName': '平安银行',
  'idNo': '500224198205239876',
  'phone': '18883999443',
  'target': '微贷金服',
  'fee': '5,000.00',
  'requestAmount': '100,000.00',
  'receipt': '665344212344223',
  'payStatusDesc': '已支付',
  'memo': '备注',
  'realAmount': '90,000.00',
  'merchantRefundFee': '4,000.00',
  'userRefundFee': '2,000.00',
  'orderStatusDesc': '',
}


export interface OrderDetail {
  accountName: string
  payAmount: string
  flowNo: string
  orderNo: string
  createTime: string
  modifyTime: string
  uid: string
  payChannel: string
  bizTypeDesc: string
  batchNo: string
  accountNo: string
  bankName: string
  idNo: string
  phone: string
  target: string
  fee: string
  requestAmount: string
  receipt: string
  payStatusDesc: string
  memo: string
  realAmount: string
  merchantRefundFee: string
  userRefundFee: string
  orderStatusDesc: string
}

export default (): React.ReactNode => {
  // useEffect()


  return (
    <PageHeaderWrapper>
      <Card title="订单信息"></Card>
      <Card title="打款金额信息"></Card>
      <Card title="收款账户"></Card>
    </PageHeaderWrapper>
  )
}