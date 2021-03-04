/**
 * @file API：/supervisor/merchant
 */
import { ajax } from "@/utils/request";

/**
 * 查询所有授权方应用信息
 * @param merchantNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryWeChatWorkAgentInfos(merchantNo?: string, success?: (data: ServiceResult<TaxWeChatWorkPermanentAgentVo[]>["data"], response: ServiceResult<TaxWeChatWorkPermanentAgentVo[]>, xhr: any) => void, error?: (message: ServiceResult<TaxWeChatWorkPermanentAgentVo[]>["message"], response: ServiceResult<TaxWeChatWorkPermanentAgentVo[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxWeChatWorkPermanentAgentVo[]>["data"]> {
    return ajax({
        url: `/supervisor/merchant/queryWeChatWorkAgentInfos`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询所有授权方管理员信息
 * @param merchantNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryWeChatWorkCorpAdmins(merchantNo?: string, success?: (data: ServiceResult<TaxWeChatWorkAgentAdminVo[]>["data"], response: ServiceResult<TaxWeChatWorkAgentAdminVo[]>, xhr: any) => void, error?: (message: ServiceResult<TaxWeChatWorkAgentAdminVo[]>["message"], response: ServiceResult<TaxWeChatWorkAgentAdminVo[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxWeChatWorkAgentAdminVo[]>["data"]> {
    return ajax({
        url: `/supervisor/merchant/queryWeChatWorkCorpAdmins`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取操作来源枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function operatorSource(success?: (data: WebResult<OperatorSourceEnum[]>["data"], response: WebResult<OperatorSourceEnum[]>, xhr: any) => void, error?: (message: WebResult<OperatorSourceEnum[]>["message"], response: WebResult<OperatorSourceEnum[]>, xhr: any) => void, options?: any): Promise<WebResult<OperatorSourceEnum[]>["data"]> {
    return ajax({
        url: `/supervisor/merchant/operatorSource`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据商户号查询商户账户余额（payaccount）
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryBalanceByMerchantAndAccountType(vo?: QueryMerchantAccountBalanceVO, success?: (data: ServiceResult<PlatformAccountDTO>["data"], response: ServiceResult<PlatformAccountDTO>, xhr: any) => void, error?: (message: ServiceResult<PlatformAccountDTO>["message"], response: ServiceResult<PlatformAccountDTO>, xhr: any) => void, options?: any): Promise<ServiceResult<PlatformAccountDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchant/queryBalanceByMerchantAndAccountType`,
        data: {
            vo: vo
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
        url: `/supervisor/merchant/queryBalanceListByMerchant`,
        data: {
            merchantNo: merchantNo
        },
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
        url: `/supervisor/merchant/belongMerchant`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 商户列表
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPage(vo?: MerchantVO, success?: (data: WebResult<PageBean_1<TaxMerchantDTO>>["data"], response: WebResult<PageBean_1<TaxMerchantDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean_1<TaxMerchantDTO>>["message"], response: WebResult<PageBean_1<TaxMerchantDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean_1<TaxMerchantDTO>>["data"]> {
    return ajax({
        url: `/supervisor/merchant/queryPage`,
        contentType: "application/json",
        data: {
            vo: vo
        },
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
        url: `/supervisor/merchant/queryByMerchantNo`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询所有可用商户及服务主体列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllMerchant(success?: (data: ServiceResult<TaxMerchantAndCollectedSubject[]>["data"], response: ServiceResult<TaxMerchantAndCollectedSubject[]>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantAndCollectedSubject[]>["message"], response: ServiceResult<TaxMerchantAndCollectedSubject[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantAndCollectedSubject[]>["data"]> {
    return ajax({
        url: `/supervisor/merchant/queryAllMerchant`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 发送邮件
 * @param merchantNo 
 * @param useremail 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function sendEmail(merchantNo?: string, useremail?: string, success?: (data: ServiceResult<void>["data"], response: ServiceResult<void>, xhr: any) => void, error?: (message: ServiceResult<void>["message"], response: ServiceResult<void>, xhr: any) => void, options?: any): Promise<ServiceResult<void>["data"]> {
    return ajax({
        url: `/supervisor/merchant/sendEmail`,
        data: {
            merchantNo: merchantNo,
            useremail: useremail
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询授权方企业信息
 * @param merchantNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryWeChatWorkCorpInfos(merchantNo?: string, success?: (data: ServiceResult<TaxWeChatWorkPermanentCodeVo>["data"], response: ServiceResult<TaxWeChatWorkPermanentCodeVo>, xhr: any) => void, error?: (message: ServiceResult<TaxWeChatWorkPermanentCodeVo>["message"], response: ServiceResult<TaxWeChatWorkPermanentCodeVo>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxWeChatWorkPermanentCodeVo>["data"]> {
    return ajax({
        url: `/supervisor/merchant/queryWeChatWorkCorpInfos`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 启用商户
 * @param id  商户ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function able(id?: number, success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchant/able`,
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 新增商户（商户基本信息）
 * @param merchantDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function addMerchant(merchantDTO?: TaxMerchantDTO, success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchant/addMerchant`,
        contentType: "application/json",
        data: {
            merchantDTO: merchantDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 更新商户---新
 * @param merchantDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateMerchant(merchantDTO?: TaxMerchantDTO, success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchant/updateMerchant`,
        contentType: "application/json",
        data: {
            merchantDTO: merchantDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询所有可用商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllAvailable(success?: (data: ServiceResult<TaxMerchantDTO[]>["data"], response: ServiceResult<TaxMerchantDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantDTO[]>["message"], response: ServiceResult<TaxMerchantDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantDTO[]>["data"]> {
    return ajax({
        url: `/supervisor/merchant/queryAllAvailable`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 新增商户
 * @param merchantDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function add(merchantDTO?: MerchantDTO, success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchant/add`,
        contentType: "application/json",
        data: {
            merchantDTO: merchantDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 更新商户
 * @param merchantDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function update(merchantDTO?: MerchantDTO, success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchant/update`,
        contentType: "application/json",
        data: {
            merchantDTO: merchantDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 停用商户
 * @param id  商户ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function disable(id?: number, success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchant/disable`,
        data: {
            id: id
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

export interface TaxWeChatWorkAgentAdminVo {

    updateDate: string;

    /**
     * 成员名称；第三方不可获取，调用时返回userid以代替name；对于非第三方创建的成员，第三方通讯录应用也不可获取；第三方页面需要通过通讯录展示组件来展示名字
     */
    name: string;

    /**
     * 头像url。 第三方仅通讯录应用可获取；对于非第三方创建的成员，第三方通讯录应用也不可获取
     */
    avatar: string;

    /**
     * 授权方corpid
     */
    authCorpId: string;

    /**
     * 管理员ID
     */
    userId: string;

    createDate: string;

}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

