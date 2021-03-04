/**
 * @file API：/remit/merchantsecret
 */
import { ajax } from "@/utils/request";

/**
 * 下载平台公钥
 * @param fileName  下载文件名
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function downLoadSecret(fileName?: string, success?: (data: any, response: void, xhr: any) => void, error?: (message: any, response: void, xhr: any) => void, options?: any): Promise<any> {
    return ajax({
        url: `/remit/merchantsecret/downLoadSecret`,
        data: {
            fileName: fileName
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据商户号查询商户密钥等信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function querySecretByMerchantNo(success?: (data: WebResult<TaxMerchantSecretDTO>["data"], response: WebResult<TaxMerchantSecretDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantSecretDTO>["message"], response: WebResult<TaxMerchantSecretDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantSecretDTO>["data"]> {
    return ajax({
        url: `/remit/merchantsecret/querySecretByMerchantNo`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 保存商户API公钥等信息
 * @param taxMerchantSecretVO  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function saveMerchantSecret(taxMerchantSecretVO?: TaxMerchantSecretVO, success?: (data: WebResult<string>["data"], response: WebResult<string>, xhr: any) => void, error?: (message: WebResult<string>["message"], response: WebResult<string>, xhr: any) => void, options?: any): Promise<WebResult<string>["data"]> {
    return ajax({
        url: `/remit/merchantsecret/saveMerchantSecret`,
        data: {
            taxMerchantSecretVO: taxMerchantSecretVO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询平台公钥
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPlatformSecret(success?: (data: WebResult<TaxPlatformSecretVO>["data"], response: WebResult<TaxPlatformSecretVO>, xhr: any) => void, error?: (message: WebResult<TaxPlatformSecretVO>["message"], response: WebResult<TaxPlatformSecretVO>, xhr: any) => void, options?: any): Promise<WebResult<TaxPlatformSecretVO>["data"]> {
    return ajax({
        url: `/remit/merchantsecret/queryPlatformSecret`,
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

export interface TaxMerchantSecretDTO {

    /**
     * 过期时间
     */
    expireTime: string;

    /**
     * 更新时间
     */
    gmtModify: string;

    /**
     * 白名单数组
     */
    ipWhiteLists: string[];

    /**
     * 主键id
     */
    id: number;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 下载时间
     */
    downloadTime: string;

    /**
     * ip白名单，多个以逗号隔开
     */
    ipWhiteList: string;

    /**
     * 私钥
     */
    prikey: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 商户代码
     */
    merchantNo: string;

    /**
     * 公钥
     */
    pubkey: string;

}

export interface TaxMerchantSecretVO {

    /**
     * 确认商户API公钥
     */
    confirmPubkey: string;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 商户API公钥
     */
    pubkey: string;

}

export interface TaxPlatformSecretVO {

    /**
     * 平台API公钥（java版文件链接）
     */
    pubkeyJAVAFile: string;

    /**
     * 平台API公钥（PHP版文件链接）
     */
    pubkeyPHPFile: string;

    /**
     * 平台API公钥（PHP版）
     */
    pubkeyPHP: string;

    /**
     * 平台API公钥（java版）
     */
    pubkeyJAVA: string;

}

