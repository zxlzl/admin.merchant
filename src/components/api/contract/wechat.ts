/**
 * @file API：/contract/wechat
 */
import { ajax } from "@/utils/request";

/**
 * 签约
 * @param signId  签约ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function sign(signId?: number, success?: (data: ServiceResult<string>["data"], response: ServiceResult<string>, xhr: any) => void, error?: (message: ServiceResult<string>["message"], response: ServiceResult<string>, xhr: any) => void, options?: any): Promise<ServiceResult<string>["data"]> {
    return ajax({
        url: `/contract/wechat/sign`,
        cache: 5000,
        data: {
            signId: signId
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 使用签约邀请码进行签约，预请求
 * @param signCode  签约邀请码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function preSignByCode(signCode?: string, success?: (data: ServiceResult<PreSignDetail>["data"], response: ServiceResult<PreSignDetail>, xhr: any) => void, error?: (message: ServiceResult<PreSignDetail>["message"], response: ServiceResult<PreSignDetail>, xhr: any) => void, options?: any): Promise<ServiceResult<PreSignDetail>["data"]> {
    return ajax({
        url: `/contract/wechat/preSignByCode`,
        data: {
            signCode: signCode
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 使用签约邀请码进行签约
 * @param signCode  签约邀请码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function signByCode(signCode?: string, success?: (data: ServiceResult<string>["data"], response: ServiceResult<string>, xhr: any) => void, error?: (message: ServiceResult<string>["message"], response: ServiceResult<string>, xhr: any) => void, options?: any): Promise<ServiceResult<string>["data"]> {
    return ajax({
        url: `/contract/wechat/signByCode`,
        data: {
            signCode: signCode
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 个人实名认证
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function personAuth(success?: (data: ServiceResult<string>["data"], response: ServiceResult<string>, xhr: any) => void, error?: (message: ServiceResult<string>["message"], response: ServiceResult<string>, xhr: any) => void, options?: any): Promise<ServiceResult<string>["data"]> {
    return ajax({
        url: `/contract/wechat/personAuth`,
        cache: 5000,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 个人实名认证查询
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function authQuery(success?: (data: ServiceResult<TaxCustomer>["data"], response: ServiceResult<TaxCustomer>, xhr: any) => void, error?: (message: ServiceResult<TaxCustomer>["message"], response: ServiceResult<TaxCustomer>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxCustomer>["data"]> {
    return ajax({
        url: `/contract/wechat/authQuery`,
        cache: 5000,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询签约记录
 * @param signQuery  签约状态，不填默认查询所有记录
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function querySignRecords(signQuery?: SignQuery, success?: (data: ServiceResult<TaxFddContractSign[]>["data"], response: ServiceResult<TaxFddContractSign[]>, xhr: any) => void, error?: (message: ServiceResult<TaxFddContractSign[]>["message"], response: ServiceResult<TaxFddContractSign[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxFddContractSign[]>["data"]> {
    return ajax({
        url: `/contract/wechat/querySignRecords`,
        cache: 5000,
        data: {
            signQuery: signQuery
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface ServiceResult<T> {

    code: string;

    data: T;

    success: boolean;

    message: string;

}

export interface PreSignDetail {

    memo: string;

    title: string;

}

export interface TaxCustomer {

    /**
     * 银行编码
     */
    bankCode: string;

    /**
     * 证件类型
     */
    certType: string;

    /**
     * 法大大商户编号
     */
    fddAppId: string;

    /**
     * 微信平台唯一用户标识unionid
     */
    unionid: string;

    /**
     * 微信openid
     */
    wechatOpenId: string;

    /**
     * 银行卡号
     */
    bankCardNo: string;

    /**
     * 微信appid
     */
    wechatAppid: string;

    /**
     * 手机号
     */
    mobile: string;

    /**
     * 银行名称
     */
    bankName: string;

    /**
     * 备注
     */
    remark: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 证件号
     */
    certNo: string;

    /**
     * 更新时间
     */
    gmtUpdate: string;

    /**
     * 法大大认证结果
     */
    authResult: string;

    /**
     * 用户名称
     */
    name: string;

    /**
     * 认证来源,0服务号，1小程序
     */
    authResource: string;

    /**
     * 实名存证是否开通:0-未开通，1-开通
     */
    deposit: boolean;

    /**
     * 法大大审核通过时间
     */
    fddPassTime: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 法大大客户编号
     */
    fddCustomerId: string;

    /**
     * 实名认证状态，1-已实名，0-未实名
     */
    realNameAuth: boolean;

    /**
     * 微信手机号
     */
    wechatMobile: string;

}

export interface SignQuery {

    status: string;

}

export interface TaxFddContractSign {

    /**
     * 证件类型
     */
    certType: string;

    signEntityId: string;

    mobile: string;

    contractDownloadUrl: string;

    memo: string;

    remark: string;

    contractSignUrl: string;

    gmtCreate: string;

    signDate: string;

    /**
     * 用户名称
     */
    userName: string;

    merchantName: string;

    /**
     * 证件号
     */
    certNo: string;

    /**
     * 签约来源： 0-微信签约，3存证签约
     */
    signSource: string;

    merchantId: string;

    gmtUpdate: string;

    contractId: string;

    signEntity: string;

    signType: number;

    /**
     * 文件名称
     */
    contractName: string;

    id: number;

    contractViewUrl: string;

    fddCustomerId: string;

    /**
     * 签约状态：I-待签约，CG-签约中，S-签约成功，F-签约失败
     */
    status: string;

}

