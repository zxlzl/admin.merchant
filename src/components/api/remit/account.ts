/**
 * @file API：/remit/account
 */
import { ajax } from "@/utils/request";

/**
 * 查询指定商户可用商户账户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllAvailable(success?: (data: ServiceResult<TaxMerchantAccountDTO[]>["data"], response: ServiceResult<TaxMerchantAccountDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantAccountDTO[]>["message"], response: ServiceResult<TaxMerchantAccountDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantAccountDTO[]>["data"]> {
    return ajax({
        url: `/remit/account/queryAllAvailable`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 账户间转账
 * @param allocationVO  账户间转账明细
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function allocationPay(allocationVO?: OfflineRechargeVO, success?: (data: ServiceResult_1["data"], response: ServiceResult_1, xhr: any) => void, error?: (message: ServiceResult_1["message"], response: ServiceResult_1, xhr: any) => void, options?: any): Promise<ServiceResult_1["data"]> {
    return ajax({
        url: `/remit/account/allocationPay`,
        data: {
            allocationVO: allocationVO
        },
        success: success,
        error: error,
        ...options
    }) as any;
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

export interface ServiceResult_1 {

    code: string;

    data: any;

    success: boolean;

    message: string;

}

