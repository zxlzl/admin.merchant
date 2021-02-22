/**
 * @file API：/accountCompanyRelation
 */
import { ajax } from "@/utils/request";

/**
 * 财税用户和企业绑定
 * @param accountCompanyRelation  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function bind(accountCompanyRelation?: AccountCompanyRelation, success?: (data: Result<AccountCompanyRelation>["data"], response: Result<AccountCompanyRelation>, xhr: any) => void, error?: (message: Result<AccountCompanyRelation>["message"], response: Result<AccountCompanyRelation>, xhr: any) => void, options?: any): Promise<Result<AccountCompanyRelation>["data"]> {
    return ajax({
        url: `/accountCompanyRelation/bind`,
        type: "POST",
        contentType: "application/json",
        data: {
            accountCompanyRelation: accountCompanyRelation
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 财税用户和企业解绑
 * @param id  企业id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function unbind(id?: number, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/accountCompanyRelation/unbind`,
        type: "GET",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据财税系统用户账号查询用户
 * @param mobile  财税系统账号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getUserInfoByMobile(mobile?: string, success?: (data: Result<TaxUserDto>["data"], response: Result<TaxUserDto>, xhr: any) => void, error?: (message: Result<TaxUserDto>["message"], response: Result<TaxUserDto>, xhr: any) => void, options?: any): Promise<Result<TaxUserDto>["data"]> {
    return ajax({
        url: `/accountCompanyRelation/getUserInfoByMobile`,
        type: "GET",
        data: {
            mobile: mobile
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface AccountCompanyRelation {

    /**
     * 财税用户ID
     */
    accountId: number;

    /**
     * 众包商户ID
     */
    companyId: number;

    /**
     * 创建人
     */
    createUserId: number;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 更新人
     */
    updateUserId: number;

    /**
     * 财税用户手机号（也是账号）
     */
    mobile: string;

    /**
     * 财税用户姓名
     */
    name: string;

    /**
     * 更新时间
     */
    updateTime: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 0 未删除，1 删除
     */
    isDel: boolean;

}

export interface Result<T> {

    code?: string;

    data?: T;

    success?: boolean;

    message?: string;

}

export interface TaxUserDto {

    gmtModified?: string;

    mobile?: string;

    name?: string;

    memo?: string;

    company?: string;

    id?: number;

    position?: string;

    contactmobile?: string;

    department?: string;

    gmtCreate?: string;

    type?: number;

    status?: number;

}

