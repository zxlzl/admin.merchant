import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';

import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';

import QueryTable from '@/components/QueryTable';
import BatchInfo from '../common/batchInfo';
import ModalBox from '../common/modal';
import NoPass from '../common/NoPass';
import { ConnectState } from '@/models/connect';
import { credentialEnum, submitModeEnum } from '@/utils/enums';
import { TableStateFilters } from 'antd/lib/table';
import { Modal, Form, Upload, Button } from 'antd';
import getQuery from '@/utils/query';
import { queryPayChanleByMerchantNo } from '@/components/api/remit/merchantproduct';
import { previewBankReceipt } from '@/components/api/remit/bankReceipt';
import { queryAllAvailable } from '@/components/api/remit/collectedsubject';
import PayBaseModal from '../common/payBaseModal';

import {
  queryPayDetailsList,
  queryPayBathSummary,
  queryPayBatchByPayBatchNo,
  payDetail,
  detailPayStatus,
} from '@/components/api/remit/paybatch';
import { queryOrderCostDetail } from '@/components/api/remit/paybatchdetail';

class BatchDetail extends React.Component<BatchDetailProps, BatchDetailState> {
  state: BatchDetailState = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    nopassModalshow: false,
    options: {},
    payBaseModalVisible: false,
    fileList: [],
  };

  queryTable: any;

  async componentDidMount() {
    const payBatchNo = getQuery('payBatchNo');
    const { data: payChannels = [] } = await queryPayChanleByMerchantNo();
    const { data: payStatus = [] } = await detailPayStatus();
    const { data: subjects = [] } = await queryAllAvailable();
    this.getPayBath();
    this.setState({
      payBatchNo,
    });
    this.setState(prev => {
      const { options } = prev;
      return {
        options: {
          ...options,
          payChannelCode: [
            ...payChannels.map((s: {}) => {
              return { code: s['key'], desc: s['value'] };
            }),
          ],
          identityType: Object.keys(credentialEnum).map(key => {
            return { code: key, desc: credentialEnum[key] };
          }),
          payStatus: payStatus.map(key => {
            return { code: key.status, desc: key.desc };
          }),
          collectedSubjectNo: [
            ...subjects.map((s: {}) => {
              return { code: s['collectedSubjectNo'], desc: s['collectedSubjectName'] };
            }),
          ],
          submitMode: [
            { code: '', desc: '全部' },
            ...Object.keys(submitModeEnum).map(key => {
              return { code: key, desc: submitModeEnum[key] };
            }),
          ],
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
    const payBatchNo = getQuery('payBatchNo');
    const merchantNo = localStorage.getItem('merchant_no');
    const cloneOptions = { ...options } as any;
    if (options.createTime && options.createTime.length) {
      cloneOptions.startDate = moment(options.createTime[0])
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.endDate = moment(options.createTime[1])
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page;
    delete cloneOptions.pageSize;
    delete cloneOptions.createTime;
    const params = {
      query: {
        ...cloneOptions,
        payBatchNo,
        merchantNo,
      },
      page: {
        curPage: options.page,
        pageSize: options.pageSize,
      },
    };
    const {
      data: { list = [], recordCount },
    } = await queryPayDetailsList(params);

    this.setState({
      tableData: { rows: list, pagination: { total: recordCount } },
      merchantNo,
    });
  };

  /**
   * 获取打款批次信息
   */
  getPayBath = async () => {
    const payBatchNo = getQuery('payBatchNo');
    const { data: batchData = {} } = await queryPayBatchByPayBatchNo(payBatchNo);
    this.setState({
      batchData,
    });
  };

  /**
   * 详情
   */
  detailModal = async (row: any) => {
    const { data } = await payDetail(row.id);
    this.setState({
      modalData: data,
      modalshow: true,
      modalType: 1,
    });
  };

  hideModal = () => {
    this.setState({
      modalshow: false,
    });
  };

  /**
   * 费用单
   */
  feeModal = async (row: any) => {
    const { data = {} } = await queryOrderCostDetail({ id: row.id });
    this.setState({
      modalData: data,
      modalshow: true,
      modalType: 2,
    });
  };

  /** 表格筛选条件 */
  querys = [
    {
      label: '创建时间',
      name: 'createTime',
      type: 'rangedatepicker',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: "text", label: "商户名称", name: "merchantName" },
    { type: 'select',label: '代征主体',name: 'collectedSubjectNo',   },
    { type: "select", label: "打款通道", name: "payChannelCode" },
    { type: "text", label: "平台订单号", name: "payDetailNo" },
    { type: "text", label: "商户订单号", name: "merchantOrderNo" },
    { type: "text", label: "收款用户姓名", name: "accountName" },
    { type: "text", label: "收款用户手机号", name: "mobile" },
    { type: "select", label: "证件类型", name: "identityType" },
    { type: "text", label: "证件号码", name: "identityNo" },
    { type: "text", label: "收款账号", name: "accountNo" },
    { type: "rangeData", label: "商户打款金额", names: ['startAmount','endAmount'] },
    { type: 'select',label: '订单来源', name: 'submitMode', },
    { type: "select", label: "订单状态", name: "payStatus" },
  ];

  /** 表格列配置 */
  columns = [
    { title: '创建时间', dataIndex: 'gmtCreate' },
    { title: '商户名称', dataIndex: 'merchantName' },
    { title: '代征主体', dataIndex: 'collectedSubjectName' },
    { title: '打款通道', dataIndex: 'payChannelCodeName' },
    { title: '平台订单号', dataIndex: 'payDetailNo' },
    { title: '商户订单号', dataIndex: 'merchantOrderNo' },
    { title: '收款用户姓名', dataIndex: 'accountName' },
    { title: '收款用户手机号', dataIndex: 'mobile' },
    { title: '证件类型', dataIndex: 'identityType', render: (item: any) => credentialEnum[item] },
    { title: '证件号码', dataIndex: 'identityNo' },
    { title: '收款账号', dataIndex: 'accountNo' },
    { title: '收款银行/渠道', dataIndex: 'bankName' },
    { title: '商户打款金额(元)', dataIndex: 'amount' },
    { title: '用户实收金额(元)', dataIndex: 'userActualReceiveAmount' },
    { title: '商户应付服务费(元)', dataIndex: 'merchantShouldFeeCost' },
    { title: '商户已抵扣服务费(元)', dataIndex: 'merchantOffsetFeeCost' },
    { title: '商户实付服务费(元)', dataIndex: 'vatAmount' },
    { title: '用户实付服务费(元)', dataIndex: 'deductAmount' },
    { title: '商户服务费差额(元)', dataIndex: 'merchantFeeCostRegionDiffer' },
    { title: '用户服务费差额(元)', dataIndex: 'userFeeCostRegionDiffer' },
    { title: '订单来源', dataIndex: 'submitMode', render: (item: any) => submitModeEnum[item] },
    { title: '订单状态', dataIndex: 'payStatusDesc' },
    { title: '状态描述', dataIndex: 'statusDesc' },
    {
      fixed: 'right',
      title: '操作',
      key: 'opt',
      render: (row: any) => (
        <div>
          <a
            style={{ marginRight: 12 }}
            onClick={() => {
              this.detailModal(row);
            }}
          >
            详情
          </a>
          {/* <a style={row.previewBankReceipt?{ marginRight: 12 }:{}} onClick={() => { this.feeModal(row) }}>费用单</a> */}
          {row.previewBankReceipt && (
            <a onClick={() => this.showBankReceipt(row.payDetailNo)}>预览回单</a>
          )}
        </div>
      ),
    },
  ];

  /**
   * 预览回单
   */
  showBankReceipt = async payDetailNo => {
    const { data: href } = await previewBankReceipt(payDetailNo);
    window.open(href, 'blank');
  };

  /**
   * 查看异常挂起/打款失败详情
   */
  noPassModal = async (type: number) => {
    const { payBatchNo, merchantNo } = this.state;
    const params = {
      payBatchNo,
      merchantNo,
      payStatus: type == 1 ? '04' : '06',
    };
    const { data = {} } = await queryPayBathSummary(params);
    // const data = {list:[{discountRate:0}]}
    this.setState({
      noPassData: data,
      nopassModalshow: true,
      noPassType: type,
    });
  };

  hideNoPass = () => {
    this.setState({
      nopassModalshow: false,
    });
  };

  controlPayBase = (visible: boolean) => {
    this.setState({
      payBaseModalVisible: visible,
    });
  };

  render() {
    const {
      tableData,
      batchData,
      noPassType,
      noPassData,
      nopassModalshow,
      modalshow,
      modalType,
      modalData,
      options,
      payBaseModalVisible,
    } = this.state;

    const tableProps = {
      cardTitle: '打款明细记录',
      tableData, // 表格数据
      // loading, // 请求状态
      // bodyStyle: { padding: '24px 0' },
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'payDetailNo', // 表格行ID
      options, // 表格筛选条件下拉枚举配置
      // operators: this.renderOperators(roles), // 表格操作栏按钮配置
      // onSelectRow: this.handleSelectRow, // 表格行选中事件
    };

    const batchInfoProps = {
      noPassModal: this.noPassModal,
      batchData,
      detailType: 1,
      controlPayBase: this.controlPayBase,
    };

    const noPassProps = {
      visible: nopassModalshow,
      hideModal: this.hideNoPass,
      type: noPassType,
      data: noPassData,
    };

    const modalProps = {
      visible: modalshow,
      modalType,
      hideModal: this.hideModal,
      data: modalData,
    };

    // 打款依据
    const defaultFileList = [
      {
        uid: batchData?.id,
        name: batchData?.paymentBasisDocumentName,
        url: batchData?.paymentBasisDocument,
      },
    ];
    const payBaseProps = {
      modalVisible: payBaseModalVisible,
      onCancel: this.controlPayBase,
      payBaseInfo: {
        allowAudit: batchData?.allowAudit,
        defaultFileList: batchData?.paymentBasisDocument && defaultFileList,
        payBatchNo: batchData?.payBatchNo,
      },
      reload: () => {
        this.getPayBath();
      },
    };

    return (
      <PageHeaderWrapper>
        <BatchInfo {...batchInfoProps} />
        <QueryTable {...tableProps} />
        <NoPass {...noPassProps}></NoPass>
        <ModalBox {...modalProps}></ModalBox>
        <PayBaseModal {...payBaseProps}></PayBaseModal>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ global, settings }: ConnectState) => ({}))(BatchDetail);
