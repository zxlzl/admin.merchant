import React, { FC, useEffect, useState } from 'react';
import { Modal, Row, Col, Form, Button, Input, message } from 'antd';
import { BasicListItemDataType } from '../data.d';
import { Dispatch, AnyAction } from 'redux';

//api
import {
  sendGraphicVerificationCode,
  sendSmsVerificationCode,
  passwordReset,
} from '@/components/api/authuser';
import { getPublicKey } from '@/components/api/remit/user';

interface ChangePassProps {
  visible: boolean;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: (visible: boolean) => void;
  dispatch: Dispatch<AnyAction>;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const ChangePass: FC<ChangePassProps> = props => {
  const [form] = Form.useForm();
  const { visible, onCancel, onSubmit, dispatch } = props;

  const [graphicUrl, handleGraphicUrl] = useState('');
  const [smsTime, handleSmsTime] = useState<number>(59);
  const [loading, handleLoading] = useState<boolean>(false);

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (visible) {
      getGraphic();
    }
  }, [props.visible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    const rsa = new JSEncrypt();
    const { data: publickKey } = await getPublicKey(values.phoneNumber);
    rsa.setPublicKey(publickKey);
    const encrypted = rsa.encrypt(values.newPassword);

    const params = {
      ...values,
      newPassword: encrypted,
      confirmPassword: encrypted,
    };
    const res = await passwordReset(params);
    message.success('操作成功！')
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };

  const modalFooter = { okText: '确定', onOk: handleSubmit, onCancel: () => onCancel(false) };

  const getGraphic = async () => {
    const res = await sendGraphicVerificationCode(undefined, undefined, {
      responseType: 'blob',
    });
    handleGraphicUrl(window.URL.createObjectURL(res));
  };

  const count = () => {
    let time = smsTime;
    let siv = setInterval(() => {
      handleSmsTime(--time);
      if (time <= -1) {
        clearInterval(siv);
        handleSmsTime(59);
        handleLoading(false);
      }
    }, 1000);
  };

  const onGetCaptcha = async () => {
    const { phoneNumber } = await form.validateFields(['phoneNumber']);
    if (phoneNumber) {
      const { code='' } = await sendSmsVerificationCode(phoneNumber, 2);
      if (code == 0) {
        handleLoading(true);
        if (smsTime !== 0) {
          count();
        }
      }
    }
    // if (phoneNumber) {
    //   new Promise<boolean>(async (resolve, reject) => {
    //     try {
    //       const success = await ((dispatch({
    //         type: 'login/getCaptcha',
    //         payload: { phoneNumber, type: 2 },
    //       }) as unknown) as Promise<unknown>);
    //       console.log(!!success);
    //       resolve(!!success);
    //       if (!!success) {
    //         handleLoading(true);
    //         if (smsTime !== 0) {
    //           count();
    //         }
    //       }
    //     } catch (error) {
    //       reject(error);
    //     }
    //   });
    // } else {
    //   message.warning('请输入注册手机号!');
    // }
    // console.log(res);
  };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="phoneNumber"
          label="注册手机号"
          rules={[{ required: true, message: '请输入注册手机号' }]}
        >
          <Input placeholder="请输入注册手机号" />
        </Form.Item>
        <Form.Item
          label="图形验证码"
          name="graphicVerificationCode"
          rules={[{ required: true, message: '请输入图形验证码' }]}
        >
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item name="captcha" noStyle>
                <Input placeholder="请输入图形验证码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <a onClick={getGraphic}>
                <img style={{ height: 32 }} src={graphicUrl} />
              </a>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          label="短信验证码"
          name="smsVerificationCode"
          rules={[{ required: true, message: '请输入短信验证码' }]}
        >
          <Row gutter={8}>
            <Col span={15}>
              <Form.Item name="smsVerificationCode" noStyle>
                <Input placeholder="请输入短信验证码" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Button
                style={{ width: '100%' }}
                disabled={loading}
                onClick={onGetCaptcha}
                type="primary"
              >
                {loading ? `${smsTime}秒` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[{ required: true, message: '请输入6-20位大小写字母、数字或符号' },{min: 6,message:'密码不能少于6个字符'},{max: 20,message:'密码不能大于20个字符'}]}
        >
          <Input.Password placeholder="请输入6-20位大小写字母、数字或符号" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认新密码"
          dependencies={['newPassword']}
          // hasFeedback
          rules={[
            { required: true, message: '请再次输入新密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不同!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入新密码" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal title="忘记登录密码" width={600} destroyOnClose visible={visible} {...modalFooter}>
      {getModalContent()}
    </Modal>
  );
};

export default ChangePass;