export enum OperatorSourceEnum {

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

export interface MerchantQuery {

    operatorSource: string;

    licenseUrl: string;

    gmtModified: string;

    endDate: string;

    /**
     * 排序语句
     */
    orderBy: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    gmtCreate: string;

    feeRate: number;

    operator: string;

    merchantAbbr: string;

    merchantName: string;

    taxRate: number;

    /**
     * sql查询记录开始下标
     */
    startIndex: number;

    /**
     * 当前页码
     */
    curPage: number;

    belongSalesman: string;

    taxpayerType: string;

    registrationNumber: string;

    collectedSubjectNo: string;

    id: number;

    isApiAccess: string;

    startDate: string;

    merchantNo: string;

    status: string;

}

export interface MerchantVO {

    merchantQuery: MerchantQuery;

    page: PageBean;

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

export interface TaxMerchantAndCollectedSubject {

    collectedSubjectName: string;

    collectedSubjectNo: string;

    merchantName: string;

    merchantNo: string;

}

export interface TaxWeChatWorkPermanentCodeVo {

    /**
     * 企业类型，1. 企业; 2. 政府以及事业单位; 3. 其他组织, 4.团队号
     */
    subjectTypeName: string;

    /**
     * 授权方企业方形头像
     */
    corpSquareLogoUrl: string;

    /**
     * 最近更新时间
     */
    updateDate: string;

    /**
     * 授权方企业微信id
     */
    corpId: string;

    /**
     * 授权企业在微工作台（原企业号）的二维码，可用于关注微工作台
     */
    corpWxqrcode: string;

    /**
     * 授权方企业类型，认证号：verified, 注册号：unverified
     */
    corpType: string;

    /**
     * 授权方企业类型，认证号：verified, 注册号：unverified
     */
    corpTypeName: string;

    /**
     * 授权方企业名称，即企业简称
     */
    corpName: string;

    /**
     * 企业类型，1. 企业; 2. 政府以及事业单位; 3. 其他组织, 4.团队号
     */
    subjectType: number;

    /**
     * 授权方企业用户规模
     */
    corpUserMax: number;

    /**
     * 企业所属行业。当企业未设置该属性时，值为空
     */
    corpIndustry: string;

    /**
     * 企业所属子行业。当企业未设置该属性时，值为空
     */
    corpSubIndustry: string;

    /**
     * 认证到期时间
     */
    verifiedEndTime: number;

    /**
     * 企业所在地信息, 为空时表示未知
     */
    location: string;

    /**
     * 企业规模。当企业未设置该属性时，值为空
     */
    corpScale: string;

    /**
     * 初次获取时间
     */
    createDate: string;

    /**
     * 代理服务商企业微信名称
     */
    dealerCorpInfoCorpName: string;

}

export interface TaxContactDTO {

    gmtModified: string;

    city: string;

    cityCode: string;

    gmtCreate: string;

    operator: string;

    detailAddr: string;

    province: string;

    phone: string;

    district: string;

    name: string;

    id: number;

    email: string;

    merchantNo: string;

    status: string;

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
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 服务主体代码
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

export interface MerchantDTO {

    taxContactDTO: TaxContactDTO;

    taxMerchantDTO: TaxMerchantDTO;

    taxSubAccountDTO: TaxSubAccountDTO;

}

