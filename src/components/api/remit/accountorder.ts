/**
 * @file API：/remit/accountorder
 */
import { ajax } from "@/utils/request";

/**
 * 账户流水
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAccountOrderPage(vo?: AccountOrderVO, success?: (data: WebResult<PageBean_1<AccountLogDto>>["data"], response: WebResult<PageBean_1<AccountLogDto>>, xhr: any) => void, error?: (message: WebResult<PageBean_1<AccountLogDto>>["message"], response: WebResult<PageBean_1<AccountLogDto>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean_1<AccountLogDto>>["data"]> {
    return ajax({
        url: `/remit/accountorder/queryAccountOrderPage`,
        contentType: "application/json",
        data: {
            vo: vo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface Page {

    pageIndex: number;

    pageSize: number;

}

export interface QueryAccountDetailRequest {

    /**
     * 金额范围最小值
     */
    amountStart: string;

    /**
     * 业务订单号
     */
    orderId: string;

    accountType: string;

    acctSn: string;

    /**
     * 收支类型，D:收入 C:支出
     */
    accDir: string;

    /**
     * 对方账户
     */
    objAcctNo: string;

    /**
     * 金额范围最大值
     */
    amountEnd: string;

    /**
     * 业务类型，见枚举接口
     */
    transSubCode: string;

    acctNo: string;

    startTime: string;

    endTime: string;

    page: Page;

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

export interface AccountOrderVO {

    request: QueryAccountDetailRequest;

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

export interface AccountLogDto {

    note: string;

    amount: number;

    custNo: string;

    orderNo: string;

    objCustNo: string;

    acctBalance: number;

    objAcctType: string;

    objCustType: string;

    acctSn: string;

    objAcctNo: string;

    gmtCreate: string;

    transSubName: string;

    unwithdrawBalance: number;

    acctDir: string;

    transSubCode: string;

    availBalance: number;

    acctNo: string;

    freezeAmount: number;

    collectedSubjectName: string;

    gmtUpdate: string;

    acctType: string;

    custType: string;

    collectedSubjectNo: string;

    transCode: string;

}

