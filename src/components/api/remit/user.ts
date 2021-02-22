/**
 * @file API：/remit/user
 */
import { ajax } from "@/utils/request";

/**
 * 管理后台重置商户密码
 * @param mobile  用户手机号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function resetPassword(mobile?: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/user/resetPassword`,
        data: {
            mobile: mobile
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 商户账号列表
 * @param query 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryMerchantUserList(query?: MerchantUserVO, success?: (data: WebResult_1<PageBean_1<MerchantUserDTO>>["data"], response: WebResult_1<PageBean_1<MerchantUserDTO>>, xhr: any) => void, error?: (message: WebResult_1<PageBean_1<MerchantUserDTO>>["message"], response: WebResult_1<PageBean_1<MerchantUserDTO>>, xhr: any) => void, options?: any): Promise<WebResult_1<PageBean_1<MerchantUserDTO>>["data"]> {
    return ajax({
        url: `/remit/user/queryMerchantUserList`,
        contentType: "application/json",
        data: {
            query: query
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 停用用户账号
 * @param id  用户主键
 * @param status  变更状态,账号状态:1正常,2注销
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateUserStatus(id?: number, status?: number, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/user/updateUserStatus`,
        data: {
            id: id,
            status: status
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户切换商户号
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function switchMerchant(merchantNo: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/user/switchMerchant`,
        type: "POST",
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户切换商户号(企业微信)
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function switchMerchantWechat(merchantNo: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/user/switchMerchantWechat`,
        type: "POST",
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 管理后台修改商户用户
 * @param id  商户用户id
 * @param merchantNo  关联商户号，可关联多个，逗号隔开
 * @param name  姓名
 * @param contactmobile  联系电话
 * @param company  企业
 * @param department  部门
 * @param position  职位
 * @param memo  备注
 * @param useremail  管理员邮箱
 * @param role  角色
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateUserMerchant(id?: number, merchantNo?: string, name?: string, contactmobile?: string, company?: string, department?: string, position?: string, memo?: string, useremail?: string, role?: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/user/updateUserMerchant`,
        data: {
            id: id,
            merchantNo: merchantNo,
            name: name,
            contactmobile: contactmobile,
            company: company,
            department: department,
            position: position,
            memo: memo,
            useremail: useremail,
            role: role
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户登出
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function logout(success?: (data: WebResult_1<string>["data"], response: WebResult_1<string>, xhr: any) => void, error?: (message: WebResult_1<string>["message"], response: WebResult_1<string>, xhr: any) => void, options?: any): Promise<WebResult_1<string>["data"]> {
    return ajax({
        url: `/remit/user/logout`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户修改密码
 * @param oldPassword  用户老密码
 * @param newPassword  用户新密码
 * @param confirmPassword  确认新密码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function changePassword(oldPassword: string, newPassword: string, confirmPassword: string, success?: (data: WebResult_1<string>["data"], response: WebResult_1<string>, xhr: any) => void, error?: (message: WebResult_1<string>["message"], response: WebResult_1<string>, xhr: any) => void, options?: any): Promise<WebResult_1<string>["data"]> {
    return ajax({
        url: `/remit/user/changePassword`,
        data: {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户注册，管理后台新建商户用户
 * @param mobile  用户手机号
 * @param type  用户类型，非必传，1商户平台注册，2管理平台注册
 * @param merchantNo  关联商户号，可关联多个，逗号隔开
 * @param name  姓名
 * @param contactmobile  联系电话
 * @param company  企业
 * @param department  部门
 * @param position  职位
 * @param memo  备注
 * @param useremail  邮箱
 * @param role  角色
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function addUser(mobile?: string, type?: number, merchantNo?: string, name?: string, contactmobile?: string, company?: string, department?: string, position?: string, memo?: string, useremail?: string, role?: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/user/addUser`,
        data: {
            mobile: mobile,
            type: type,
            merchantNo: merchantNo,
            name: name,
            contactmobile: contactmobile,
            company: company,
            department: department,
            position: position,
            memo: memo,
            useremail: useremail,
            role: role
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户登陆
 * @param mobile  手机号
 * @param password  密码
 * @param userType  登录来源:1商户平台/2系统后台
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function login(mobile: string, password: string, userType: number, merchantNo?: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/user/login`,
        type: "POST",
        data: {
            mobile: mobile,
            password: password,
            userType: userType,
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取公钥
 * @param mobile  获取公钥
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getPublicKey(mobile: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/user/getPublicKey`,
        data: {
            mobile: mobile
        },
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

export interface TaxMerchantAndCollectedSubject {

    collectedSubjectName: string;

    collectedSubjectNo: string;

    merchantName: string;

    merchantNo: string;

}

export interface MerchantUserDTO {

    gmtModified: string;

    /**
     * 企业微信管理员ID
     */
    wechatAdminId: string;

    /**
     * 角色，0-超级管理员；1-其他；
     */
    role: string;

    endDate: string;

    memo: string;

    type: number;

    /**
     * 企业微信授权用户表记录id
     */
    wechatAuthId: string;

    /**
     * 加密后的密码
     */
    password: string;

    company: string;

    id: number;

    contactmobile: string;

    department: string;

    merchantAndCollectedList: TaxMerchantAndCollectedSubject[];

    /**
     * 企业微信corpId
     */
    corpId: string;

    mobile: string;

    gmtCreate: string;

    /**
     * 企业微信管理员姓名
     */
    wechatAdminName: string;

    /**
     * 系统权限，表明该用户有哪些系统权限，第一位：财税系统；第二位：AI 记账；第三位：SMCS 用工平台；第四位第五位预留
     */
    systemPermissions: string;

    name: string;

    /**
     * 角色名称
     */
    roleName: string;

    position: string;

    merchantList: string[];

    startDate: string;

    status: number;

    useremail: string;

}

export interface Object {

}

export interface PageBean {

    curPage: number;

    data: Object;

    endRecordCount: number;

    recordCount: number;

    pageSize: number;

    startRecordCount: number;

    list: any[];

    maxPage: number;

}

export interface MerchantUserVO {

    query: MerchantUserDTO;

    page: PageBean;

}

export interface WebResult_1<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

export interface PageBean_1<T> {

    curPage: number;

    data: Object;

    endRecordCount: number;

    recordCount: number;

    pageSize: number;

    startRecordCount: number;

    list: any[];

    maxPage: number;

}

