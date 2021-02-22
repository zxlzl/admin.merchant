/**
 * @file API：/supervisor/bankReceipt
 */
import { ajax } from "@/utils/request";

/**
 * 预览银行回单
 * @param payDetailNo  明细单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function previewBankReceipt(payDetailNo?: string, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/supervisor/bankReceipt/previewBankReceipt`,
        data: {
            payDetailNo: payDetailNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

