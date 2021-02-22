/**
 * @file API：/remit/merchantInvoicingInfo
 */
import { ajax } from "@/utils/request";

/**
 * 查询开票信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryInvoicingInfo(success?: (data: WebResult<TaxMerchantInvoicingInfoDTO>["data"], response: WebResult<TaxMerchantInvoicingInfoDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantInvoicingInfoDTO>["message"], response: WebResult<TaxMerchantInvoicingInfoDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantInvoicingInfoDTO>["data"]> {
    return ajax({
        url: `/remit/merchantInvoicingInfo/queryInvoicingInfo`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询开票信息(开票页面使用，没有类目报错)
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPrepaidInvoicingInfo(success?: (data: WebResult<TaxMerchantInvoicingInfoDTO>["data"], response: WebResult<TaxMerchantInvoicingInfoDTO>, xhr: any) => void, error?: (message: WebResult<TaxMerchantInvoicingInfoDTO>["message"], response: WebResult<TaxMerchantInvoicingInfoDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxMerchantInvoicingInfoDTO>["data"]> {
    return ajax({
        url: `/remit/merchantInvoicingInfo/queryPrepaidInvoicingInfo`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

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

