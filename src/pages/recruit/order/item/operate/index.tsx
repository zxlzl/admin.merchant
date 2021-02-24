import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { BasicListItemDataType } from '../../data';
import styles from '../style.less';

interface OperationModalProps {
  title: string;
  visible: boolean;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
  data?: {};
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { title, visible, onCancel, onSubmit, data } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    form.setFieldsValue({ ...data });
  });

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    const {remuneration }= values
    const params ={
      ...values,
      remuneration:Number(remuneration).toFixed(2)
    }
    if (onSubmit) {
      onSubmit({ ...(params as BasicListItemDataType) });
    }
  };

  const modalFooter = { onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    const [refuse, setRefuse] = useState(-1);
    const checkTask = (e: any) => {
      setRefuse(e.target.value);
    };
    if (title == '审核任务单') {
      return (
        <Form {...formLayout} form={form} onFinish={handleFinish}>
          <Form.Item
            name="auditResult"
            label="审核结论"
            rules={[{ required: true, message: '请选择' }]}
          >
            <Radio.Group onChange={checkTask}>
              <Radio value="0">审核通过</Radio>
              <Radio value="1">审核拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          {refuse == 1 ? (
            <Form.Item name="auditIsnoReason" label="拒绝原因">
              <TextArea
                style={{
                  minHeight: 32,
                }}
                placeholder="请输入拒绝原因"
                rows={4}
              />
            </Form.Item>
          ) : null}
        </Form>
      );
    } else {
      return (
        <Form {...formLayout} form={form} onFinish={handleFinish}>
          <Form.Item name="jobSonCode" label="子任务单号" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="checkResult"
            label="验收结论"
            rules={[{ required: true, message: '请选择' }]}
          >
            <Radio.Group onChange={checkTask}>
              <Radio value="0">验收通过</Radio>
              <Radio value="1">验收拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          {refuse == 1 ? (
            <Form.Item name="checkIsnoReason" label="拒绝原因">
              <TextArea
                style={{
                  minHeight: 32,
                }}
                placeholder="请输入拒绝原因"
                rows={4}
              />
            </Form.Item>
          ) : null}
          <Form.Item
            name="remuneration"
            label="核对金额"
            rules={[
              { required: true, message: '请输入' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  let patter = /^[+]?\d+(\.\d+)?$/;
                  if (patter.test(value)) {
                  return Promise.resolve();
                  } else {
                    return Promise.reject('核对金额为数字');
                  }
                },
              }),
            ]}
          >
            <Input prefix="￥" suffix="RMB" />
          </Form.Item>
        </Form>
      );
    }
  };

  return (
    <Modal
      title={title}
      className={styles.standardListForm}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
