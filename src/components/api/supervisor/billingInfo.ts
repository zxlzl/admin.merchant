/**
 * @file API：/supervisor/billingInfo
 */
import { ajax } from "@/utils/request";

/**
 * 查询账单(管理后台商户号选填)
 * @param params 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function pageBillingInfo(params?: TaxMerchantBillingInfoDTO, success?: (data: WebResult<PageBean<TaxMerchantBillingInfoDTO>>["data"], response: WebResult<PageBean<TaxMerchantBillingInfoDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxMerchantBillingInfoDTO>>["message"], response: WebResult<PageBean<TaxMerchantBillingInfoDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxMerchantBillingInfoDTO>>["data"]> {
    return ajax({
        url: `/supervisor/billingInfo/pageBillingInfo`,
        data: {
            params: params
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 申请开票(查询开票信息)
 * @param billNoJson  账单编号数组
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function invoicingApply(billNoJson?: string, success?: (data: WebResult<TaxMerchantInvoicingInfoDTO>["data"], response: WebResult<TaxMerchantInvoicingInfoDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantInvoicingInfoDTO>["message"], response: WebResult<TaxMerchantInvoicingInfoDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantInvoicingInfoDTO>["data"]> {
    return ajax({
        url: `/supervisor/billingInfo/invoicingApply`,
        type: "POST",
        data: {
            billNoJson: billNoJson
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 确定开票
 * @param invoiceDTO  开票信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function confirmInvoicing(invoiceDTO?: TaxMerchantInvoiceInfoDTO, success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/supervisor/billingInfo/confirmInvoicing`,
        type: "POST",
        data: {
            invoiceDTO: invoiceDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 按商户查询开票类目列表
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryInvoiceCategoryList2(merchantNo?: string, success?: (data: WebResult<string[]>["data"], response: WebResult<string[]>, xhr: any) => void, error?: (message: WebResult<string[]>["message"], response: WebResult<string[]>, xhr: any) => void, options?: any): Promise<WebResult<string[]>["data"]> {
    return ajax({
        url: `/supervisor/billingInfo/queryInvoiceCategoryList2`,
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
 * 查看账单详情
 * @param query  查询对象，参数billNo必填
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function billDetail(query?: TaxPayBatchBillingDetailDto, success?: (data: WebResult<PageBean<TaxPayBatchBillingDetailDto>>["data"], response: WebResult<PageBean<TaxPayBatchBillingDetailDto>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxPayBatchBillingDetailDto>>["message"], response: WebResult<PageBean<TaxPayBatchBillingDetailDto>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxPayBatchBillingDetailDto>>["data"]> {
    return ajax({
        url: `/supervisor/billingInfo/billDetail`,
        type: "POST",
        data: {
            query: query
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询开票类目枚举列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryInvoiceCategoryList(success?: (data: WebResult<string[]>["data"], response: WebResult<string[]>, xhr: any) => void, error?: (message: WebResult<string[]>["message"], response: WebResult<string[]>, xhr: any) => void, options?: any): Promise<WebResult<string[]>["data"]> {
    return ajax({
        url: `/supervisor/billingInfo/queryInvoiceCategoryList`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询开票状态枚举列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryInvoiceStatusList(success?: (data: WebResult<{[key: string]: string}[]>["data"], response: WebResult<{[key: string]: string}[]>, xhr: any) => void, error?: (message: WebResult<{[key: string]: string}[]>["message"], response: WebResult<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<WebResult<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/supervisor/billingInfo/queryInvoiceStatusList`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface TaxMerchantBillingInfoDTO {

    /**
     * gmt_modified，操作时间
     */
    gmtModified: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    /**
     * 账单内容
     */
    billContent: string;

    /**
     * 账单日期结束时间
     */
    billDateEnd: string;

    /**
     * merchant_name，商户名称
     */
    merchantName: string;

    idInList: number[];

    /**
     * bill_amount，账单金额(元)
     */
    billAmount: number;

    /**
     * payment_succ_amount，打款成功金额(元)
     */
    paymentSuccAmount: number;

    /**
     * collected_subject_name，代证主体
     */
    collectedSubjectName: string;

    /**
     * id
     */
    id: number;

    /**
     * tax_fee，实收税费(元)
     */
    taxFee: number;

    /**
     * bill_no，账单编号
     */
    billNo: string;

    /**
     * service_fee，实收服务费(元)
     */
    serviceFee: number;

    /**
     * status_desc，状态描述，如开票驳回、退票驳回等
     */
    statusDesc: string;

    /**
     * 账单类型，01:批次账单,02:日账单
     */
    billType: string;

    /**
     * bill_date，账单日期
     */
    billDate: string;

    /**
     * gmt_create，添加时间
     */
    gmtCreate: string;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * can_invoicing_amount，可开票金额(元)
     */
    canInvoicingAmount: number;

    billNoInList: string[];

    /**
     * 是否统计 0：否，1：是
     */
    iscount: number;

    /**
     * 账单类型名称
     */
    billTypeName: string;

    /**
     * invoice_status，发票状态，1:初始,2:开票中,3:已开票,4:退票中,5:已作废,6:已撤销,7:已驳回
     */
    invoiceStatus: string;

    /**
     * 账单日期开始时间
     */
    billDateStart: string;

    /**
     * bill_period，账单周期，批次账单为单个批次id号；日账单为账单日期
     */
    billPeriod: string;

    /**
     * merchant_no，商户号
     */
    merchantNo: string;

}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

