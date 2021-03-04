/**
 * @file API：/supervisor/discountPackageData
 */
import { ajax } from "@/utils/request";

/**
 * 优惠套餐列表添加/修改
 * @param taxDiscountPackageDataPO 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function saveOrUpdate(taxDiscountPackageDataPO?: TaxDiscountPackageDataPO, success?: (data: WebResult<void>["data"], response: WebResult<void>, xhr: any) => void, error?: (message: WebResult<void>["message"], response: WebResult<void>, xhr: any) => void, options?: any): Promise<WebResult<void>["data"]> {
    return ajax({
        url: `/supervisor/discountPackageData/saveOrUpdate`,
        type: "POST",
        contentType: "application/json",
        data: {
            taxDiscountPackageDataPO: taxDiscountPackageDataPO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 返点费率列表删除
 * @param id 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function deleteRebate(id?: number, success?: (data: WebResult<void>["data"], response: WebResult<void>, xhr: any) => void, error?: (message: WebResult<void>["message"], response: WebResult<void>, xhr: any) => void, options?: any): Promise<WebResult<void>["data"]> {
    return ajax({
        url: `/supervisor/discountPackageData/deleteRebate`,
        type: "GET",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 优惠套餐==类型==下拉列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getPackageTypeDropDownList(success?: (data: WebResult<DiscountPackageTypeEnumVO[]>["data"], response: WebResult<DiscountPackageTypeEnumVO[]>, xhr: any) => void, error?: (message: WebResult<DiscountPackageTypeEnumVO[]>["message"], response: WebResult<DiscountPackageTypeEnumVO[]>, xhr: any) => void, options?: any): Promise<WebResult<DiscountPackageTypeEnumVO[]>["data"]> {
    return ajax({
        url: `/supervisor/discountPackageData/getPackageTypeDropDownList`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 优惠套餐==状态==下拉列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getPackageStatusDropDownList(success?: (data: WebResult<DiscountPackageStatusVO[]>["data"], response: WebResult<DiscountPackageStatusVO[]>, xhr: any) => void, error?: (message: WebResult<DiscountPackageStatusVO[]>["message"], response: WebResult<DiscountPackageStatusVO[]>, xhr: any) => void, options?: any): Promise<WebResult<DiscountPackageStatusVO[]>["data"]> {
    return ajax({
        url: `/supervisor/discountPackageData/getPackageStatusDropDownList`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 优惠套餐列表查询
 * @param taxDiscountPackageDataQuery 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getList(taxDiscountPackageDataQuery?: TaxDiscountPackageDataQuery, success?: (data: WebResult<PageBean>["data"], response: WebResult<PageBean>, xhr: any) => void, error?: (message: WebResult<PageBean>["message"], response: WebResult<PageBean>, xhr: any) => void, options?: any): Promise<WebResult<PageBean>["data"]> {
    return ajax({
        url: `/supervisor/discountPackageData/getList`,
        type: "POST",
        contentType: "application/json",
        data: {
            taxDiscountPackageDataQuery: taxDiscountPackageDataQuery
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 优惠套餐列表删除
 * @param id 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function delete_1(id?: number, success?: (data: WebResult<void>["data"], response: WebResult<void>, xhr: any) => void, error?: (message: WebResult<void>["message"], response: WebResult<void>, xhr: any) => void, options?: any): Promise<WebResult<void>["data"]> {
    return ajax({
        url: `/supervisor/discountPackageData/delete`,
        type: "GET",
        data: {
            id: id
        },
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
        url: `/supervisor/discountPackageData/getOne`,
        type: "GET",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 优惠套餐下拉列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getDropDownList(success?: (data: WebResult<DiscountPackageChildVO[]>["data"], response: WebResult<DiscountPackageChildVO[]>, xhr: any) => void, error?: (message: WebResult<DiscountPackageChildVO[]>["message"], response: WebResult<DiscountPackageChildVO[]>, xhr: any) => void, options?: any): Promise<WebResult<DiscountPackageChildVO[]>["data"]> {
    return ajax({
        url: `/supervisor/discountPackageData/getDropDownList`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface TaxMerchantDiscountRulePO {

    /**
     * 最大金额
     */
    maxAmt: number;

    /**
     * 主键
     */
    id: number;

    /**
     * 最小金额
     */
    minAmt: number;

    /**
     * 操作人
     */
    operator: string;

    /**
     * 优惠费率
     */
    discountFeeRate: number;

}

export interface TaxDiscountPackageDataPO {

    /**
     * 生效时间
     */
    effectDate: string;

    /**
     * id
     */
    id: number;

    /**
     * 套餐名称
     */
    packageName: string;

    /**
     * 失效时间
     */
    failureDate: string;

    /**
     * 优惠套餐设置列表
     */
    list: TaxMerchantDiscountRulePO[];

    /**
     * 套餐状态 0--失效  1--生效 
     */
    packageStatus: string;

    /**
     * 套餐类型 0--阶梯返点套餐
     */
    packageType: string;

}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

export interface DiscountPackageTypeEnumVO {

    /**
     * 套餐类型名称
     */
    packageTypeName: string;

    /**
     * 套餐类型 0--阶梯返点套餐
     */
    packageType: string;

}

export interface DiscountPackageStatusVO {

    /**
     * 套餐状态名称 
     */
    packageStatusName: string;

    /**
     * 套餐状态 0--失效  1--生效 
     */
    packageStatus: string;

}

export interface TaxDiscountPackageDataQuery {

    /**
     * sql查询记录开始下标
     */
    startIndex: number;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * 排序语句
     */
    orderBy: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    /**
     * 开始时间
     */
    startTime: string;

    /**
     * 结束时间
     */
    endTime: string;

    /**
     * 套餐名称
     */
    packageName: string;

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

