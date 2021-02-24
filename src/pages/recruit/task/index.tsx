import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Dropdown,
  Menu,
  message,
  Upload,
  Modal,
  TimePicker,
  Select,
  Radio,
} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './newTask/index';
import { TableListItem } from './data';
import { ConnectState } from '@/models/connect';
import { CurrentUser, Enums } from '@/models/common';
import { history, connect } from 'umi';
import { getTableEnum, getCascaderEnum, getTreeSelectEnum } from '@/utils/utils';
import moment from 'moment';
import style from './index.less';
import { API_URL } from '@/utils/request';

// api
import {
  queryJobMessage,
  createJob,
  getBid,
  deletJob,
  jobOnTheShelf,
  jobOffTheShelf,
} from '@/components/api/smcs_job';
import { uploadPicture, deleteById } from '@/components/api/file';

const { RangePicker } = TimePicker;
const { Option } = Select;

/**
 * 新建任务
 * @param fields
 * @param imgBid 图片bid
 */
const handleAdd = async (fields: TableListItem, imgBid: string) => {
  const hide = message.loading('正在添加');
  // const {budgetScopeMin,budgetScopeMix} = fields
  const cloneFields: TableListItem = { ...fields };
  const { enrollRange, jobTimeRange, jobDateRange } = cloneFields;
  // if (budgetScopeMin>budgetScopeMix) {
  //   message.error('预算范围下限不能高于上限')
  //   return
  // }
  // 报名时间范围
  cloneFields.enrollStart = moment(enrollRange[0]).format('YYYY-MM-DD HH:mm:ss');
  cloneFields.enrollEnd = moment(enrollRange[1]).format('YYYY-MM-DD HH:mm:ss');
  // 任务日期
  cloneFields.jobStartDate = moment(jobDateRange[0]).format('YYYY-MM-DD HH:mm:ss');
  cloneFields.jobEndDate = moment(jobDateRange[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
  // 任务时间
  cloneFields.jobStartTime = '2020-08-13 ' + jobTimeRange[0];
  cloneFields.jobEndTime = '2020-08-13 ' + jobTimeRange[1];
  // 图片
  cloneFields.pictureCode = imgBid;
  // 标签
  cloneFields.tag = (cloneFields.tag as []).join();
  // 重复 repeatCode
  cloneFields.repeatCode && (cloneFields.repeatCode = (cloneFields.repeatCode as []).join());

  try {
    await createJob({ ...cloneFields });
    hide();
    message.success('新建成功');
    return true;
  } catch (error) {
    hide();
    message.error('新建失败请重试！');
    return false;
  }
};

const uploadButton = (
  <div>
    <PlusOutlined />
    <div className="ant-upload-text">上传</div>
  </div>
);

/**
 * 上传图片
 */
const uploadImg = async (options: any, stateName: string) => {
  const { file: multipartFile, onSuccess, onError } = options;
  const { uid: bid } = multipartFile;
  const formdata = new FormData();
  // formdata.append('multipartFile', multipartFile);
  formdata.append('bid', bid);

  try {
    const { data } = await uploadPicture(formdata);
    onSuccess('ok');
  } catch (e) {
    onError(e);
  }
};

const TableList: React.FC<{ enums: Enums; allStores: []; currentUser: CurrentUser }> = (props) => {
  const { enums, currentUser = {}, allStores = [] } = props;
  const [newTaskModalVisible, handleNewTaskModalVisible] = useState<boolean>(false);
  const [allSelectRowKeys, setAllSelectRowKeys] = useState([]);
  const [bid, setBid] = useState('');
  const actionRef = useRef<ActionType>();
  const [repeatType, setRepeatType] = useState(-1);

  const jobClassify = getTableEnum(enums, 'jobClassify');
  const jobRepeatCode = getTableEnum(enums, 'jobRepeatCode');
  const jobTag = getTableEnum(enums, 'jobTag');
  const jobStatus = getTableEnum(enums, 'jobStatus');

  const stores = {};
  allStores.forEach((item: any) => {
    stores[item.id] = { text: item.storeName };
  });

  // select枚举 重复
  const { jobRepeatType } = enums ? enums : {};
  const jobRepeatTypeEnum = [];
  if (jobRepeatType) {
    for (const [key, value] of Object.entries(jobRepeatType)) {
      jobRepeatTypeEnum.push(
        <Option key={key} value={key}>
          {value}
        </Option>,
      );
    }
  }

  useEffect(() => {
    (async () => {
      const { data: bid = '' } = await getBid();
      setBid(bid);
    })();
  }, [1]);

  const getExtraData = async (file: any) => {
    return {
      bid,
      fileTypeEnum: 'SMCS_CODE_JOB',
      username: currentUser.mobile,
    };
  };

  const changeImg = async (fileObj: any) => {
    const { file = {} } = fileObj;
    const { status = '', response = {} } = file;
    if (status === 'removed') {
      const { data = [] } = response;
      const filecode = data[0].fileId;
      await deleteById(filecode);
    }
  };

  const handlePreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const format = 'YYYY-MM-DD';
  let createTimeRangeInit = [
    moment(moment(new Date()).subtract(7, 'days'), format),
    moment(new Date(), format),
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '任务名称',
      dataIndex: 'jobName',
      order: 4,
      rules: [
        {
          required: true,
          message: '请输入任务名称',
        },
      ],
      fixed: 'left',
      width: 120,
      ellipsis: true,
      formItemProps: {
        placeholder: '请输入任务名称',
      },
    },
    {
      title: '任务编号',
      dataIndex: 'jobTemplateCode',
      order: 5,
      // hideInTable: true,
      hideInForm: true,
      width: 150,
      formItemProps: {
        placeholder: '请输入任务编号',
      },
    },
    {
      title: '分类',
      dataIndex: 'classify',
      order: 2,
      width: 70,
      filters: false,
      rules: [
        {
          required: true,
          message: '请选择任务分类',
        },
      ],
      formItemProps: {
        placeholder: '请选择任务分类',
      },
      valueEnum: jobClassify,
    },
    {
      title: '标签',
      dataIndex: 'tag',
      filters: false,
      order: 1,
      rules: [
        {
          required: true,
          message: '请选择任务标签',
        },
      ],
      valueEnum: jobTag,
      formItemProps: {
        mode: 'multiple',
        placeholder: '请选择任务标签',
      },
    },
    {
      title: '开始时间',
      dataIndex: 'jobStartDate',
      hideInForm: true,
      hideInSearch: true,
      width: 220,
      renderText: (_, row) => {
        return row.jobStartDate.slice(0, 10) + ' ' + row.jobStartTime.slice(11);
      },
    },
    {
      title: '结束时间',
      dataIndex: 'jobEndDate',
      hideInForm: true,
      hideInSearch: true,
      width: 220,
      renderText: (_, row) => {
        return row.jobEndDate.slice(0, 10) + ' ' + row.jobEndTime.slice(11);
      },
    },
    {
      title: '描述',
      dataIndex: 'represent',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请输入任务描述',
        },
      ],
      formItemProps: {
        placeholder: '请输入任务描述',
      },
    },
    {
      title: '图片',
      dataIndex: 'pictureUrl',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: (item, props) => (
        <>
          <Upload
            // customRequest={(options) => uploadImg(options, 'invoiceUrl')}
            className={style.avatar}
            accept="image/*"
            listType="picture-card"
            action={`${API_URL}/file/uploadPicture`}
            data={getExtraData}
            onPreview={handlePreview}
            onChange={changeImg}
            // onRemove={removeImg}
            // fileList={imgList}
          >
            {uploadButton}
          </Upload>
          <span>最多可上传5张图片，建议尺寸640*640</span>
        </>
      ),
      // rules: [
      //   {
      //     required: true,
      //     message: '请上传任务图片',
      //   },
      // ],
    },
    {
      title: '预算范围下限',
      hideInTable: true,
      hideInSearch: true,
      dataIndex: 'budgetScopeMin',
      rules: [
        {
          required: true,
          message: '预算范围为正整数',
          pattern: /^([1-9]\d*)$/,
        },
      ],
      formItemProps: {
        placeholder: '请输入预算范围下限',
      },
    },
    {
      title: '预算范围上限',
      hideInTable: true,
      hideInSearch: true,
      dataIndex: 'budgetScopeMix',
      rules: [
        {
          required: true,
          message: '预算范围为正整数',
          pattern: /^([1-9]\d*)$/,
        },
      ],
      formItemProps: {
        placeholder: '请输入预算范围上限',
      },
    },
    {
      title: '人数要求',
      hideInSearch: true,
      hideInTable: true,
      dataIndex: 'peopleNumber',
      valueType: 'digit',

      rules: [
        {
          required: true,
          message: '人数为正整数',
          pattern: /^([1-9]\d*)$/,
        },
      ],
      formItemProps: {
        placeholder: '请输入人数要求',
      },
    },
    {
      title: '报名时间范围',
      hideInTable: true,
      hideInSearch: true,
      dataIndex: 'enrollRange',
      valueType: 'dateTimeRange',
      rules: [
        {
          required: true,
          message: '请选择报名时间范围',
        },
      ],
    },
    {
      title: '任务日期',
      hideInSearch: true,
      hideInTable: true,
      dataIndex: 'jobDateRange',
      valueType: 'dateRange',
      // formItemProps: {
      //   format: 'YYYY-MM-DD HH:mm:ss',
      // },
      rules: [
        {
          required: true,
          message: '请选择任务日期范围',
        },
      ],
    },
    {
      title: '任务时间',
      hideInSearch: true,
      hideInTable: true,
      dataIndex: 'jobTimeRange',
      valueType: 'time',
      rules: [
        {
          required: true,
          message: '请选择任务时间范围',
        },
      ],
      renderFormItem: (item, props) => {
        return <RangePicker {...props} />;
      },
    },
    {
      hideInSearch: true,
      title: '重复',
      width: 150,
      filters: false,
      ellipsis: true,
      dataIndex: 'repeatType',
      valueEnum: jobRepeatType,
      render: (text, row, index) => {
        let str = '';
        const { repeatCode, repeatType } = row;
        const { jobRepeatType, jobRepeatCode } = enums;
        let rtype = jobRepeatType[repeatType] && jobRepeatType[repeatType];
        let rcode = '';
        let code = repeatCode ? repeatCode.split(',') : repeatCode;
        code && code.forEach((item) => (rcode += jobRepeatCode[item] + ','));
        str = rcode ? rtype + '/' + rcode : rtype;
        return str;
      },
      renderFormItem: (item, props, form) => {
        return (
          <Select
            placeholder="请选择重复时间"
            onChange={(value) => {
              setRepeatType(value);
              form.setFieldsValue({ repeatType: value });
            }}
          >
            {jobRepeatTypeEnum}
          </Select>
        );
      },
      rules: [
        {
          required: true,
          message: '请选择重复时间',
        },
      ],
    },
    {
      title: '重复日期',
      dataIndex: 'repeatCode',
      hideInForm: repeatType != 2,
      hideInSearch: true,
      hideInTable: true,
      valueEnum: jobRepeatCode,
      formItemProps: {
        mode: 'multiple',
        placeholder: '请选择重复日期',
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeRange',
      hideInForm: true,
      initialValue: createTimeRangeInit,
      valueType: 'dateRange',
      width: 220,
      order: 6,
      render: (_, text) => {
        return text.createTime;
      },
    },
    {
      title: '状态',
      order: 3,
      dataIndex: 'status',
      filters: false,
      hideInForm: true,
      valueEnum: jobStatus,
      formItemProps: {
        placeholder: '请选择任务状态',
      },
    },
    {
      hideInSearch: true,
      title: '适用门店',
      dataIndex: 'storeId',
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请选择适用门店',
        },
      ],
      valueEnum: stores,
      formItemProps: {
        placeholder: '请选择适用门店',
      },
    },
    {
      hideInSearch: true,
      title: '是否推荐任务',
      dataIndex: 'recommendStatus',
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请选择',
        },
      ],
      formItemProps: {
        placeholder: '请选择',
      },
      renderFormItem: (item, props, form) => {
        return (
          <Radio.Group {...props}>
            <Radio value={true}>是，推荐</Radio>
            <Radio value={false}>否，不推荐</Radio>
          </Radio.Group>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
      fixed: 'right',
      width: 140,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              history.push({
                pathname: '/task/release/detail',
                query: { taskId: record.id, type: 'detail' },
              });
            }}
          >
            详情
          </a>
          <Divider type="vertical" />
          {record.status !== 1 ? (
            <>
              <a
                onClick={() => {
                  history.push({
                    pathname: '/task/release/update',
                    query: { taskId: record.id, type: 'edit' },
                  });
                }}
              >
                编辑
              </a>
              <Divider type="vertical" />
            </>
          ) : null}
          <a
            onClick={async (e) => {
              e.preventDefault();
              handleRemove(record);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  /**
   * 删除任务
   * @param currentItem
   */
  const handleRemove = (currentItem: TableListItem) => {
    const { jobName, id } = currentItem;
    Modal.confirm({
      title: '删除任务',
      content: `确认删除[任务ID：${id}，任务名称：${jobName}]吗？删除后不可撤回。`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await deletJob(id);
          message.success('删除成功，即将刷新');
          if (actionRef.current) {
            actionRef.current.reload();
          }
        } catch (error) {
          message.error('删除失败，请重试');
        }
      },
    });
  };

  /**
   *
   * @param key 操作类型 上架或者下架
   * @param select 选中的项
   * @param selectKeys 选中项的key值
   */
  const operateTask = (key: string, select: TableListItem[], selectKeys: []) => {
    const type = key === 'on' ? '上架' : '下架';
    const on = key === 'on';
    const content = (
      <div>
        确认{type}选中任务吗？
        {on ? '上架后任务可被报名。' : '下架后任务无法被报名，已报名任务单将被取消。'}
      </div>
    );
    Modal.confirm({
      title: `${type}任务`,
      content,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        key === 'on' && (await jobOnTheShelf(selectKeys));
        key === 'off' && (await jobOffTheShelf(selectKeys));
        message.success(`${type}成功`);
        setAllSelectRowKeys([]);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      },
    });
  };

  const onSelectChange = (selectedRowKeys: number[]) => {
    setAllSelectRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: allSelectRowKeys,
    onChange: onSelectChange,
  };

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="用工任务列表"
        actionRef={actionRef}
        rowKey="id"
        scroll={{
          x: 1500,
          y: 500,
        }}
        options={false}
        toolBarRender={(action, { selectedRowKeys, selectedRows }) => {
          return [
            <Button type="primary" onClick={() => handleNewTaskModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu
                    onClick={({ key }) => {
                      operateTask(key, selectedRows, selectedRowKeys);
                    }}
                    selectedKeys={[]}
                  >
                    <Menu.Item key="off">下架</Menu.Item>
                    <Menu.Item key="on">上架</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  批量操作 <DownOutlined />
                </Button>
              </Dropdown>
            ),
          ];
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
          </div>
        )}
        request={async (params, sorter) => {
          let { current, createTimeRange } = params;
          const cloneParams = { ...params };
          cloneParams.pageNo = current;
          // tag cascader 单独处理
          cloneParams?.tag && (cloneParams.tag = cloneParams.tag.join());
          if (createTimeRange === undefined) {
            // 第一次查询
            let today = new Date().getTime();
            let weekAgoTimeStamp = today - 7 * 24 * 60 * 60 * 1000;
            let weekAgo = moment(weekAgoTimeStamp).format('YYYY-MM-DD HH:mm:ss');
            // cloneParams.startTime=weekAgo
            // cloneParams.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
            cloneParams.startTime = moment(createTimeRangeInit[0]).format('YYYY-MM-DD HH:mm:ss');
            cloneParams.endTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          } else if (createTimeRange !== null) {
            cloneParams.startTime = moment(createTimeRange[0]).format('YYYY-MM-DD HH:mm:ss');
            cloneParams.endTime = moment(createTimeRange[1])
              .endOf('day')
              .format('YYYY-MM-DD HH:mm:ss');
          }
          const { data: tableData = [] } = await queryJobMessage({ ...cloneParams });
          const { data, totalCount: total } = tableData;
          return { data, total };
        }}
        columns={columns}
        rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 10,
        }}
      />
      <CreateForm
        title="新建任务"
        onCancel={() => handleNewTaskModalVisible(false)}
        modalVisible={newTaskModalVisible}
      >
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value, bid);
            if (success) {
              handleNewTaskModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          form={{
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 18,
            },
          }}
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
    </PageHeaderWrapper>
  );
};

// export default connect(({ global, user }: ConnectState) => ({
//   enums: global.enums,
//   currentUser: user.currentUser,
//   allStores: global.allStores,
// }))(TableList);

export default TableList