export interface Object {

}

export interface PageBean<T> {

    curPage: number;

    data: Object;

    endRecordCount: number;

    recordCount: number;

    pageSize: number;

    startRecordCount: number;

    list: T[];

    maxPage: number;

}

export interface TaxMerchantInvoicingInfoDTO {

    /**
     * 成为一般纳税人时间
     */
    becomeTaxpayerDate: string;

    /**
     * 操作时间
     */
    gmtModified: string;

    /**
     * 服务费开票方式,01:手动申请开票，02:自动按月开票
     */
    serviceChargeInvoicing: string;

    /**
     * 开票类目集合
     */
    invoiceCategoryList: string[];

    /**
     * 银行账号
     */
    bankAccountNo: string;

    /**
     * 开户银行
     */
    bankName: string;

    /**
     * 开票类目
     */
    invoiceCategory: string;

    /**
     * 添加人
     */
    operatorAdd: number;

    /**
     * 操作人
     */
    operatorModified: number;

    /**
     * 收件人所在地区省
     */
    receiverAreaProvince: string;

    /**
     * 收件人联系电话
     */
    receiverPhone: string;

    /**
     * 纳税人主体类型，01:一般增值税纳税人，02:小规模增值税纳税人
     */
    taxpayerType: string;

    /**
     * 发票打印电话
     */
    invoicePrintingPhone: string;

    /**
     * 纳税人识别号
     */
    taxpayerRegistNo: string;

    /**
     * 发票张数
     */
    invoiceNumber: number;

    /**
     * 开票类型，01:增值税专用发票，02:增值税普通发票
     */
    invoiceType: string;

    /**
     * id
     */
    id: number;

    /**
     * 营业执照注册地址
     */
    busiLicenseRegistAddr: string;

    /**
     * 发票抬头
     */
    invoiceTitle: string;

    /**
     * 收件人所在地区市
     */
    receiverAreaCity: string;

    /**
     * 收件人姓名
     */
    receiverName: string;

    /**
     * 税务登记证url,多张图片用英文分号;分隔
     */
    taxRegistCert: string;

    /**
     * 收件人详细地址
     */
    receiverDetailAddress: string;

    /**
     * 添加时间
     */
    gmtCreate: string;

    /**
     * 费用笔数 
     */
    feeNumbers: number;

    /**
     * 发票介质，01:纸质发票，02:电子发票
     */
    invoiceMedium: string;

    /**
     * 开票总金额
     */
    totalAmount: number;

    /**
     * 其他资质证明url,多张图片用英文分号;分隔
     */
    otherQualificateCert: string;

    /**
     * 收件人所在地区区
     */
    receiverAreaDistrict: string;

    /**
     * 商户号
     */
    merchantNo: string;

}

export interface TaxMerchantInvoiceInfoDTO {

    /**
     * 成为一般纳税人时间
     */
    becomeTaxpayerDate: string;

    /**
     * 银行账号
     */
    bankAccountNo: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    /**
     * 发票总金额(元)
     */
    invoiceAmount: number;

    /**
     * 操作人
     */
    operatorModified: number;

    /**
     * 收件人所在地区省
     */
    receiverAreaProvince: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 收件人联系电话
     */
    receiverPhone: string;

    /**
     * 纳税人主体类型，01:一般增值税纳税人，02:小规模增值税纳税人
     */
    taxpayerType: string;

    /**
     * 发票打印电话
     */
    invoicePrintingPhone: string;

    /**
     * 纳税人识别号
     */
    taxpayerRegistNo: string;

    /**
     * 开票类型，01:增值税专用发票，02:增值税普通发票
     */
    invoiceType: string;

    /**
     * id
     */
    id: number;

    /**
     * 申请时间
     */
    applyTime: string;

