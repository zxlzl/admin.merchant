/**
 * @file API：/companyMerchantRelation
 */
import { ajax } from "@/utils/request";

/**
 * 根据商户号查询商户信息
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getTaxMerchantDTOByMerchantNo(merchantNo?: string, success?: (data: Result<TaxMerchantDTO>["data"], response: Result<TaxMerchantDTO>, xhr: any) => void, error?: (message: Result<TaxMerchantDTO>["message"], response: Result<TaxMerchantDTO>, xhr: any) => void, options?: any): Promise<Result<TaxMerchantDTO>["data"]> {
    return ajax({
        url: `/companyMerchantRelation/getTaxMerchantDTOByMerchantNo`,
        type: "GET",
        data: {
            merchantNo: merchantNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 财税商户和企业绑定
 * @param companyMerchantRelation  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function bind(companyMerchantRelation?: CompanyMerchantRelation, success?: (data: Result<CompanyMerchantRelation>["data"], response: Result<CompanyMerchantRelation>, xhr: any) => void, error?: (message: Result<CompanyMerchantRelation>["message"], response: Result<CompanyMerchantRelation>, xhr: any) => void, options?: any): Promise<Result<CompanyMerchantRelation>["data"]> {
    return ajax({
        url: `/companyMerchantRelation/bind`,
        type: "POST",
        contentType: "application/json",
        data: {
            companyMerchantRelation: companyMerchantRelation
        },
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

export interface TaxMerchantDTO {

    belongMerchant?: string;

    licenseUrl?: string;

    gmtModified?: string;

    paccountNo?: string;

    vatRate?: number;

    mobile?: string;

    gmtCreate?: string;

    feeRate?: number;

    operator?: string;

    merchantAbbr?: string;

    merchantName?: string;

    taxRate?: number;

    registeredAddress?: string;

    taxpayerType?: string;

    registrationNumber?: string;

    collectedSubjectName?: string;

    collectedSubjectNo?: string;

    id?: number;

    businessAddress?: string;

    merchantType?: string;

    merchantNo?: string;

    status?: string;

}

export interface CompanyMerchantRelation {

    /**
     * 众包商家表主键
     */
    companyId: number;

    /**
     * 创建人
     */
    createUserId: number;

    /**
     * 众包商家编号
     */
    companyNo: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 更新人
     */
    updateUserId: number;

    /**
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 服务主体编号
     */
    collectedSubjectNo: string;

    /**
     * 更新时间
     */
    updateTime: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 0 未删除，1 删除
     */
    isDel: boolean;

    /**
     * 商户主体
     */
    merchantName: string;

    /**
     * 商户主体编号
     */
    merchantNo: string;

}

