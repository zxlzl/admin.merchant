import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Modal, Steps, Descriptions, Collapse, Typography, Table,Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { credentialEnum, submitModeEnum } from '@/utils/enums';

import moment from 'moment';

const { Step } = Steps;
const { Panel } = Collapse;
const { Text } = Typography;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

// 证件类型
const credentialEnum = {
  "00": "居民身份证",
  "01": "中国护照",
}


// 详情与费用单弹窗
export default class DetailModal extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
	}
  
  queryTable: any

  async componentDidMount() { }

  /** 表格列配置 */
	columns = [
		{ width: 150,title: '单月累计收款区间',key:'minAmt', render:(row:any) => row.minAmt+'-'+row.maxAmt },
		{ title: '合作税率', dataIndex: 'currentTaxRate' },
		{ title: '增值税', dataIndex: 'vatRate' },
		{ title: '个税', dataIndex: 'taxRate' },
		{ title: '优惠减免', dataIndex: 'discountRate' },
		{ title: '核定金额(元)', dataIndex: 'currentAmt' },
		{ title: '应扣税费(元)', dataIndex: 'currentTaxAmt' },
  ]

  render() {
    const { visible, hideModal, modalType,data:modalData={} } = this.props
    const {taxOrderCostDetailList=[]} = modalData

    let currentStep:number
    const payStatus = modalData?.payStatus
    switch (String(payStatus)) {
      case '07': // 已锁定
        currentStep = 1;
        break;
      case '00': // 待打款
      case '01': // 打款中
      case '03': // 已撤销
      case '08': // 撤销中
        currentStep = 2;
        break;
      case '02': // 打款完成
        currentStep = 3;
        break;
      case '04': // 打款失败
      case '05': // 未锁定
      case '09': // 锁定中
      case '06': // 已挂起
        currentStep = 0;
        break;
      default:
        currentStep = 0;
    }

    const steps = ['已创建','已锁定','已提交打款','已打款完成']
    const showTime = [modalData?.gmtCreate,modalData?.lockTime,modalData?.payTime,modalData?.payFinishTime]

    const content = <div>累计用户实收超过限额，则计算补扣差额。服务费差额=第1档金额*差额费率=第1档金额*（第2档费率-第1档费率）</div>

    return modalType == 1 ?
      <Modal
        title="打款订单详情"
        visible={visible}
        footer={null}
        onCancel={hideModal}
        width={1100}
      >
        <Steps current={currentStep} status="process">
        {steps.map((item,index) => <Step key={index} title={item} description={showTime[index]} />)}
        </Steps>
        <Descriptions title="打款订单信息" bordered style={{ marginTop: 20 }}>
          <Descriptions.Item label="商户号" span={2}>{modalData?.merchantNo}</Descriptions.Item>
          <Descriptions.Item label="商户名称">{modalData?.merchantName}</Descriptions.Item>

          <Descriptions.Item label="代征主体" span={2}>{modalData?.collectedSubjectName}</Descriptions.Item>
          <Descriptions.Item label="打款通道">{modalData?.channelName}</Descriptions.Item>

          <Descriptions.Item label="平台批次号" span={2}>{modalData?.payBatchNo}</Descriptions.Item>
          <Descriptions.Item label="商户批次号">{modalData?.merchantPayBatchNo}</Descriptions.Item>

          <Descriptions.Item label="平台订单号" span={2}>{modalData?.payDetailNo}</Descriptions.Item>
          <Descriptions.Item label="商户订单号">{modalData?.merchantOrderNo}</Descriptions.Item>

          <Descriptions.Item label="收款用户姓名" span={2}>{modalData?.accountName}</Descriptions.Item>
          <Descriptions.Item label="收款用户手机号">{modalData?.mobile}</Descriptions.Item>

          <Descriptions.Item label="证件类型" span={2}>{credentialEnum[modalData?.identityType]}</Descriptions.Item>
          <Descriptions.Item label="证件号码">{modalData?.identityNo}</Descriptions.Item>

          <Descriptions.Item label="收款银行/渠道" span={2}>{modalData?.bankName}</Descriptions.Item>
          <Descriptions.Item label="收款账号">{modalData?.accountNo}</Descriptions.Item>

          <Descriptions.Item label="商户打款金额(元)" span={2}>{modalData?.amount}</Descriptions.Item>
          <Descriptions.Item label="用户实收金额(元)">{modalData.userActualReceiveAmount??'--'}</Descriptions.Item>

          <Descriptions.Item label="商户应付服务费(元)" span={2}>{modalData.merchantShouldFeeCost??'--'}</Descriptions.Item>
          <Descriptions.Item label="商户已抵扣服务费(元)">{modalData?.merchantOffsetFeeCost??'--'}</Descriptions.Item>

          <Descriptions.Item label="商户实付服务费(元)" span={2}>{modalData?.vatAmount??'--'}</Descriptions.Item>
          <Descriptions.Item label="用户实付服务费(元)">{modalData?.deductAmount??'--' }</Descriptions.Item>

          <Descriptions.Item label={<div>商户服务费差额(元)<Tooltip placement="top" title={content}><InfoCircleOutlined /></Tooltip></div>} span={2}>{modalData.merchantFeeCostRegionDiffer??'--'}</Descriptions.Item>
          <Descriptions.Item label="用户服务费差额(元)">{modalData.userFeeCostRegionDiffer??'--' }</Descriptions.Item>

          <Descriptions.Item label="商户服务费率" span={2}>{modalData?.merchantFeeRate??'--'}</Descriptions.Item>
          <Descriptions.Item label="用户服务费率">{modalData?.userFeeRate??'--'}</Descriptions.Item>

          <Descriptions.Item label="订单来源" span={2}>{submitModeEnum[modalData?.submitMode]}</Descriptions.Item>
          <Descriptions.Item label="订单状态">{modalData?.payStatusDesc}</Descriptions.Item>

          <Descriptions.Item label="状态描述" span={2}>{modalData?.statusDesc ? modalData?.statusDesc: '--'}</Descriptions.Item>
          <Descriptions.Item label="备注">{modalData?.memo ? modalData?.memo:'--'}</Descriptions.Item>
        </Descriptions>

      </Modal> :
      <Modal
        title="查看费用单"
        visible={visible}
        footer={null}
        onCancel={hideModal}
        width={700}
      >
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          <Panel header="税费计算规则" key="1" style={customPanelStyle}>
            <Typography>
              <Text>
              1.应扣税费=收款金额*合作税率=收款金额*（增值税+个税-优惠减免）。税率是按用户在同一代征主体单月累计收款金额来核定不同区间。
            </Text>
              <br />
              <Text>
              2.应扣服务费=收款金额*合作服务费率。
            </Text>
            </Typography>
          </Panel>
        </Collapse>
        <Descriptions bordered style={{ marginTop: 20 }}>
          <Descriptions.Item label="收款方姓名" span={2}>{modalData?.accountName}</Descriptions.Item>
          <Descriptions.Item label="收款金额(元)">{modalData?.amount}</Descriptions.Item>

          <Descriptions.Item label="合作税率" span={2}>{modalData?.vatRateMemo}</Descriptions.Item>
          <Descriptions.Item label="合作服务费率">{modalData?.deductRate}</Descriptions.Item>

          <Descriptions.Item label="实收税费(元)" span={2}>{modalData?.vatAmount}</Descriptions.Item>
          <Descriptions.Item label="实收服务费(元)">{modalData?.deductAmount}</Descriptions.Item>
        </Descriptions>
        <br />
        <Table title={()=>"税费明细"} columns={this.columns} dataSource={taxOrderCostDetailList} pagination={false} bordered={true} scroll={{ x: 'max-content' }} />
      </Modal>;
  }

}