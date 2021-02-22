/**
 * @file API：/supervisor/merchantextend
 */
import { ajax } from "@/utils/request";

/**
 * 查询商户扩展信息
 * @param merchantNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: ServiceResult<TaxMerchantExtendDTO>["data"], response: ServiceResult<TaxMerchantExtendDTO>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantExtendDTO>["message"], response: ServiceResult<TaxMerchantExtendDTO>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantExtendDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchantextend/queryByMerchantNo`,
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 配置商户扩展信息
 * @param taxMerchantExtendDTO 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function add(taxMerchantExtendDTO?: TaxMerchantExtendDTO, success?: (data: ServiceResult<TaxMerchantExtendDTO>["data"], response: ServiceResult<TaxMerchantExtendDTO>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantExtendDTO>["message"], response: ServiceResult<TaxMerchantExtendDTO>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantExtendDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchantextend/add`,
        data: {
            taxMerchantExtendDTO: taxMerchantExtendDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 更新商户扩展信息
 * @param taxMerchantExtendDTO 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function update(taxMerchantExtendDTO?: TaxMerchantExtendDTO, success?: (data: ServiceResult<TaxMerchantExtendDTO>["data"], response: ServiceResult<TaxMerchantExtendDTO>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantExtendDTO>["message"], response: ServiceResult<TaxMerchantExtendDTO>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantExtendDTO>["data"]> {
    return ajax({
        url: `/supervisor/merchantextend/update`,
        data: {
            taxMerchantExtendDTO: taxMerchantExtendDTO
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

export interface TaxMerchantExtendDTO {

    gmtModified: string;

    /**
     * 打款审核方式：1 自动审核、2 手动审核
     */
    remitMode: number;

    /**
     * 报名审核方式：1 自动审核、2 手动审核
     */
    signUpMode: number;

    /**
     * 服务费费率
     */
    feeRate: number;

    /**
     * 操作人
     */
    operator: string;

    signSourceName: string;

    /**
     * 报名审核结论：1 自动通过、2 自动拒绝
     */
    signUpConclusion: number;

    /**
     * 合同模板
     */
    contractTemplateId: number;

    /**
     * 报名验收方式：1 自动验收、2 手动验证
     */
    signUpAuditMode: number;

    /**
     * 结算模式 1.手动结算 2:智能结算
     */
    settleMode: number;

    /**
     * 代征主体名称
     */
    collectedSubjectName: string;

    /**
     * 代征主体代码
     */
    collectedSubjectNo: string;

    /**
     * 试算误差调整模式 1.手动调整 2.智能调整
     */
    adjustMode: number;

    id: number;

    /**
     * 商户单人单日累计限额
     */
    maxSumAmtDaily: number;

    /**
     * API打款签约校验规则,Y强校验,O弱校验,N不校验
     */
    apiNeedSign: string;

    /**
     * 账单类型,默认1批次账单，2日账单
     */
    billType: string;

    /**
     * 缴税模式 1:手动缴税 2:自动按月缴税
     */
    payTaxMode: number;

    /**
     * 开票模式,1账单开票，2预充值开票, 3日账单开票
     */
    invoiceMode: string;

    /**
     * Y:需要签约 N：无需签约
     */
    needSign: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 扣费模式 1:实时扣费 2:预付费
     */
    deductFeesMode: number;

    /**
     * 0：微信签约 1：开发平台签约2：线下签约
     */
    signSource: string;

    needSignName: string;

    /**
     * 商户邀请码(区分大小写)
     */
    inviteCode: string;

    /**
     * API签约方式,1存证签约
     */
    apiSignSource: string;

    /**
     * 合作阶梯套餐
     */
    rebatePackageId: number;

    /**
     * API签约模板
     */
    apiContractTemplateId: number;

    /**
     * 商家代码
     */
    merchantNo: string;

}

