/**
 * @file API：/remit/payorder
 */
import { ajax } from "@/utils/request";

/**
 * 资金明细
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPayOrderPage(vo?: PayOrderVO, success?: (data: WebResult<PageBean_1<TaxPayOrderDto>>["data"], response: WebResult<PageBean_1<TaxPayOrderDto>>, xhr: any) => void, error?: (message: WebResult<PageBean_1<TaxPayOrderDto>>["message"], response: WebResult<PageBean_1<TaxPayOrderDto>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean_1<TaxPayOrderDto>>["data"]> {
    return ajax({
        url: `/remit/payorder/queryPayOrderPage`,
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
 * 资金明细
 * @param id  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryOrder(id?: number, success?: (data: WebResult<TaxPayOrderDto>["data"], response: WebResult<TaxPayOrderDto>, xhr: any) => void, error?: (message: WebResult<TaxPayOrderDto>["message"], response: WebResult<TaxPayOrderDto>, xhr: any) => void, options?: any): Promise<WebResult<TaxPayOrderDto>["data"]> {
    return ajax({
        url: `/remit/payorder/queryOrder`,
        data: {
            id: id
        },
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

export interface PayOrderQuery {

    gmtModified: string;

    endDate: string;

    resultCode: string;

    bankAccountNo: string;

    memo: string;

    /**
     * 排序语句
     */
    orderBy: string;

    /**
     * 每页多少条
     */
    pageSize: number;

    operator: string;

    identityNo: string;

    /**
     * sql查询记录开始下标
     */
    startIndex: number;

    subAccountNo: string;

    payType: string;

    transOrderNo: string;

    id: number;

    instCode: string;

    bizOrderNo: string;

    channelCode: string;

    bankAccountName: string;

    batchDetailNo: string;

    bankCode: string;

    amount: number;

    payBatchNo: string;

    euid: number;

    mobile: string;

    invoiceMode: string;

    gmtCreate: string;

    iocomeType: string;

    resultMsg: string;

    /**
     * 当前页码
     */
    curPage: number;

    iscount: number;

    payStatus: string;

    startDate: string;

    merchantNo: string;

}

export interface PayOrderVO {

    page: PageBean;

    payOrderQuery: PayOrderQuery;

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

export interface TaxPayOrderDto {

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 错误码
     */
    resultCode: string;

    /**
     * 银行账户号
     */
    bankAccountNo: string;

    /**
     * 备注
     */
    memo: string;

    /**
     * 操作人
     */
    operator: string;

    payTypeDesc: string;

    merchantName: string;

    /**
     * 身份证号
     */
    identityNo: string;

    /**
     * 商家子账户号
     */
    subAccountNo: string;

    /**
     * 支付类型 100: 充值 101:提现 102:扣费 103:冻结 104:解冻
     */
    payType: string;

    /**
     * 请求流水号
     */
    transOrderNo: string;

    id: number;

    /**
     * 渠道编码
     */
    instCode: string;

    /**
     * 外部请求流水号
     */
    bizOrderNo: string;

    /**
     * 通道编码
     */
    channelCode: string;

    /**
     * 银行账户名
     */
    bankAccountName: string;

    /**
     * 批次明细单号
     */
    batchDetailNo: string;

    /**
     * 银行编码
     */
    bankCode: string;

    /**
     * 金额
     */
    amount: number;

    /**
     * 批次单号
     */
    payBatchNo: string;

    /**
     * 支付uid
     */
    euid: number;

    payStatusDesc: string;

    /**
     * 外部业务单号
     */
    outBizNo: string;

    /**
     * 预留手机号
     */
    mobile: string;

    /**
     * 开票模式,1账单开票，2预充值开票
     */
    invoiceMode: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    iocomeType: string;

    /**
     * 结果描述
     */
    resultMsg: string;

    /**
     * 是否统计 0：否，1：是
     */
    iscount: number;

    /**
     * 扩展字段1
     */
    extend1: string;

    /**
     * 支付状态 00:支付中 01:支付成功 02:支付失败
     */
    payStatus: string;

    /**
     * 商户号
     */
    merchantNo: string;

}

