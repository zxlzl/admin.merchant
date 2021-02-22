/**
 * @file API：/wechatworkauth
 */
import { ajax } from "@/utils/request";

/**
 * 获取应用授权 URL
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getAuthUrl(success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/wechatworkauth/getAuthUrl`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取应用授权 URL
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getRegisterCode(success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/wechatworkauth/getRegisterCode`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 设置授权配置
 * @param authType 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function setSessionInfo(authType?: number, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/wechatworkauth/setSessionInfo`,
        data: {
            authType: authType
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface Result<T> {

    code: string;

    data: T;

    success: boolean;

    message: string;

}