    /**
     * 账单编号列表，合并开票账单编号用,分隔
     */
    billNo: string;

    /**
     * 营业执照注册地址
     */
    busiLicenseRegistAddr: string;

    /**
     * 发票抬头
     */
    invoiceTitle: string;

    /**
     * 收件人所在地区市
     */
    receiverAreaCity: string;

    /**
     * 实收服务费(元)
     */
    serviceFee: number;

    /**
     * 开票内容
     */
    invoiceContent: string;

    /**
     * 其他资质证明url
     */
    otherQualificateCert: string;

    /**
     * 退票核销备注
     */
    refundVerifyRemark: string;

    /**
     * 申请时间结束时间
     */
    applyTimeEnd: string;

    /**
     * 申请备注
     */
    applyRemark: string;

    /**
     * 退票快递单号
     */
    refundFastMailNo: string;

    /**
     * 收件人所在地区区
     */
    receiverAreaDistrict: string;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 操作时间
     */
    gmtModified: string;

    /**
     * 退票物流公司
     */
    refundLogisticsCompany: string;

    /**
     * 服务费开票方式,01:手动申请开票，02:自动按月开票
     */
    serviceChargeInvoicing: string;

    /**
     * 驳回时间
     */
    rejectedTime: string;

    /**
     * 核销备注
     */
    verifyRemark: string;

    /**
     * 退票核销结论
     */
    refundVerifyResult: string;

    /**
     * 开户银行
     */
    bankName: string;

    /**
     * 发票模式名称
     */
    invoiceModeName: string;

    /**
     * 快递单号
     */
    fastMailNo: string;

    /**
     * 添加人
     */
    operatorAdd: number;

    /**
     * 申请人id，判断是商户申请的还是管理员申请的
     */
    applyUserId: number;

    /**
     * 退票类型，1:发票信息错误,2:发票类型错误,3:退款
     */
    refundType: string;

    /**
     * 打款成功金额(元)
     */
    paymentSuccAmount: number;

    /**
     * 代证主体
     */
    collectedSubjectName: string;

    /**
     * 物流公司
     */
    logisticsCompany: string;

    /**
     * 实收税费(元)
     */
    taxFee: number;

    /**
     * 状态描述，如开票驳回、退票驳回等
     */
    statusDesc: string;

    /**
     * 开票时间
     */
    invoicingTime: string;

    /**
     * 收件人姓名
     */
    receiverName: string;

    /**
     * 退票原因
     */
    refundReason: string;

    /**
     * 退票时间
     */
    refundTime: string;

    /**
     * 核销结论
     */
    verifyResult: string;

    /**
     * 税务登记证url
     */
    taxRegistCert: string;

    /**
     * 发票模式，1:账单开票，2:预充值开票
     */
    invoiceMode: string;

    /**
     * 收件人详细地址
     */
    receiverDetailAddress: string;

    /**
     * 添加时间
     */
    gmtCreate: string;

    /**
     * 包含几笔费用(笔)
     */
    feeNumbers: number;

    /**
     * 发票介质，01:纸质发票，02:电子发票
     */
    invoiceMedium: string;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * 撤销时间
     */
    cancelTime: string;

    /**
     * 发票数量(张)
     */
    invoiceQuantity: number;

    /**
     * 发票影像url
     */
    invoiceUrl: string;

    /**
     * 申请单号
     */
    applyNo: string;

    /**
     * 申请时间开始时间
     */
    applyTimeStart: string;

    /**
     * 发票状态，1:初始,2:开票中,3:已开票,4:退票中,5:已作废,6:已撤销,7:已驳回
     */
    invoiceStatus: string;

}

export interface TaxPayBatchBillingDetailDto {

    /**
     * 实收服务费(元)
     */
    serviceFee: number;

    /**
     * 总笔数
     */
    totalNumber: number;

    /**
     * 商户批次号
     */
    payBatchNo: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 发放通道
     */
    paymentChannel: string;

    /**
     * 发放通道名称
     */
    paymentChannelName: string;

    /**
     * 总金额
     */
    totalAmount: number;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * 成功笔数
     */
    succNumber: number;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 批次状态名称
     */
    payStatusName: string;

    /**
     * 完成时间
     */
    endTime: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 成功金额
     */
    succAmount: number;

    /**
     * 实收税费(元)
     */
    taxFee: number;

    /**
     * 账单编号，查询时必填
     */
    billNo: string;

    /**
     * 批次状态
     */
    payStatus: string;

    /**
     * 平台批次号
     */
    platBatchNo: string;

    /**
     * 商户号
     */
    merchantNo: string;

}

