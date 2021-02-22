import React, { useState } from 'react';
import { Form, Alert, Modal, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from '@/utils/request';

const FormItem = Form.Item;

interface ImportUserProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const ImportUser: React.FC<ImportUserProps> = props => {
  const [form] = Form.useForm();
  const [uploadButton, handleUploadButton] = useState(true);

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const { upload } = fieldsValue;
    handleAdd(upload[0]);
  };

  const templateUrl = `${API_URL}/import/user/downLoadTemplate`;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const changeFile = ({ file, fileList }) => {
    if (fileList.length === 0) {
      handleUploadButton(true);
    } else {
      handleUploadButton(false);
    }
  };

  return (
    <Modal
      destroyOnClose
      title="导入用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
      width={550}
    >
      <Alert
        style={{ marginBottom: '20px' }}
        message="导入成功的用户，将同步发送短信。通知用户登录宫薪记小程序入驻成为平台服务者并报名任务。"
        type="warning"
        showIcon
        closable
      />
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="上传数据"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra={
            <>
              <a href={templateUrl} download>
                下载用户导入模板
              </a>
              <div>目前支持格式xlsx，文件大小请控制在 1MB 以内。用户导入数据上限：1000条数据</div>
            </>
          }
          name="upload"
          rules={[{ required: true, message: '请上传文件！' }]}
        >
          <Upload onChange={changeFile} name="upload" action={`${API_URL}/remit/attachment/uploadAttachment`}>
            {uploadButton && <Button icon={<UploadOutlined />}>选择文件</Button>}
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default ImportUser;
