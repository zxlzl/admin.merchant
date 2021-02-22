/**
 * @file API：/supervisor/product
 */
import { ajax } from "@/utils/request";

/**
 * 查询所有产品
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAll(success?: (data: ServiceResult<TaxProductDTO[]>["data"], response: ServiceResult<TaxProductDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxProductDTO[]>["message"], response: ServiceResult<TaxProductDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxProductDTO[]>["data"]> {
    return ajax({
        url: `/supervisor/product/queryAll`,
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

export interface TaxProductDTO {

    gmtModified: string;

    id: number;

    gmtCreate: string;

    operator: string;

    productName: string;

}

