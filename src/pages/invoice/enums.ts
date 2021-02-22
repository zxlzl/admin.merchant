// 发票状态
// 发票状态，1:初始,2:开票中,3:已开票,4:退票中,5:已作废,6:已撤销,7:已驳回
export const invoiceStatus = {
  '1': '初始',
  '2': '开票中',
  '3': '已开票',
  '4': '退票中',
  '5': '已作废',
  '6': '已撤销',
  '7': '已驳回',
};

/**
 *
 *
 * @enum {number}
 */
export enum InvoiceStatus {
  INIT = 1, // 初始
  INVOICING = 2, // 开票中
  INVOICED = 3, // 已开票
  REFUNDING = 4, // 退票中
  OBSOLETE = 5, // 已作废
  CANCEL = 6, // 已撤销
  REJECT = 7, // 已驳回
}

// 发票类型
export const invoiceType = {
  '01': '增值税专用发票',
  '02': '增值税普通发票',
};

// 账单类型
export const billType = {
  '01': '批次账单',
  '02': '日账单',
};

export const taxpayerType = {
  '01': '一般增值税纳税人',
  '02': '小规模增值税纳税人',
};

export const invoiceMedium = {
  '01': '纸质发票',
  '02': '电子发票',
};
