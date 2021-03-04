/**
 * @file API：/supervisor/guestCooperation
 */
import { ajax } from "@/utils/request";

/**
 * 查询合作内容对象列表
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPage(vo?: TaxGuestCooperationQuery, success?: (data: WebResult<PageBean<TaxGuestCooperationDTO>>["data"], response: WebResult<PageBean<TaxGuestCooperationDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxGuestCooperationDTO>>["message"], response: WebResult<PageBean<TaxGuestCooperationDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxGuestCooperationDTO>>["data"]> {
    return ajax({
        url: `/supervisor/guestCooperation/queryPage`,
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
 * 添加合作内容对象
 * @param taxGuestCooperationDTO  合作内容对象
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function addRecord(taxGuestCooperationDTO?: TaxGuestCooperationDTO, success?: (data: WebResult<void>["data"], response: WebResult<void>, xhr: any) => void, error?: (message: WebResult<void>["message"], response: WebResult<void>, xhr: any) => void, options?: any): Promise<WebResult<void>["data"]> {
    return ajax({
        url: `/supervisor/guestCooperation/addRecord`,
        contentType: "application/json",
        data: {
            taxGuestCooperationDTO: taxGuestCooperationDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取合作内容枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllTaxPlanningType(success?: (data: WebResult<{[key: string]: string}[]>["data"], response: WebResult<{[key: string]: string}[]>, xhr: any) => void, error?: (message: WebResult<{[key: string]: string}[]>["message"], response: WebResult<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<WebResult<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/supervisor/guestCooperation/queryAllTaxPlanningType`,
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface TaxGuestCooperationQuery {

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 联系方式
     */
    contractInfo: string;

    /**
     * 合作内容
     */
    cooperationContent: string;

    /**
     * 备注
     */
    memo: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 来源
     */
    sourceCode: string;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * 姓名
     */
    name: string;

    /**
     * 公司名称
     */
    company: string;

    /**
     * 主键id
     */
    id: number;

    /**
     * 职位
     */
    position: string;

    /**
     * 常用邮箱
     */
    email: string;

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

export interface TaxGuestCooperationDTO {

    /**
     * 来源
     */
    sourceCode: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 联系方式
     */
    contractInfo: string;

    /**
     * 合作内容
     */
    cooperationContent: string;

    /**
     * 姓名
     */
    name: string;

    /**
     * 合作内容集合列表，前端传参时传编码，后端返回时为名称
     */
    cooperationContentList: string[];

    /**
     * 备注
     */
    memo: string;

    /**
     * 公司名称
     */
    company: string;

    /**
     * 主键id
     */
    id: number;

    /**
     * 职位
     */
    position: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 常用邮箱
     */
    email: string;

}

