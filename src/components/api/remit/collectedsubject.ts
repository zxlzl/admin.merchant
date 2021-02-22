/**
 * @file API：/remit/collectedsubject
 */
import { ajax } from "@/utils/request";

/**
 * 根据查询代征主体
 * @param collectedSubjectNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function querybyCollectedSubjectNo(collectedSubjectNo?: string, success?: (data: ServiceResult<TaxCollectedSubjectDTO>["data"], response: ServiceResult<TaxCollectedSubjectDTO>, xhr: any) => void, error?: (message: ServiceResult<TaxCollectedSubjectDTO>["message"], response: ServiceResult<TaxCollectedSubjectDTO>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxCollectedSubjectDTO>["data"]> {
    return ajax({
        url: `/remit/collectedsubject/querybyCollectedSubjectNo`,
        data: {
            collectedSubjectNo: collectedSubjectNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询所有可用代征主体
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllAvailable(success?: (data: ServiceResult<TaxCollectedSubjectDTO[]>["data"], response: ServiceResult<TaxCollectedSubjectDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxCollectedSubjectDTO[]>["message"], response: ServiceResult<TaxCollectedSubjectDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxCollectedSubjectDTO[]>["data"]> {
    return ajax({
        url: `/remit/collectedsubject/queryAllAvailable`,
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

