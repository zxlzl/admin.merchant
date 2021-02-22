/**
 * @file API：/import/user
 */
import { ajax } from "@/utils/request";

/**
 * 查询用户导入列表信息
 * @param taxImportRecordDTO 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryUserImportList(taxImportRecordDTO?: TaxImportRecordDTO, success?: (data: WebResult<PageBean<TaxImportRecordDTO>>["data"], response: WebResult<PageBean<TaxImportRecordDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxImportRecordDTO>>["message"], response: WebResult<PageBean<TaxImportRecordDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxImportRecordDTO>>["data"]> {
    return ajax({
        url: `/import/user/queryUserImportList`,
        type: "POST",
        contentType: "application/json",
        data: {
            taxImportRecordDTO: taxImportRecordDTO
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户导入模版下载EXCEL
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function downLoadTemplate(success?: (data: any, response: void, xhr: any) => void, error?: (message: any, response: void, xhr: any) => void, options?: any): Promise<any> {
    return ajax({
        url: `/import/user/downLoadTemplate`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 用户导入excel
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function importUserExcel(success?: (data: WebResult<boolean>["data"], response: WebResult<boolean>, xhr: any) => void, error?: (message: WebResult<boolean>["message"], response: WebResult<boolean>, xhr: any) => void, options?: any): Promise<WebResult<boolean>["data"]> {
    return ajax({
        url: `/import/user/importUserExcel`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface TaxImportRecordDTO {

    /**
     * 导入状态（0完成，1未完成）
     */
    importStatus: number;

    /**
     * 操作人id
     */
    createUserId: number;

    /**
     * 原文件地址
     */
    importFileUrl: string;

    /**
     * 失败清单地址
     */
    importLoseUrl: string;

    /**
     * 导入成功数
     */
    successNum: number;

    pageSize: number;

    /**
     * 导入总数
     */
    sum: number;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 创建时间
     */
    createTime: string;

    pageNo: number;

    /**
     * 代征主体
     */
    collectedSubjectName: string;

    /**
     * 代征主体代码
     */
    collectedSubjectNo: string;

    /**
     * 创建人
     */
    createUser: string;

    /**
     * 开始时间 前端条件查询的时间条件
     */
    startTime: string;

    /**
     * 结束时间 前端条件查询的时间条件
     */
    endTime: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 是否删除（0否，1是）
     */
    isDel: number;

    /**
     * 导入失败数
     */
    loseNum: number;

    /**
     * 商户id
     */
    merchantNo: string;

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

