import React, { Component } from 'react';
import { Result, Button } from 'antd';
import styles from './style.less';
import router from 'umi/router';
import failImg from '@/assets/fail.png';

export class index extends Component {

  go = () => {
    window.open('https://work.weixin.qq.com/','_blank')
  }

  reLogin = () => {
    router.push({
      pathname: '/user/login',
    })
  }

  render() {
    return (
      <div className={styles.pos}>
        <div className={styles.imgPos}>
        <img className={styles.img} src={failImg}></img>
        </div>
        <Result
        icon={<></>}
          title="企业微信扫描登录不成功，请使用其他方式登录"
          subTitle={
            <div className={styles.para}>
              企业微信扫描登录不成功，可能有如下原因：
              <br />
              1.你可能有多个企业身份，确保当前所在企业安装了宫薪记应用。
              <br />
              2.你可能还未开通或绑定过宫薪记平台帐号，请联系你企业的管理员。
              <br />
              3.若你是企业微信管理员，且这是你第一次登录，请使用宫薪记平台账号登录后绑定你的企业微信"
            </div>
          }
          extra={[
            <Button type="primary" key="console" onClick={this.reLogin}>
              重新登录
            </Button>,
            <Button key="buy" onClick={this.go}>企业微信后台</Button>,
          ]}
        />
      </div>
    );
  }
}

export default index;
