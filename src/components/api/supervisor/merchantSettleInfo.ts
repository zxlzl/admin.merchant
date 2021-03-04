/**
 * @file API：/supervisor/merchantSettleInfo
 */
import { ajax } from "@/utils/request";

/**
 * 新增结算信息
 * @param settleInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function addSettleInfo(settleInfoDTO?: TaxMerchantSettleInfoDTO, success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/supervisor/merchantSettleInfo/addSettleInfo`,
        type: "POST",
        data: {
            settleInfoDTO: settleInfoDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据商户号查询结算信息
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: WebResult<TaxMerchantSettleInfoDTO>["data"], response: WebResult<TaxMerchantSettleInfoDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantSettleInfoDTO>["message"], response: WebResult<TaxMerchantSettleInfoDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantSettleInfoDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchantSettleInfo/queryByMerchantNo`,
        type: "POST",
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 更新结算信息
 * @param settleInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateSettleInfo(settleInfoDTO?: TaxMerchantSettleInfoDTO, success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/supervisor/merchantSettleInfo/updateSettleInfo`,
        type: "POST",
        data: {
            settleInfoDTO: settleInfoDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface TaxMerchantSettleInfoDTO {

    /**
     * bank_account_name，银行户名 
     */
    bankAccountName: string;

    /**
     * bank_code，开户银行编码 
     */
    bankCode: string;

    /**
     * gmt_modified，更新时间 
     */
    gmtModified: string;

    /**
     * bank_account_no，银行账号 
     */
    bankAccountNo: string;

    /**
     * branch_name，开户支行名称 
     */
    branchName: string;

    /**
     * bank_name，开户银行名称 
     */
    bankName: string;

    /**
     * id 
     */
    id: number;

    /**
     * gmt_create，添加时间 
     */
    gmtCreate: string;

    /**
     * operator_add，添加人 
     */
    operatorAdd: number;

    /**
     * operator_modified，更新人 
     */
    operatorModified: number;

    /**
     * merchant_no，商户号 
     */
    merchantNo: string;

}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

