/**
 * @file API：/remit/merchantproduct
 */
import { ajax } from "@/utils/request";

/**
 * 查询商户配置的可用打款通道
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayChanleByMerchantNo(success?: (data: ServiceResult<{[key: string]: string}[]>["data"], response: ServiceResult<{[key: string]: string}[]>, xhr: any) => void, error?: (message: ServiceResult<{[key: string]: string}[]>["message"], response: ServiceResult<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<ServiceResult<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/remit/merchantproduct/queryPayChanleByMerchantNo`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询商户产品信息
 * @param merchantNo 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryByMerchantNo(merchantNo?: string, success?: (data: ServiceResult<TaxMerchantProductDTO>["data"], response: ServiceResult<TaxMerchantProductDTO>, xhr: any) => void, error?: (message: ServiceResult<TaxMerchantProductDTO>["message"], response: ServiceResult<TaxMerchantProductDTO>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxMerchantProductDTO>["data"]> {
    return ajax({
        url: `/remit/merchantproduct/queryByMerchantNo`,
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

export interface TaxMerchantProductDTO {

    /**
     * 生效时间
     */
    effectDate: string;

    gmtModified: string;

    /**
     * 是否自动续约 0--否 1--是
     */
    isAutomaticRenewal: string;

    /**
     * 产品id
     */
    productId: string;

    /**
     * 附件下载地址
     */
    downloadUrl: string;

    /**
     * 产品状态 0--失效  1--生效
     */
    productStatus: string;

    /**
     * 备注
     */
    remark: string;

    /**
     * 失效时间
     */
    failureDate: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 操作人
     */
    operator: string;

    /**
     * 发薪渠道
     */
    payWagesChannel: string;

    /**
     * 合同编号
     */
    contractId: string;

    id: number;

    /**
     * 商家代码
     */
    merchantNo: string;

}

