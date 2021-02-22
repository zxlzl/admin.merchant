/**
 * @file API：/remit/export
 */
import { ajax } from "@/utils/request";

/**
 * 导出批次详情
 * @param request  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function exportPayBatchDetail(request?: ExportDataRequest, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/remit/export/exportPayBatchDetail`,
        contentType: "application/json",
        data: {
            request: request
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 导出明细订单
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function exportPayOrderDetail(query?: TaxPayBatchDetailDTO, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/remit/export/exportPayOrderDetail`,
        contentType: "application/json",
        data: {
            query: query
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 导出账务明细
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function exportAccountDetail(query?: CapitalFlowVO, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/remit/export/exportAccountDetail`,
        contentType: "application/json",
        data: {
            query: query
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 导出批次记录
 * @param request 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function exportPayBatch(request?: ExportDataRequest, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/remit/export/exportPayBatch`,
        contentType: "application/json",
        data: {
            request: request
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface ExportDataRequest {

    /**
     * 创建时间结束
     */
    endDate: string;

    /**
     * 打款时间
     */
    payTime: string;

    /**
     * 银行回单url
     */
    bankReceiptUrl: string;

    /**
     * 备注
     */
    memo: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 打款完成时间结束
     */
    payFinishTimeEnd: string;

    /**
     * 证件号码
     */
    identityNo: string;

    startIndex: number;

    /**
     * 服务商共管账户应收
     */
    payrollReceive: string;

    /**
     * 用户实收金额
     */
    userActualReceiveAmount: number;

    /**
     * 打款通道编码
     */
    payChannelCode: string;

    endIndex: number;

    /**
     * 扣增值税状态 状态：00：创建 01：打款中 02：打款完成 03:打款失败
     */
    vatStatus: string;

    /**
     * 是否可以预览回单,true可以预览
     */
    previewBankReceipt: boolean;

    id: number;

    /**
     * 是否可以重新打款，true是，false否
     */
    canRepay: boolean;

    /**
     * (未使用)扣服务费单号
     */
    deductOrderNo: string;

    /**
     * 撤销备注
     */
    cancelRemark: string;

    payBatchNo: string;

    /**
     * 薪资类型 税后：AFTER_TAX
     */
    salaryType: string;

    /**
     * 打款订单状态中文描述
     */
    payStatusDesc: string;

    /**
     * 账户类型： 00:银行卡   01:支付宝账号
     */
    accountType: string;

    /**
     * 连连确认备注
     */
    confirmRemark: string;

    /**
     * 打款通道
     */
    payChannelCodeName: string;

    /**
     * 商户订单号
     */
    merchantOrderNo: string;

    /**
     * 增值税金额(商户实付服务费)
     */
    vatAmount: number;

    /**
     * 税费计算费率备注
     */
    vatMemo: string;

    /**
     * 商户自有系统用户账号id
     */
    accountId: string;

    /**
     * 商户服务费率
     */
    merchantFeeRate: number;

    /**
     * 打款完成时间开始
     */
    payFinishTimeStart: string;

    /**
     * 连连回单编号
     */
    receiptNo: string;

    /**
     * 商户服务费差额
     */
    merchantFeeCostRegionDiffer: number;

    /**
     * 扣增值税时间
     */
    vatTime: string;

    /**
     * 扣服务费状态 状态：00：创建 01：打款中 02：打款完成 03:打款失败
     */
    deductStatus: string;

    /**
     * 服务单号
     */
    serviceNo: string;

    /**
     * 用户服务费差额
     */
    userFeeCostRegionDiffer: number;

    /**
     * 创建时间起始
     */
    startDate: string;

    merchantNo: string;

    /**
     * 服务商可用账户应收
     */
    chargeReceive: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 内部订单号
     */
    innerOrderNo: string;

    /**
     * 锁定时间开始
     */
    lockTimeStart: string;

    /**
     * 账号名称(收款用户姓名)
     */
    accountName: string;

    /**
     * 费用公式版本,默认1.0税费/服务费，2.0商户/用户服务费
     */
    feeCostFormulaVersion: string;

    /**
     * 收款银行/渠道名称
     */
    bankName: string;

    /**
     * 服务商商户号(连连分配给宫薪记的商户号)
     */
    oidPartner: string;

    /**
     * 挂起备注
     */
    hangupRemark: string;

    /**
     * (未使用)扣增值税单号
     */
    vatOrderNo: string;

    /**
     * 商户已抵扣服务费
     */
    merchantOffsetFeeCost: number;

    /**
     * 商户批次号
     */
    merchantPayBatchNo: string;

    /**
     * 证件类型： 00：身份证
     */
    identityType: string;

    /**
     * 锁定时间,关联用户月额度
     */
    lockTime: string;

    /**
     * 收款账号
     */
    accountNo: string;

    /**
     * 代征主体
     */
    collectedSubjectName: string;

    /**
     * 代证主体
     */
    collectedSubjectNo: string;

    /**
     * 付方名称
     */
    payerName: string;

    payStatuss: string[];

    /**
     * 金额查询结束值
     */
    endAmount: number;

    /**
     * 商户应付服务费
     */
    merchantShouldFeeCost: number;

    /**
     * 明细号(平台订单号)
     */
    payDetailNo: string;

    /**
     * 收款银行/渠道编号
     */
    bankCode: string;

    /**
     * 商户打款金额
     */
    amount: number;

    /**
     * 明细状态描述
     */
    statusDesc: string;

    /**
     * 服务费金额(用户实付服务费)
     */
    deductAmount: number;

    /**
     * 打款完成时间
     */
    payFinishTime: string;

    /**
     * 扣服务费时间
     */
    deductTime: string;

    /**
     * 收款用户手机号
     */
    mobile: string;

    /**
     * (订单来源)提交方式 0:商户平台  1:api
     */
    submitMode: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 锁定时间结束
     */
    lockTimeEnd: string;

    /**
     * 付方账户
     */
    payerAccount: string;

    /**
     * 金额查询开始值
     */
    startAmount: number;

    /**
     * 用户服务费率
     */
    userFeeRate: number;

    /**
     * 打款通道
     */
    channelName: string;

    /**
     * 打款订单状态：00：创建 01：打款中 02：打款完成 03：撤销 04:打款失败 
     */
    payStatus: string;

}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

