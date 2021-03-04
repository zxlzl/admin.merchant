/**
 * @file API：/supervisor/accountOpt
 */
import { ajax } from "@/utils/request";

/**
 * 查询所有的账务类型
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllChangeTypes(success?: (data: WebResult<ChangeType[]>["data"], response: WebResult<ChangeType[]>, xhr: any) => void, error?: (message: WebResult<ChangeType[]>["message"], response: WebResult<ChangeType[]>, xhr: any) => void, options?: any): Promise<WebResult<ChangeType[]>["data"]> {
    return ajax({
        url: `/supervisor/accountOpt/queryAllChangeTypes`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 开户操作
 * @param accountDO  accountDO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function openAccount(accountDO?: AccountDO, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/supervisor/accountOpt/openAccount`,
        contentType: "application/json",
        data: {
            accountDO: accountDO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 调账
 * @param adjustBillOrder  调账
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function adjustAccount(adjustBillOrder?: AdjustBillOrder, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/supervisor/accountOpt/adjustAccount`,
        contentType: "application/json",
        data: {
            adjustBillOrder: adjustBillOrder
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 生成订单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function genSequence(success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/supervisor/accountOpt/genSequence`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 账户更新
 * @param accountDO  accountDO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateAccount(accountDO?: AccountDO, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/supervisor/accountOpt/updateAccount`,
        contentType: "application/json",
        data: {
            accountDO: accountDO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询所有平台账户
 * @param query  查询参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllAccounts(query?: AccountDO, success?: (data: any, response: AccountDO[], xhr: any) => void, error?: (message: any, response: AccountDO[], xhr: any) => void, options?: any): Promise<any> {
    return ajax({
        url: `/supervisor/accountOpt/queryAllAccounts`,
        data: {
            query: query
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

export interface ChangeType {

    code: string;

    desc: string;

}

export interface AccountDO {

    accountName: string;

    /**
     * 绑定的其它平台账户
     */
    bindPlatAccountNo: string;

    overdraft: string;

    acctBalance: number;

    userNo: string;

    remark: string;

    allotWithdraw: boolean;

    operator: string;

    subAccount: boolean;

    uid: string;

    hideDepBalance: boolean;

    userSysCode: string;

    /**
     * 绑定的其它平台存款账户名
     */
    bindDepositAccountName: string;

    availableAmount: number;

    isExistSubAccount: boolean;

    accountNo: string;

    loginName: string;

    /**
     * 绑定的其它平台存款账户
     */
    bindDepositAccountNo: string;

    arriveBalance: number;

    groupCode: string;

    redirect: boolean;

    creator: string;

    euid: string;

    allotIn: boolean;

    accountType: string;

    balanceWaring: boolean;

    userName: string;

    allotRecharge: boolean;

    allotOut: boolean;

    /**
     * 绑定的其它平台账户名
     */
    bindPlatAccountName: string;

    guid: string;

}

export interface AccountOrder {

    uid: number;

    amount: number;

    adjustType: string;

    accountNo: string;

    accountType: string;

    freezeNo: string;

    adjustCode: string;

    bidNo: string;

    remark: string;

    bizPlatformNo: string;

    voucherCode: string;

}

export interface AdjustBillOrder {

    payers: AccountOrder[];

    orderNo: string;

    receipters: AccountOrder[];

    remark: string;

    bizPlatformNo: string;

    voucherCode: string;

}

