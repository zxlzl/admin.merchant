/**
 * @file API：/remit/merchanttaxrule
 */
import { ajax } from "@/utils/request";

/**
 * 根据商户号查询配置的费率规则
 * @param merchantNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: ServiceResult<TaxMerchantTaxRuleDTO[]>["data"], response: ServiceResult<TaxMerchantTaxRuleDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantTaxRuleDTO[]>["message"], response: ServiceResult<TaxMerchantTaxRuleDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantTaxRuleDTO[]>["data"]> {
    return ajax({
        url: `/remit/merchanttaxrule/queryByMerchantNo`,
        data: {
            merchantNo: merchantNo
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

export interface TaxMerchantTaxRuleDTO {

    beforeTaxMaxAmt: number;

    /**
     * 计费方式名称
     */
    calculateModeName: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 最大金额
     */
    maxAmt: number;

    /**
     * 计费方式编码
     */
    calculateMode: number;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 最小金额
     */
    minAmt: number;

    /**
     * 操作人
     */
    operator: string;

    /**
     * 商户服务费率(外扣)
     */
    merchantFeeRate: number;

    /**
     * 用户服务费率(内扣)
     */
    userFeeRate: number;

    /**
     * 主键id
     */
    id: number;

    beforeTaxMinAmt: number;

    /**
     * 商户号
     */
    merchantNo: string;

}

