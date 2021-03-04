/**
 * @file API：/remit/merchant
 */
import { ajax } from "@/utils/request";

/**
 * 根据商户号查询商户账户余额（payaccount）
 * @param queryMerchantAccountBalanceVO  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryBalanceByMerchantAndAccountType(queryMerchantAccountBalanceVO?: QueryMerchantAccountBalanceVO, success?: (data: ServiceResult<PlatformAccountDTO>["data"], response: ServiceResult<PlatformAccountDTO>, xhr: any) => void, error?: (message: ServiceResult<PlatformAccountDTO>["message"], response: ServiceResult<PlatformAccountDTO>, xhr: any) => void, options?: any): Promise<ServiceResult<PlatformAccountDTO>["data"]> {
    return ajax({
        url: `/remit/merchant/queryBalanceByMerchantAndAccountType`,
        data: {
            queryMerchantAccountBalanceVO: queryMerchantAccountBalanceVO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据商户号查询商户可用账户列表余额（payaccount）
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryBalanceListByMerchant(merchantNo?: string, success?: (data: ServiceResult<PlatformAccountDTO[]>["data"], response: ServiceResult<PlatformAccountDTO[]>, xhr: any) => void, error?: (message: ServiceResult<PlatformAccountDTO[]>["message"], response: ServiceResult<PlatformAccountDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<PlatformAccountDTO[]>["data"]> {
    return ajax({
        url: `/remit/merchant/queryBalanceListByMerchant`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据商户号查询商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getCurrentMerchant(success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/remit/merchant/getCurrentMerchant`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据用户id查询商户列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByUid(success?: (data: WebResult<TaxMerchantDTO[]>["data"], response: WebResult<TaxMerchantDTO[]>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO[]>["message"], response: WebResult<TaxMerchantDTO[]>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO[]>["data"]> {
    return ajax({
        url: `/remit/merchant/queryByUid`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取服务商枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function belongMerchant(success?: (data: WebResult<{[key: string]: string}[]>["data"], response: WebResult<{[key: string]: string}[]>, xhr: any) => void, error?: (message: WebResult<{[key: string]: string}[]>["message"], response: WebResult<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<WebResult<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/remit/merchant/belongMerchant`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据商户号查询商户
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/remit/merchant/queryByMerchantNo`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询授权应用信息
 * @param merchantNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryWeChatWorkCorpAgents(merchantNo?: string, success?: (data: ServiceResult<TaxWeChatWorkPermanentAgentVo[]>["data"], response: ServiceResult<TaxWeChatWorkPermanentAgentVo[]>, xhr: any) => void, error?: (message: ServiceResult<TaxWeChatWorkPermanentAgentVo[]>["message"], response: ServiceResult<TaxWeChatWorkPermanentAgentVo[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxWeChatWorkPermanentAgentVo[]>["data"]> {
    return ajax({
        url: `/remit/merchant/queryWeChatWorkCorpAgents`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
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

export interface QueryMerchantAccountBalanceVO {

    accountType: string;

    page: PageBean;

    merchantNo: string;

}

export interface ServiceResult<T> {

    code: string;

    data: T;

    success: boolean;

    message: string;

}

export interface PlatformAccountDTO {

    acctAmt: number;

    bizFreezeAmt: number;

    openedBank: string;

    bankBranch: string;

    purpose: string;

    accountType: string;

    acctName: string;

    title: string;

    freezeAmt: number;

    sysFreezeAmt: number;

    availBalance: number;

    subAccountNo: string;

    acctNo: string;

    subAccountName: string;

    collectedSubjectName: string;

    collectedSubjectNo: string;

}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

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

export interface TaxMerchantDTO {

    operatorSource: string;

    licenseUrl: string;

    gmtModified: string;

    vatRate: number;

    businessCategory2: string;

    feeRate: number;

    businessCategory1: string;

    operator: string;

    merchantName: string;

    taxUserDtoList: TaxUserDto[];

    registeredAddress: string;

    taxpayerType: string;

    collectedSubjectName: string;

    collectedSubjectNo: string;

    id: number;

    businessAddress: string;

    taxUserDto: TaxUserDto;

    merchantType: string;

    belongMerchant: string;

    corpId: string;

    paccountNo: string;

    mobile: string;

    corpName: string;

    invoiceMode: string;

    gmtCreate: string;

    qualificationUrl: string;

    merchantAbbr: string;

    taxRate: number;

    belongSalesman: string;

    registrationNumber: string;

    isApiAccess: string;

    merchantNo: string;

    status: string;

}

export interface TaxWeChatWorkPermanentAgentVo {

    /**
     * 应用可见范围（标签）
     */
    allowTag: string;

    /**
     * 额外通讯录（部门）
     */
    extraParty: string;

    /**
     * 授权方应用id
     */
    agentId: string;

    /**
     * 额外通讯录（标签）
     */
    extraTag: string;

    updateDate: string;

    /**
     * 授权方应用圆形头像
     */
    roundLogoUrl: string;

    /**
     * 权限等级。1:通讯录基本信息只读 2:通讯录全部信息只读 3:通讯录全部信息读写 4:单个基本信息只读 5:通讯录全部信息只写
     */
    level: number;

    /**
     * 企业应用详情
     */
    description: string;

    /**
     * 权限等级。1:通讯录基本信息只读 2:通讯录全部信息只读 3:通讯录全部信息读写 4:单个基本信息只读 5:通讯录全部信息只写
     */
    levelName: string;

    /**
     * tax_wechat_work_permanent_code 表主键
     */
    taxWechatWorkPermanentCodeId: number;

    /**
     * 授权方应用方形头像
     */
    squareLogoUrl: string;

    /**
     * 应用可见范围（部门）
     */
    allowParty: string;

    /**
     * 旧的多应用套件中的对应应用id，新开发者请忽略
     */
    appId: string;

    /**
     * 授权方应用名字
     */
    name: string;

    /**
     * 应用可见范围（成员）
     */
    allowUser: string;

    id: number;

    /**
     * 额外通讯录（成员）
     */
    extraUser: string;

    isDel: boolean;

    createDate: string;

}

