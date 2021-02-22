/**
 * @file API：/user
 */
import { ajax } from "@/utils/request";

/**
 * 用户名密码加密，密码必须是加密后的
 * @param user  用户名，密码等
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function login(user?: UserRequest, success?: (data: Result<UserInfoDto>["data"], response: Result<UserInfoDto>, xhr: any) => void, error?: (message: Result<UserInfoDto>["message"], response: Result<UserInfoDto>, xhr: any) => void, options?: any): Promise<Result<UserInfoDto>["data"]> {
    return ajax({
        url: `/user/login`,
        type: "POST",
        contentType: "application/json",
        data: {
            user: user
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据登陆名获取加密公钥
 * @param mobile  用户名
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getPublicKeyByMobile(mobile?: string, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/user/getPublicKeyByMobile`,
        type: "GET",
        data: {
            mobile: mobile
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 退出
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function logout(success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/user/logout`,
        type: "GET",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户名密码加密，密码必须是加密后的
 * @param userPwdRequest  用户名，密码等
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function changePassword(userPwdRequest?: UserPwdRequest, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/user/changePassword`,
        type: "POST",
        contentType: "application/json",
        data: {
            userPwdRequest: userPwdRequest
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取当前登陆用户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getCurrentUser(success?: (data: Result<UserDto>["data"], response: Result<UserDto>, xhr: any) => void, error?: (message: Result<UserDto>["message"], response: Result<UserDto>, xhr: any) => void, options?: any): Promise<Result<UserDto>["data"]> {
    return ajax({
        url: `/user/getCurrentUser`,
        type: "GET",
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface UserRequest {

    password?: string;

    ip?: string;

    mobile?: string;

}

export interface Result<T> {

    code?: string;

    data?: T;

    success?: boolean;

    message?: string;

}

export interface UserInfoDto {

    deviceType?: number;

    authToken?: string;

    collectedSubjectName?: string;

    mobile?: string;

    collectedSubjectNo?: string;

    merchantName?: string;

    merchantNo?: string;

}

export interface UserPwdRequest {

    oldPassword?: string;

    mobile?: string;

    confirmPassword?: string;

    newPassword?: string;

}

export interface Company {

    /**
     * 营业执照
     */
    businessLicense: string;

    /**
     * 营业执照图片
     */
    businessLicensePic: string;

    /**
     * 创建人
     */
    createUserId: number;

    /**
     * 企业类型，01-个体工商户；02企业；03-党政机关及事业单位；04-其他组织
     */
    companyType: number;

    /**
     * 更新人
     */
    updateUserId: number;

    /**
     * 企业简称
     */
    abbrName: string;

    /**
     * 备注
     */
    remark: string;

    /**
     * 更新时间
     */
    updateTime: string;

    /**
     * 商户编号，固定 9 位，商家类型（2位）+经营类目（2位）+序列号（4位）
     */
    companyNo: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 企业全称
     */
    name: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 营业地址
     */
    businessAddress: string;

    /**
     * 经营类目，01 共享服务
     */
    businessType: number;

    /**
     * 0 未删除，1 删除
     */
    isDel: boolean;

    /**
     * 0 未启用 1 启用
     */
    status: boolean;

}

export interface UserDto {

    gmtModified?: string;

    currentCompany?: Company;

    mobile?: string;

    memo?: string;

    gmtCreate?: string;

    type?: number;

    companies?: Company[];

    name?: string;

    company?: string;

    id?: number;

    position?: string;

    contactmobile?: string;

    department?: string;

    status?: number;

}

