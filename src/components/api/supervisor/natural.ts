/**
 * @file API：/supervisor/natural
 */
import { ajax } from "@/utils/request";

/**
 * 查询卡验证详情
 * @param id  查询卡验证详情
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryNaturalPersonDetail(id?: number, success?: (data: WebResult<TaxMerchantNaturalPersonDTO>["data"], response: WebResult<TaxMerchantNaturalPersonDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantNaturalPersonDTO>["message"], response: WebResult<TaxMerchantNaturalPersonDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantNaturalPersonDTO>["data"]> {
    return ajax({
        url: `/supervisor/natural/queryNaturalPersonDetail`,
        type: "POST",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询卡验证列表
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryNaturalPersonList(query?: TaxMerchantNaturalPersonVO, success?: (data: WebResult<PageBean_1<TaxMerchantNaturalPersonDTO>>["data"], response: WebResult<PageBean_1<TaxMerchantNaturalPersonDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean_1<TaxMerchantNaturalPersonDTO>>["message"], response: WebResult<PageBean_1<TaxMerchantNaturalPersonDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean_1<TaxMerchantNaturalPersonDTO>>["data"]> {
    return ajax({
        url: `/supervisor/natural/queryNaturalPersonList`,
        type: "POST",
        contentType: "application/json",
        data: {
            query: query
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

export interface TaxMerchantNaturalPersonDTO {

    gmtModified: string;

    idType: string;

    endDate: string;

    mobile: string;

    returnMessage: string;

    bankAccountNo: string;

    gmtCreate: string;

    merchantName: string;

    identityNo: string;

    returnCode: string;

    collectedSubjectName: string;

    outTradeNo: string;

    name: string;

    collectedSubjectNo: string;

    id: number;

    authType: string;

    startDate: string;

    merchantNo: string;

    status: string;

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

export interface TaxMerchantNaturalPersonVO {

    query: TaxMerchantNaturalPersonDTO;

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

