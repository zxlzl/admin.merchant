/**
 * @file API：/contract/merchant
 */
import { ajax } from "@/utils/request";

/**
 * 分页查询签约记录
 * @param contractSignQuery  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
export function page(contractSignQuery?: ContractSignQuery, success?: (data: ServiceResult<PageBean<ContractSignVO>>["data"], response: ServiceResult<PageBean<ContractSignVO>>, xhr: any) => void, error?: (message: ServiceResult<PageBean<ContractSignVO>>["message"], response: ServiceResult<PageBean<ContractSignVO>>, xhr: any) => void, options?: any): Promise<ServiceResult<PageBean<ContractSignVO>>["data"]> {
    return ajax({
        url: `/contract/merchant/page`,
        data: {
            contractSignQuery: contractSignQuery
        },
        success: success,
        error: error,
        ...options
    }) as any;
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

export interface ServiceResult<T> {

    code: string;

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

