import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';


import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';


import {
  Card,
  Typography,
  Divider,
  Statistic,
  Button,
  Modal,
  Steps,
  Collapse,
  Input,
  Upload,
} from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import QueryTable from '@/components/QueryTable';
import UploadFile from './uploadFile'
import LockTable from './lockTable'
import PayTable from './payTable'
import ResultTable from './ResultTable'

import { GlobalHooks, GlobalContextProps, GlobalContext } from '@/components/GlobalContext';
import { ConnectState } from '@/models/connect';
import { TableStateFilters } from 'antd/lib/table';
import { ModalConnectState } from './data'



const { Step } = Steps;
const { Panel } = Collapse;
const { Text } = Typography;
const { confirm } = Modal;
const FormItem = Form.Item;

const stepStyle = {
  marginBottom: 60,
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
};

class BatchPayment extends React.Component<BatchPaymentProps, BatchPaymentState> {
  state: BatchPaymentState = {
    batchList: [], // 批次列表
  };

  async componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'batchPayment/fetchCurrentBatch'
    })
  }

  render() {
    const { batchPayment: { currentStep, showLockButton, payStatus, showPayButton, payBatchNo, statistics, merchantNo, } } = this.props
    const commonProps = { showPayButton, showLockButton, payStatus, payBatchNo, statistics, merchantNo }
    return (
      <PageHeaderWrapper>
        <Card>
          <Steps type="navigation" style={stepStyle} current={currentStep}>
            <Step status="finish" title="上传数据" />
            <Step status={currentStep === 1 ? 'process' : currentStep === 0 ? 'wait' : 'finish'} title="锁定批次" />
            <Step title="确认打款" />
            <Step title="查看结果" />
          </Steps>

          <div>
            {currentStep === 0 ? <UploadFile /> : ''}
            {currentStep === 1 && payBatchNo ? <LockTable {...commonProps} /> : ''}
            {currentStep === 2 && payBatchNo ? <PayTable {...commonProps} /> : ''}
            {currentStep === 3 && payBatchNo ? <ResultTable {...commonProps} /> : ''}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ global, settings, batchPayment }: ModalConnectState) => ({
  batchPayment
}))(BatchPayment);