export interface TaxPayBatchDetailDTO {

    /**
     * 创建时间结束
     */
    endDate: string;

    /**
     * 打款时间
     */
    payTime: string;

    /**
     * 银行回单url
     */
    bankReceiptUrl: string;

    /**
     * 备注
     */
    memo: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 打款完成时间结束
     */
    payFinishTimeEnd: string;

    /**
     * 证件号码
     */
    identityNo: string;

    startIndex: number;

    /**
     * 服务商共管账户应收
     */
    payrollReceive: string;

    /**
     * 用户实收金额
     */
    userActualReceiveAmount: number;

    /**
     * 打款通道编码
     */
    payChannelCode: string;

    endIndex: number;

    /**
     * 扣增值税状态 状态：00：创建 01：打款中 02：打款完成 03:打款失败
     */
    vatStatus: string;

    /**
     * 是否可以预览回单,true可以预览
     */
    previewBankReceipt: boolean;

    id: number;

    /**
     * 是否可以重新打款，true是，false否
     */
    canRepay: boolean;

    /**
     * (未使用)扣服务费单号
     */
    deductOrderNo: string;

    /**
     * 撤销备注
     */
    cancelRemark: string;

    /**
     * 平台批次号
     */
    payBatchNo: string;

    /**
     * 薪资类型 税后：AFTER_TAX
     */
    salaryType: string;

    /**
     * 打款订单状态中文描述
     */
    payStatusDesc: string;

    /**
     * 账户类型： 00:银行卡   01:支付宝账号
     */
    accountType: string;

    /**
     * 连连确认备注
     */
    confirmRemark: string;

    /**
     * 打款通道
     */
    payChannelCodeName: string;

    /**
     * 商户订单号
     */
    merchantOrderNo: string;

    /**
     * 增值税金额(商户实付服务费)
     */
    vatAmount: number;

    /**
     * 税费计算费率备注
     */
    vatMemo: string;

    /**
     * 商户自有系统用户账号id
     */
    accountId: string;

    /**
     * 商户服务费率
     */
    merchantFeeRate: number;

    /**
     * 打款完成时间开始
     */
    payFinishTimeStart: string;

    /**
     * 连连回单编号
     */
    receiptNo: string;

    /**
     * 商户服务费差额
     */
    merchantFeeCostRegionDiffer: number;

