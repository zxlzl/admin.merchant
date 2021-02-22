/**
 * @file API：/remit/contact
 */
import { ajax } from "@/utils/request";

/**
 * 根据商户号查询商户联系人
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: WebResult<TaxContactDTO[]>["data"], response: WebResult<TaxContactDTO[]>, xhr: any) => void, error?: (message: WebResult<TaxContactDTO[]>["message"], response: WebResult<TaxContactDTO[]>, xhr: any) => void, options?: any): Promise<WebResult<TaxContactDTO[]>["data"]> {
    return ajax({
        url: `/remit/contact/queryByMerchantNo`,
        data: {
            merchantNo: merchantNo
        },
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

export interface TaxContactDTO {

    gmtModified: string;

    city: string;

    cityCode: string;

    gmtCreate: string;

    operator: string;

    detailAddr: string;

    province: string;

    phone: string;

    district: string;

    name: string;

    id: number;

    email: string;

    merchantNo: string;

    status: string;

}

