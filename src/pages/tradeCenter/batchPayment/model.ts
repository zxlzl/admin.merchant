import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { PayStatus } from '@/utils/enums';

import { queryPayBatchDetail, queryPayDetailsStatistics } from '@/components/api/remit/paybatch';

export interface ModalState {
  customPanelStyle?: object; // 公共panel样式
  currentStep?: number; // 进度条步骤
  reUpload?: boolean; // 重新上传标记
  statistics?: object; // 批次统计数据
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModalState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {};
  reducers: {
    reUpload: Reducer<ModalState>;
    save: Reducer<ModalState>;
    nextStep: Reducer<ModalState>;
    // saveBatchStatistics: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'batchPayment',

  state: {
    currentStep: 0,
    reUpload: false,
    customPanelStyle: {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    },
    statistics: {},
  },

  effects: {
    *fetchCurrentBatch({ payload,payBatchNo:manualPayBatchNo }, { call, put }) {
      let batchStatus = {}
      if (manualPayBatchNo) { //第三步打款手动传参 批次号
        let { data={}} = yield call(queryPayBatchDetail,manualPayBatchNo);
        batchStatus = data
      }else {
        let { data={}} = yield call(queryPayBatchDetail);
        batchStatus = data
      }
      

      const { payStatus, payBatchNo, merchantNo,payChannelCode,merchantPayBatchNo,amount,count,payChannelCodeName } = batchStatus;

      let currentStep; // 当前步骤
      let showPayButton; // 第3步骤是否展示打款按钮
      let showLockButton; // 第2步骤是否展示锁定按钮
      let showFreshButton = false; // 第3步是否展示刷新页面提示

      // 批次状态
      // CREAT("00", "未锁定"),
      // LOCK("01","锁定"),
      // WAITPAY("02","待打款"),
      // PAYING("03","打款中"),
      // PAYFINISHED("04","打款完成"),
      // CANCEL("05","已撤销"),
      // FAIL("06","失败"),
      // LOCKING("07","锁定中"),
      // CANCELING("08","撤销中"),
      // CANCELING("09","待审核"),
      switch (String(payStatus)) {
        case '00': // 未锁定
          currentStep = 1;
          break;
        case '01': // 已锁定，第三步开始打款
          currentStep = 2;
          break;
        case '02':
          if (payload) {
            currentStep = 3;
          } else {
            currentStep = 0;
          }
          break;
        case '03':
          if (payload) {
            currentStep = 3;
          } else {
            currentStep = 0;
          }
          break;
        case '07': // 锁定中
          showFreshButton = true;
          currentStep = 2;
          break;
        case '09': // 待审核
          currentStep = 2;
          break;
        case '06': // 失败
          currentStep = 2;
          break;
        case '04': // 打款完成
          if (payload) {
            currentStep = 3;
            
          } else {
            currentStep = 0;
          }
          break;
        case '05': // 撤销
        case '08': // 撤销中
          currentStep = 0;
          break;
        default:
          currentStep = 0;
          showFreshButton = false;
      }
      yield put({
        type: 'save',
        payload: {
          currentStep,
          showPayButton,
          payBatchNo,
          merchantNo,
          showLockButton,
          payStatus,
          showFreshButton,
          payChannelCode,
          merchantPayBatchNo,amount,count,payChannelCodeName
        },
      });
      // 存在批次号查询批次统计
      if (payBatchNo) {
        yield put({
          type: 'fetchBatchStatistics',
          payload: payBatchNo,
        });
      }
    },
    *fetchBatchStatistics({ payload }, { call, put }) {
      const { data: statistics = {} } = yield call(queryPayDetailsStatistics, payload);
      yield put({
        type: 'save',
        payload: { statistics },
      });
    },
  },

  reducers: {
    // 标记重新上传
    reUpload(state, action) {
      return {
        ...state,
        reUpload: action.payload,
      };
    },
    /** 切换步骤 */
    nextStep(state, action) {
      return {
        ...state,
        currentStep: action.payload,
      };
    },
    /** 保存到state */
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default Model;
