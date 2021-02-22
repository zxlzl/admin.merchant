/**
 * @file API：/remit/countryinfo
 */
import { ajax } from "@/utils/request";

/**
 * 查询国家地区列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryCountryList(success?: (data: WebResult<TaxCountryInfoDTO>["data"], response: WebResult<TaxCountryInfoDTO>, xhr: any) => void, error?: (message: WebResult<TaxCountryInfoDTO>["message"], response: WebResult<TaxCountryInfoDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxCountryInfoDTO>["data"]> {
    return ajax({
        url: `/remit/countryinfo/queryCountryList`,
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

export interface TaxCountryInfoDTO {

    /**
     * 国家代码
     */
    countryCode: string;

    /**
     * 国家名称
     */
    countryName: string;

    /**
     * ID
     */
    id: number;

}

