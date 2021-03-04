/**
 * @file API：/remit/merchantLegalPerson
 */
import { ajax } from "@/utils/request";

/**
 * 根据商户号查询法人信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryLegalPerson(success?: (data: WebResult<TaxMerchantLegalPersonDTO>["data"], response: WebResult<TaxMerchantLegalPersonDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantLegalPersonDTO>["message"], response: WebResult<TaxMerchantLegalPersonDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantLegalPersonDTO>["data"]> {
    return ajax({
        url: `/remit/merchantLegalPerson/queryLegalPerson`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

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

