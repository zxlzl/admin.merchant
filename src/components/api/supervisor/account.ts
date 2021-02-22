/**
 * @file API：/supervisor/account
 */
import { ajax } from "@/utils/request";

/**
 * 线下充值
 * @param rechargeVO  充值内容
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function offlineRecharge(rechargeVO?: OfflineRechargeVO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/supervisor/account/offlineRecharge`,
        data: {
            rechargeVO: rechargeVO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询资金账户列表
 * @param accountVO  查询VO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPage(accountVO?: MerchantAccountVO, success?: (data: WebResult_1<PageBean_1<TaxMerchantAccountVO>>["data"], response: WebResult_1<PageBean_1<TaxMerchantAccountVO>>, xhr: any) => void, error?: (message: WebResult_1<PageBean_1<TaxMerchantAccountVO>>["message"], response: WebResult_1<PageBean_1<TaxMerchantAccountVO>>, xhr: any) => void, options?: any): Promise<WebResult_1<PageBean_1<TaxMerchantAccountVO>>["data"]> {
    return ajax({
        url: `/supervisor/account/queryPage`,
        contentType: "application/json",
        data: {
            accountVO: accountVO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询所有可用商户账户
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllAvailable(merchantNo?: string, success?: (data: ServiceResult<TaxMerchantAccountDTO[]>["data"], response: ServiceResult<TaxMerchantAccountDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantAccountDTO[]>["message"], response: ServiceResult<TaxMerchantAccountDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantAccountDTO[]>["data"]> {
    return ajax({
        url: `/supervisor/account/queryAllAvailable`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface OfflineRechargeVO {

    /**
     * 金额（单位：元）
     */
    amount: number;

    /**
     * 账户号
     */
    accountNo: string;

    /**
     * 备注
     */
    memo: string;

    /**
     * 凭证
     */
    verifyUrl: string;

    /**
     * 出账账户号
     */
    outAccountNo: string;

}

export interface WebResult {

    code: string;

    redirectUrl: string;

    data: any;

    success: boolean;

    message: string;

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

export interface MerchantAccountQuery {

    gmtModified: string;

    accountType: string;

    /**
     * 排序语句
     */
    orderBy: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    remark: string;

    gmtCreate: string;

    operator: string;

    /**
     * sql查询记录开始下标
     */
    startIndex: number;

    /**
     * 当前页码
     */
    curPage: number;

    merchantAccountName: string;

    merchantAccountNo: string;

    startTime: string;

    endTime: string;

    id: number;

    merchantNo: string;

    status: string;

}

export interface MerchantAccountVO {

    page: PageBean;

    merchantAccountQuery: MerchantAccountQuery;

}

export interface WebResult_1<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

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

export interface PlatformAccount {

    acctAmt: number;

    acctStatus: string;

    bizFreezeAmt: number;

    custNo: string;

    unwithdrawAmt: number;

    acctName: string;

    freezeAmt: number;

    withdrawAmt: number;

    sysFreezeAmt: number;

    availBalance: number;

    acctNo: string;

    acctType: string;

    custType: string;

    id: number;

}

export interface TaxMerchantAccountVO {

    gmtModified: string;

    accountType: string;

    platformAccount: PlatformAccount;

    remark: string;

    gmtCreate: string;

    operator: string;

    merchantName: string;

    collectedSubjectName: string;

    merchantAccountName: string;

    collectedSubjectNo: string;

    merchantAccountNo: string;

    id: number;

    merchantNo: string;

    status: string;

}

export interface ServiceResult<T> {

    code: string;

    data: T;

    success: boolean;

    message: string;

}

export interface TaxMerchantAccountDTO {

    gmtModified: string;

    accountType: string;

    remark: string;

    gmtCreate: string;

    operator: string;

    merchantName: string;

    collectedSubjectName: string;

    merchantAccountName: string;

    usedPayBatchNo: string;

    collectedSubjectNo: string;

    merchantAccountNo: string;

    id: number;

    beingUsed: string;

    merchantNo: string;

    status: string;

}

