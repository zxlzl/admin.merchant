import { Alert, Checkbox } from 'antd';
import React, { Component } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { ConnectState } from '@/models/connect';
import ChangePass from './components/ResetPass';
import business_wechat from '@/assets/business_wechat.svg';
import {appid,redirect_uri,wechat_state,usertype} from '@/utils/utils'

// api
import { getPublicKey } from '@/components/api/remit/user';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;
interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
  changePassModalVisible: boolean;
}

@connect(({ login }: ConnectState) => ({
  userLogin: login,
}))
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
    changePassModalVisible: false,
  };

  componentDidMount() {
  }

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = async (err: unknown, values: LoginParamsType) => {
    if (!err) {
      const { dispatch } = this.props;
      if (values?.mobile) {
        const rsa = new JSEncrypt();
        // 获取公钥
        const { data: publickKey } = await getPublicKey(values.mobile);
        // 这是公钥
        rsa.setPublicKey(publickKey);
        // 加密密码
        const encrypted = rsa.encrypt(values.password);

        dispatch({
          type: 'login/login',
          payload: { mobile: values.mobile, password: encrypted, userType: '1' },
        });
      } else {
        dispatch({
          type: 'login/loginWithPhone',
          payload: {
            phoneNumber: values.phoneNumber,
            smsVerificationCode: values.smsVerificationCode,
          },
        });
      }
    }
  };

  onTabChange = (type: string) => {
    this.setState({
      type,
    });
  };

  onGetCaptcha = () =>
    new Promise<boolean>((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(
        ['phoneNumber'],
        {},
        async (err: unknown, values: LoginParamsType) => {
          if (err) {
            reject(err);
          } else {
            const { dispatch } = this.props;
            try {
              const success = await ((dispatch({
                type: 'login/getCaptcha',
                payload: { phoneNumber: values.phoneNumber, type: 1 },
              }) as unknown) as Promise<unknown>);
              resolve(!!success);
            } catch (error) {
              reject(error);
            }
          }
        },
      );
    });

  renderMessage = (content: string) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  resetPass = (visible: boolean) => {
    this.setState({
      changePassModalVisible: visible,
    });
  };

  render() {
    const { userLogin, dispatch } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, submitting, changePassModalVisible } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户密码登录">
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误')}
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${'密码'}`}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage('手机号或验证码错误')}
            <Mobile
              name="phoneNumber"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <Captcha
              name="smsVerificationCode"
              placeholder="验证码"
              countDown={60}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="获取验证码"
              getCaptchaSecondText="秒"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
            />
          </Tab>

          <div className={styles.forget}>
            {/* <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              记住密码
            </Checkbox> */}
            <a
              style={{
                float: 'right',
              }}
              onClick={() => this.resetPass(true)}
            >
              忘记密码
            </a>
          </div>
          <Submit>登录</Submit>
          <div id="wechat" className={styles.other}>
            企业微信登录
            {/* <WeiboCircleOutlined className={styles.icon} /> */}
            <a href={`https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${wechat_state}@gyoss9&usertype=${usertype}`}>
              <img src={business_wechat}></img>
            </a>
            {/* <Link className={styles.register} to="/user/register">
            注册账户
          </Link> */}
          </div>
        </LoginComponents>
        <ChangePass
          visible={changePassModalVisible}
          onCancel={this.resetPass}
          onSubmit={() => this.resetPass(false)}
          dispatch={dispatch}
        />
      </div>
    );
  }
}

export default Login;
