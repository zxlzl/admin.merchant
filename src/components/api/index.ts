/**
 * @file API：index
 */
import { ajax } from "@/utils/request";

/**
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function jsp(success?: (data: any, response: string, xhr: any) => void, error?: (message: any, response: string, xhr: any) => void, options?: any): Promise<any> {
    return ajax({
        url: `/status.jsp`,
        type: "GET",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function error(success?: (data: any, response: void, xhr: any) => void, error?: (message: any, response: void, xhr: any) => void, options?: any): Promise<any> {
    return ajax({
        url: `/error`,
        success: success,
        error: error,
        ...options
    }) as any;
}

