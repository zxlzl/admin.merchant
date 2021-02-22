/**
 * @file API：/remit/paybatch
 */
import { ajax } from "@/utils/request";

/**
 * 数据订正批次号
 * @param oldPayBatchNo  旧批次号
 * @param newPayBatchNo  新批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updatePayBatchNo(oldPayBatchNo: string, newPayBatchNo: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatch/updatePayBatchNo`,
        type: "GET",
        data: {
            oldPayBatchNo: oldPayBatchNo,
            newPayBatchNo: newPayBatchNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 打款批次概要
 * @param query 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayBathSummary(query?: TaxPayBatchDetailDTO, success?: (data: WebResult_1<TaxPayBatchDetailSummaryDTO>["data"], response: WebResult_1<TaxPayBatchDetailSummaryDTO>, xhr: any) => void, error?: (message: WebResult_1<TaxPayBatchDetailSummaryDTO>["message"], response: WebResult_1<TaxPayBatchDetailSummaryDTO>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxPayBatchDetailSummaryDTO>["data"]> {
    return ajax({
        url: `/remit/paybatch/queryPayBathSummary`,
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
 * 费用单
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function payBill(id?: number, success?: (data: WebResult_1<TaxBatchDetailCostDto>["data"], response: WebResult_1<TaxBatchDetailCostDto>, xhr: any) => void, error?: (message: WebResult_1<TaxBatchDetailCostDto>["message"], response: WebResult_1<TaxBatchDetailCostDto>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxBatchDetailCostDto>["data"]> {
    return ajax({
        url: `/remit/paybatch/payBill`,
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 按批次号查询打款批次信息
 * @param payBatchNo  打款批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayBatchByPayBatchNo(payBatchNo: string, success?: (data: WebResult_1<TaxPayBatchDTO>["data"], response: WebResult_1<TaxPayBatchDTO>, xhr: any) => void, error?: (message: WebResult_1<TaxPayBatchDTO>["message"], response: WebResult_1<TaxPayBatchDTO>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxPayBatchDTO>["data"]> {
    return ajax({
        url: `/remit/paybatch/queryPayBatchByPayBatchNo`,
        data: {
            payBatchNo: payBatchNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 打款批次
 * @param query 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayBath(query?: PayBatchVO, success?: (data: WebResult_1<TaxPayBatchDTO>["data"], response: WebResult_1<TaxPayBatchDTO>, xhr: any) => void, error?: (message: WebResult_1<TaxPayBatchDTO>["message"], response: WebResult_1<TaxPayBatchDTO>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxPayBatchDTO>["data"]> {
    return ajax({
        url: `/remit/paybatch/queryPayBath`,
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
 * 打款详情
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function payDetail(id?: number, success?: (data: WebResult_1<TaxPayBatchDetailDTO>["data"], response: WebResult_1<TaxPayBatchDetailDTO>, xhr: any) => void, error?: (message: WebResult_1<TaxPayBatchDetailDTO>["message"], response: WebResult_1<TaxPayBatchDetailDTO>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxPayBatchDetailDTO>["data"]> {
    return ajax({
        url: `/remit/paybatch/payDetail`,
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询批次状态枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function batchPayStatus(success?: (data: WebResult_1<{[key: string]: string}[]>["data"], response: WebResult_1<{[key: string]: string}[]>, xhr: any) => void, error?: (message: WebResult_1<{[key: string]: string}[]>["message"], response: WebResult_1<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<WebResult_1<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/remit/paybatch/batchPayStatus`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询明细订单状态枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function detailPayStatus(success?: (data: WebResult_1<{[key: string]: string}[]>["data"], response: WebResult_1<{[key: string]: string}[]>, xhr: any) => void, error?: (message: WebResult_1<{[key: string]: string}[]>["message"], response: WebResult_1<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<WebResult_1<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/remit/paybatch/detailPayStatus`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 打款批次列表
 * @param query 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayBatchList(query?: PayBatchVO, success?: (data: WebResult_1<PageBean_1<TaxPayBatchDTO>>["data"], response: WebResult_1<PageBean_1<TaxPayBatchDTO>>, xhr: any) => void, error?: (message: WebResult_1<PageBean_1<TaxPayBatchDTO>>["message"], response: WebResult_1<PageBean_1<TaxPayBatchDTO>>, xhr: any) => void, options?: any): Promise<WebResult_1<PageBean_1<TaxPayBatchDTO>>["data"]> {
    return ajax({
        url: `/remit/paybatch/queryPayBatchList`,
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
 * 打款批次详情查询
 * @param payBatchNo  打款批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayBatchDetail(payBatchNo?: string, success?: (data: WebResult_1<TaxPayBatchDto>["data"], response: WebResult_1<TaxPayBatchDto>, xhr: any) => void, error?: (message: WebResult_1<TaxPayBatchDto>["message"], response: WebResult_1<TaxPayBatchDto>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxPayBatchDto>["data"]> {
    return ajax({
        url: `/remit/paybatch/queryPayBatchDetail`,
        data: {
            payBatchNo: payBatchNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 商户上传打款明细EXCEL
 * @param payBatchNo  批次号
 * @param merchantPayBatchNo  商户自定义批次号
 * @param payChannelCode  打款通道
 * @param totalAmount  总金额
 * @param count  总笔数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function uploadMerchantDetail(payBatchNo?: string, merchantPayBatchNo?: string, payChannelCode?: string, totalAmount?: string, count?: number, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatch/uploadMerchantDetail`,
        data: {
            payBatchNo: payBatchNo,
            merchantPayBatchNo: merchantPayBatchNo,
            payChannelCode: payChannelCode,
            totalAmount: totalAmount,
            count: count
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 下载批量打款明细模板EXCEL
 * @param payChannelCode  打款通道
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function downLoadTemplate(payChannelCode?: string, success?: (data: any, response: void, xhr: any) => void, error?: (message: any, response: void, xhr: any) => void, options?: any): Promise<any> {
    return ajax({
        url: `/remit/paybatch/downLoadTemplate`,
        data: {
            payChannelCode: payChannelCode
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 修改打款依据文件
 * @param payBatchNo  批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updatePaymentBasisDocument(payBatchNo?: string, success?: (data: WebResult_1<boolean>["data"], response: WebResult_1<boolean>, xhr: any) => void, error?: (message: WebResult_1<boolean>["message"], response: WebResult_1<boolean>, xhr: any) => void, options?: any): Promise<WebResult_1<boolean>["data"]> {
    return ajax({
        url: `/remit/paybatch/updatePaymentBasisDocument`,
        data: {
            payBatchNo: payBatchNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 打款明细列表
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayDetailsList(query?: PayBatchDetailVO, success?: (data: WebResult_1<PageBean_1<TaxPayBatchDetailDTO>>["data"], response: WebResult_1<PageBean_1<TaxPayBatchDetailDTO>>, xhr: any) => void, error?: (message: WebResult_1<PageBean_1<TaxPayBatchDetailDTO>>["message"], response: WebResult_1<PageBean_1<TaxPayBatchDetailDTO>>, xhr: any) => void, options?: any): Promise<WebResult_1<PageBean_1<TaxPayBatchDetailDTO>>["data"]> {
    return ajax({
        url: `/remit/paybatch/queryPayDetailsList`,
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
 * 打款明细统计
 * @param payBatchNo  批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayDetailsStatistics(payBatchNo?: string, success?: (data: WebResult_1<TaxPayBatchStatisticsDto>["data"], response: WebResult_1<TaxPayBatchStatisticsDto>, xhr: any) => void, error?: (message: WebResult_1<TaxPayBatchStatisticsDto>["message"], response: WebResult_1<TaxPayBatchStatisticsDto>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxPayBatchStatisticsDto>["data"]> {
    return ajax({
        url: `/remit/paybatch/queryPayDetailsStatistics`,
        data: {
            payBatchNo: payBatchNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 更新打款批次状态
 * @param status  要变更的状态
 * @param payBatchNo  批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateStatusByPayBatchNo(status?: string, payBatchNo?: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatch/updateStatusByPayBatchNo`,
        data: {
            status: status,
            payBatchNo: payBatchNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 锁定批次
 * @param taxPayBatchDTO  批次
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function lockBatch(taxPayBatchDTO?: TaxPayBatchDTO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatch/lockBatch`,
        contentType: "application/json",
        data: {
            taxPayBatchDTO: taxPayBatchDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 撤销
 * @param taxPayBatchDTO  批次明细
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function cancelDetail(taxPayBatchDTO?: TaxPayBatchDetailDTO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatch/cancelDetail`,
        data: {
            taxPayBatchDTO: taxPayBatchDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 重新打款
 * @param taxPayBatchDTO  批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function repay(taxPayBatchDTO?: TaxPayBatchDetailDTO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatch/repay`,
        data: {
            taxPayBatchDTO: taxPayBatchDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 打款申请
 * @param taxPayBatchDTO  批次
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function applyPay(taxPayBatchDTO?: TaxPayBatchDTO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatch/applyPay`,
        data: {
            taxPayBatchDTO: taxPayBatchDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 批次打款撤销
 * @param taxPayBatchDTO  批次
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function revoke(taxPayBatchDTO?: TaxPayBatchDTO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatch/revoke`,
        data: {
            taxPayBatchDTO: taxPayBatchDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface WebResult {

    code: string;

    redirectUrl: string;

    data: any;

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

export interface WebResult_1<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

export interface TaxPayBatchDetailSummaryDTO {

    /**
     * 数量
     */
    number: number;

    /**
     * 金额
     */
    amount: number;

    /**
     * 平台批次号
     */
    list: TaxPayBatchDetailDTO[];

}

