import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import '@ant-design/compatible/assets/index.css';
import {Descriptions, Card } from 'antd';
import QueryTable from '@/components/QueryTable';
import getQuery from '@/utils/query';

import { billDetail,pageBillingInfo } from '@/components/api/remit/billingInfo';

class Index extends React.Component {

  state = {
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 1 } },
    tableLoading: false, //表格loading
    billNo: '',
    billData:{}
  };

  async componentDidMount() {
    const billNo = getQuery('billNo') || getQuery('billNo', location.hash) || '';
    
    const {data: { list = []}} = await pageBillingInfo({billNo})
    this.setState({
      billData:list[0]
    })
  }

  loadData = async (options: any = {}) => {
    const billNo = getQuery('billNo') || getQuery('billNo', location.hash) || '';
    // 拼装请求参数
    const cloneOptions = { ...options } as any;
    delete cloneOptions.page;
    delete cloneOptions.pageSize;
    delete cloneOptions.createTime;

    const params = {
      ...cloneOptions,
      curPage: options.page,
      pageSize: options.pageSize,
      billNo
    };



    this.setState({ tableLoading: true });
    try {
      const {
        data: { list = [], recordCount },
      } = await billDetail(params);

      this.setState({
        tableData: { rows: list, pagination: { total: recordCount } },
        tableLoading: false,
      });
    } catch (error) {
      this.setState({ tableLoading: false });
    }
  };

  queryTable: any;

  /** 表格列配置 */
  columns = [
    { title: '创建时间', dataIndex: 'createTime', fixed: true },
    { title: '完成时间', dataIndex: 'endTime' },
    { title: '商户批次号', dataIndex: 'payBatchNo' },
    { title: '平台批次号', dataIndex: 'platBatchNo' },
    { title: '打款通道', dataIndex: 'paymentChannelName' },
    { title: '总笔数', dataIndex: 'totalNumber' },
    { title: '成功笔数', dataIndex: 'succNumber' },
    { title: '总金额', dataIndex: 'totalAmount' },
    { title: '成功金额', dataIndex: 'succAmount' },
    { title: '实收税费', dataIndex: 'taxFee' },
    { title: '实收服务费', dataIndex: 'serviceFee' },
    { title: '批次状态', dataIndex: 'payStatusName', fixed: 'right' },
  ];

  render() {
    const { billData,tableData, tableLoading } = this.state;

    const tableProps = {
      cardTitle: '批次明细',
      rowSelectType: null,
      tableData, // 表格数据
      loading: tableLoading,
      onRef: (e: any) => (this.queryTable = e),
      columns: this.columns, // 表格列配置
      onLoad: this.loadData, // 加载表格数据函数
      rowKey: 'id', // 表格行ID
    };
    return (
      <PageHeaderWrapper>
        <Card title="账单信息" style={{marginBottom:20}}>
          <Descriptions column={2}>
            <Descriptions.Item label="账单编号">{billData['billNo']}</Descriptions.Item>
            <Descriptions.Item label="账单类型">{billData['billTypeName']}</Descriptions.Item>
            <Descriptions.Item label="账单金额">{billData['billAmount']}</Descriptions.Item>
            <Descriptions.Item label="账单内容">{billData['billContent']}</Descriptions.Item>
            <Descriptions.Item label="可开票金额">{billData['canInvoicingAmount']}</Descriptions.Item>
            <Descriptions.Item label="账单发生日期">{billData['billDate']}</Descriptions.Item>
            <Descriptions.Item label="账单生成时间">{billData['gmtCreate']}</Descriptions.Item>
          </Descriptions>
        </Card>
        <QueryTable {...tableProps} />
      </PageHeaderWrapper>
    );
  }
}

export default Index;
