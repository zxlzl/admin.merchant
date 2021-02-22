/**
 * @file API：/supervisor/guest
 */
import { ajax } from "@/utils/request";

/**
 * 获取节税类型
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllTaxPlanningType(success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/supervisor/guest/queryAllTaxPlanningType`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 访客列表
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPage(vo?: TaxGuestUserVO, success?: (data: WebResult_1<PageBean_1<TaxGuestUserDTO>>["data"], response: WebResult_1<PageBean_1<TaxGuestUserDTO>>, xhr: any) => void, error?: (message: WebResult_1<PageBean_1<TaxGuestUserDTO>>["message"], response: WebResult_1<PageBean_1<TaxGuestUserDTO>>, xhr: any) => void, options?: any): Promise<WebResult_1<PageBean_1<TaxGuestUserDTO>>["data"]> {
    return ajax({
        url: `/supervisor/guest/queryPage`,
        contentType: "application/json",
        data: {
            vo: vo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 新增访客
 * @param taxGuestUserDTO  访客记录
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function add(taxGuestUserDTO?: TaxGuestUserDTO, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/supervisor/guest/add`,
        contentType: "application/json",
        data: {
            taxGuestUserDTO: taxGuestUserDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface WebResult {

    code: string;

    redirectUrl: string;

    data: any;

    success: boolean;

    message: string;

}

export interface TaxGuestUserQuery {

    gmtModified: string;

    mobile: string;

    /**
     * 排序语句
     */
    orderBy: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    gmtCreate: string;

    gname: string;

    sourceCode: string;

    taxPlanningType: string;

    /**
     * sql查询记录开始下标
     */
    startIndex: number;

    /**
     * 当前页码
     */
    curPage: number;

    startTime: string;

    endTime: string;

    id: number;

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

export interface TaxGuestUserVO {

    taxGuestUserQuery: TaxGuestUserQuery;

    page: PageBean;

}

export interface WebResult_1<T> {

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

export interface TaxGuestUserDTO {

    sourceCode: string;

    taxPlanningType: string;

    gmtModified: string;

    mobile: string;

    id: number;

    taxPlans: string[];

    gmtCreate: string;

    gname: string;

}

