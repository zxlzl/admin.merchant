/**
 * @file API：/contract/admin
 */
import { ajax } from "@/utils/request";

/**
 * 签约详情
 * @param signId  签约记录ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function detail(signId?: number, success?: (data: ServiceResult<ContractSignVO>["data"], response: ServiceResult<ContractSignVO>, xhr: any) => void, error?: (message: ServiceResult<ContractSignVO>["message"], response: ServiceResult<ContractSignVO>, xhr: any) => void, options?: any): Promise<ServiceResult<ContractSignVO>["data"]> {
    return ajax({
        url: `/contract/admin/detail`,
        data: {
            signId: signId
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 分页查询签约记录
 * @param contractSignQuery  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function page(contractSignQuery?: ContractSignQuery, success?: (data: ServiceResult<PageBean<ContractSignVO>>["data"], response: ServiceResult<PageBean<ContractSignVO>>, xhr: any) => void, error?: (message: ServiceResult<PageBean<ContractSignVO>>["message"], response: ServiceResult<PageBean<ContractSignVO>>, xhr: any) => void, options?: any): Promise<ServiceResult<PageBean<ContractSignVO>>["data"]> {
    return ajax({
        url: `/contract/admin/page`,
        data: {
            contractSignQuery: contractSignQuery
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 批量邀请
 * @param contractSignQuery  签约记录ID们,英文逗号分隔
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function batchInvite(contractSignQuery?: ContractSignQuery, success?: (data: ServiceResult_1["data"], response: ServiceResult_1, xhr: any) => void, error?: (message: ServiceResult_1["message"], response: ServiceResult_1, xhr: any) => void, options?: any): Promise<ServiceResult_1["data"]> {
    return ajax({
        url: `/contract/admin/batchInvite`,
        contentType: "application/json",
        data: {
            contractSignQuery: contractSignQuery
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 签约配置枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function signType(success?: (data: ServiceResult<Pair<string, number>[]>["data"], response: ServiceResult<Pair<string, number>[]>, xhr: any) => void, error?: (message: ServiceResult<Pair<string, number>[]>["message"], response: ServiceResult<Pair<string, number>[]>, xhr: any) => void, options?: any): Promise<ServiceResult<Pair<string, number>[]>["data"]> {
    return ajax({
        url: `/contract/admin/signType`,
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface ServiceResult<T> {

    code: string;

    data: T;

    success: boolean;

    message: string;

}

export interface ContractSignVO {

    /**
     * 签约来源描述
     */
    signSourceDesc: string;

    /**
     * 证件类型
     */
    certType: string;

    /**
     * 证件类型描述
     */
    certTypeDesc: string;

    contractDownloadUrl: string;

    memo: string;

    remark: string;

    signDate: string;

    /**
     * 签约模板
     */
    templateId: string;

    merchantName: string;

    merchantId: string;

    gmtUpdate: string;

    signEntity: string;

    signType: number;

    /**
     * 文件名称
     */
    contractName: string;

    id: number;

    contractViewUrl: string;

    fddCustomerId: string;

    /**
     * 状态描述
     */
    statusDesc: string;

    signEntityId: string;

    mobile: string;

    contractSignUrl: string;

    gmtCreate: string;

    /**
     * 用户名称
     */
    userName: string;

    /**
     * 证件号
     */
    certNo: string;

    /**
     * 签约来源： 0-微信签约，3存证签约
     */
    signSource: string;

    contractId: string;

    /**
     * 签约状态：I-待签约，CG-签约中，S-签约成功，F-签约失败
     */
    status: string;

}

export interface ContractSignQuery {

    /**
     * 开始时间
     */
    gmtCreateStart: string;

    /**
     * 证件类型
     */
    certType: string;

    /**
     * 批量邀请ID
     */
    signIds: number[];

    contractDownloadUrl: string;

    memo: string;

    /**
     * 每页数量
     */
    pageSize: number;

    remark: string;

    signDate: string;

    merchantName: string;

    merchantId: string;

    gmtUpdate: string;

    signEntity: string;

    signType: number;

    /**
     * 文件名称
     */
    contractName: string;

    id: number;

    contractViewUrl: string;

    fddCustomerId: string;

    signEntityId: string;

    mobile: string;

    contractSignUrl: string;

    gmtCreate: string;

    /**
     * 结束时间
     */
    gmtCreateEnd: string;

    /**
     * 用户名称
     */
    userName: string;

    /**
     * 证件号
     */
    certNo: string;

    /**
     * 当前页数
     */
    curPage: number;

    /**
     * 签约来源： 0-微信签约，3存证签约
     */
    signSource: string;

    contractId: string;

    /**
     * 签约状态：I-待签约，CG-签约中，S-签约成功，F-签约失败
     */
    status: string;

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

export interface ServiceResult_1 {

    code: string;

    data: any;

    success: boolean;

    message: string;

}

export interface Pair<K, V> {

    value: V;

    key: K;

}

