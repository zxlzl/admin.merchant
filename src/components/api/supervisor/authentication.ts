/**
 * @file API：/supervisor/authentication
 */
import { ajax } from "@/utils/request";

/**
 * 审核免验证
 * @param id  免验证id
 * @param checkStatus  审核状态1:审核通过 2:审核拒绝
 * @param checkMemo  审核备注
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function checkAuthentication(id?: number, checkStatus?: string, checkMemo?: string, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/supervisor/authentication/checkAuthentication`,
        type: "POST",
        data: {
            id: id,
            checkStatus: checkStatus,
            checkMemo: checkMemo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询免验证详情
 * @param id  查询免验证详情
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAuthenticationDetail(id?: number, success?: (data: WebResult_1<TaxAuthenticationInfoDTO>["data"], response: WebResult_1<TaxAuthenticationInfoDTO>, xhr: any) => void, error?: (message: WebResult_1<TaxAuthenticationInfoDTO>["message"], response: WebResult_1<TaxAuthenticationInfoDTO>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxAuthenticationInfoDTO>["data"]> {
    return ajax({
        url: `/supervisor/authentication/queryAuthenticationDetail`,
        type: "POST",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 免验证列表查询
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAuthenticationList(query?: TaxAuthenticationInfoVO, success?: (data: WebResult_1<PageBean_1<TaxAuthenticationInfoDTO>>["data"], response: WebResult_1<PageBean_1<TaxAuthenticationInfoDTO>>, xhr: any) => void, error?: (message: WebResult_1<PageBean_1<TaxAuthenticationInfoDTO>>["message"], response: WebResult_1<PageBean_1<TaxAuthenticationInfoDTO>>, xhr: any) => void, options?: any): Promise<WebResult_1<PageBean_1<TaxAuthenticationInfoDTO>>["data"]> {
    return ajax({
        url: `/supervisor/authentication/queryAuthenticationList`,
        type: "POST",
        contentType: "application/json",
        data: {
            query: query
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

export interface WebResult_1<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

export interface TaxAuthenticationInfoDTO {

    /**
     * 出生日期
     */
    birthday: string;

    /**
     * 身份类型 1:身份证 2:港澳居民来往内地通行证 3:台湾居民来往大陆通行证 4:香港身份证 5:台湾身份证 6:澳门身份证 7:外国人身份证件 8:中国护照 9:外国人永久居留证
     */
    certType: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 免验证类型,可多选,1所有限制，2年龄限制
     */
    validType: string;

    endDate: string;

    /**
     * 性别 0:男 1:女 2:未知
     */
    sex: string;

    /**
     * 申请来源 0:商户申请  1:微信申请 2:后台申请
     */
    applySource: string;

    /**
     * 申请原因
     */
    applyMemo: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 企业名称
     */
    merchantName: string;

    /**
     * 证件号
     */
    certNo: string;

    /**
     * 审核状态 0:审核中  1:审核通过 2:审核拒绝 3:已撤销
     */
    checkStatus: string;

    /**
     * 其他补充材料url
     */
    otherMaterials: string;

    /**
     * 生效状态 0:有效  1:无效
     */
    validStatus: string;

    /**
     * 国家代码
     */
    countryCode: string;

    /**
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 图片地址列表， 用|分割
     */
    imageUrl: string;

    /**
     * 姓名
     */
    name: string;

    /**
     * 服务主体编号
     */
    collectedSubjectNo: string;

    /**
     * 国家名称
     */
    countryName: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 审核备注
     */
    checkMemo: string;

    startDate: string;

    /**
     * 商户号
     */
    merchantNo: string;

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

export interface TaxAuthenticationInfoVO {

    query: TaxAuthenticationInfoDTO;

    page: PageBean;

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