    /**
     * 扣增值税时间
     */
    vatTime: string;

    /**
     * 扣服务费状态 状态：00：创建 01：打款中 02：打款完成 03:打款失败
     */
    deductStatus: string;

    /**
     * 服务单号
     */
    serviceNo: string;

    /**
     * 用户服务费差额
     */
    userFeeCostRegionDiffer: number;

    /**
     * 创建时间起始
     */
    startDate: string;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 服务商可用账户应收
     */
    chargeReceive: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 内部订单号
     */
    innerOrderNo: string;

    /**
     * 锁定时间开始
     */
    lockTimeStart: string;

    /**
     * 账号名称(收款用户姓名)
     */
    accountName: string;

    /**
     * 费用公式版本,默认1.0税费/服务费，2.0商户/用户服务费
     */
    feeCostFormulaVersion: string;

    /**
     * 收款银行/渠道名称
     */
    bankName: string;

    /**
     * 服务商商户号(连连分配给宫薪记的商户号)
     */
    oidPartner: string;

    /**
     * 挂起备注
     */
    hangupRemark: string;

    /**
     * (未使用)扣增值税单号
     */
    vatOrderNo: string;

    /**
     * 商户已抵扣服务费
     */
    merchantOffsetFeeCost: number;

    /**
     * 商户批次号
     */
    merchantPayBatchNo: string;

    /**
     * 证件类型： 00：身份证
     */
    identityType: string;

    /**
     * 锁定时间,关联用户月额度
     */
    lockTime: string;

    /**
     * 收款账号
     */
    accountNo: string;

    /**
     * 代征主体
     */
    collectedSubjectName: string;

    /**
     * 代证主体
     */
    collectedSubjectNo: string;

    /**
     * 付方名称
     */
    payerName: string;

    payStatuss: string[];

    /**
     * 金额查询结束值
     */
    endAmount: number;

    /**
     * 商户应付服务费
     */
    merchantShouldFeeCost: number;

    /**
     * 明细号(平台订单号)
     */
    payDetailNo: string;

    /**
     * 收款银行/渠道编号
     */
    bankCode: string;

    /**
     * 商户打款金额
     */
    amount: number;

    /**
     * 明细状态描述
     */
    statusDesc: string;

    /**
     * 服务费金额(用户实付服务费)
     */
    deductAmount: number;

    /**
     * 打款完成时间
     */
    payFinishTime: string;

    /**
     * 扣服务费时间
     */
    deductTime: string;

    /**
     * 收款用户手机号
     */
    mobile: string;

    /**
     * (订单来源)提交方式 0:商户平台  1:api
     */
    submitMode: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 锁定时间结束
     */
    lockTimeEnd: string;

    /**
     * 付方账户
     */
    payerAccount: string;

    /**
     * 金额查询开始值
     */
    startAmount: number;

    /**
     * 用户服务费率
     */
    userFeeRate: number;

    /**
     * 打款通道
     */
    channelName: string;

    /**
     * 打款订单状态：00：创建 01：打款中 02：打款完成 03：撤销 04:打款失败 
     */
    payStatus: string;

}

export interface Object {

}

export interface PageBean {

    curPage: number;

    data: Object;

    endRecordCount: number;

    recordCount: number;

    pageSize: number;

    startRecordCount: number;

    list: any[];

    maxPage: number;

}

export interface QueryIncomeExpensesDetailRequest {

    /**
     * 查询账户号
     */
    accountId: string;

    /**
     * 收支类型，1收入，2支出
     */
    changeDirection: number;

    /**
     * 金额范围最小值
     */
    amountStart: string;

    /**
     * 业务订单号
     */
    orderId: string;

    /**
     * 业务流水号
     */
    acctSn: string;

    /**
     * 记账时间开始值
     */
    startTime: string;

    /**
     * 记账时间结束值
     */
    endTime: string;

    /**
     * 对方账户
     */
    objAcctNo: string;

    /**
     * 分页参数
     */
    pageBean: PageBean;

    /**
     * 金额范围最大值
     */
    amountEnd: string;

    /**
     * 业务类型，见枚举接口
     */
    transSubCode: string;

}

export interface CapitalFlowVO {

    request: QueryIncomeExpensesDetailRequest;

    page: PageBean;

}

