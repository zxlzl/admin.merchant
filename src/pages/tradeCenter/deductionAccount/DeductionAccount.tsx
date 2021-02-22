import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { InfoCircleOutlined } from '@ant-design/icons';

import {
  Card,
  Typography,
  List,
  Statistic,
  Button,
  Modal,
  Descriptions,
  Row,
  Col,
  Popover,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import QueryTable from '@/components/QueryTable';
import { GlobalContextProps, GlobalContext } from '@/components/GlobalContext';
import { TableStateFilters } from 'antd/lib/table';
import { formatCurrency } from '@/utils/utils';

import { queryOrder } from '@/components/api/remit/payorder';
import { queryBalanceByMerchantAndAccountType } from '@/components/api/remit/merchant';
import { queryByMerchantNo } from '@/components/api/remit/subAccount';
import { queryAccountOrderPage } from '@/components/api/remit/accountorder';
import { getRebateAmount } from '@/components/api/remit/fundOperation';
const { Paragraph, Text } = Typography;

export default class DeductionAccount extends React.Component<
  DeductionAccountProps,
  DeductionAccountState
> {
  static contextType = GlobalContext;

  state: DeductionAccountState = {
    options: {
      accDir: [
        { code: 'D', desc: '收入' },
        { code: 'C', desc: '支出' },
      ],
    },
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    rebateAmount: {},
  };

  queryTable: any;

  async componentDidMount() {
    const merchantNo = localStorage.getItem('merchant_no');
    const { data: accountData = {} } = await queryBalanceByMerchantAndAccountType({
      merchantNo,
      accountType: '69', // 余额账户类型
    });

    const { data: rebateAmount = {} } = await getRebateAmount();
    this.setState({ accountData, rebateAmount });
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
    const params = {
      request: {
        ...cloneOptions,
        merchantNo: localStorage.getItem('merchant_no'),
        accountType: '72', // 账户类型 69: 余额账户 72:抵扣账户
      },
      page: {
        curPage: options.page,
        pageSize: options.pageSize,
      },
    };
    const {
      data: { list = [], recordCount },
    } = await queryAccountOrderPage(params);

    this.setState({
      tableData: { rows: list, pagination: { total: recordCount } },
    });
  };

  /**
   * 展示充值账户信息
   *
   * @memberof DeductionAccount
   */
  showDeductionAccountDetail = async () => {
    const { showModal, closeModal } = this.context;
    const merchantNo = localStorage.getItem('merchant_no');
    const { data = [] } = await queryByMerchantNo(merchantNo);
    const { collectedSubjectName = '' } = data[0] || {};
    const recieveDeductionAccountData = data[0] || {};
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '专属账户信息',
        footer: null,
        width: 800,
        onCancel: () => closeModal(), // 取消事件
      };

      return (
        <Modal {...modalProps}>
          <Card style={{ background: '#f5f5f5' }} bordered={false} title="" size="small">
            <List size="small" split={false} header={<Text strong>请线下转账至专属收款账户</Text>}>
              <Text>. 同行转账：7*24小时实时到帐</Text>
              <br />
              <Text>
                .
                跨行转账：5万及以内，7*24小时实时到帐；5万以上，非工作日及工作日17:10-20:35次日到帐，其他时间预计2小时内到帐
              </Text>
            </List>
          </Card>
          {/* <Card bordered={false} title="付款账户信息" size="small">
          <Descriptions title="">
            <Descriptions.Item label="账户名称">Zhou Maomao</Descriptions.Item>
          </Descriptions>
        </Card> */}
          <Card bordered={false} title="收款账户信息" size="small">
            <Descriptions title="" column={2}>
              <Descriptions.Item label="账户名称">
                <Paragraph copyable={collectedSubjectName}>{collectedSubjectName}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="专属账号">
                <Paragraph copyable={recieveDeductionAccountData.subDeductionAccountNo}>
                  {recieveDeductionAccountData.subDeductionAccountNo}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="开户银行">平安银行</Descriptions.Item>
              <Descriptions.Item label="支行名称">平安银行杭州分行营业部</Descriptions.Item>
              <Descriptions.Item label="用途">
                <Paragraph copyable="银行卡通道充值">银行卡通道充值</Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Modal>
      );
    });
  };

  /**
   * 展示充值记录详情
   *
   * @memberof DeductionAccount
   */
  handleShowDetail = async (row: Row) => {
    const { showModal, closeModal } = this.context;
    const { data = {} } = await queryOrder(row.id);

    // console.log(data)
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '充值流水详情',
        footer: null,
        width: 800,
        onCancel: () => closeModal(), // 取消事件
      };

      return (
        <Modal {...modalProps}>
          <Descriptions title="" column={2}>
            {/* <Descriptions.Item label="付款银行名称">{}</Descriptions.Item> */}
            {/* <Descriptions.Item label="付款银行支行名称">{data.openedBank}</Descriptions.Item> */}
            <Descriptions.Item label="付款银行账号">
              {data.bankDeductionAccountNo}
            </Descriptions.Item>
            <Descriptions.Item label="银行交易流水号">{data.extend1}</Descriptions.Item>
            <Descriptions.Item label="金额">
              {formatCurrency(data.amount, 'zh-CN', 'CNY')}
            </Descriptions.Item>
            <Descriptions.Item label="资金用途">{data.memo}</Descriptions.Item>
            {/* <Descriptions.Item label="备注">{}</Descriptions.Item> */}
          </Descriptions>
        </Modal>
      );
    });
  };

  /** 表格筛选条件 */
  querys = [
    {
      label: '入账时间',
      name: 'filterTime',
      type: 'rangedatepicker',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { label: '入账类型', name: 'accDir', type: 'select' },
  ];

  /** 表格列配置 */
  columns = [
    { fixed: true, width: 200, title: '入账时间', dataIndex: 'gmtCreate' },
    { title: '代征主体', dataIndex: 'collectedSubjectName' },
    { title: '流水号', dataIndex: 'acctNo' },
    { title: '业务摘要', dataIndex: 'note' },
    { title: '账务类型', dataIndex: 'transSubName' },
    {
      title: '交易金额(元)',
      dataIndex: 'amount',
      render: (val: any) => formatCurrency(val, 'zh-CN', 'CNY'),
    },
  ];

  render() {
    const { tableData, options, rebateAmount } = this.state;
    const tableProps = {
      // cardTitle: '充值记录',
      tableData, // 表格数据
      options,
      // tableHeader: () => `累计充值 ${}元，实际到账 ${}元`,
      // loading, // 请求状态
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'acctSn', // 表格行ID
      // options: queryOptions, // 表格筛选条件下拉枚举配置
    };

    const content =
      '可用余额≥打款订单商户服务费时，商户服务费将由此账户可用余额进行抵扣。抵扣与返还记录可查询服务费抵扣账户明细。';
    const available = (
      <div>
        可用余额{' '}
        <Popover placement="top" overlayStyle={{ width: '300px' }} content={content}>
          <InfoCircleOutlined />
        </Popover>
      </div>
    );
    return (
      <PageHeaderWrapper>
        <Card title="服务费抵扣账户" style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic prefix={'￥'} title={available} value={rebateAmount?.availableAmount} />
            </Col>
            <Col span={8}>
              <Statistic
                prefix={'￥'}
                title="上月返点"
                value={rebateAmount?.lastMonthRebateAmount}
              />
            </Col>
            <Col span={8}>
              <Statistic prefix={'￥'} title="累计返点" value={rebateAmount?.totalRebateAmount} />
            </Col>
          </Row>
        </Card>

        <QueryTable {...tableProps} />
      </PageHeaderWrapper>
    );
  }
}
