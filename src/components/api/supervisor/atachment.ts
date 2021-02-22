/**
 * @file API：/supervisor/atachment
 */
import { ajax } from "@/utils/request";

/**
 * 下载附件
 * @param url  附件url
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function downloadAttachment(url?: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/supervisor/atachment/downloadAttachment`,
        type: "GET",
        data: {
            url: url
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 附件上传
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function uploadAttachment(success?: (data: WebResult_1<string>["data"], response: WebResult_1<string>, xhr: any) => void, error?: (message: WebResult_1<string>["message"], response: WebResult_1<string>, xhr: any) => void, options?: any): Promise<WebResult_1<string>["data"]> {
    return ajax({
        url: `/supervisor/atachment/uploadAttachment`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface WebResult {

    code: string;

    redirectUrl: string;

    data: any;

    success: boolean;

    message: string;

}

export interface WebResult_1<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

