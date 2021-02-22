/**
 * @file API：/frontend/user
 */
import { ajax } from "@/utils/request";

/**
 * 微信退出
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function logout(success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/frontend/user/logout`,
        type: "GET",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询用户实名认证和签约的状态
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryUserCertificationAndContract(success?: (data: Result<UserCertificatContractDto>["data"], response: Result<UserCertificatContractDto>, xhr: any) => void, error?: (message: Result<UserCertificatContractDto>["message"], response: Result<UserCertificatContractDto>, xhr: any) => void, options?: any): Promise<Result<UserCertificatContractDto>["data"]> {
    return ajax({
        url: `/frontend/user/queryUserCertificationAndContract`,
        type: "GET",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 微信登陆
 * @param wxLoginInfo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function loginByWeiXin(wxLoginInfo?: WxLoginInfo, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/frontend/user/loginByWeiXin`,
        type: "POST",
        contentType: "application/json",
        data: {
            wxLoginInfo: wxLoginInfo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryUserInfo(success?: (data: Result<FrontendUserDto>["data"], response: Result<FrontendUserDto>, xhr: any) => void, error?: (message: Result<FrontendUserDto>["message"], response: Result<FrontendUserDto>, xhr: any) => void, options?: any): Promise<Result<FrontendUserDto>["data"]> {
    return ajax({
        url: `/frontend/user/queryUserInfo`,
        type: "GET",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 身份认证
 * @param userInfo  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function userRealNameCheck(userInfo?: RealNameInfoCheckDto, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/frontend/user/userRealNameCheck`,
        type: "POST",
        contentType: "application/json",
        data: {
            userInfo: userInfo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户签约
 * @param contract  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function userContractCheck(contract?: ContractCheckDto, success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/frontend/user/userContractCheck`,
        type: "POST",
        contentType: "application/json",
        data: {
            contract: contract
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 更新用户实名认证/签约状态为认证中
 * @param type  1:实名认证，2:签约
 * @param id  签约记录id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateRealNameAndContractState(type?: number, id?: number, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/frontend/user/updateRealNameAndContractState`,
        type: "GET",
        data: {
            type: type,
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询用户绑定的银行卡
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryUserBindBankCards(success?: (data: Result<UserBankCardDto>["data"], response: Result<UserBankCardDto>, xhr: any) => void, error?: (message: Result<UserBankCardDto>["message"], response: Result<UserBankCardDto>, xhr: any) => void, options?: any): Promise<Result<UserBankCardDto>["data"]> {
    return ajax({
        url: `/frontend/user/queryUserBindBankCards`,
        type: "GET",
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface Result<T> {

    code?: string;

    data?: T;

    success?: boolean;

    message?: string;

}

export interface UserCertificatContractDto {

    /**
     * 签约时间
     */
    contractCheckedTime: string;

    /**
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 签约状态 0：未签约、1：已签约、2：签约中、3：签约失败
     */
    contractChecked: number;

    /**
     * 服务主体编号
     */
    collectedSubjectNo: string;

    id: number;

    /**
     * 关联用户信息表的主键id
     */
    wxmpUserId: number;

    /**
     * 实名认证状态 0：未认证、1：已认证、2：认证中、3：认证失败
     */
    realNameChecked: number;

    /**
     * 商户主体名称
     */
    merchantName: string;

    /**
     * 商户主体编号
     */
    merchantNo: string;

}

export interface WxLoginInfo {

    /**
     * 前端获取到的 code
     */
    jsCode: string;

    /**
     * 手机好加密数据
     */
    phoneEncryptedData: string;

    /**
     * 用户信息加密数据
     */
    userInfoEncryptedData: string;

    /**
     * 手机号偏移量
     */
    phoneIv: string;

    /**
     * 注册来源
     */
    source: string;

    /**
     * 用户信息偏移量
     */
    userInfoIv: string;

}

export interface FrontendUserDto {

    /**
     * 县
     */
    country: string;

    /**
     * 用户在开放平台的唯一标识符
     */
    unionId: string;

    /**
     * 性别 0：未知、1：男、2：女
     */
    gender: number;

    /**
     * 用户头像
     */
    avatarUrl: string;

    /**
     * 市
     */
    city: string;

    /**
     * 用户昵称
     */
    nickName: string;

    /**
     * 用户唯一标识
     */
    openid: string;

    /**
     * 身份证号
     */
    idCardNo: string;

    /**
     * 小程序用户编码
     */
    userNo: string;

    /**
     * 语言
     */
    language: string;

    /**
     * 修改时间
     */
    updateTime: string;

    /**
     * 出生日期
     */
    birthDate: string;

    /**
     * 用户真实姓名
     */
    realName: string;

    /**
     * 实名认证时间
     */
    realNameCheckedTime: string;

    /**
     * 省
     */
    province: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 手机号
     */
    phone: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 0 未删除 1 删除
     */
    isDel: boolean;

    /**
     * 实名认证状态 0：未认证、1：已认证、2：认证中、3：认证失败
     */
    realNameChecked: number;

}

export interface RealNameInfoCheckDto {

    /**
     * 姓名
     */
    name: string;

    /**
     * 身份证号
     */
    idNumber: string;

    /**
     * 实名认证回调URL
     */
    url: string;

}

export interface ContractCheckDto {

    /**
     * 签约时间
     */
    contractCheckedTime: string;

    /**
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 签约状态 0：未签约、1：已签约、2：签约中、3：签约失败
     */
    contractChecked: number;

    /**
     * 服务主体编号
     */
    collectedSubjectNo: string;

    id: number;

    /**
     * 关联用户信息表的主键id
     */
    wxmpUserId: number;

    /**
     * 签约回调URL
     */
    url: string;

    /**
     * 商户主体名称
     */
    merchantName: string;

    /**
     * 商户主体编号
     */
    merchantNo: string;

}

export interface UserBankCardDto {

    bankCode?: string;

    bankImgUrl?: string;

    certNo?: string;

    bankCardNo?: string;

    gmtUpdate?: string;

    mobile?: string;

    name?: string;

    bankName?: string;

    remark?: string;

    gmtCreate?: string;

    realNameAuth?: boolean;

}