export interface TaxOrderCostDetailDto {

    /**
     * 优惠减免
     */
    discountRate: number;

    /**
     * 个税
     */
    taxRate: number;

    /**
     * 合作税率
     */
    currentTaxRate: number;

    /**
     * 应扣税费
     */
    currentTaxAmt: number;

    /**
     * 增值税
     */
    vatRate: number;

    /**
     * 核定金额
     */
    currentAmt: number;

    /**
     * 单月累计收款区间最大金额
     */
    maxAmt: number;

    /**
     * id
     */
    id: number;

    /**
     * 单月累计收款区间最小金额
     */
    minAmt: number;

}

export interface TaxBatchDetailCostDto {

    /**
     * 合作税率
     */
    vatRateMemo: string;

    /**
     * 收款金额
     */
    amount: number;

    /**
     * 合作服务费率
     */
    deductRate: number;

    /**
     * 收款方姓名
     */
    accountName: string;

    /**
     * 实收服务费
     */
    deductAmount: number;

    /**
     * id
     */
    id: number;

    /**
     * 税费明细
     */
    taxOrderCostDetailList: TaxOrderCostDetailDto[];

    /**
     * 实收税费
     */
    vatAmount: number;

}

export interface TaxPayBatchDTO {

    inPayStatus: string;

