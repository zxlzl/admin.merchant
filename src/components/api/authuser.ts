/**
 * @file API：/authuser
 */
import { ajax } from "@/utils/request";

/**
 * 扫码授权登录
 * @param auth_code 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function weChatWorkScanCodeAuthLogin(auth_code?: string, success?: (data: Result<UserInfoDto>["data"], response: Result<UserInfoDto>, xhr: any) => void, error?: (message: Result<UserInfoDto>["message"], response: Result<UserInfoDto>, xhr: any) => void, options?: any): Promise<Result<UserInfoDto>["data"]> {
    return ajax({
        url: `/authuser/weChatWorkScanCodeAuthLogin`,
        data: {
            auth_code: auth_code
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取短信验证码
 * @param phoneNumber  手机号
 * @param type  type = 1:手机号登录 = 2:重置/找回/忘记密码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function sendSmsVerificationCode(phoneNumber?: string, type?: number, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/authuser/sendSmsVerificationCode`,
        type: "POST",
        data: {
            phoneNumber: phoneNumber,
            type: type
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取图形验证码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function sendGraphicVerificationCode(success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/authuser/sendGraphicVerificationCode`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 手机号登录
 * @param phoneNumber  手机号
 * @param smsVerificationCode  验证码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function loginWithPhoneNumber(phoneNumber?: string, smsVerificationCode?: string, success?: (data: Result<UserInfoDto>["data"], response: Result<UserInfoDto>, xhr: any) => void, error?: (message: Result<UserInfoDto>["message"], response: Result<UserInfoDto>, xhr: any) => void, options?: any): Promise<Result<UserInfoDto>["data"]> {
    return ajax({
        url: `/authuser/loginWithPhoneNumber`,
        type: "POST",
        data: {
            phoneNumber: phoneNumber,
            smsVerificationCode: smsVerificationCode
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 密码重置
 * @param taxPwdResetDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function passwordReset(taxPwdResetDto?: TaxPwdResetDto, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/authuser/passwordReset`,
        type: "POST",
        contentType: "application/json",
        data: {
            taxPwdResetDto: taxPwdResetDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 网页授权登录
 * @param code 
 * @param state 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function weChatWorkWebAuthLogin(code?: string, state?: string, success?: (data: Result<UserInfoDto>["data"], response: Result<UserInfoDto>, xhr: any) => void, error?: (message: Result<UserInfoDto>["message"], response: Result<UserInfoDto>, xhr: any) => void, options?: any): Promise<Result<UserInfoDto>["data"]> {
    return ajax({
        url: `/authuser/weChatWorkWebAuthLogin`,
        data: {
            code: code,
            state: state
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 网页授权登录
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getCurrentTaxUser(success?: (data: Result<TaxUserDto>["data"], response: Result<TaxUserDto>, xhr: any) => void, error?: (message: Result<TaxUserDto>["message"], response: Result<TaxUserDto>, xhr: any) => void, options?: any): Promise<Result<TaxUserDto>["data"]> {
    return ajax({
        url: `/authuser/getCurrentTaxUser`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据商户号查询管理员手机号
 * @param merchantNo  根据商户号查询管理员手机号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getAdminMobile(merchantNo?: string, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/authuser/getAdminMobile`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 发送绑定验证码
 * @param merchantNo  发送绑定验证码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function sentVerificationCode(merchantNo?: string, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/authuser/sentVerificationCode`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 发送绑定验证码
 * @param mobile  手机号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function sentUserBindVerifyCode(mobile?: string, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/authuser/sentUserBindVerifyCode`,
        data: {
            mobile: mobile
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 校验绑定验证码
 * @param userBindDto 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function verifyUserBindVerifyCode(userBindDto?: UserBindDto, success?: (data: Result<UserInfoDto>["data"], response: Result<UserInfoDto>, xhr: any) => void, error?: (message: Result<UserInfoDto>["message"], response: Result<UserInfoDto>, xhr: any) => void, options?: any): Promise<Result<UserInfoDto>["data"]> {
    return ajax({
        url: `/authuser/verifyUserBindVerifyCode`,
        contentType: "application/json",
        data: {
            userBindDto: userBindDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 校验绑定验证码
 * @param verifyCodeBindDto 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function verifyCode(verifyCodeBindDto?: VerifyCodeBindDto, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/authuser/verifyCode`,
        contentType: "application/json",
        data: {
            verifyCodeBindDto: verifyCodeBindDto
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

export interface UserInfoDto {

    deviceType: number;

    weChatWorkOpenUserId: string;

    authToken: string;

    collectedSubjectName: string;

    mobile: string;

    collectedSubjectNo: string;

    merchantName: string;

    merchantNo: string;

}

export interface TaxPwdResetDto {

    smsVerificationCode: string;

    phoneNumber: string;

    confirmPassword: string;

    newPassword: string;

    graphicVerificationCode: string;

}

export interface TaxUserDto {

    gmtModified: string;

    role: string;

    mobile: string;

    memo: string;

    gmtCreate: string;

    type: number;

    systemPermissions: string;

    name: string;

    roleName: string;

    company: string;

    id: number;

    position: string;

    contactmobile: string;

    department: string;

    merchantNo: string;

    status: number;

    useremail: string;

}

export interface UserBindDto {

    code: string;

    /**
     * 手机号
     */
    mobile: string;

    openUserId: string;

}

export interface VerifyCodeBindDto {

    code: string;

    openUserId: string;

    /**
     * 校验绑定验证码
     */
    merchantNo: string;

}

