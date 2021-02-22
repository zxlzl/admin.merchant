/**
 * @file API：/remit/capitalflow
 */
import { ajax } from "@/utils/request";

/**
 * 资金流水
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryCapitalFlowPage(vo?: CapitalFlowVO, success?: (data: WebResult<PageBean_1<IncomeExpensesDetailDto>>["data"], response: WebResult<PageBean_1<IncomeExpensesDetailDto>>, xhr: any) => void, error?: (message: WebResult<PageBean_1<IncomeExpensesDetailDto>>["message"], response: WebResult<PageBean_1<IncomeExpensesDetailDto>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean_1<IncomeExpensesDetailDto>>["data"]> {
    return ajax({
        url: `/remit/capitalflow/queryCapitalFlowPage`,
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
 * 查询业务类型枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryTransSubCodeList(success?: (data: WebResult<{[key: string]: string}[]>["data"], response: WebResult<{[key: string]: string}[]>, xhr: any) => void, error?: (message: WebResult<{[key: string]: string}[]>["message"], response: WebResult<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<WebResult<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/remit/capitalflow/queryTransSubCodeList`,
        success: success,
        error: error,
        ...options
    }) as any;
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

export interface QueryIncomeExpensesDetailRequest {

    /**
     * 查询账户号
     */
    accountId: string;

    /**
     * 收支类型，1收入，2支出
     */
    changeDirection: number;

    /**
     * 金额范围最小值
     */
    amountStart: string;

    /**
     * 业务订单号
     */
    orderId: string;

    /**
     * 业务流水号
     */
    acctSn: string;

    /**
     * 记账时间开始值
     */
    startTime: string;

    /**
     * 记账时间结束值
     */
    endTime: string;

    /**
     * 对方账户
     */
    objAcctNo: string;

    /**
     * 分页参数
     */
    pageBean: PageBean;

    /**
     * 金额范围最大值
     */
    amountEnd: string;

    /**
     * 业务类型，见枚举接口
     */
    transSubCode: string;

}

export interface CapitalFlowVO {

    request: QueryIncomeExpensesDetailRequest;

    page: PageBean;

}

export interface WebResult<T> {

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

export interface IncomeExpensesDetailDto {

    /**
     * 记账时间
     */
    accountingDate: string;

    /**
     * 账户名称
     */
    accountName: string;

    /**
     * 业务单号
     */
    orderId: string;

    /**
     * 业务类型名称
     */
    transSubCodeName: string;

    /**
     * 账户类型
     */
    accountType: string;

    /**
     * 余额变动类型
     */
    changeType: number;

    /**
     * 流水单号
     */
    acctSn: string;

    /**
     * 业务摘要/备注
     */
    memo: string;

    /**
     * 账户结余(当前余额)
     */
    currentAmount: number;

    /**
     * 对方账户
     */
    objAcctNo: string;

    /**
     * 收支金额(业务变动金额)
     */
    changeAmount: number;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 业务类型编码
     */
    transSubCode: string;

    /**
     * 发起账户
     */
    accountId: string;

    /**
     * 收支类型(余额变动方向 1收入 2支出)
     */
    changeDirection: number;

    /**
     * 代征主体
     */
    collectedSubjectName: string;

    /**
     * 最近修改时间
     */
    gmtUpdate: string;

    /**
     * 代征主体编码
     */
    collectedSubjectNo: string;

    /**
     * 收支类型名称
     */
    changeDirectionName: string;

    /**
     * 主键流水id
     */
    id: string;

    /**
     * 余额变动类型名称
     */
    changeTypeName: string;

    /**
     * 商户id(商户号)
     */
    merchantNo: string;

}

