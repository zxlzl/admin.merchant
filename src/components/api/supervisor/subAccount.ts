/**
 * @file API：/supervisor/subAccount
 */
import { ajax } from "@/utils/request";

/**
 * 平安充值专户查询
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAccount(merchantNo?: string, success?: (data: WebResult<TaxSubAccountVO>["data"], response: WebResult<TaxSubAccountVO>, xhr: any) => void, error?: (message: WebResult<TaxSubAccountVO>["message"], response: WebResult<TaxSubAccountVO>, xhr: any) => void, options?: any): Promise<WebResult<TaxSubAccountVO>["data"]> {
    return ajax({
        url: `/supervisor/subAccount/queryAccount`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询商户平安易资金监管充值账户（项目）
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPinganyiByMerchant(merchantNo?: string, success?: (data: WebResult<TaxSubAccountDTO[]>["data"], response: WebResult<TaxSubAccountDTO[]>, xhr: any) => void, error?: (message: WebResult<TaxSubAccountDTO[]>["message"], response: WebResult<TaxSubAccountDTO[]>, xhr: any) => void, options?: any): Promise<WebResult<TaxSubAccountDTO[]>["data"]> {
    return ajax({
        url: `/supervisor/subAccount/queryPinganyiByMerchant`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 添加商户平安易项目
 * @param taxSubAccountDTO  添加商户平安易项目
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function addPayProject(taxSubAccountDTO?: TaxSubAccountDTO, success?: (data: WebResult<TaxSubAccountDTO>["data"], response: WebResult<TaxSubAccountDTO>, xhr: any) => void, error?: (message: WebResult<TaxSubAccountDTO>["message"], response: WebResult<TaxSubAccountDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxSubAccountDTO>["data"]> {
    return ajax({
        url: `/supervisor/subAccount/addPayProject`,
        data: {
            taxSubAccountDTO: taxSubAccountDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 项目信息查询
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getTaxMerchantPayProject(merchantNo?: string, success?: (data: WebResult<TaxMerchantPayProjectDTO>["data"], response: WebResult<TaxMerchantPayProjectDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantPayProjectDTO>["message"], response: WebResult<TaxMerchantPayProjectDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantPayProjectDTO>["data"]> {
    return ajax({
        url: `/supervisor/subAccount/getTaxMerchantPayProject`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据商户号查询商户子账户
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: WebResult<TaxSubAccountDTO[]>["data"], response: WebResult<TaxSubAccountDTO[]>, xhr: any) => void, error?: (message: WebResult<TaxSubAccountDTO[]>["message"], response: WebResult<TaxSubAccountDTO[]>, xhr: any) => void, options?: any): Promise<WebResult<TaxSubAccountDTO[]>["data"]> {
    return ajax({
        url: `/supervisor/subAccount/queryByMerchantNo`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 更新商户平安易项目
 * @param taxSubAccountDTO  商户子账户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function update(taxSubAccountDTO?: TaxSubAccountDTO, success?: (data: WebResult<TaxSubAccountDTO>["data"], response: WebResult<TaxSubAccountDTO>, xhr: any) => void, error?: (message: WebResult<TaxSubAccountDTO>["message"], response: WebResult<TaxSubAccountDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxSubAccountDTO>["data"]> {
    return ajax({
        url: `/supervisor/subAccount/update`,
        data: {
            taxSubAccountDTO: taxSubAccountDTO
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

export interface TaxSubAccountVO {

    /**
     * 代征主体名称
     */
    collectedSubjectName: string;

    list: TaxSubAccountDTO[];

    /**
     * 是否显示按钮
     */
    isShowButton: boolean;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 商户代码
     */
    merchantNo: string;

}

export interface TaxMerchantPayProjectAccount {

    /**
     * 项目来账帐号
     */
    projectIncomeAccount: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 主键id
     */
    id: number;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 项目名称
     */
    projectName: string;

    /**
     * 商户代码
     */
    merchantNo: string;

}

export interface TaxMerchantPayProjectDTO {

    /**
     * 项目状态
     */
    projectStatus: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 项目冻结金额
     */
    projectFreezeAmount: number;

    /**
     * 项目金额
     */
    projectAmount: number;

    /**
     * 项目累计到账金额
     */
    projectTotalIncomeAmount: number;

    /**
     * 主键id
     */
    id: number;

    /**
     * 创建时间
     */
    gmtCreate: string;

    list: TaxMerchantPayProjectAccount[];

    /**
     * 项目名称
     */
    projectName: string;

    /**
     * 项目可使用金额
     */
    projectAvailableAmount: number;

}

