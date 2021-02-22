import React from 'react';
import {
  Divider,
  Steps,
  Spin,
  Button,
  Descriptions,
  Collapse,
  Typography,
  Table,
  Card,
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { transformBlobToFile } from '@/utils/utils';
import { exportPayBatchDetail } from '@/components/api/remit/export';
import styles from './style.less';

import moment from 'moment';

const { Step } = Steps;

// 打款通道
const payChannelEnum = {
  BANKCHANNEL: '普通银行通道',
  ALIPAY: '支付宝通道',
};

// 提交方式
const submitWay = {
  '0': '商户平台',
  '1': 'api',
};

export default class DetailModal extends React.Component {
  state = {
    loading: false,
  };

  /**
   * 导出批次详情
   */
  exportItem = async (item: any) => {
    const { merchantNo, payBatchNo, gmtCreate } = item;
    const params = {
      payBatchNo,
      merchantNo,
    };
    this.setState({
      loading: true,
    });
    const res = await exportPayBatchDetail(params, undefined, undefined, { responseType: 'blob' });
    res &&
      this.setState({
        loading: false,
      });
    // let time = gmtCreate.slice(0,10)
    transformBlobToFile(res, `财云科技批次详情文件_${item.payBatchNo}`);
  };

  render() {
    // detailType 1：批量打款记录详情跳转页面
    const { loading } = this.state;
    const { batchData, noPassModal, noStep, detailType } = this.props;
    const payStatus = batchData?.payStatus;
    let current = 0;
    switch (payStatus) {
      case '00':
      case '07':
        current = 0;
        break;
      case '01':
        current = 1;
        break;
      case '02':
      case '03':
      case '09':
        current = 2;
        break;
      case '04':
      case '06':
        current = 3;
        break;
      default:
        break;
    }

    const steps = ['已创建', '已锁定批次', '已提交打款批次', '已全部完成'];
    const showTime = [
      batchData?.gmtCreate,
      batchData?.lockTime,
      batchData?.payTime,
      batchData?.payFinishTime,
    ];

    return (
      <Spin spinning={loading} tip="正在导出文件...">
        {!noStep && (
          <Card title="打款批次进度" style={{ marginBottom: 32 }}>
            <Steps current={current} status="process">
              {steps.map((item, index) => (
                <Step title={item} description={showTime[index]} />
              ))}
            </Steps>
          </Card>
        )}
        <Card
          style={{ marginBottom: 32 }}
          title="打款批次信息"
          extra={
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => {
                this.exportItem(batchData);
              }}
            >
              导出批次详情文件
            </Button>
          }
        >
          {detailType == 1 ? (
            <Descriptions bordered style={{ marginTop: 20 }}>
              <Descriptions.Item label="商户名称">{batchData?.merchantName}</Descriptions.Item>
              <Descriptions.Item label="代征主体" span={2}>
                {batchData?.collectedSubjectName}
              </Descriptions.Item>
              <Descriptions.Item label="打款通道">
                {payChannelEnum[batchData?.payChannelCode]}
              </Descriptions.Item>
              <Descriptions.Item label="出款账户" span={2}>
                {batchData?.payChannelCodeName}
              </Descriptions.Item>
              <Descriptions.Item label="商户批次号">
                {batchData?.merchantPayBatchNo}
              </Descriptions.Item>
              <Descriptions.Item label="平台批次号" span={2}>
                {batchData?.payBatchNo}
              </Descriptions.Item>
              <Descriptions.Item label="提交方式">
                {submitWay[batchData?.submitMode]}
              </Descriptions.Item>
              <Descriptions.Item label="批次状态" span={2}>
                {batchData?.payStatusDesc}
              </Descriptions.Item>
              <Descriptions.Item label="总笔数">{batchData?.count}</Descriptions.Item>
              <Descriptions.Item label="总金额(元)" span={2}>
                {batchData?.totalAmount}
              </Descriptions.Item>
              <Descriptions.Item label="成功笔数">{batchData?.sucNumbers}</Descriptions.Item>
              <Descriptions.Item label="成功金额(元)" span={2}>
                {batchData?.sucAmount}
              </Descriptions.Item>
              <Descriptions.Item label="失败笔数">
                {batchData?.failNumbers || 0}{' '}
                {batchData?.failNumbers ? (
                  <a
                    onClick={() => {
                      noPassModal(1);
                    }}
                  >
                    查看打款失败详情
                  </a>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item label="失败金额(元)" span={2}>
                {batchData?.failAmount || 0}
              </Descriptions.Item>
              <Descriptions.Item label="挂起笔数">
                {batchData?.hangupNumbers}{' '}
                {batchData?.hangupNumbers ? (
                  <a
                    onClick={() => {
                      noPassModal(2);
                    }}
                  >
                    查看异常挂起详情
                  </a>
                ) : (
                  ''
                )}{' '}
              </Descriptions.Item>
              <Descriptions.Item label="挂起金额(元)" span={2}>
                {batchData?.hangupAmount}
              </Descriptions.Item>
              <Descriptions.Item label="处理中笔数">
                {batchData?.processNumbers || 0}
              </Descriptions.Item>
              <Descriptions.Item label="处理中金额(元)" span={2}>
                {batchData?.processAmount || 0}
              </Descriptions.Item>
              <Descriptions.Item label="状态描述">{batchData?.statusDesc}</Descriptions.Item>
              <Descriptions.Item label="打款依据文件">
                <a onClick={() => this.props.controlPayBase(true)}>查看</a>
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Descriptions bordered style={{ marginTop: 20 }}>
              <Descriptions.Item label="商户名称">{batchData?.merchantName}</Descriptions.Item>
              <Descriptions.Item label="代征主体" span={2}>
                {batchData?.collectedSubjectName}
              </Descriptions.Item>
              <Descriptions.Item label="打款通道">
                {payChannelEnum[batchData?.payChannelCode]}
              </Descriptions.Item>
              <Descriptions.Item label="打款户名" span={2}>
                {batchData?.merchantName}
              </Descriptions.Item>
              <Descriptions.Item label="商户批次号">
                {batchData?.merchantPayBatchNo}
              </Descriptions.Item>
              <Descriptions.Item label="平台批次号" span={2}>
                {batchData?.payBatchNo}
              </Descriptions.Item>
              <Descriptions.Item label="提交方式">
                {submitWay[batchData?.submitMode]}
              </Descriptions.Item>
              <Descriptions.Item label="批次状态" span={2}>
                {batchData?.payStatusDesc}
              </Descriptions.Item>
              <Descriptions.Item label="总笔数">{batchData?.count}</Descriptions.Item>
              <Descriptions.Item label="总金额(元)" span={2}>
                {batchData?.totalAmount}
              </Descriptions.Item>
              <Descriptions.Item label="可打款笔数(笔)">{batchData?.sucNumbers}</Descriptions.Item>
              <Descriptions.Item label="可打款金额(元)" span={2}>
                {batchData?.sucAmount}
              </Descriptions.Item>
              <Descriptions.Item label="挂起笔数(笔)">
                {batchData?.hangupNumbers}{' '}
                {batchData?.hangupNumbers ? (
                  <a
                    onClick={() => {
                      noPassModal(2);
                    }}
                  >
                    查看异常挂起详情
                  </a>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item label="挂起金额(元)" span={2}>
                {batchData?.hangupAmount}
              </Descriptions.Item>
              <Descriptions.Item label="处理中笔数">
                {batchData?.processNumbers || 0}
              </Descriptions.Item>
              <Descriptions.Item label="处理中金额(元)" span={2}>
                {batchData?.processAmount || 0}
              </Descriptions.Item>
              <Descriptions.Item label="应扣总税费">{batchData?.totalTaxFee}</Descriptions.Item>
              <Descriptions.Item label="应扣总服务费(元)" span={2}>
                {batchData?.totalServiceFee}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="状态描述">
                {batchData?.statusDesc}
              </Descriptions.Item>
              {/* <Descriptions.Item label="打款依据文件"><a onClick={controlPayBase(true)}>查看</a></Descriptions.Item> */}
            </Descriptions>
          )}
        </Card>
      </Spin>
    );
  }
}
