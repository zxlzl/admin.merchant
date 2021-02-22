import React from 'react';
import '@ant-design/compatible/assets/index.css';
import { Input, Card, Steps, Button, Form, Alert, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './style.less';
import { FormInstance } from 'antd/lib/form';
import Modal from 'antd/lib/modal/Modal';
import {  API_URL } from '@/utils/request';

import {
  querySecretByMerchantNo,
  saveMerchantSecret,
  queryPlatformSecret,
} from '@/components/api/remit/merchantsecret';

const { Step } = Steps;

class ApiSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantInfo: {},
      setVisible: false,
      viewVisible: false,
      merchantNo: '',
      secretInfo: {},
    };
  }
  formRef = React.createRef<FormInstance>();

  async componentDidMount() {
    const merchantNo = localStorage.getItem('merchant_no');
    const { data: merchantInfo = {} } = await querySecretByMerchantNo(merchantNo);

    this.setState({
      merchantInfo,
      merchantNo,
    });
  }

  controlSecret = (visible: boolean) => {
    this.setState({
      setVisible: visible,
    });
  };

  setSecret = async () => {
    const values = await this.formRef.current.validateFields();
    const merchantNo = this.state.merchantNo;
    await saveMerchantSecret({ ...values, merchantNo });
    message.success('操作成功');
    this.controlSecret(false);
  };

  controlView = async (visible: boolean) => {
    if (visible) {
      const { data } = await queryPlatformSecret();
      this.setState({
        secretInfo: data,
      });
    }

    this.setState({
      viewVisible: visible,
    });
  };

  render() {
    const { merchantInfo, setVisible, viewVisible, secretInfo } = this.state;

    const current = merchantInfo?.gmtCreate ? 1 : 0;
    const oneStep = (
      <div>
        API密钥属于敏感信息，请妥善保管不要泄露，如果怀疑信息泄露，请重设密钥。
        <br />
        {current == 1 && `你已于${merchantInfo?.gmtCreate}成功设置密钥`}
        <a style={{ float: 'right' }} onClick={() => this.controlSecret(true)} type="primary">
          设置
        </a>
      </div>
    );
    const twoStep = (
      <div>
        API密钥属于敏感信息，请妥善保管不要泄露。
        {merchantInfo?.downloadTime && <br />}
        {merchantInfo?.downloadTime && `你已于${merchantInfo?.downloadTime}下载密钥`}
        <a style={{ float: 'right' }} onClick={() => this.controlView(true)} type="primary">
          查看秘钥
        </a>
      </div>
    );

    const setProps = {
      visible: setVisible,
      title: '配置商户API密钥',
      onCancel: () => this.controlSecret(false),
      onOk: this.setSecret,
      width: 540,
      cancelText: '取消',
      okText: '确定',
      destroyOnClose: true,
    };

    const viewProps = {
      visible: viewVisible,
      title: '查看平台API密钥',
      width: 540,
      destroyOnClose: true,
      onCancel: () => this.controlView(false),
    };

    return (
      <PageHeaderWrapper>
        <Card title="API密钥">
          <Steps direction="vertical" current={1}>
            <Step title="设置商户API公钥" description={oneStep} />
            <Step title="下载平台API公钥" description={twoStep} />
          </Steps>
        </Card>

        {/* 设置秘钥 */}
        <Modal {...setProps}>
          <Form ref={this.formRef}>
            <Alert
              className={styles.alert}
              message="若商户开发语言为php，需将公钥转化为java版本格式公钥字符串"
              type="warning"
              showIcon
              closable
            />
            <Form.Item
              label="新商户密钥"
              name="pubkey"
              rules={[
                { required: true, message: '请输入新商户密钥!' },
                { pattern: /^[A-Za-z\d]*$/, message: '只允许输入数字和英文大小写字母的组合!' },
              ]}
            >
              <Input.Password placeholder="只允许输入数字和英文大小写字母的组合" />
            </Form.Item>
            <Form.Item
              label="确认新密钥"
              name="confirmPubkey"
              rules={[
                { required: true, message: '请输入新商户密钥!' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('pubkey') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不同!');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="再次输入新商户密钥" />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          {...viewProps}
          footer={[
            <Button key="opt" type="primary" onClick={() => this.controlView(false)}>
              我知道了
            </Button>,
          ]}
        >
          <Form
            initialValues={{
              pubkeyJAVA: secretInfo?.pubkeyJAVA,
              pubkeyPHP: secretInfo?.pubkeyPHP,
            }}
          >
            <Form.Item
              name="pubkeyJAVA"
              label="平台API密钥(Java版本)"
              rules={[{ required: true }]}
              extra={
                <>
                  <CopyToClipboard text={secretInfo?.pubkeyJAVA}>
                    <a className={styles.copy} type="primary">
                      复制
                    </a>
                  </CopyToClipboard>
                  <a download href={`${API_URL}/remit/merchantsecret/downLoadSecret?fileName=${secretInfo?.pubkeyJAVAFile}`} >下载</a>
                </>
              }
            >
              <Input.TextArea readOnly />
            </Form.Item>
            <Form.Item
              extra={
                <>
                  <CopyToClipboard text={secretInfo?.pubkeyPHP}>
                    <a className={styles.copy}>复制</a>
                  </CopyToClipboard>
                  <a download href={`${API_URL}/remit/merchantsecret/downLoadSecret?fileName=${secretInfo?.pubkeyPHPFile}`} >下载</a>
                </>
              }
              rules={[{ required: true }]}
              name="pubkeyPHP"
              label="平台API密钥(PHP版本)"
            >
              <Input.TextArea readOnly />
            </Form.Item>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default ApiSet;
