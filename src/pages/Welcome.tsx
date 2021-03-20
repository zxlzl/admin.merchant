import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import G2 from '@antv/g2';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import { Card, Typography, Statistic, Button, Modal, Steps, Collapse, Input, Col, Row } from 'antd';

import { ConnectState } from '@/models/connect';
import banner from '@/assets/banner.png';
import styles from './Welcome.less';

import { queryBalanceByMerchantAndAccountType } from '@/components/api/remit/merchant';

import qrcodeimg from './images/qrcode.png';

const { Text } = Typography;

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  state: WelcomeState = {};

  async componentDidMount() {
    const merchantNo = localStorage.getItem('merchant_no');

    const { data: accountData = {} } = await queryBalanceByMerchantAndAccountType({
      merchantNo,
      accountType: '69', // 余额账户类型
    });

    this.setState({ accountData });
    const Shape = G2.Shape;
    // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
    var sliceNumber = 0.01;

    // 自定义 other 的图形，增加两条线
    Shape.registerShape('interval', 'sliceShape', {
      draw: function draw(cfg: any, container: any) {
        var points = cfg.points;
        var path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push(['L', points[1].x, points[1].y - sliceNumber]);
        path.push(['L', points[2].x, points[2].y - sliceNumber]);
        path.push(['L', points[3].x, points[3].y]);
        path.push('Z');
        path = this.parsePath(path);
        return container.addShape('path', {
          attrs: {
            fill: cfg.color,
            path: path,
          },
        });
      },
    });

    const chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: 100,
      padding: [10, 10, 10, 10],
    });

    let data; // 图标数据

    // 账户总余额不为0时展示可用余额和冻结余额图标
    if (accountData.acctAmt) {
      data = [
        {
          type: '可用余额',
          value: accountData.availBalance,
        },
        {
          type: '冻结金额',
          value: accountData.freezeAmt,
        },
      ];
    } else {
      // 账户余额为0时只展示账户余额单条数据
      data = [
        {
          type: '账户总额',
          value: 1, // 撑满圆环，更改tooltip展示实际金额
        },
      ];
    }

    chart.source(data);
    chart.legend(false);
    chart.coord('theta', {
      innerRadius: 0.75,
    });
    chart
      .intervalStack()
      .position('value')
      .color('type', function(type: any) {
        if (type == '冻结金额' || type == '账户总额') return '#DCE8FC';
        return '#317FFF';
      })
      .tooltip('type*value', function(type: any, value: any) {
        if (type == '账户总额') {
          return {
            title: '账户总额',
            value: '0',
          };
        }
        return {
          title: type,
          value,
        };
      })
      .shape('sliceShape');

    // if (accountData.acctAmt) chart.intervalStack().position('value').shape('sliceShape')

    chart.render();
  }

  render() {
    const { currentUser } = this.props;
    const { accountData = {} } = this.state;
    return (
      // <PageHeaderWrapper>
      <div>
        <Card bordered={false} className={styles.card}>
          <img src={banner} className={styles.banner}></img>
          <div className={styles.user}>{currentUser?.collectedSubjectName}</div>
          <div className={styles.accountInfo}>
            <div className={styles.chart} id="mountNode"></div>
            <div className={styles.balances}>
              <div className={styles.vertical}>
                <Statistic title="账户余额:" prefix="￥" value={accountData.availBalance} />
              </div>
              <div className={styles.horizon}>
                <Statistic title="冻结金额:" prefix="￥" value={accountData.freezeAmt} />
                <Statistic title="账户总额:" prefix="￥" value={accountData.acctAmt} />
              </div>
            </div>
            <div className={styles.rightButtons}>
              <div style={{ marginBottom: 8 }}>
                <Button
                  type="primary"
                  style={{ marginRight: '12px' }}
                  onClick={() => {
                    router.push('/fund_mange/account');
                  }}
                >
                  充值
                </Button>
                {/* <Button>转账</Button> */}
              </div>
              <Text type="secondary">适用于个体工商业者的银行卡打款</Text>
            </div>
          </div>
        </Card>
        <Card title="常用功能" className={styles.card}>
          <Row justify="space-between">
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-1.png')}
                srcSet={require('./images/icon-1@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/order_manage/batch_payment');
                }}
              >
                批量发放
              </a>
            </Col>
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-2.png')}
                srcSet={require('./images/icon-2@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/order_manage/hang_up_list');
                }}
              >
                挂起订单
              </a>
            </Col>
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-3.png')}
                srcSet={require('./images/icon-3@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/order_manage/batch_payment_record');
                }}
              >
                发放批次
              </a>
            </Col>
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-1.png')}
                srcSet={require('./images/icon-1@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/order_manage/order_list');
                }}
              >
                发放明细
              </a>
            </Col>
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-2.png')}
                srcSet={require('./images/icon-2@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/fund_mange/account');
                }}
              >
                账户充值
              </a>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-3.png')}
                srcSet={require('./images/icon-3@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/fund_mange/account_flow');
                }}
              >
                资金账务
              </a>
            </Col>
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-1.png')}
                srcSet={require('./images/icon-1@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/invoice/application');
                }}
              >
                发票申请
              </a>
            </Col>
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-2.png')}
                srcSet={require('./images/icon-2@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/invoice/list');
                }}
              >
                发票列表
              </a>
            </Col>
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-3.png')}
                srcSet={require('./images/icon-3@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/userMng/cardList/taxForMerchant');
                }}
              >
                个人设置
              </a>
            </Col>
            <Col className={styles.item} span={4}>
              <img
                className={styles.icon}
                src={require('./images/icon-1.png')}
                srcSet={require('./images/icon-1@2x.png')}
                alt=""
              />
              <a
                className={styles.link}
                onClick={() => {
                  router.push('/setting/merchant');
                }}
              >
                商户设置
              </a>
            </Col>
          </Row>
        </Card>
        <Card title="商户服务">
          <img className={styles.qrcode} src={qrcodeimg} />
        </Card>
      </div>
      // </PageHeaderWrapper>
    );
  }
}

export default connect(({ global, settings, user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(Welcome);
