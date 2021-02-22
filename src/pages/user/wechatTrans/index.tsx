import React, { Component } from 'react';
import { connect } from 'dva';
import getQuery from '@/utils/query';
import { StateType } from '@/models/login';
import { ConnectState } from '@/models/connect';

@connect(({ login }: ConnectState) => ({
  userLogin: login,
}))
class index extends Component {
  static propTypes = {};

  async componentDidMount() {
    const { dispatch } = this.props;
    const auth_code = getQuery('auth_code');
    console.log(this.props);
    dispatch({
      type: 'login/loginWithScanCode',
      payload: auth_code,
    });
    // const {data} = await weChatWorkScanCodeAuthLogin(auth_code)
    // console.log(data);
  }

  render() {
    return <div></div>;
  }
}

export default index;