    /**
     * 打款审核方式：1 自动审核、2 手动审核
     */
    remitMode: number;

    /**
     * 创建时间结束
     */
    endDate: string;

    /**
     * 打款时间
     */
    payTime: string;

    taxRepresentativeCode: string;

    memo: string;

    /**
     * 审核结论：1审核通过，2审核拒绝
     */
    auditResult: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 打款完成时间结束
     */
    payFinishTimeEnd: string;

    taxStatus: string;

    /**
     * 筛选状态，1进行中，2已完成，3已撤销
     */
    selectStatus: number;

    /**
     * 打款通道编码
     */
    payChannelCode: string;

    /**
     * 处理中金额
     */
    processAmount: number;

    /**
     * 增值税状态：00:未扣除 01：扣款中 02：已扣款 03：扣款失败
     */
    vatStatus: string;

    id: number;

    /**
     * 成功总笔数(商户打款成功笔数)
     */
    sucNumbers: number;

    /**
     * 服务费(用户实付服务费)
     */
    serviceFee: number;

    /**
     * 平台批次号
     */
    payBatchNo: string;

    /**
     * 出款账户
     */
    payAccountNo: string;

    /**
     * 打款状态中文描述
     */
    payStatusDesc: string;

    /**
     * 批次总笔数(商户打款总笔数)
     */
    count: number;

