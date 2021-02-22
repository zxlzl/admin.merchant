import { Effect } from 'dva';
import { Reducer } from 'redux';

import { getCurrentMerchant, queryByUid } from '@/components/api/remit/merchant';
export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  // accountList: any[];
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    fetchMerchant: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {
      name: '',
      avatar: '/favicon.png',
    },
  },

  effects: {
    *fetchCurrent({ payload, callback }, { call, put }) {
      try {
        const { data = {} } = yield call(getCurrentMerchant, payload);
        yield put({
          type: 'saveCurrentUser',
          payload: { ...data, name: data.merchantName, avatar: '/favicon.png' },
        });
        if (callback) callback(data, callback);
      } catch (error) {
        if (callback) callback(error, callback);
      }
    },
    *fetchMerchant({ payload, callback }, { call, put }) {
      try {
        const { data = [] } = yield call(queryByUid, payload);
        yield put({
          type: 'saveCurrentUser',
          payload: { accountList: data },
        });
        if (callback) callback(data, callback);
      } catch (error) {
        if (callback) callback(error, callback);
      }
    },
  },

  reducers: {
    saveCurrentUser(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload } || {},
      }
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
