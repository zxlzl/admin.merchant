/**
 * @file API：/supervisor/bankInfo
 */
import { ajax } from "@/utils/request";

/**
 * 获取银行数据列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryBankList(success?: (data: WebResult<BankDTO[]>["data"], response: WebResult<BankDTO[]>, xhr: any) => void, error?: (message: WebResult<BankDTO[]>["message"], response: WebResult<BankDTO[]>, xhr: any) => void, options?: any): Promise<WebResult<BankDTO[]>["data"]> {
    return ajax({
        url: `/supervisor/bankInfo/queryBankList`,
        type: "POST",
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

export interface BankDTO {

    code: string;

    name: string;

}

