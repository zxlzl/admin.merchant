import { Button, Divider, message, } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ImportUser from './components/ImportUser';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { queryUserImportList, importUserExcel } from '@/components/api//import/user';
import { queryAllAvailable } from '@/components/api/remit/collectedsubject';

/**
 * 导入用户
 * @param fields
 */
const importUsers = async (fields: any) => {
  const hide = message.loading('正在添加');
  const formData = new FormData();
  formData.append('file', fields.originFileObj);
  try {
    await importUserExcel(undefined, undefined, { data: formData });
    hide();
    message.success('操作成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const loadData = async (params?: { pageSize: number; current: number; [key: string]: any }) => {
  const { current: pageNo } = params;
  const { queryTime = [] } = params;
  const queryParams = {
    ...params,
    pageNo,
    endTime: queryTime[1],
    startTime: queryTime[0],
  };
  const { data = {} } = await queryUserImportList({ ...queryParams });
  const { list = [], recordCount: total } = data;
  return {
    data: list,
    total,
  };
};

const TableList: React.FC<{}> = () => {
  const [importUserModalVisible, handleImportUserModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const [enums] = useState({});

  useEffect(() => {
    (async () => {
      const { data = [] } = await queryAllAvailable();
      data.map(item => {
        enums[item.collectedSubjectNo] = { text: item.collectedSubjectName };
      });
    })();
  }, []);

  const columns: ProColumns[] = [
    {
      title: '导入时间',
      dataIndex: 'queryTime',
      valueType: 'dateTimeRange',
      render: (val, record) => record.createTime,
    },
    { title: '商户名称', dataIndex: 'merchantName' },
    {
      title: '代征主体',
      dataIndex: 'collectedSubjectNo',
      renderText: (val: string, record) => record.collectedSubjectName,
      valueEnum: enums,
    },
    { title: '导入总数',width:100, dataIndex: 'sum', hideInSearch: true },
    { title: '成功数', width:80,dataIndex: 'successNum', hideInSearch: true },
    {
      title: '失败数',
      width:80,
      dataIndex: 'loseNum',
      hideInSearch: true,
      search: true,
    },
    { title: '导入人员', dataIndex: 'createUser', hideInSearch: true },
    {
      title: '导入状态',
      dataIndex: 'importStatus',
      valueEnum: {
        0: { text: '完成', status: 'Success' },
        1: { text: '未完成', status: 'Processing' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      fixed: 'right',
      valueType: 'option',
      render: (_, record) => (
        <>
          {/* <a onClick={() => downloadSourceFile(record)}>下载源文件</a> */}
          <a href={record.importFileUrl} download>
          下载源文件
          </a>
          {record?.importLoseUrl && (
            <>
              <Divider type="vertical" />
              {/* <a onClick={() => downloadFailList(record)}>下载失败清单</a> */}
              <a href={record.importLoseUrl} download>
                下载失败清单
              </a>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        options={false}
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        scroll={{
          x: 'max-content',
        }}
        pagination={{
          defaultPageSize: 10
        }}
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={() => handleImportUserModalVisible(true)}>
            导入用户
          </Button>,
        ]}
        request={loadData}
      />
      <ImportUser
        onSubmit={async value => {
          const success = await importUsers(value);
          if (success) {
            handleImportUserModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleImportUserModalVisible(false)}
        modalVisible={importUserModalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
