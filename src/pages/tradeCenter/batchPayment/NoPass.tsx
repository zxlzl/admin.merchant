import React from 'react';
import { Modal, Steps, Button, Descriptions, Collapse, Typography, Table, Alert } from 'antd';
import QueryTable from '@/components/QueryTable';


import moment from 'moment';
import styles from './style.less';


export default class DetailModal extends React.Component {

  state = {
  }

  queryTable: any

  /** 表格列配置 */
  columns = [
    { title: '创建时间', dataIndex: 'gmtCreate' },
    { title: '平台批次号', dataIndex: 'payBatchNo' },
    { title: '商户订单号', dataIndex: 'merchantOrderNo' },
    { title: '账号名称', dataIndex: 'accountName' },
    { title: '证件类型', dataIndex: 'identityType' },
    { title: '证件号码', dataIndex: 'identityNo' },
    { title: '银行账号', dataIndex: 'accountNo' },
    { title: '金额(元)', dataIndex: 'amount' },
    { title: '税费(元)', dataIndex: 'vatAmount' },
    { title: '服务费(元)', dataIndex: 'deductAmount' },
    { title: '原因', dataIndex: 'memo' },
  ]

  render() {
    const { tableLoading } = this.state
    const { hideModal, visible, type, data } = this.props

    const tableProps = {
      columns: this.columns, // 表格列配置
      dataSource: data?.list,
      title: () => "税费明细",
      scroll: { x: 'max-content' },
      bordered: true
    }
    const descStyle = {
      margin: '10px 0'
    }

    
    return (
      <Modal
        title={type == 1 ? "查看打款失败详情" : "查看异常挂起详情"}
        visible={visible}
        footer={null}
        onCancel={hideModal}
        width={700}
      >
        <Alert message={type == 1 ? "打款失败的明细将被挂起。请在挂单列表，操作修改并重新打款，或撤销订单。" : "锁定异常的明细将被挂起。请在挂单列表，操作修改并重新打款，或撤销订单。"} type="warning" showIcon />
        {
          type == 2 ?
            <p style={descStyle}>异常笔数：{data?.number}笔，异常金额：{data?.amount}元</p> : <p style={descStyle}>失败笔数：{data?.number}笔，失败金额：{data?.amount}元</p>}
        <Table {...tableProps} pagination={false} />
      </Modal>
    )
  }

}