/**
 * @file API：/remit/invoiceInfo
 */
import { ajax } from "@/utils/request";

/**
 * 查询发票(商户后台商户号自动获取)
 * @param params 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function pageInvoiceInfo(params?: TaxMerchantInvoiceInfoDTO, success?: (data: WebResult<PageBean<TaxMerchantInvoiceInfoDTO>>["data"], response: WebResult<PageBean<TaxMerchantInvoiceInfoDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxMerchantInvoiceInfoDTO>>["message"], response: WebResult<PageBean<TaxMerchantInvoiceInfoDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxMerchantInvoiceInfoDTO>>["data"]> {
    return ajax({
        url: `/remit/invoiceInfo/pageInvoiceInfo`,
        data: {
            params: params
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 撤销开票申请
 * @param applyNo  申请单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function cancelApply(applyNo?: string, success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/remit/invoiceInfo/cancelApply`,
        type: "POST",
        data: {
            applyNo: applyNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 退票申请
 * @param refundInvoiceDto  退票参数对象
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function refundInvoiceApply(refundInvoiceDto?: RefundInvoiceDTO, success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/remit/invoiceInfo/refundInvoiceApply`,
        type: "POST",
        data: {
            refundInvoiceDto: refundInvoiceDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 撤销退票申请
 * @param applyNo  申请单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function cancelRefundApply(applyNo?: string, success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/remit/invoiceInfo/cancelRefundApply`,
        type: "POST",
        data: {
            applyNo: applyNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询预充值发票(商户后台商户号自动获取)
 * @param params 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function PrepaidInvoice(params?: TaxMerchantPrepaidInvoiceDTO, success?: (data: WebResult<TaxMerchantPrepaidInvoiceDTO>["data"], response: WebResult<TaxMerchantPrepaidInvoiceDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantPrepaidInvoiceDTO>["message"], response: WebResult<TaxMerchantPrepaidInvoiceDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantPrepaidInvoiceDTO>["data"]> {
    return ajax({
        url: `/remit/invoiceInfo/PrepaidInvoice`,
        data: {
            params: params
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查看发票详情&查看发票影像
 * @param applyNo  申请单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function invoiceDetail(applyNo?: string, success?: (data: WebResult<TaxMerchantInvoiceInfoDTO>["data"], response: WebResult<TaxMerchantInvoiceInfoDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantInvoiceInfoDTO>["message"], response: WebResult<TaxMerchantInvoiceInfoDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantInvoiceInfoDTO>["data"]> {
    return ajax({
        url: `/remit/invoiceInfo/invoiceDetail`,
        type: "POST",
        data: {
            applyNo: applyNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查看发票账单明细
 * @param applyNo  申请单号
 * @param curPage  当前页码
 * @param pageSize  每页多少条
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function invoiceBillDetail(applyNo?: string, curPage?: number, pageSize?: number, success?: (data: WebResult<PageBean<TaxMerchantBillingInfoDTO>>["data"], response: WebResult<PageBean<TaxMerchantBillingInfoDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxMerchantBillingInfoDTO>>["message"], response: WebResult<PageBean<TaxMerchantBillingInfoDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxMerchantBillingInfoDTO>>["data"]> {
    return ajax({
        url: `/remit/invoiceInfo/invoiceBillDetail`,
        type: "POST",
        data: {
            applyNo: applyNo,
            curPage: curPage,
            pageSize: pageSize
        },
        success: success,
        error: error,
        ...options
    }) as any;
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

export interface RefundInvoiceDTO {

    /**
     * 退票类型  1:发票信息错误，2:发票类型错误，3:退款
     */
    refundType: string;

    /**
     * 退票发票邮寄物流
     */
    refundLogisticsCompany: string;

    /**
     * 退票原因
     */
    refundReason: string;

    /**
     * 申请单号
     */
    applyNo: string;

    /**
     * 退票运单号
     */
    refundFastMailNo: string;

}

export interface TaxMerchantPrepaidInvoiceDTO {

    /**
     * 可索取发票金额结束
     */
    availableInvoiceAmountEnd: number;

    /**
     * 更新时间
     */
    gmtModified: string;

    /**
     * 结束时间
     */
    endDate: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    /**
     * 当前开票模式，1账单开票，2预充值开票
     */
    invoiceMode: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 已索取发票金额
     */
    claimedInvoiceAmount: number;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 累计可开票金额
     */
    cumulativeInvoiceAmount: number;

    /**
     * 服务主体编码
     */
    collectedSubjectNo: string;

    /**
     * 可索取发票金额开始
     */
    availableInvoiceAmountStart: number;

    /**
     * 主键
     */
    id: number;

    /**
     * 可索取发票金额
     */
    availableInvoiceAmount: number;

    /**
     * 开始时间
     */
    startDate: string;

    /**
     * 商户编号
     */
    merchantNo: string;

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

