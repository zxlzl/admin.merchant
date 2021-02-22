/**
 * @file API：/remit/discountPackageData
 */
import { ajax } from "@/utils/request";

/**
 * 优惠套餐下拉列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getDropDownList(success?: (data: WebResult<DiscountPackageChildVO[]>["data"], response: WebResult<DiscountPackageChildVO[]>, xhr: any) => void, error?: (message: WebResult<DiscountPackageChildVO[]>["message"], response: WebResult<DiscountPackageChildVO[]>, xhr: any) => void, options?: any): Promise<WebResult<DiscountPackageChildVO[]>["data"]> {
    return ajax({
        url: `/remit/discountPackageData/getDropDownList`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 优惠套餐详情
 * @param id 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getOne(id?: number, success?: (data: WebResult<TaxDiscountPackageDataVO>["data"], response: WebResult<TaxDiscountPackageDataVO>, xhr: any) => void, error?: (message: WebResult<TaxDiscountPackageDataVO>["message"], response: WebResult<TaxDiscountPackageDataVO>, xhr: any) => void, options?: any): Promise<WebResult<TaxDiscountPackageDataVO>["data"]> {
    return ajax({
        url: `/remit/discountPackageData/getOne`,
        type: "GET",
        data: {
            id: id
        },
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

export interface DiscountPackageChildVO {

    /**
     * id
     */
    id: number;

    /**
     * 套餐名称
     */
    packageName: string;

}

export interface TaxMerchantDiscountRuleVO {

    /**
     * 层级
     */
    level: number;

    /**
     * 返点费率
     */
    rebateRate: number;

    /**
     * 最大金额
     */
    maxAmt: number;

    /**
     * id
     */
    id: number;

    /**
     * 最小金额
     */
    minAmt: number;

    /**
     * 优惠费率
     */
    discountFeeRate: number;

}

export interface TaxDiscountPackageDataVO {

    /**
     * 结算时间中文文案
     */
    failureDateRemark: string;

    /**
     * 起始使用时间(生效时间)
     */
    effectDate: string;

    /**
     * 套餐类型名称
     */
    packageTypeName: string;

    /**
     * 套餐状态名称 
     */
    packageStatusName: string;

    /**
     * id
     */
    id: number;

    /**
     * 套餐名称
     */
    packageName: string;

    /**
     * 结算时间
     */
    failureDate: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 优惠套餐明细列表
     */
    list: TaxMerchantDiscountRuleVO[];

    /**
     * 套餐状态 0--失效  1--生效 
     */
    packageStatus: string;

    /**
     * 套餐类型 0--阶梯返点套餐
     */
    packageType: string;

    /**
     * 套餐编号
     */
    packageNo: string;

}

