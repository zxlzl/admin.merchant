/**
 * @file API：/remit/subAccount
 */
import { ajax } from "@/utils/request";

/**
 * 根据商户号查询商户子账户
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: WebResult<TaxSubAccountDTO[]>["data"], response: WebResult<TaxSubAccountDTO[]>, xhr: any) => void, error?: (message: WebResult<TaxSubAccountDTO[]>["message"], response: WebResult<TaxSubAccountDTO[]>, xhr: any) => void, options?: any): Promise<WebResult<TaxSubAccountDTO[]>["data"]> {
    return ajax({
        url: `/remit/subAccount/queryByMerchantNo`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据账户类型查询商户本地账户信息
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function query(merchantNo?: string, success?: (data: WebResult<TaxSubAccountDTO[]>["data"], response: WebResult<TaxSubAccountDTO[]>, xhr: any) => void, error?: (message: WebResult<TaxSubAccountDTO[]>["message"], response: WebResult<TaxSubAccountDTO[]>, xhr: any) => void, options?: any): Promise<WebResult<TaxSubAccountDTO[]>["data"]> {
    return ajax({
        url: `/remit/subAccount/query`,
        data: {
            merchantNo: merchantNo
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

export interface TaxSubAccountDTO {

    gmtModified: string;

    /**
     * 开户银行
     */
    openedBank: string;

    /**
     * 通道类型名称
     */
    payChannelName: string;

    /**
     * 开户支行
     */
    bankBranch: string;

    /**
     * 开户银行名称
     */
    openedBankName: string;

    /**
     * 用途
     */
    purpose: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 创建时间最大值
     */
    gmtCreateEnd: string;

    /**
     * 操作人
     */
    operator: string;

    /**
     * 主账户户名
     */
    mainAccountName: string;

    /**
     * 子账户账号(项目账号)
     */
    subAccountNo: string;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * 主账户账号
     */
    mainAccountNo: string;

    /**
     * 子账户名称(项目名称)
     */
    subAccountName: string;

    /**
     * 账户号
     */
    accountNo: string;

    /**
     * 代征主体名称
     */
    collectedSubjectName: string;

    /**
     * 代征主体代码
     */
    collectedSubjectNo: string;

    /**
     * BANKCHANNEL:平安银行,ALIPAY：支付宝打款, WECHAT：微信打款
     */
    payChannel: string;

    id: number;

    /**
     * 商户代码
     */
    merchantNo: string;

    /**
     * 00:失效，01:有效
     */
    status: string;

}

