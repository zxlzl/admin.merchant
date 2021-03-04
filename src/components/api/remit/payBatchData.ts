/**
 * @file API：/remit/payBatchData
 */
import { ajax } from "@/utils/request";

/**
 * 打款批次列表
 * @param query 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayBatchList(query?: PayBatchVO, success?: (data: WebResult<PageBean_1<TaxPayBatchDTO>>["data"], response: WebResult<PageBean_1<TaxPayBatchDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean_1<TaxPayBatchDTO>>["message"], response: WebResult<PageBean_1<TaxPayBatchDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean_1<TaxPayBatchDTO>>["data"]> {
    return ajax({
        url: `/remit/payBatchData/queryPayBatchList`,
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
 * 查询商户批次统计数据
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function countPayBatchData(success?: (data: WebResult<PayBatchCountDto>["data"], response: WebResult<PayBatchCountDto>, xhr: any) => void, error?: (message: WebResult<PayBatchCountDto>["message"], response: WebResult<PayBatchCountDto>, xhr: any) => void, options?: any): Promise<WebResult<PayBatchCountDto>["data"]> {
    return ajax({
        url: `/remit/payBatchData/countPayBatchData`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询商户已开通通道列表余额
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryMerchantChannelListBalance(success?: (data: ServiceResult<MerchantBalanceDto>["data"], response: ServiceResult<MerchantBalanceDto>, xhr: any) => void, error?: (message: ServiceResult<MerchantBalanceDto>["message"], response: ServiceResult<MerchantBalanceDto>, xhr: any) => void, options?: any): Promise<ServiceResult<MerchantBalanceDto>["data"]> {
    return ajax({
        url: `/remit/payBatchData/queryMerchantChannelListBalance`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询我的信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryMyInfo(success?: (data: WebResult<TaxMerchantDTO>["data"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantDTO>["message"], response: WebResult<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/remit/payBatchData/queryMyInfo`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 打款批次详情查询
 * @param payBatchNo  打款批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayBatchDetail(payBatchNo?: string, success?: (data: WebResult<TaxPayBatchDTO>["data"], response: WebResult<TaxPayBatchDTO>, xhr: any) => void, error?: (message: WebResult<TaxPayBatchDTO>["message"], response: WebResult<TaxPayBatchDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxPayBatchDTO>["data"]> {
    return ajax({
        url: `/remit/payBatchData/queryPayBatchDetail`,
        data: {
            payBatchNo: payBatchNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface TaxPayBatchDTO {

    inPayStatus: string;

    /**
     * 打款审核方式：1 自动审核、2 手动审核
     */
    remitMode: number;

    /**
     * 创建时间结束
     */
    endDate: string;

    /**
     * 打款时间
     */
    payTime: string;

    taxRepresentativeCode: string;

    memo: string;

    /**
     * 审核结论：1审核通过，2审核拒绝
     */
    auditResult: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 打款完成时间结束
     */
    payFinishTimeEnd: string;

    taxStatus: string;

    /**
     * 筛选状态，1进行中，2已完成，3已撤销
     */
    selectStatus: number;

    /**
     * 发放通道编码
     */
    payChannelCode: string;

    /**
     * 处理中金额
     */
    processAmount: number;

    /**
     * 增值税状态：00:未扣除 01：扣款中 02：已扣款 03：扣款失败
     */
    vatStatus: string;

    id: number;

    /**
     * 成功总笔数(商户打款成功笔数)
     */
    sucNumbers: number;

    /**
     * 服务费(用户实付服务费)
     */
    serviceFee: number;

    /**
     * 平台批次号
     */
    payBatchNo: string;

    /**
     * 出款账户
     */
    payAccountNo: string;

    /**
     * 打款状态中文描述
     */
    payStatusDesc: string;

    /**
     * 批次总笔数(商户打款总笔数)
     */
    count: number;

    /**
     * 发放通道名称
     */
    payChannelCodeName: string;

    /**
     * 支付宝/微信结算单号
     */
    settleOrderNo: string;

    /**
     * 批次总金额(商户打款总金额)
     */
    totalAmount: number;

    /**
     * 应扣总服务费(包含失败)
     */
    totalServiceFee: number;

    /**
     * 失败笔数
     */
    failNumbers: number;

    /**
     * 打款完成时间开始
     */
    payFinishTimeStart: string;

    /**
     * 成功总金额(商户打款成功金额)
     */
    sucAmount: number;

    /**
     * 增值税时间
     */
    vatTime: string;

    deductStatus: string;

    /**
     * 创建时间开始
     */
    startDate: string;

    /**
     * 可打款金额
     */
    canPayAmount: number;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 内部单号
     */
    innerOrderNo: string;

    /**
     * 锁定时间开始
     */
    lockTimeStart: string;

    /**
     * 支付宝/微信结算状态
     */
    settleStatus: string;

    /**
     * 支付宝/微信结算金额
     */
    settleAmount: number;

    /**
     * 费用公式版本,默认1.0税费/服务费，2.0商户/用户服务费
     */
    feeCostFormulaVersion: string;

    /**
     * 服务商商户号(连连分配给代征平台的商户号)
     */
    oidPartner: string;

    /**
     * 打款依据文件
     */
    paymentBasisDocument: string;

    /**
     * 增值税单号
     */
    vatOrderNo: string;

    /**
     * 商户批次号
     */
    merchantPayBatchNo: string;

    /**
     * 锁定时间
     */
    lockTime: string;

    /**
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 服务主体代码
     */
    collectedSubjectNo: string;

    /**
     * 打款依据文件原名称
     */
    paymentBasisDocumentName: string;

    /**
     * 失败金额
     */
    failAmount: number;

    payStatuss: string[];

    /**
     * 税费(商户实付服务费)
     */
    taxFee: number;

    /**
     * 挂起笔数
     */
    hangupNumbers: number;

    /**
     * 打款金额
     */
    amount: number;

    /**
     * 支付宝/微信结算时间
     */
    settleTime: string;

    /**
     * 状态描述
     */
    statusDesc: string;

    /**
     * 打款完成时间
     */
    payFinishTime: string;

    /**
     * 扣服务费时间
     */
    deductTime: string;

    payTaxMode: string;

    /**
     * (订单来源)提交方式 0:商户平台  1:api
     */
    submitMode: string;

    /**
     * 挂起金额
     */
    hangupAmount: number;

    /**
     * 处理中笔数
     */
    processNumbers: number;

    /**
     * 开票模式,1账单开票，2预充值开票
     */
    invoiceMode: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 锁定时间结束
     */
    lockTimeEnd: string;

    /**
     * 应扣总税费(包含失败)
     */
    totalTaxFee: number;

    /**
     * 是否允许审核
     */
    allowAudit: boolean;

    /**
     * 是否已生成账单 0：否，1：是或（预充值模式不需要生成）
     */
    iscount: number;

    /**
     * 可打款笔数
     */
    canPayNumbers: number;

    /**
     * 打款状态(批次状态)
     */
    payStatus: string;

    /**
     * 拒绝原因
     */
    refuseReason: string;

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

export interface PayBatchVO {

    query: TaxPayBatchDTO;

    page: PageBean;

}

export interface WebResult<T> {

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

export interface PayBatchCountDto {

    number: number;

    amount: number;

    merchant: TaxMerchantDTO;

    batchNumber: number;

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

export interface MerchantBalanceDto {

    totalAmt: number;

    totalAvailAmt: number;

    list: PlatformAccountDTO[];

    totalFreezeAmt: number;

}

