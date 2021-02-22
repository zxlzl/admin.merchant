/**
 * @file API：/callback
 */
import { ajax } from "@/utils/request";

/**
 * 从服务商网站授权
 * @param auth_code 
 * @param state 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function authRedirectUri(auth_code?: string, state?: string, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/callback/authRedirectUri`,
        data: {
            auth_code: auth_code,
            state: state
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

