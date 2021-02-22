/**
 * @file API：/selectOption
 */
import { ajax } from "@/utils/request";

/**
 * 获取所有的下拉框
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function querySelectOptions(success?: (data: ServiceResult<Object>["data"], response: ServiceResult<Object>, xhr: any) => void, error?: (message: ServiceResult<Object>["message"], response: ServiceResult<Object>, xhr: any) => void, options?: any): Promise<ServiceResult<Object>["data"]> {
    return ajax({
        url: `/selectOption/querySelectOptions`,
        type: "GET",
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

export interface Object {

}

