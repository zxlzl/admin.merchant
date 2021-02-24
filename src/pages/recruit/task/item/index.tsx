import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Input,
  Form,
  InputNumber,
  Select,
  Upload,
  Cascader,
  Modal,
  message,
  TimePicker,
  Radio,
} from 'antd';
import { connect, Dispatch, history } from 'umi';
import React, { FC, useState, useEffect } from 'react';
import { getQuery } from '@/utils/utils';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getCascaderEnum } from '@/utils/utils';
import { ConnectState } from '@/models/connect';
import moment from 'moment';
import { CurrentUser, Enums, StoreItem } from '@/models/common';
import { API_URL } from '@/utils/request';
import styles from '../index.less';

// api
import { findJobMessage, updateJob } from '@/components/api/smcs_job';
import { deleteById } from '@/components/api/file';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { RangePicker: TimeRangePicker } = TimePicker;

interface BasicFormProps {
  dispatch: Dispatch<any>;
  enums: Enums;
  currentUser: CurrentUser;
  allStores: StoreItem[];
}

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    md: {
      span: 10,
    },
  },
};
const submitFormLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 7,
    },
  },
};

const BasicForm: FC<BasicFormProps> = (props) => {
  const taskId = getQuery('taskId'); // 任务id
  const pageType = getQuery('type') === 'detail'; // 详情页 true 编辑页 false
  const { enums, allStores = [], currentUser = {} } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imgList, setImgList] = useState([]);
  const [bid, setBid] = useState('');
  const [isEnroll, setIsEnroll] = useState(false);
  const [form] = Form.useForm();
  const [repeatType, setRepeatType] = useState(-1);

  // select枚举 任务分类 标签
  const { jobClassify, jobTag, jobRepeatCode, jobRepeatType } = enums ? enums : {};
  const jobClassifyEnum = [],
    jobRepeatCodeEnum = [],
    jobRepeatTypeEnum = [],
    jobTagEnum = [];
  if (enums) {
    for (const [key, value] of Object.entries(jobClassify)) {
      jobClassifyEnum.push(
        <Option key={key} value={key}>
          {value}
        </Option>,
      );
    }

    for (const [key, value] of Object.entries(jobTag)) {
      jobTagEnum.push(
        <Option key={key} value={key}>
          {value}
        </Option>,
      );
    }

    for (const [key, value] of Object.entries(jobRepeatCode)) {
      jobRepeatCodeEnum.push(
        <Option key={key} value={key}>
          {value}
        </Option>,
      );
    }

    for (const [key, value] of Object.entries(jobRepeatType)) {
      jobRepeatTypeEnum.push(
        <Option key={key} value={Number(key)}>
          {value}
        </Option>,
      );
    }
  }

  const storesEnum = allStores.map(({ id, storeName, companyCode }) => (
    <Option key={id} value={id}>
      {storeName}
    </Option>
  ));

  // 获取单个任务详情
  useEffect(() => {
    (async () => {
      const { data } = await findJobMessage({ id: taskId });
      const {
        tag,
        classify,
        repeatType,
        repeatCode,
        enrollStart,
        enrollEnd,
        jobStartDate,
        jobEndDate,
        pictureCode,
        jobStartTime,
        jobEndTime,
        attachments,
        status, //状态 上下架
        enrollStatus, //是否报名
      } = data;
      enrollStatus == 2 && setIsEnroll(true);
      setBid(pictureCode);
      setRepeatType(repeatType);
      // get img filelist
      const imgs = attachments && attachments.map(({ url, id }) => ({ url: url, uid: id }));
      attachments && setImgList(imgs);
      form.setFieldsValue({
        ...data,
        classify: classify.toString(),
        tag: [tag.toString()],
        enrollTimeRange: [moment(enrollStart), moment(enrollEnd)],
        jobDateRange: [moment(jobStartDate), moment(jobEndDate)],
        jobTimeRange: [moment(jobStartTime), moment(jobEndTime)],
        repeatCode: repeatCode && repeatCode.split(','),
      });
    })();
  }, []);

  const onFinish = async (values: { [key: string]: any }) => {
    const {
      enrollTimeRange: enroll,
      jobDateRange: jobDate,
      jobTimeRange: jobTime,
      tag,
      repeatCode,
      classify,
    } = values;
    const fieldsValue = {
      ...values,
      enrollStart: enroll[0].format('YYYY-MM-DD HH:mm:ss'),
      enrollEnd: enroll[1].format('YYYY-MM-DD HH:mm:ss'),
      jobEndDate: jobDate[1].endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      jobStartDate: jobDate[0].format('YYYY-MM-DD HH:mm:ss'),
      jobStartTime: jobTime[0].format('YYYY-MM-DD HH:mm:ss'),
      jobEndTime: jobTime[1].format('YYYY-MM-DD HH:mm:ss'),
      tag: tag.join(),
      repeatCode: repeatCode && repeatCode.join(),
      classify: typeof classify === 'string' ? classify : classify.join(),
      id: taskId,
    };
    try {
      await updateJob({ ...fieldsValue });
      message.success('操作成功');
      history.push({
        pathname: '/task/release',
      });
      return true;
    } catch (error) {
      message.error('配置失败请重试！');
      return false;
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  const [previewImage, setPreviewImage] = useState('');
  /**
   * 预览图片
   * @param file
   */
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChangeImg = async (fileObj: any) => {
    const { fileList } = fileObj;
    setImgList(fileList);
  };

  const removeImg = async (file: any) => {
    const { uid: id } = file;
    await deleteById(id);
    return true;
  };

  const getExtraData = async (file: any) => {
    return {
      bid,
      fileTypeEnum: 'SMCS_CODE_JOB',
      username: currentUser.mobile,
    };
  };

  const changeRepeatType = (value: any) => {
    setRepeatType(value);
  };

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Form
          style={{
            marginTop: 8,
          }}
          form={form}
          name="task-item"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // initialValues={data}
        >
          <FormItem
            {...formItemLayout}
            label="名称"
            name="jobName"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入任务名称" disabled={pageType || isEnroll} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            name="classify"
            label="分类"
            rules={[{ required: true, message: '请选择任务分类' }]}
          >
            <Select placeholder="请选择任务分类" disabled={pageType}>
              {jobClassifyEnum}
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            name="tag"
            label="标签"
            rules={[{ required: true, message: '请选择任务标签' }]}
          >
            <Select mode="multiple" placeholder="请选择任务标签" disabled={pageType}>
              {jobTagEnum}
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
            name="represent"
            rules={[
              {
                required: true,
                message: '请输入任务描述',
              },
            ]}
          >
            <TextArea
              disabled={pageType}
              style={{
                minHeight: 32,
              }}
              placeholder="请输入任务描述"
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="图片"
            rules={[
              {
                required: true,
                message: '请上传图片',
              },
            ]}
            extra={pageType ? null : '最多可上传5张图片，建议尺寸640*640'}
          >
            <Upload
              accept="image/*"
              disabled={pageType}
              action={`${API_URL}/file/uploadPicture`}
              listType="picture-card"
              className="avatar-uploader"
              fileList={imgList}
              onPreview={handlePreview}
              onChange={handleChangeImg}
              data={getExtraData}
              onRemove={removeImg}
            >
              {imgList.length > 4 ? null : pageType ? null : uploadButton}
            </Upload>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<div className={styles.budgetScope}>预算范围(元)</div>}
            className={styles.budgetItem}
          >
            <FormItem
              rules={[
                {
                  required: true,
                  message: '请输入预算范围下限',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    let integer = /^([1-9]\d*)$/.test(value);
                    if (
                      (getFieldValue('budgetScopeMix') &&
                        getFieldValue('budgetScopeMix') <= value) ||
                      !integer
                    ) {
                      return Promise.reject('预算范围下限必须低于上限且为正整数!');
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
              name="budgetScopeMin"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <InputNumber
                disabled={pageType || isEnroll}
                style={{
                  width: '100%',
                }}
                placeholder="请输入预算范围下限"
                formatter={(value) => {
                  if (!value) return value;
                  return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }}
                parser={(value: any) => value.replace(/￥\s?|(,*)/g, '')}
              />
            </FormItem>
            -
            <FormItem
              name="budgetScopeMix"
              rules={[
                {
                  required: true,
                  message: '请输入预算范围上限',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    let integer = /^([1-9]\d*)$/.test(value);
                    if (
                      (getFieldValue('budgetScopeMin') &&
                        getFieldValue('budgetScopeMin') >= value) ||
                      !integer
                    ) {
                      return Promise.reject('预算范围上限必须高于下限且为正整数!');
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <InputNumber
                disabled={pageType || isEnroll}
                style={{
                  width: '100%',
                }}
                placeholder="请输入预算范围上限"
                formatter={(value) => {
                  if (!value) return value;
                  return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }}
                parser={(value: any) => value.replace(/￥\s?|(,*)/g, '')}
              />
            </FormItem>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="人数要求"
            name="peopleNumber"
            rules={[
              {
                required: true,
                message: '请输入人数要求',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  let integer = /^([1-9]\d*)$/.test(value);
                  if (integer) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject('人数为正整数');
                  }
                },
              }),
            ]}
          >
            <Input disabled={pageType} placeholder="请输入人数要求" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="报名时间范围"
            name="enrollTimeRange"
            rules={[
              {
                required: true,
                message: '请选择报名时间范围',
              },
            ]}
          >
            <RangePicker
              disabled={pageType || isEnroll}
              showTime
              // format="YYYY-MM-DD HH:mm:ss"
              style={{
                width: '100%',
              }}
              placeholder={['开始日期', '结束日期']}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="任务日期"
            name="jobDateRange"
            rules={[
              {
                required: true,
                message: '请选择任务日期范围',
              },
            ]}
          >
            <RangePicker
              disabled={pageType || isEnroll}
              // showTime
              format="YYYY-MM-DD"
              style={{
                width: '100%',
              }}
              placeholder={['开始日期', '结束日期']}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="任务时间"
            name="jobTimeRange"
            rules={[
              {
                required: true,
                message: '请选择任务时间范围',
              },
            ]}
          >
            <TimeRangePicker
              disabled={pageType || isEnroll}
              style={{
                width: '100%',
              }}
              placeholder={['开始时间', '结束时间']}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="重复"
            name="repeatType"
            rules={[
              {
                required: true,
                message: '请选择重复时间',
              },
            ]}
          >
            <Select
              onChange={changeRepeatType}
              placeholder="请选择重复时间"
              disabled={pageType || isEnroll}
            >
              {jobRepeatTypeEnum}
            </Select>
          </FormItem>
          {repeatType == 2 ? (
            <FormItem {...formItemLayout} label="重复日期" name="repeatCode">
              <Select mode="multiple" placeholder="请选择重复日期" disabled={pageType || isEnroll}>
                {jobRepeatCodeEnum}
              </Select>
            </FormItem>
          ) : null}
          {/* <FormItem
            {...formItemLayout}
            name="storeId"
            label="适用门店"
            rules={[{ required: true, message: '请选择任务门店' }]}
          >
            <Select disabled={pageType} placeholder="请选择任务门店">
              {storesEnum}
            </Select>
          </FormItem> */}
          <FormItem
            {...formItemLayout}
            name="recommendStatus"
            label="是否推荐任务"
            rules={[{ required: true, message: '请选择' }]}
          >
            <Radio.Group disabled={pageType}>
            <Radio value={true}>是，推荐</Radio>
            <Radio value={false}>否，不推荐</Radio>
            </Radio.Group>
          </FormItem>
          {!pageType && (
            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={() =>
                  history.push({
                    pathname: '/task/release',
                  })
                }
              >
                取消
              </Button>
            </FormItem>
          )}
        </Form>
      </Card>
      <Modal
        visible={previewVisible}
        title="预览图片"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(({ global, loading, user }: ConnectState) => ({
  enums: global.enums,
  allStores: global.allStores,
  currentUser: user.currentUser,
}))(BasicForm);
