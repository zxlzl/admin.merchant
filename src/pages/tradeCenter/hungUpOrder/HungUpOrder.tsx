import React from 'react';
import { connect } from 'dva';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Alert } from 'antd';
import moment from 'moment';
import router from 'umi/router';
import { Modal, Input, message } from 'antd';
import ModalBox from '../common/modal';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import QueryTable from '@/components/QueryTable';
import { credentialEnum, submitModeEnum } from '@/utils/enums';
import { GlobalHooks, GlobalContextProps, GlobalContext } from '@/components/GlobalContext';
import { TableStateFilters } from 'antd/lib/table';

import { queryPayDetailsList, repay, cancelDetail,payDetail } from '@/components/api/remit/paybatch';
import { queryPayChanleByMerchantNo } from '@/components/api/remit/merchantproduct';
import { updateTaxPayBatchDetail } from '@/components/api/remit/paybatchdetail';
import { queryAllAvailable } from '@/components/api/remit/collectedsubject';

const { confirm } = Modal;
const FormItem = Form.Item;

/** 编辑订单弹窗 */
const EditModal = Form.create<EditFormProps>()((props: EditFormProps) => {
  const { form, loading, onOk, onCancel, visible, data } = props;
  const { getFieldDecorator, validateFields } = form;
  const okHandle = () => {
    validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
    },
  };

  const modalProps = {
    visible,
    onCancel,
    onOk: okHandle,
    title: '修改订单',
    destroyOnClose: true,
    okButtonProps: { loading },
  };

  return (
    <Modal {...modalProps}>
      <Form>
        <FormItem {...formItemLayout} label="收款账号">
          {getFieldDecorator('accountNo', {
            initialValue: data.accountNo,
            rules: [{ required: true, message: '收款用户手机号' }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="收款户名">
          {getFieldDecorator('accountName', {
            initialValue: data.accountName,
            rules: [{ required: true, message: '请填写收款户名' }],
          })(<Input readOnly />)}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证号">
          {getFieldDecorator('identityNo', {
            initialValue: data.identityNo,
            rules: [{ required: true, message: '请填写身份证号' }],
          })(<Input readOnly />)}
        </FormItem>
        <FormItem {...formItemLayout} label="收款手机号">
          {getFieldDecorator('mobile', {
            initialValue: data.mobile,
            rules: [{ required: true, message: '收款手机号' }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="打款金额">
          {getFieldDecorator('amount', {
            initialValue: data.amount,
            rules: [{ required: true, message: '请填写打款金额' }],
          })(<Input readOnly />)}
        </FormItem>
        <FormItem {...formItemLayout} label="打款备注">
          {getFieldDecorator('memo', {
            initialValue: data.memo,
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

class HungUpOrder extends React.Component<HungUpOrderProps, HungUpOrderState> {
  static contextType = GlobalContext;

  state: HungUpOrderState = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    queryOptions: {},
    modalshow: false
  };

  queryTable: any;

  async componentDidMount() {
    const { data: subjects = [] } = await queryAllAvailable();
    const { data: payChannels = [] } = await queryPayChanleByMerchantNo();
    this.setState((prev: any) => {
      const { queryOptions } = prev;
      return {
        queryOptions: {
          ...queryOptions,
          submitMode: [
            { code: '', desc: '全部' },
            ...Object.keys(submitModeEnum).map(key => {
              return { code: key, desc: submitModeEnum[key] };
            }),
          ],
          identityType: Object.keys(credentialEnum).map(key => {
            return { code: key, desc: credentialEnum[key] };
          }),
          payChannelCode: [
            ...payChannels.map((s: {}) => {
              return { code: s['key'], desc: s['value'] };
            }),
          ],
          collectedSubjectNo: [
            ...subjects.map((s: {}) => {
              return { code: s['collectedSubjectNo'], desc: s['collectedSubjectName'] };
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
    const { toggleLoading } = this.context;
    // 拼装请求参数
    // 拼装请求参数
    const cloneOptions = { ...options } as any;
    // 格式化时间段
    if (cloneOptions.submitMode === undefined) {
      cloneOptions.submitMode = '0';
    }

    if (options.filterTime && options.filterTime.length) {
      cloneOptions.startDate = moment(options.filterTime[0])
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.endDate = moment(options.filterTime[1])
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page;
    delete cloneOptions.pageSize;
    delete cloneOptions.filterTime;
    const params = {
      query: {
        ...cloneOptions,
        payStatus: '06',
      },
      page: {
        curPage: options.page,
        pageSize: options.pageSize,
      },
    };
    toggleLoading(true);
    try {
      const {
        data: { list = [], recordCount },
      } = await queryPayDetailsList(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
      });
      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
    }
  };

  /** 表格筛选条件 */
  querys = [
    {
      label: '创建时间',
      name: 'filterTime',
      type: 'rangedatepicker',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: 'text', label: '商户名称', name: 'merchantName' },
    { type: 'select', label: '代征主体', name: 'collectedSubjectNo' },
    { type: 'select', label: '打款通道', name: 'payChannelCode' },
    { type: 'text', label: '平台订单号', name: 'payDetailNo' },
    { type: 'text', label: '商户订单号', name: 'merchantOrderNo' },
    { type: 'text', label: '收款用户姓名', name: 'accountName' },
    { type: 'text', label: '收款用户手机号', name: 'mobile' },
    { type: 'select', label: '证件类型', name: 'identityType' },
    { type: 'text', label: '证件号码', name: 'identityNo' },
    { type: 'text', label: '收款账号', name: 'accountNo' },
    { type: 'rangeData', label: '商户打款金额', names: ['startAmount', 'endAmount'] },
    { type: 'select', label: '订单来源', name: 'submitMode', options: { initialValue: '0' } },
    { type: 'select', label: '订单状态', name: 'payStatus' },
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
      width: 100,
      title: '操作',
      render: (row: Row) => (
        <div>
          <a style={{ marginRight: 10 }} onClick={() => this.showDetail(row)}>
            详情
          </a>
          {row.canRepay ? (
            <a style={{ marginRight: 10 }} onClick={() => this.handleRetry(row)}>
              重新打款
            </a>
          ) : (
            ''
          )}
          <a style={{ marginRight: 10 }} onClick={() => this.handleCancel(row)}>
            撤销
          </a>
          <a style={{ marginRight: 10 }} onClick={() => this.handleEdit(row)}>
            修改
          </a>
        </div>
      ),
    },
  ];

  handleRetry = row => {
    confirm({
      title: '确认提示',
      content: (
        <div>
          <p style={{ marginBottom: 0 }}>确定对该笔订单重新打款吗？</p>
          <p
            style={{ marginBottom: 0, wordBreak: 'break-all' }}
          >{`[订单流水号:${row.payDetailNo}]`}</p>
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await repay({ payDetailNo: row.payDetailNo });
          message.success('补单成功！');
          this.queryTable.reload();
        } catch (error) {
          const { code } = error;
          if (code === '90001') {
            message.success(error.message);
            this.queryTable.reload();
            return false;
          }
          // message.error(error.message)
          return false;
        }
      },
    });
  };

  /**
   * 编辑订单
   *
   * @author shixin.deng
   * @param {object} [row={}]
   */
  handleEdit = row => {
    const { showModal, closeModal, toggleLoading } = this.context;
    // 弹窗确定事件，发起编辑请求
    const onOk = async value => {
      // console.log(value)
      const updateParams = {
        accountNo: value.accountNo, // 收款账号
        mobile: value.mobile, // 银行预留手机号码
        memo: value.memo, // 打款备注
        id: row.id, // 主键
      };
      toggleLoading(true);
      try {
        await updateTaxPayBatchDetail(updateParams);
        toggleLoading(false);
        message.success('修改成功！');
        this.queryTable.reload();
        closeModal();
      } catch (error) {
        toggleLoading(false);
      }
    };
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        onOk, // 确认事件
        data: row,
        onCancel: () => closeModal(), // 取消事件
      };
      return <EditModal {...modalProps} />;
    });
  };

  /**
   * 撤销
   *
   */
  handleCancel = row => {
    confirm({
      title: '确认提示',
      content: (
        <div>
          <p style={{ marginBottom: 0 }}>确定撤销该笔订单？</p>
          <p
            style={{ marginBottom: 0, wordBreak: 'break-all' }}
          >{`[订单流水号:${row.payDetailNo}]`}</p>
        </div>
      ),
      okText: '确定',
      cancelText: '取消',
      width: 430,
      onOk: async () => {
        await cancelDetail({ payDetailNo: row.payDetailNo });
        message.success('订单撤销成功！');
        this.queryTable.reload();
      },
    });
  };

  /**
   * 挂起订单详情
   * @param row
   */
  showDetail = async (row: any) => {
    const {data={}} = await payDetail(row.id)
    this.setState({
			modalData:data,
			modalshow:true,
		})
  };

  hideModal = () => {
		this.setState({
			modalshow: false
		})
  }


  render() {
    const { tableData, queryOptions,modalshow ,modalData} = this.state;
    const { loading } = this.context;

    const tableHeader = () => (
      <Alert
        style={{ backgroundColor: 'rgb(247, 247, 247)', border: 'none' }}
        message="系统日终清算，自动撤销挂起订单。"
        showIcon
      />
    );
    const tableProps = {
      tableHeader,
      tableData, // 表格数据
      loading, // 请求状态
      onRef: (e: any) => (this.queryTable = e),
      rowSelectType: null,
      onLoad: this.loadData, // 加载表格数据函数
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      rowKey: 'payDetailNo', // 表格行ID
      options: queryOptions, // 表格筛选条件下拉枚举配置
      // operators: this.renderOperators(roles), // 表格操作栏按钮配置
      // onSelectRow: this.handleSelectRow, // 表格行选中事件
    };

    const modalProps = {
      visible: modalshow,
      modalType:1, // 为1代表查看订单详情
      hideModal: this.hideModal,
      data: modalData,
    };
    return (
      <PageHeaderWrapper>
        <QueryTable {...tableProps} />
        <ModalBox {...modalProps}></ModalBox>
      </PageHeaderWrapper>
    );
  }
}

export default HungUpOrder;
