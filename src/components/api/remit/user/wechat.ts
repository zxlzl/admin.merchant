/**
 * @file API：/remit/user/wechat
 */
import { ajax } from "@/utils/request";

/**
 * 微信用户登陆
 * @param wechatUserInfoDto  微信用户信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function login(wechatUserInfoDto?: WechatUserInfoDto, success?: (data: ServiceResult["data"], response: ServiceResult, xhr: any) => void, error?: (message: ServiceResult["message"], response: ServiceResult, xhr: any) => void, options?: any): Promise<ServiceResult["data"]> {
    return ajax({
        url: `/remit/user/wechat/login`,
        type: "POST",
        contentType: "application/json",
        cache: 5000,
        data: {
            wechatUserInfoDto: wechatUserInfoDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface WechatUserInfoDto {

    /**
     * 微信用户登录凭证code
     */
    code: string;

}

export interface ServiceResult {

    code: string;

    data: any;

    success: boolean;

    message: string;

}

