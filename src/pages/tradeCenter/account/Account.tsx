import React from 'react';
import '@ant-design/compatible/assets/index.css';
import { bizTypeEnums, accoutStatusEnums } from '@/utils/enums';
import { Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import router from 'umi/router';
import moment from 'moment';
import styles from './index.less';

import {
  Card,
  Typography,
  List,
  Statistic,
  Button,
  Modal,
  Col,
  Row,
  Descriptions,
  Steps,
  Divider,
  Spin,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import QueryTable from '@/components/QueryTable';
import { GlobalContextProps, GlobalContext } from '@/components/GlobalContext';
import { TableStateFilters } from 'antd/lib/table';
import { formatCurrency, transformBlobToFile } from '@/utils/utils';

import { queryBalanceByMerchantAndAccountType } from '@/components/api/remit/merchant';
import { queryAllAvailable } from '@/components/api/remit/account';
import { getList, getOne, export_1 } from '@/components/api/remit/fundOperation';
const { Paragraph, Text } = Typography;

import yinlian from '@/assets/yinlian.svg';
import weixin from '@/assets/wx.svg';
import zhifubao from '@/assets/zhifubao.svg';
import chenge from '@/assets/chenge.png';

const { Step } = Steps;

export default class Account extends React.Component<AccountProps, AccountState> {
  static contextType = GlobalContext;

  state: AccountState = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    queryOptions: {
      bizType: [
        ...Object.keys(bizTypeEnums).map(key => {
          return { code: key, desc: bizTypeEnums[key] };
        }),
      ],
      status: [
        ...Object.keys(accoutStatusEnums).map(key => {
          return { code: key, desc: accoutStatusEnums[key] };
        }),
      ],
    },
    exportFileloading: false,
  };

  queryTable: any;

  async componentDidMount() {
    const merchantNo = localStorage.getItem('merchant_no');
    const { data: accountData = {} } = await queryBalanceByMerchantAndAccountType({
      merchantNo,
      accountType: '69', // 银行卡余额账户类型
    });
    const { data: aliPayAccountData = {} } = await queryBalanceByMerchantAndAccountType({
      merchantNo,
      accountType: '73', // 支付宝余额账户类型
    });
    const { data: weChatPayData = {} } = await queryBalanceByMerchantAndAccountType({
      merchantNo,
      accountType: '81', // 微信余额账户类型
    });
    const { data: pinganyiData = {} } = await queryBalanceByMerchantAndAccountType({
      merchantNo,
      accountType: '83', // 平安易余额账户类型
    });
    this.setState({ accountData, aliPayAccountData, weChatPayData, pinganyiData });

    const { data = [] } = await queryAllAvailable();
    this.setState(prev => {
      const { queryOptions = {} } = prev;
      return {
        queryOptions: {
          ...queryOptions,
          outAccount: data.map(d => {
            return { code: d.merchantAccountNo, desc: d.merchantAccountName };
          }),
        },
      };
    });
  }

  /**
   * 异步加载表格数据
   *
   * @memberof ActionTable
   */
  loadData = async (options: TableStateFilters) => {
    // 拼装请求参数
    const cloneOptions = { ...options } as any;
    // 格式化时间段

    if (options.filterTime && options.filterTime.length) {
      cloneOptions.startTime = moment(options.filterTime[0])
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.endTime = moment(options.filterTime[1])
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page;
    delete cloneOptions.pageSize;
    delete cloneOptions.filterTime;
    const merchantNo = localStorage.getItem('merchant_no');
    const params = {
      ...cloneOptions,
      merchantNo,
      // accountType: '69', // 账户类型 69: 余额账户 72:抵扣账户
      curPage: options.page,
      pageSize: options.pageSize,
    };
    const {
      data: { list = [], recordCount },
    } = await getList(params);

    this.setState({
      tableData: { rows: list, pagination: { total: recordCount } },
      params,
    });
  };

  /**
   * 展示充值账户信息
   *
   * @memberof Account
   */
  showAccountDetail = async (type: string) => {
    const { showModal, closeModal } = this.context;
    const {
      accountData = {},
      aliPayAccountData = {},
      weChatPayData = {},
      pinganyiData = {},
    } = this.state;
    let showData = {};
    switch (type) {
      case 'bank':
        showData = accountData;
        break;
      case 'alipay':
        showData = aliPayAccountData;
        break;
      case 'wechatPay':
        showData = weChatPayData;
        break;
      case 'pinganePay':
        showData = pinganyiData;
        break;
      default:
        break;
    }
    const one = (
      <div>
        登录贵公司对公账户所在银行的网上银行（网银）或手机银行，进入银行转账功能。
        <br />
        请勿使用柜台现金或其他第三方平台汇款。
      </div>
    );
    const two = (
      <div>
        将以下信息复制到网银转账的收款信息。
        <br />
        <div className={styles.accoutbox}>
          <h4>汇款充值专用账户</h4>
          <Descriptions title="" column={2}>
            <Descriptions.Item label="银行户名">
              <Paragraph copyable={showData.collectedSubjectName}>
                {showData.collectedSubjectName}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="银行账号">
              <Paragraph copyable={showData.subAccountNo}>{showData.subAccountNo}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="开户银行">
              <Paragraph copyable={showData.openedBank}>{showData.openedBank}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="开户支行">
              <Paragraph copyable={showData.bankBranch}>{showData.bankBranch}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item column={1} label="转账附言(用途)">
              <Paragraph copyable={showData.purpose}>{showData.purpose}</Paragraph>
              {type !== 'pinganePay' && (
                <span className={styles.memo}>
                  (汇款时请务必填写以上用途，以充值到对应的通道账户)
                </span>
              )}
              {type == 'pinganePay' && (
                <span className={styles.memo}>
                  (汇款充值时请务必使用办理监管账户时配置的来款账户进行转账)
                </span>
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
    const finish = (
      <div>
        到账后自动认领至对应本地商户账户余额。
        <br />
        资金预计工作时间2小时内到账，非工作时间最晚下个工作日到账，具体以转出银行系统处理为准。
        <a
          href="https://www.yuque.com/docs/share/e5e7643b-20c1-4d81-88a4-80d0092af3be?#"
          target="_blank"
        >
          了解详细的银行到账规则
        </a>
      </div>
    );
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '汇款充值',
        footer: null,
        width: 700,
        onCancel: () => closeModal(), // 取消事件
      };

      return (
        <Modal {...modalProps}>
          <h4 className={styles.title}>本地充值账户</h4>
          <div className={styles.itemName} style={{ marginBottom: '20px', textAlign: 'center' }}>
            <span className={styles.itemTitle}>账户名：</span>
            {showData.title}
          </div>
          <h4 className={styles.title}>汇款充值流程</h4>
          <Steps current={-1} size="small" direction="vertical" className={styles.stepItem}>
            <Step key="one" status="process" title="打开银行APP或网银" description={one} />
            <Step key="two" status="process" title="汇款到以下专用账户" description={two} />
            <Step key="three" status="process" title="完成" description={finish} />
          </Steps>
          <Divider />
          <Card bordered={false} title="" size="small">
            <List size="small" split={false} header={<Text strong>说明</Text>}>
              <Text>
                1.请使用网银对公充值，充值金额在100万元（含）以下，不受时间限制，预计2小时内到账。
              </Text>
              <br />
              <Text>
                2.充值金额在100万元以上，法定工作日23:30～次日17:15充值预计2小时内到账，其他时间充值预计第二个工作日到账。
              </Text>
              <br />
              <Text>
                3.各银行系统的处理时间不同，充值资金到账时间以各收款银行入账时间为准，请您根据自身需要合理安排充值时间。
              </Text>
              <br />
              {type !== 'pinganePay' && (
                <Text>4.对公充值请备注“用途”，如未备注默认充值至“银行卡通道账户”。</Text>
              )}
            </List>
          </Card>
          {/* <Card bordered={false} title="付款账户信息" size="small">
          <Descriptions title="">
            <Descriptions.Item label="账户名称">Zhou Maomao</Descriptions.Item>
          </Descriptions>
        </Card> */}
        </Modal>
      );
    });
  };

  /**
   * 展示资金操作记录详情
   * @param row
   */
  showAcountRecord = async (row: Row) => {
    const { showModal, closeModal } = this.context;
    const { data = {} } = await getOne(row.id);
    const { claimStatus } = data;
    let current = -1;
    switch (claimStatus) {
      case 0 || 2:
        current = 0;
        break;
      case 1:
        current = 1;
        break;
      default:
        current = 0;
        break;
    }
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '资金操作记录详情',
        footer: null,
        width: 800,
        onCancel: () => closeModal(), // 取消事件
      };
      return (
        <Modal {...modalProps}>
          <div className={styles.steps}>
            <Steps current={current}>
              <Step title="已发起" description={data?.transDate} />
              <Step title="已完成" description={data?.gmtModified} />
            </Steps>
          </div>
          <Descriptions style={{ marginTop: '30px' }} title="资金操作业务记录" bordered column={2}>
            <Descriptions.Item label="业务订单号">{data.bankBizOrderNo ?? '--'}</Descriptions.Item>
            {/* <Descriptions.Item label="资金流水单号">{}</Descriptions.Item> */}

            <Descriptions.Item label="付款账户">{data.outAccountName ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="收款账户">{data.intoAccountName ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="业务类型">{data.bizTypeName ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="金额(元)">{data.tradeAmount ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="状态">{data.claimStatusName ?? '--'}</Descriptions.Item>
            {/* <Descriptions.Item label="状态描述">{}</Descriptions.Item> */}

            <Descriptions.Item label="操作附言">{data.operationPs ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="操作员">{data.operator ?? '--'}</Descriptions.Item>

            <Descriptions.Item label="操作备注">{data.operationRemark ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="备注">{data.memo ?? '--'}</Descriptions.Item>
          </Descriptions>
        </Modal>
      );
    });
  };

  /** 表格筛选条件 */
  querys = [
    { label: '付款账户', name: 'outAccount', type: 'select' },
    {
      label: '记账时间',
      name: 'filterTime',
      type: 'rangedatepicker',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { label: '业务订单号', name: 'bankBizOrderNo', type: 'text' },
    { label: '业务类型', name: 'bizType', type: 'select' },
    { label: '入款账户', name: 'inAccountName', type: 'text' },
    { label: '金额范围', names: ['startAmount', 'endAmount'], type: 'rangeData' },
    // { label: '起始金额', name: 'startAmount', type: 'text' },
    // { label: '截止金额', name: 'endAmount', type: 'text' },
    { label: '状态', name: 'status', type: 'select' },
  ];

  /** 表格列配置 */
  columns = [
    { title: '发起时间', dataIndex: 'transDate', key: 'transDate' },
    {
      title: '业务订单号',
      dataIndex: 'bankBizOrderNo',
      key: 'bankBizOrderNo',
      render: (val: any) => val ?? '--',
    },
    { title: '业务类型', dataIndex: 'bizTypeName', key: 'bizTypeName' },
    { title: '出款账户', dataIndex: 'outAccountName', key: 'outAccountName' },
    { title: '入款账户', dataIndex: 'intoAccountName', key: 'intoAccountName' },
    {
      title: '金额(元)',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      render: (val: any) => formatCurrency(val, 'zh-CN', 'CNY'),
    },
    { title: '状态', dataIndex: 'claimStatusName', key: 'claimStatusName' },
    {
      title: '操作',
      key: 'opt',
      fixed: 'right',
      render: (row: any) => (
        <div>
          <a onClick={() => this.showAcountRecord(row)}>详情</a>
        </div>
      ),
    },
  ];

  choose = (index: number) => {
    this.setState({
      index,
    });
  };

  exportAccountRecord = async () => {
    const query = this.state?.params || {};
    this.setState({
      exportFileloading: true,
    });
    setTimeout(() => {
      this.setState({
        exportFileloading: false,
      });
    }, 5000);
    const res = await export_1(query, undefined, undefined, { responseType: 'blob' });
    this.setState({
      exportFileloading: false,
    });
    let timeRange = '全量';
    if (query.startTime) {
      const { startTime, endTime } = query;
      timeRange = startTime.slice(0, 10) + '-' + endTime.slice(0, 10);
    }
    const { merchant_no } = localStorage;
    transformBlobToFile(res, `财云科技资金记录文件_${merchant_no}_${timeRange}`);
  };

  getCash = () => {
    Modal.info({
      title: '提现说明',
      content: (
        <div>
          <p>请联系您的商务经理，发起工单流程，审批通过后将退回到您的结算账户。</p>
        </div>
      ),
      okText: '我知道了',
      onOk() {},
    });
  };

  goTrans = () => {
    router.push('/fund_mange/account/transfer');
  };

  render() {
    const {
      tableData,
      accountData = {},
      aliPayAccountData = {},
      weChatPayData = {},
      pinganyiData = {},
      index,
      queryOptions,
      exportFileloading,
    } = this.state;
    const tableProps = {
      cardTitle: '资金操作记录',
      extra: (
        <Button type="primary" onClick={this.exportAccountRecord} icon={<DownloadOutlined />}>
          下载资金操作记录文件
        </Button>
      ),
      tableData, // 表格数据
      // tableHeader: () => `累计充值 ${}元，实际到账 ${}元`,
      // loading, // 请求状态
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'id', // 表格行ID
      options: queryOptions, // 表格筛选条件下拉枚举配置
    };

    const pinganyiText = (
      <div>
        平安易监管通道，是宫薪记平台与平安银行合作的资
        金监管通道模式。使用平安易监管通道，您的资金处
        于平安银行交易资金监管总分账户体系下，能够有效 保证资金安全。具体
        <a
          href="https://www.yuque.com/docs/share/02125aa1-4e63-4f04-a61b-2490935242bf?# 《平安易监管通道说明》"
          target="_blank"
        >
          点击查看
        </a>
      </div>
    );

    const frozenAmount =
      '冻结金额，是指提交打款时，系统冻结该批次的用户实收金额与应收费用。等打款完成后，成功的订单扣减对应的用户实收金额和应收费用，失败的订单冻结对应的用户实收金额和应收费用。';
    return (
      <PageHeaderWrapper>
        <Card bordered={false} title="资金账户" style={{ marginBottom: 20 }}>
          <div className={styles.box}>
            <Card
              onClick={() => this.choose(0)}
              style={{ borderColor: index == 0 ? '#108ee9' : '' }}
              className={styles.card}
            >
              <img className={styles.logo} src={yinlian}></img>
              <Text strong>{accountData.title}</Text>
              <Statistic
                className={styles.statistic}
                title=""
                value={accountData.availBalance}
                precision={2}
                prefix={'￥'}
              />
              <div className={styles.money}>
                <Text strong>
                  冻结金额{' '}
                  <Popover
                    overlayStyle={{ width: 300 }}
                    color="#fff"
                    placement="top"
                    content={frozenAmount}
                  >
                    <InfoCircleOutlined />
                  </Popover>
                  ：{formatCurrency(accountData.freezeAmt, 'zh-CN', 'CNY')}{' '}
                </Text>
                <Text strong>账户总额：{formatCurrency(accountData.acctAmt, 'zh-CN', 'CNY')}</Text>
              </div>
              <div style={{ margin: '10px 0' }}>
                <Button
                  type="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => this.showAccountDetail('bank')}
                >
                  充值
                </Button>
                <Button style={{ marginRight: '10px' }} onClick={this.goTrans}>
                  转账
                </Button>
                <Button onClick={this.getCash}>提现</Button>
              </div>
              <Text type="secondary">适用于个体工商业者的银行账户收款</Text>
            </Card>

            {/* <Card
              onClick={() => this.choose(2)}
              style={{ borderColor: index == 2 ? '#108ee9' : '' }}
              className={styles.card}
            >
              <img className={styles.logo} src={zhifubao}></img>
              <Text strong>{aliPayAccountData.title}</Text>
              <Statistic
                className={styles.statistic}
                title=""
                value={aliPayAccountData.availBalance}
                precision={2}
                prefix={'￥'}
              />
              <div className={styles.money}>
                <Text strong>
                冻结金额{' '}
                  <Popover
                    overlayStyle={{ width: 300 }}
                    color="#fff"
                    placement="top"
                    content={frozenAmount}
                  >
                    <InfoCircleOutlined />
                  </Popover>：{formatCurrency(aliPayAccountData.freezeAmt, 'zh-CN', 'CNY')}{' '}
                </Text>
                <Text strong>
                  账户总额：{formatCurrency(aliPayAccountData.acctAmt, 'zh-CN', 'CNY')}
                </Text>
              </div>
              <div style={{ margin: '10px 0' }}>
                <Button
                  type="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => this.showAccountDetail('alipay')}
                >
                  充值
                </Button>
                <Button style={{ marginRight: '10px' }} onClick={this.goTrans}>
                  转账
                </Button>
                <Button onClick={this.getCash}>提现</Button>
              </div>
              <Text type="secondary">适用于个体工商业者的支付宝账户收款</Text>
            </Card>
            */}

            {/* <Card
              onClick={() => this.choose(1)}
              style={{ borderColor: index == 1 ? '#108ee9' : '' }}
              className={styles.card}
            >
              <img className={styles.logo} src={weixin}></img>
              <Text strong>{weChatPayData.title}</Text>
              <Statistic
                className={styles.statistic}
                title=""
                value={weChatPayData.availBalance}
                precision={2}
                prefix={'￥'}
              />
              <div className={styles.money}>
                <Text strong>
                冻结金额{' '}
                  <Popover
                    overlayStyle={{ width: 300 }}
                    color="#fff"
                    placement="top"
                    content={frozenAmount}
                  >
                    <InfoCircleOutlined />
                  </Popover>
                  ：{formatCurrency(weChatPayData.freezeAmt, 'zh-CN', 'CNY')}{' '}
                </Text>
                <Text strong>
                  账户总额：{formatCurrency(weChatPayData.acctAmt, 'zh-CN', 'CNY')}
                </Text>
              </div>
              <div style={{ margin: '10px 0' }}>
                <Button
                  type="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => this.showAccountDetail('wechatPay')}
                >
                  充值
                </Button>
                <Button style={{ marginRight: '10px' }} onClick={this.goTrans}>
                  转账
                </Button>
                <Button onClick={this.getCash}>提现</Button>
              </div>
              <Text type="secondary">适用于个体工商业者的微信零钱账户收款</Text>
            </Card>
           */}

            {/* <Card
              onClick={() => this.choose(3)}
              style={{ borderColor: index == 3 ? '#108ee9' : '' }}
              className={styles.card}
            >
              <img className={styles.logo} src={chenge}></img>
              <Text strong>
                {pinganyiData.title + ' '}
                <Popover
                  overlayStyle={{ width: 300 }}
                  color="#fff"
                  placement="left"
                  content={pinganyiText}
                >
                  <InfoCircleOutlined />
                </Popover>
              </Text>
              <Statistic
                className={styles.statistic}
                title=""
                value={pinganyiData.availBalance}
                precision={2}
                prefix={'￥'}
              />
              <div className={styles.money}>
                <Text strong>
                  冻结金额{' '}
                  <Popover
                    overlayStyle={{ width: 300 }}
                    color="#fff"
                    placement="top"
                    content={frozenAmount}
                  >
                    <InfoCircleOutlined />
                  </Popover>
                  ：{formatCurrency(pinganyiData.freezeAmt, 'zh-CN', 'CNY')}{' '}
                </Text>
                <Text strong>账户总额：{formatCurrency(pinganyiData.acctAmt, 'zh-CN', 'CNY')}</Text>
              </div>
              <div style={{ margin: '10px 0' }}>
                <Button
                  type="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => this.showAccountDetail('pinganePay')}
                >
                  充值
                </Button>
                <Button style={{ marginRight: '10px' }} onClick={this.goTrans}>
                  转账
                </Button>
                <Button onClick={this.getCash}>提现</Button>
              </div>
              <Text type="secondary">适用于个体工商业者的银行卡账户收款</Text>
            </Card>
           */}
          </div>
        </Card>

        <Spin spinning={exportFileloading} tip="正在导出文件...">
          <QueryTable {...tableProps} />
        </Spin>
      </PageHeaderWrapper>
    );
  }
}
