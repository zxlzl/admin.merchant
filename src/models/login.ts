import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

import { login, logout } from '@/components/api/remit/user';
import {sendSmsVerificationCode,loginWithPhoneNumber,weChatWorkScanCodeAuthLogin } from '@/components/api/authuser'

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    loginWithPhone: Effect;
    loginWithScanCode: Effect;
    getCaptcha: Effect;
    logout: Effect;
    goToLogin: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { mobile, password, userType } = payload;
      try {
        const response = yield call(login, mobile, password, userType);
        const { success, redirectUrl, data = {} } = response;
        const { authToken, merchantNo, merchantName } = data;
        if (!success) {
          return false;
        }
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });

        // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        // 记录登录token,id
        localStorage.setItem('merchant_token', authToken);
        localStorage.setItem('merchant_no', merchantNo);
        localStorage.setItem('merchant_name', merchantName);
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || redirectUrl || '/welcome'));
      } catch (e) {
        console.error(e);
      }
    },

    *loginWithPhone({ payload }, { call, put }) {
      const { phoneNumber, smsVerificationCode } = payload;
      try {
        const response = yield call(loginWithPhoneNumber, phoneNumber, smsVerificationCode);
        const { success, redirectUrl, data = {} } = response;
        const { authToken, merchantNo, merchantName } = data;
        if (!success) {
          return false;
        }
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });

        // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        // 记录登录token,id
        localStorage.setItem('merchant_token', authToken);
        localStorage.setItem('merchant_no', merchantNo);
        localStorage.setItem('merchant_name', merchantName);
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || redirectUrl || '/welcome'));
      } catch (e) {
        console.error(e);
      }
    },

    *loginWithScanCode({ payload }, { call, put }) {
      try {
        const response = yield call(weChatWorkScanCodeAuthLogin,payload);
        const { success, redirectUrl, data = {} } = response;
        const { authToken, merchantNo, merchantName } = data;
        if (!success) {
          return false;
        }
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });

        // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        // 记录登录token,id
        localStorage.setItem('merchant_token', authToken);
        localStorage.setItem('merchant_no', merchantNo);
        localStorage.setItem('merchant_name', merchantName);
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || redirectUrl || '/welcome'));
      } catch (e) {
        console.error(e);
      }
    },

    *getCaptcha({ payload }, { call }) {
      const {phoneNumber,type} = payload
      console.log(phoneNumber)
      yield call(sendSmsVerificationCode, phoneNumber,type);
    },


    *logout(_, { call, put }) {
      yield call(logout);
      localStorage.clear();
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
    *goToLogin(_, { call, put }) {
      localStorage.clear();
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
