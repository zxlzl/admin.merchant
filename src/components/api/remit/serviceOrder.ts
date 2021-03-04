/**
 * @file API：/remit/serviceOrder
 */
import { ajax } from "@/utils/request";

/**
 * 服务订单列表详情
 * @param id  服务订单主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryServiceOrderDetail(id?: number, success?: (data: WebResult<TaxServiceOrderDetailDTO>["data"], response: WebResult<TaxServiceOrderDetailDTO>, xhr: any) => void, error?: (message: WebResult<TaxServiceOrderDetailDTO>["message"], response: WebResult<TaxServiceOrderDetailDTO>, xhr: any) => void, options?: any): Promise<WebResult<TaxServiceOrderDetailDTO>["data"]> {
    return ajax({
        url: `/remit/serviceOrder/queryServiceOrderDetail`,
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 结算明细列表分页查询
 * @param query  传服务单号serviceNo、接单人姓名receiptName、接单人证件号码receiptIdNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryOrderSettlePage(query?: TaxServiceOrderDTO, success?: (data: WebResult<PageBean<TaxOrderSettleDTO>>["data"], response: WebResult<PageBean<TaxOrderSettleDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxOrderSettleDTO>>["message"], response: WebResult<PageBean<TaxOrderSettleDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxOrderSettleDTO>>["data"]> {
    return ajax({
        url: `/remit/serviceOrder/queryOrderSettlePage`,
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
 * 服务订单列表
 * @param query  查询对象
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryServiceOrderPage(query?: TaxServiceOrderDTO, success?: (data: WebResult<PageBean<TaxServiceOrderDTO>>["data"], response: WebResult<PageBean<TaxServiceOrderDTO>>, xhr: any) => void, error?: (message: WebResult<PageBean<TaxServiceOrderDTO>>["message"], response: WebResult<PageBean<TaxServiceOrderDTO>>, xhr: any) => void, options?: any): Promise<WebResult<PageBean<TaxServiceOrderDTO>>["data"]> {
    return ajax({
        url: `/remit/serviceOrder/queryServiceOrderPage`,
        contentType: "application/json",
        data: {
            query: query
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface WebResult<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

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
     * 服务主体名称（服务主体）
     */
    collectedSubjectName: string;

    /**
     * 服务主体编码
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

export interface TaxServiceOrderDTO {

    /**
     * 服务类型编码
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
     * 每页多少条
     */
    pageSize: number;

    /**
     * 备注
     */
    remark: string;

    /**
     * 接单人手机号
     */
    receiptMobile: string;

    /**
     * 接单方式名称
     */
    receiptTypeName: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 接单人姓名
     */
    receiptName: string;

    /**
     * 项目编号
     */
    projectNo: string;

    /**
     * 接单时间
     */
    receiptTime: string;

    /**
     * 接单时间结束值
     */
    receiptTimeEnd: string;

    /**
     * 服务主体名称（服务主体）
     */
    collectedSubjectName: string;

    /**
     * 服务主体编码
     */
    collectedSubjectNo: string;

    /**
     * 服务订单主键
     */
    id: number;

    /**
     * 接单时间开始值
     */
    receiptTimeStart: string;

    /**
     * 订单状态中文描述
     */
    statusDesc: string;

    /**
     * 接单方式  1:自动 2:手动
     */
    receiptType: number;

    /**
     * 接单人证件号码
     */
    receiptIdNo: string;

    /**
     * 最小预算金额
     */
    budgetLowerAmount: number;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 接单人证件类型名称
     */
    receiptIdTypeName: string;

    /**
     * 接单人证件类型
     */
    receiptIdType: string;

    /**
     * 当前页码
     */
    curPage: number;

    /**
     * 预算金额描述
     */
    budgetAmount: string;

    /**
     * 服务单号
     */
    serviceNo: string;

    /**
     * 项目名称
     */
    projectName: string;

    /**
     * 服务类型名称
     */
    serviceTypeName: string;

    /**
     * 商户号
     */
    merchantNo: string;

    /**
     * 订单状态
     */
    status: number;

}

export interface TaxServiceOrderDetailDTO {

    /**
     * 项目需求
     */
    taxProjectDTO: TaxDispatchProjectDTO;

    /**
     * 服务订单(包含接单人信息)
     */
    taxServiceOrderDTO: TaxServiceOrderDTO;

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

export interface TaxOrderSettleDTO {

    /**
     * 修改时间
     */
    gmtModified: string;

    /**
     * 结算状态
     */
    settleStatus: string;

    /**
     * 结算方式名称
     */
    settleTypeName: string;

    /**
     * 结算金额
     */
    settleAmount: number;

    /**
     * 结算时间
     */
    settleDate: string;

    /**
     * 创建时间
     */
    gmtCreate: string;

    /**
     * 商户名称
     */
    merchantName: string;

    /**
     * 结算单号
     */
    settleOrderNo: string;

    /**
     * 服务主体名称（服务主体）
     */
    collectedSubjectName: string;

    /**
     * 服务主体编码
     */
    collectedSubjectNo: string;

    /**
     * 结算信息主键
     */
    id: number;

    /**
     * 结算状态中文描述
     */
    settleStatusDesc: string;

    /**
     * 结算方式
     */
    settleType: string;

    /**
     * 商户号
     */
    merchantNo: string;

}

