import { history, connect } from 'umi';
import { Button, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { ConnectState } from '@/models/connect';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { getTableEnum } from '@/utils/utils';
import { Enums } from '@/models/common';

import { TableListItem } from './data';

//api
import { queryJobExecute } from '@/components/api/smcs_job';

const TableList: React.FC<{ enums: Enums }> = (props) => {
  const { enums } = props;
  const [queryParams, setQueryParams] = useState({});
  const actionRef = useRef<ActionType>();
  const jobStatus = getTableEnum(enums, 'jobAuditStatus',5);


  // 报名时间默认值
  const format = 'YYYY-MM-DD';
  let createTimeRangeInit = [
    moment(moment(new Date).subtract(6, 'days'), format),
    moment(new Date(), format),
  ];
  const columns: ProColumns<TableListItem>[] = [
    { title: '任务单号', dataIndex: 'jobCode', order: 3, fixed: 'left', width: 210 },
    { title: '任务名称', dataIndex: 'jobName', order: 2, width: 150 },
    {
      title: '任务日期',
      dataIndex: 'auditTime',
      render: (text, row) => {
        const { jobStartDate = '', jobEndDate = '',} = row;
        return `${jobStartDate.split(' ')[0]}~${jobEndDate.split(' ')[0]}`
      },
      hideInSearch: true,
      width: 200,
    },
    { title: '接单人姓名', dataIndex: 'staffName', order: 1, width: 100 },
    { title: '接单门店', dataIndex: 'storeName', hideInSearch: true },
    {
      title: '报名时间',
      dataIndex: 'enrollTimeRange',
      order: 4,
      initialValue:createTimeRangeInit,
      valueType: 'dateRange',
      render: (_, text) => {
        return text.enrollTime;
      },
      width: 170,
    },
    { title: '状态', dataIndex: 'jobStatus', valueEnum: jobStatus },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'option',
      width: 100,
      valueType: 'option',
      render: (_, record: TableListItem) => (
        <>
          <a
            onClick={() => {
              history.push({
                pathname: '/task/execute/detail',
                query: { jobCode: record.jobCode, userId: record.userId, type: 'detail' },
              });
            }}
          >
            详情
          </a>
          <Divider type="vertical" />
          {record.jobStatus === 1 ? (
            <>
              <a
                onClick={() => {
                  history.push({
                    pathname: '/task/execute/check',
                    query: { jobCode: record.jobCode, userId: record.userId, type: 'check' },
                  });
                }}
              >
                审核
              </a>
              {/* <Divider type="vertical" /> */}
            </>
          ) : null}
          {record.jobStatus === 2 ? (
            <a
              onClick={() => {
                history.push({
                  pathname: '/task/execute/accept',
                  query: { jobCode: record.jobCode, userId: record.userId, type: 'accept' },
                });
              }}
            >
              验收
            </a>
          ) : null}
        </>
      ),
    },
  ];

  const getTableData = async (
    params?: { pageSize: number; current: number; [key: string]: any },
    sort?: any,
    filter?: any,
  ) => {
    const { current: pageNo, enrollTimeRange } = params;

    if (enrollTimeRange === undefined) {
      const today = new Date()
      // 第一次查询
      // params.entrollStartTime = moment(moment(today).subtract(6, 'days')).format(
      //   'YYYY-MM-DD HH:mm:ss',
      // );
      // params.entrollEndTime  = moment(today).format('YYYY-MM-DD HH:mm:ss');
      params.startTime = moment(createTimeRangeInit[0]).format('YYYY-MM-DD HH:mm:ss');
      params.endTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    } else if (enrollTimeRange !== null) {
      params.entrollStartTime = moment(enrollTimeRange[0]).format('YYYY-MM-DD HH:mm:ss');
      params.entrollEndTime = moment(enrollTimeRange[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }

    const { data: tableData = {} } = await queryJobExecute({ ...params, pageNo });
    const { data, totalCount: total } = tableData;
    return { data, total };
  };

  let jobAuditStatus = {};
  if (enums) {
    jobAuditStatus = enums;
  }
  const operateButtons = [
    <Button key="全部" onClick={() => setQueryParams({ ...queryParams, jobStatus: '' })}>
      全部
    </Button>,
  ];
  for (const [key, value] of Object.entries(jobAuditStatus)) {
    operateButtons.push(
      <Button key="key" onClick={() => setQueryParams({ ...queryParams, jobStatus: key })}>
        {value}
      </Button>,
    );
  }

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        scroll={{
          x: 1300,
        }}
        toolBarRender={false}
        rowKey="jobCode"
        options={false}
        request={getTableData}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
        }}
      />
    </PageHeaderWrapper>
  );
};

// export default connect(({ global, user }: ConnectState) => ({
//   enums: global.enums,
//   currentUser: user.currentUser,
//   allStores: global.allStores,
// }))(TableList);

export default TableList