    /**
     * 打款通道名称
     */
    payChannelCodeName: string;

    /**
     * 支付宝/微信结算单号
     */
    settleOrderNo: string;

    /**
     * 批次总金额(商户打款总金额)
     */
    totalAmount: number;

    /**
     * 应扣总服务费(包含失败)
     */
    totalServiceFee: number;

    /**
     * 失败笔数
     */
    failNumbers: number;

    /**
     * 打款完成时间开始
     */
    payFinishTimeStart: string;

    /**
     * 成功总金额(商户打款成功金额)
     */
    sucAmount: number;

    /**
     * 增值税时间
     */
    vatTime: string;

    deductStatus: string;

    /**
     * 创建时间开始
     */
    startDate: string;

    /**
     * 可打款金额
     */
    canPayAmount: number;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 内部单号
     */
    innerOrderNo: string;

    /**
     * 锁定时间开始
     */
    lockTimeStart: string;

    /**
     * 支付宝/微信结算状态
     */
    settleStatus: string;

    /**
     * 支付宝/微信结算金额
     */
    settleAmount: number;

    /**
     * 费用公式版本,默认1.0税费/服务费，2.0商户/用户服务费
     */
    feeCostFormulaVersion: string;

    /**
     * 服务商商户号(连连分配给宫薪记的商户号)
     */
    oidPartner: string;

    /**
     * 打款依据文件
     */
    paymentBasisDocument: string;

    /**
     * 增值税单号
     */
    vatOrderNo: string;

    /**
     * 商户批次号
     */
    merchantPayBatchNo: string;

    /**
     * 锁定时间
     */
    lockTime: string;

    /**
     * 代征主体名称
     */
    collectedSubjectName: string;

    /**
     * 代征主体代码
     */
    collectedSubjectNo: string;

    /**
     * 打款依据文件原名称
     */
    paymentBasisDocumentName: string;

    /**
     * 失败金额
     */
    failAmount: number;

    payStatuss: string[];

    /**
     * 税费(商户实付服务费)
     */
    taxFee: number;

    /**
     * 挂起笔数
     */
    hangupNumbers: number;

    /**
     * 打款金额
     */
    amount: number;

    /**
     * 支付宝/微信结算时间
     */
    settleTime: string;

    /**
     * 状态描述
     */
    statusDesc: string;

    /**
     * 打款完成时间
     */
    payFinishTime: string;

    /**
     * 扣服务费时间
     */
    deductTime: string;

    payTaxMode: string;

    /**
     * (订单来源)提交方式 0:商户平台  1:api
     */
    submitMode: string;

    /**
     * 挂起金额
     */
    hangupAmount: number;

    /**
     * 处理中笔数
     */
    processNumbers: number;

    /**
     * 开票模式,1账单开票，2预充值开票
     */
    invoiceMode: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 锁定时间结束
     */
    lockTimeEnd: string;

    /**
     * 应扣总税费(包含失败)
     */
    totalTaxFee: number;

    /**
     * 是否允许审核
     */
    allowAudit: boolean;

    /**
     * 是否已生成账单 0：否，1：是或（预充值模式不需要生成）
     */
    iscount: number;

    /**
     * 可打款笔数
     */
    canPayNumbers: number;

    /**
     * 打款状态(批次状态)
     */
    payStatus: string;

    /**
     * 拒绝原因
     */
    refuseReason: string;

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

export interface PayBatchVO {

    query: TaxPayBatchDTO;

    page: PageBean;

}

export interface PageBean_1<T> {

    curPage: number;

    data: Object;

    endRecordCount: number;

    recordCount: number;

    pageSize: number;

    startRecordCount: number;

    list: any[];

    maxPage: number;

}

export interface TaxPayBatchDto {

    inPayStatus: string;

    /**
     * 打款审核方式：1 自动审核、2 手动审核
     */
    remitMode: number;

