import { SwapOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Avatar, Menu, Spin, Modal, Input, message } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';

import { changePassword, switchMerchant, getPublicKey } from '@/components/api/remit/user';

import styles from './index.less';

const FormItem = Form.Item;

export interface GlobalHeaderRightProps extends ConnectProps {
  currentUser?: CurrentUser;
  menu?: boolean;
}


/** 修改密码弹窗 */
const EditModal = Form.create<EditFormProps>()((props: EditFormProps) => {
  const { form, loading, onOk, onCancel, visible } = props;
  const { getFieldDecorator, validateFields } = form;
  const okHandle = () => {
    validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
    },
  };

  const modalProps = {
    visible,
    onCancel,
    onOk: okHandle,
    title: '修改密码',
    destroyOnClose: true,
    okButtonProps: { loading },
  };

  return (
    <Modal {...modalProps}>
      <Form>
        <FormItem {...formItemLayout} label="原密码">
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, message: '请填写原密码' }],
          })(<Input.Password />)}
        </FormItem>
        <FormItem {...formItemLayout} label="新密码">
          {getFieldDecorator('newPassword', {
            rules: [{ required: true, message: '密码应为6-20位字母、数字或字符', pattern: /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{6,20}$/ }],
          })(<Input.Password />)}
        </FormItem>
        <FormItem {...formItemLayout} label="确认新密码">
          {getFieldDecorator('confirmPassword', {
            rules: [{ required: true, message: '密码应为6-20位字母、数字或字符', pattern: /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{6,20}$/ }],
          })(<Input.Password />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {

  state = {}

  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    if (key === 'changePassword') {
      this.setState({ visible: true })
    }
  };

  onAccountChange = async (event: ClickParam) => {
    const { key } = event;
    const merchantNo = localStorage.getItem('merchant_no') || ''
    localStorage.setItem('merchant_no', key);
    try {
      await switchMerchant(key)
      location.reload()
    } catch (error) {
      localStorage.setItem('merchant_no', merchantNo);
    }
  };

  /**
   * 修改密码
   *
   * @memberof AvatarDropdown
   */
  handleChangePassword = async (value) => {
    const { currentUser = {} } = this.props;
    if (value.newPassword !== value.confirmPassword) {
      message.info('确认密码与新密码不一致！')
      return false
    }
    const rsa = new JSEncrypt()
    // 获取公钥
    const { data: publickKey } = await getPublicKey(currentUser['mobile'])
    // 这是公钥
    rsa.setPublicKey(publickKey)
    // 加密密码
    const encryptedOld = rsa.encrypt(value.oldPassword)
    // const encryptedNew = rsa.encrypt(value.newPassword)
    const encryptedConfirm = rsa.encrypt(value.confirmPassword)

    await changePassword(encryptedOld, encryptedConfirm, encryptedConfirm)
    message.success('密码修改成功，请重新登录！');
    this.setState({ visible: false })
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'login/goToLogin',
      });
    }
  }

  renderAccountDropdown = () => {
    const { currentUser } = this.props;
    const accountList = currentUser ? currentUser['accountList'] ? currentUser['accountList'] : [] : []
    return <Menu className={styles.menu} selectedKeys={[]} onClick={this.onAccountChange}>
      {accountList.map((a: any) => (<Menu.Item key={a.merchantNo}>{a.merchantName}-{a.collectedSubjectName}</Menu.Item>))}
    </Menu>
  }

  render(): React.ReactNode {
    const {
      menu,
      currentUser = {
        avatar: '',
        name: '',
        collectedSubjectName: ''
      },
    } = this.props;
    const { visible } = this.state

    
    const modalProps = {
      title: '修改密码',
      visible,
      onOk: this.handleChangePassword, // 确认事件
      onCancel: () => this.setState({ visible: false }), // 取消事件
    };
    return currentUser ? (
      <>
        <HeaderDropdown overlay={this.renderAccountDropdown()}>
          <span>
          <SwapOutlined style={{ cursor: 'pointer' }} />
          {currentUser.name}{currentUser['collectedSubjectName'] ? `-${currentUser['collectedSubjectName']}` : ''}
          </span>
        </HeaderDropdown>
        <EditModal {...modalProps} />
      </>
    ) : (
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown)
