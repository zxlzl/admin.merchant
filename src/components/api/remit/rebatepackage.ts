/**
 * @file API：/remit/rebatepackage
 */
import { ajax } from "@/utils/request";

/**
 * 查询所有返点套餐
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAll(success?: (data: ServiceResult<TaxRebatePackageDTO[]>["data"], response: ServiceResult<TaxRebatePackageDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxRebatePackageDTO[]>["message"], response: ServiceResult<TaxRebatePackageDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxRebatePackageDTO[]>["data"]> {
    return ajax({
        url: `/remit/rebatepackage/queryAll`,
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

export interface TaxRebatePackageDTO {

    gmtModified: string;

    id: number;

    gmtCreate: string;

    rebatePackageName: string;

    operator: string;

}