    /**
     * 支付时间
     */
    payTime: string;

    /**
     * 代征编号
     */
    taxRepresentativeCode: string;

    /**
     * 备注
     */
    memo: string;

    /**
     * 审核结论：1审核通过，2审核拒绝
     */
    auditResult: string;

    /**
     * 企业名称
     */
    merchantName: string;

    /**
     * (未使用)缴税状态： 00:未缴税  01：缴税中 02：缴税完成
     */
    taxStatus: string;

    /**
     * 付款通道
     */
    payChannelCode: string;

    /**
     * 增值税状态：00:未扣除 01：扣款中 02：已扣款 03：扣款失败
     */
    vatStatus: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 成功总笔数
     */
    sucNumbers: number;

    /**
     * 服务费
     */
    serviceFee: number;

    /**
     * 批次号
     */
    payBatchNo: string;

    /**
     * 批次总笔数
     */
    count: number;

    /**
     * 付款通道名称
     */
    payChannelCodeName: string;

    /**
     * 挂起总金额
     */
    hangAmount: number;

    /**
     * 支付宝/微信结算单号
     */
    settleOrderNo: string;

    /**
     * 批次总金额
     */
    totalAmount: number;

    /**
     * 失败总笔数
     */
    failNumbers: number;

    /**
     * 成功总金额
     */
    sucAmount: number;

    /**
     * 增值税时间
     */
    vatTime: string;

    /**
     * 扣费状态：00:未扣除 01：扣款中 02：已扣款 03：扣款失败
     */
    deductStatus: string;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 挂起总笔数
     */
    hangNumbers: number;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 内部单号
     */
    innerOrderNo: string;

    /**
     * 支付宝/微信结算状态
     */
    settleStatus: string;

    /**
     * 支付宝/微信结算金额
     */
    settleAmount: number;

    /**
     * 费用公式版本,默认1.0税费/服务费，2.0商户/用户服务费
     */
    feeCostFormulaVersion: string;

    /**
     * 服务商商户号(连连分配给宫薪记的商户号)
     */
    oidPartner: string;

    /**
     * 打款依据文件
     */
    paymentBasisDocument: string;

    /**
     * 增值税单号
     */
    vatOrderNo: string;

    /**
     * 商户批次号
     */
    merchantPayBatchNo: string;

    /**
     * 锁定时间
     */
    lockTime: string;

    /**
     * 代征主体名称
     */
    collectedSubjectName: string;

    /**
     * 代征主体代码
     */
    collectedSubjectNo: string;

    /**
     * 打款依据文件原名称
     */
    paymentBasisDocumentName: string;

    /**
     * 失败总金额
     */
    failAmount: number;

    payStatuss: string[];

    /**
     * 税费
     */
    taxFee: number;

    /**
     * 金额
     */
    amount: number;

    /**
     * 支付宝/微信结算时间
     */
    settleTime: string;

    /**
     * 状态描述
     */
    statusDesc: string;

    /**
     * 打款完成时间
     */
    payFinishTime: string;

    /**
     * 扣服务费时间
     */
    deductTime: string;

    /**
     * 纳税模式
     */
    payTaxMode: string;

    /**
     * 提交方式 0:商户平台  1:api
     */
    submitMode: string;

    /**
     * 开票模式,1账单开票，2预充值开票
     */
    invoiceMode: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 是否已生成账单 0：否，1：是或（预充值模式不需要生成）
     */
    iscount: number;

    /**
     * 批次状态
     */
    payStatus: string;

    /**
     * 拒绝原因
     */
    refuseReason: string;

}

export interface PayBatchDetailVO {

    query: TaxPayBatchDetailDTO;

    page: PageBean;

}

export interface TaxPayBatchStatisticsDto {

    /**
     * 总金额
     */
    amount: number;

    /**
     * 批次号
     */
    payBatchNo: string;

    /**
     * 可打款条数
     */
    canPayNumbers: number;

    /**
     * 条数
     */
    numbers: number;

    /**
     * 可打款金额
     */
    canPayAmount: number;

}

