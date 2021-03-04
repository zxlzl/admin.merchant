/**
 * @file API：/supervisor/collectedsubject
 */
import { ajax } from "@/utils/request";

/**
 * 查询所有可用服务主体
 * @param collectedSubjectNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function querybyCollectedSubjectNo(collectedSubjectNo?: string, success?: (data: ServiceResult<TaxCollectedSubjectDTO>["data"], response: ServiceResult<TaxCollectedSubjectDTO>, xhr: any) => void, error?: (message: ServiceResult<TaxCollectedSubjectDTO>["message"], response: ServiceResult<TaxCollectedSubjectDTO>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxCollectedSubjectDTO>["data"]> {
    return ajax({
        url: `/supervisor/collectedsubject/querybyCollectedSubjectNo`,
        data: {
            collectedSubjectNo: collectedSubjectNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询所有可用服务主体
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllAvailable(success?: (data: ServiceResult<TaxCollectedSubjectDTO[]>["data"], response: ServiceResult<TaxCollectedSubjectDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxCollectedSubjectDTO[]>["message"], response: ServiceResult<TaxCollectedSubjectDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxCollectedSubjectDTO[]>["data"]> {
    return ajax({
        url: `/supervisor/collectedsubject/queryAllAvailable`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 新增服务主体
 * @param taxCollectedSubjectDTO  关联商户账号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function add(taxCollectedSubjectDTO?: TaxCollectedSubjectDTO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/supervisor/collectedsubject/add`,
        data: {
            taxCollectedSubjectDTO: taxCollectedSubjectDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 修改服务主体
 * @param taxCollectedSubjectDTO  关联商户账号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function update(taxCollectedSubjectDTO?: TaxCollectedSubjectDTO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/supervisor/collectedsubject/update`,
        data: {
            taxCollectedSubjectDTO: taxCollectedSubjectDTO
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

export interface TaxCollectedSubjectDTO {

    englishName: string;

    gmtModified: string;

    mainAccountNo: string;

    maxAmtSingle: number;

    collectedSubjectName: string;

    collectedSubjectNo: string;

    remark: string;

    id: number;

    gmtCreate: string;

    maxAmount: number;

    operator: string;

    status: string;

}

export interface WebResult {

    code: string;

    redirectUrl: string;

    data: any;

    success: boolean;

    message: string;

}

