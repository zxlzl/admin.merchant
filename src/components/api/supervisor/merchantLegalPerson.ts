/**
 * @file API：/supervisor/merchantLegalPerson
 */
import { ajax } from "@/utils/request";

/**
 * 新增法人信息
 * @param settleInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function addLegalPerson(settleInfoDTO?: TaxMerchantLegalPersonDTO, success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/supervisor/merchantLegalPerson/addLegalPerson`,
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
 * 更新法人信息
 * @param settleInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateLegalPerson(settleInfoDTO?: TaxMerchantLegalPersonDTO, success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/supervisor/merchantLegalPerson/updateLegalPerson`,
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
 * 根据商户号查询法人信息
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: WebResult<TaxMerchantLegalPersonDTO>["data"], response: WebResult<TaxMerchantLegalPersonDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantLegalPersonDTO>["message"], response: WebResult<TaxMerchantLegalPersonDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantLegalPersonDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchantLegalPerson/queryByMerchantNo`,
        type: "POST",
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface TaxMerchantLegalPersonDTO {

    /**
     * 法人姓名
     */
    legalName: string;

    /**
     * 法人性别
     */
    legalGender: string;

    /**
     * 操作时间
     */
    gmtModified: string;

    /**
     * 法人邮箱
     */
    legalEmail: string;

    id: number;

    /**
     * 法人手机号
     */
    legalMobile: string;

    /**
     * 添加时间
     */
    gmtCreate: string;

    /**
     * 添加人
     */
    operatorAdd: number;

    /**
     * 操作人
     */
    operatorModified: number;

    /**
     * 商户号
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

