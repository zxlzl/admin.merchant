/**
 * @file API：/remit/dispathProject
 */
import { ajax } from "@/utils/request";

/**
 * 派单项目列表查询
 * @param query 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryDispatchProjectList(query?: DispatchProjectQuery, success?: (data: WebResult<PageBean<TaxDispatchProjectDTO>>["data"], response: WebResult<PageBean<TaxDispatchProjectDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxDispatchProjectDTO>>["message"], response: WebResult<PageBean<TaxDispatchProjectDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxDispatchProjectDTO>>["data"]> {
    return ajax({
        url: `/remit/dispathProject/queryDispatchProjectList`,
        contentType: "application/json",
        data: {
            query: query
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询项目详情
 * @param projectNo  项目编号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryDispatchProjectDetail(projectNo?: string, success?: (data: WebResult<TaxDispatchProjectDTO>["data"], response: WebResult<TaxDispatchProjectDTO>, xhr: any) => void, error?: (message: WebResult<TaxDispatchProjectDTO>["message"], response: WebResult<TaxDispatchProjectDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxDispatchProjectDTO>["data"]> {
    return ajax({
        url: `/remit/dispathProject/queryDispatchProjectDetail`,
        data: {
            projectNo: projectNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface DispatchProjectQuery {

    serviceType: string;

    projectStatus: string;

    /**
     * sql查询记录开始下标
     */
    startIndex: number;

    /**
     * 当前页码
     */
    curPage: number;

    projectNo: string;

    /**
     * 排序语句
     */
    orderBy: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    gmtCreateBegin: string;

    gmtCreateEnd: string;

    projectName: string;

    /**
     * 商户号
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

export interface TaxDispatchProjectDTO {

    /**
     * 服务类型：01-推广服务，02-咨询服务，03-信息服务，04-技术服务 *\/
     */
    serviceType: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 最大预算金额
     */
    budgetUpperAmount: number;

    /**
     * 数量，预留字段，若用计件模式，按数量来计算总金额
     */
    numbers: number;

    /**
     * 项目状态中文描述
     */
    projectStatusDesc: string;

    /**
     * 发起商户名称
     */
    merchantName: string;

    /**
     * 项目模式：01-众包，02-招标，03-计件
     */
    projectModel: string;

    /**
     * 项目周期结束
     */
    projectEndTime: string;

    /**
     * 项目编号
     */
    projectNo: string;

    /**
     * 代征主体名称（服务主体）
     */
    collectedSubjectName: string;

    /**
     * 代征主体编码
     */
    collectedSubjectNo: string;

    /**
     * 项目主键
     */
    id: number;

    /**
     * 最小预算金额
     */
    budgetLowerAmount: number;

    /**
     * 失效时间
     */
    effectiveEndTime: string;

    /**
     * 发起时间(创建时间)
     */
    gmtCreate: string;

    /**
     * 发起时间结束值
     */
    gmtCreateEnd: string;

    /**
     * 项目模式中文描述
     */
    projectModelName: string;

    /**
     * 生效时间
     */
    effectiveStartTime: string;

    /**
     * 项目周期开始
     */
    projectStartTime: string;

    /**
     * 项目状态：01-生效，02-失效
     */
    projectStatus: string;

    /**
     * 预算金额描述（元）
     */
    budgetAmount: string;

    /**
     * 项目描述
     */
    projectDesc: string;

    /**
     * 发起时间开始值
     */
    gmtCreateBegin: string;

    /**
     * 项目名称
     */
    projectName: string;

    /**
     * 服务类型名称
     */
    serviceTypeName: string;

    /**
     * 发起商户号
     */
    merchantNo: string;

}

