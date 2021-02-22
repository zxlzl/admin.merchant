/**
 * @file API：/remit/fundOperation
 */
import { ajax } from "@/utils/request";

/**
 * 资金操作记录导出
 * @param fundOperationQuery 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function export_1(fundOperationQuery?: FundOperationQuery, success?: (data: WebResult<void>["data"], response: WebResult<void>, xhr: any) => void, error?: (message: WebResult<void>["message"], response: WebResult<void>, xhr: any) => void, options?: any): Promise<WebResult<void>["data"]> {
    return ajax({
        url: `/remit/fundOperation/export`,
        type: "POST",
        contentType: "application/json",
        data: {
            fundOperationQuery: fundOperationQuery
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 资金操作记录列表
 * @param fundOperationQuery 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getList(fundOperationQuery?: FundOperationQuery, success?: (data: WebResult<PageBean<FundOperationVO>>["data"], response: WebResult<PageBean<FundOperationVO>>, xhr: any) => void, error?: (message: WebResult<PageBean<FundOperationVO>>["message"], response: WebResult<PageBean<FundOperationVO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<FundOperationVO>>["data"]> {
    return ajax({
        url: `/remit/fundOperation/getList`,
        type: "POST",
        contentType: "application/json",
        data: {
            fundOperationQuery: fundOperationQuery
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询可用余额 上月返点 累计返点
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getRebateAmount(success?: (data: WebResult<RebateVO>["data"], response: WebResult<RebateVO>, xhr: any) => void, error?: (message: WebResult<RebateVO>["message"], response: WebResult<RebateVO>, xhr: any) => void, options?: any): Promise<WebResult<RebateVO>["data"]> {
    return ajax({
        url: `/remit/fundOperation/getRebateAmount`,
        type: "POST",
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 资金操作记录详情
 * @param id 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getOne(id?: number, success?: (data: WebResult<FundOperationVO>["data"], response: WebResult<FundOperationVO>, xhr: any) => void, error?: (message: WebResult<FundOperationVO>["message"], response: WebResult<FundOperationVO>, xhr: any) => void, options?: any): Promise<WebResult<FundOperationVO>["data"]> {
    return ajax({
        url: `/remit/fundOperation/getOne`,
        type: "GET",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface FundOperationQuery {

    /**
     * 业务类型
     */
    bizType: number;

    /**
     * 排序语句
     */
    orderBy: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    /**
     * 入款账户名称
     */
    inAccountName: string;

    /**
     * 出款账户
     */
    outAccount: string;

    /**
     * sql查询记录开始下标
     */
    startIndex: number;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * 起始金额
     */
    startAmount: string;

    /**
     * 业务编号
     */
    bankBizOrderNo: string;

    /**
     * 入款账户
     */
    inAccount: string;

    /**
     * 出款账户名称
     */
    outAccountName: string;

    /**
     * 开始时间
     */
    startTime: string;

    /**
     * 结束时间
     */
    endTime: string;

    /**
     * 截止金额
     */
    endAmount: string;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 状态
     */
    status: number;

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

export interface FundOperationVO {

    /**
     * 入款账户名称
     */
    intoAccountName: string;

    /**
     * 入款账户
     */
    intoAccount: string;

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 业务类型 0--充值  1--提现  2--账户间转账 
     */
    bizType: number;

    /**
     * 业务类型名称 
     */
    bizTypeName: string;

    /**
     * 商户名称
     */
    merchantMame: string;

    /**
     * 备注
     */
    memo: string;

    /**
     * 出款账户
     */
    outAccount: string;

    /**
     * 操作员
     */
    operator: string;

    /**
     * 操作附言
     */
    operationPs: string;

    /**
     * 金额
     */
    tradeAmount: number;

    /**
     * 业务订单号
     */
    bankBizOrderNo: string;

    /**
     * 代征主体
     */
    collectedSubjectName: string;

    /**
     * 出款账户名称
     */
    outAccountName: string;

    /**
     * 发起时间 
     */
    transDate: string;

    cellStyleMap: any;

    /**
     * 主键
     */
    id: number;

    /**
     * 状态名称
     */
    claimStatusName: string;

    /**
     * 状态 0:处理中 1:成功 2:失败
     */
    claimStatus: string;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 操作备注
     */
    operationRemark: string;

}

export interface RebateVO {

    /**
     * 累计返点金额
     */
    totalRebateAmount: number;

    /**
     * 可用余额
     */
    availableAmount: number;

    /**
     * 上月返点金额
     */
    lastMonthRebateAmount: number;

}

