/**
 * @file API：/frontend/selectOption
 */
import { ajax } from "@/utils/request";

/**
 * 获取所有的下拉框
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function querySelectOptions(success?: (data: any, response: any, xhr: any) => void, error?: (message: any, response: any, xhr: any) => void, options?: any): Promise<any> {
    return ajax({
        url: `/frontend/selectOption/querySelectOptions`,
        type: "GET",
        success: success,
        error: error,
        ...options
    }) as any;
}

