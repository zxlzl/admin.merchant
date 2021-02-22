/* eslint-disable no-underscore-dangle */
/**
 * 枚举类
 *
 * @author shixin.deng
 * @param props  [{key: number|string, value: number|string, ...other}]
 * 栗子：
 *  const StepEnum = new Enum([
 *    { key: 'STEP1', name: '步骤1', value: 1 },
 *    { key: 'SETP2', name: '步骤2', value: 2 },
 *  ]);
 *
 * @class Enum
 *
 * @method get(value) 通过value获取当前列的值
 *                    return { key: 'SETP2', name: '步骤2', value: 2 }
 *
 * @returns {key1: number|string, key2: number|string}
 * {
 *   CREATE: 1,
 *   APPROVED: 2,
 * }
 */
export class Enum {
  /**
   * 初始化
   * @param {Array} props []
   */
  constructor(props = []) {
    this.__props = {};
    if (props.length) {
      props.forEach(element => {
        if (element.key && element.value) {
          this[element.key] = element.value;
          this.__props[element.value] = element;
        } else {
          console.error('Enum缺少必要的key或value');
        }
      });
    }
  }

  /**
   * 根据value获取对象值
   * @param {string|number} value 状态值
   */
  get(value) {
    return this.__props[value];
  }

  /**
   * 获取枚举数组
   */
  getArray() {
    const arr = [];
    for (const key in this.__props) {
      if (Object.prototype.hasOwnProperty.call(this.__props, key)) {
        arr.push(this.__props[key]);
      }
    }
    return arr;
  }
}

export const PayStatus = new Enum([
  { key: 'WAITPAY', name: '待打款', value: '00' },
  { key: 'PAYING', name: '打款中', value: '01' },
  { key: 'PAID', name: '打款完成', value: '02' },
  { key: 'CANCEL', name: '撤销', value: '03' },
  { key: 'FAIL', name: '打款失败', value: '04' },
  { key: 'CREATE', name: '创建', value: '05' },
  { key: 'HANGUP', name: '挂起', value: '06' },
  { key: 'LOCK', name: '锁定', value: '07' },
]);

/** 打款批次状态名称 */
export enum PayStatusName {
  '00' = '未锁定',
  '01' = '已锁定',
  '02' = '待打款',
  '03' = '打款中',
  '04' = '打款完成',
  '05' = '撤销',
  '06' = '失败',
  '07' = '锁定中',
  '08' = '撤销中',
}

/** 打款批次状态code */
export enum PayStatusCode {
  'CREAT' = '00',
  'LOCK' = '01',
  'WAITPAY' = '02',
  'PAYING' = '03',
  'PAYFINISHED' = '04',
  'CANCEL' = '05',
  'FAIL' = '06',
  'LOCKING' = '07',
  'CANCELING' = '08',
}

/** 打款订单详情状态枚举名称 */
export enum PayDetailStatusName {
  '00' = '待打款',
  '01' = '打款中',
  '02' = '打款完成',
  '03' = '撤销',
  '04' = '打款失败',
  '05' = '创建',
  '06' = '挂起',
  '07' = '锁定',
}

/** 打款订单详情状态枚举code */
export enum PayDetailStatusCode {
  'WAITPAY' = '00',
  'PAYING' = '01',
  'PAID' = '02',
  'CANCEL' = '03',
  'FAIL' = '04',
  'CREATE' = '05',
  'HANGUP' = '06',
  'LOCK' = '07',
}

// /** 业务类型 */
// export enum PayType {
//   '100' = '线下充值',
//   '101' = '线上提现',
//   '102' = '转账扣费',
// }

// /** 收支类型 */
// export enum IocomeType {
//   '01' = '收入',
//   '02' = '支出',
// }

export enum ServiceType {
  '01' = '推广服务',
  '02' = '咨询服务',
  '03' = '信息服务',
  '04' = '技术服务',
}

export enum ProjectStatus {
  '01' = '生效',
  '02' = '失效',
}

export enum bizTypeEnums {
  '0'='充值',
  '1'='提现',
  '2'='内部转账'
}

export enum accoutStatusEnums {
  '0'='处理中',
  '1'='成功',
  '2'='失败'
}

// 证件类型
export const credentialEnum = {
  "00": "居民身份证",
  "01": "中国护照",
}

//订单来源
export const submitModeEnum = {
  '1': 'API',
  '0': '商户站',
};