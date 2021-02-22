import React, { useState, useEffect } from 'react';
import { Modal, Form, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { updatePaymentBasisDocument } from '@/components/api/remit/paybatch';
import axios from 'axios';
import { API_URL } from '@/utils/request';

interface PayBaseProps {
  modalVisible: boolean;
  onCancel: (visible: boolean) => void;
  payBaseInfo: {};
  reload:()=>void
}

const PayBase: React.FC<PayBaseProps> = props => {
  const { modalVisible, onCancel, payBaseInfo,reload } = props;
  const { defaultFileList = [], allowAudit, payBatchNo, } = payBaseInfo||{};
  const [fileList, handleFile] = useState([]);
  useEffect(() => {
    const nowList = defaultFileList;
    if (nowList?.length) {
      handleFile(nowList);
    }
  }, [modalVisible]);

  const changeFile = info => {
    handleFile(info.fileList.filter(file => !!file.status));
  };

  const handleOk = async () => {
    const file = fileList[0];
    const { originFileObj='',url } = file||{};
    if (url) {
      onCancel(false)
      return
    }
    if (originFileObj) {
      const formData = new FormData();
      formData.append('paymentBasisDocument', originFileObj);
      formData.append('payBatchNo', payBatchNo);
      axios
        .post(`${API_URL}/remit/paybatch/updatePaymentBasisDocument`, formData, {
          headers: {
            Device: '1',
            Authorization: localStorage.getItem('merchant_token'),
          },
        })
        .then(res => {
          const { data = {} } = res;
          if (data.code == 0) {
            message.success('操作成功！');
            reload && reload()
            onCancel(false);
          } else {
            message.error(data.message);
          }
        });
    }else {
      // 没有选择文件，会提示让用户选择文件
      await updatePaymentBasisDocument(payBatchNo);
      onCancel(false);
    }
  };

  return (
    <Modal
      destroyOnClose
      title="上传文件"
      visible={modalVisible}
      onCancel={() => onCancel(false)}
      onOk={handleOk}
      okButtonProps={{ disabled: allowAudit ? false : true }}
      cancelButtonProps={{ disabled: allowAudit ? false : true }}
    >
      <Form>
        <Form.Item label="打款依据文件" extra="支持扩展名：.rar .zip .doc .docx .pdf .jpg...">
          <Upload defaultFileList={[...fileList]} onChange={changeFile} action={`${API_URL}/remit/attachment/uploadAttachment`}>
            {fileList.length === 0 && <Button icon={<UploadOutlined />}>选择文件</Button>}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PayBase;
