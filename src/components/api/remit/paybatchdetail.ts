/**
 * @file API：/remit/paybatchdetail
 */
import { ajax } from "@/utils/request";

/**
 * 更新打款批次明细状态,商户后台挂起和撤销
 * @param status  挂起/撤销状态
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateStatusById(status?: string, id?: number, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatchdetail/updateStatusById`,
        data: {
            status: status,
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 修改批次订单明细
 * @param taxPayBatchDetailDto  批次明细
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateTaxPayBatchDetail(taxPayBatchDetailDto?: TaxPayBatchDetailDto, success?: (data: WebResult["data"], response: WebResult, xhr: any) => void, error?: (message: WebResult["message"], response: WebResult, xhr: any) => void, options?: any): Promise<WebResult["data"]> {
    return ajax({
        url: `/remit/paybatchdetail/updateTaxPayBatchDetail`,
        data: {
            taxPayBatchDetailDto: taxPayBatchDetailDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 费用单明细查询
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryOrderCostDetail(id?: number, success?: (data: WebResult_1<TaxBatchDetailCostDto>["data"], response: WebResult_1<TaxBatchDetailCostDto>, xhr: any) => void, error?: (message: WebResult_1<TaxBatchDetailCostDto>["message"], response: WebResult_1<TaxBatchDetailCostDto>, xhr: any) => void, options?: any): Promise<WebResult_1<TaxBatchDetailCostDto>["data"]> {
    return ajax({
        url: `/remit/paybatchdetail/queryOrderCostDetail`,
        data: {
            id: id
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

export interface TaxPayBatchDetailDto {

    /**
     * 收款账号
     */
    accountNo: string;

    /**
     * 银行预留手机号码
     */
    mobile: string;

    /**
     * 打款备注
     */
    memo: string;

    /**
     * 主键
     */
    id: number;

}

export interface WebResult_1<T> {

    code: string;

    redirectUrl: string;

    data: T;

    success: boolean;

    message: string;

}

export interface TaxOrderCostDetailDto {

    /**
     * 优惠减免
     */
    discountRate: number;

    /**
     * 个税
     */
    taxRate: number;

    /**
     * 合作税率
     */
    currentTaxRate: number;

    /**
     * 应扣税费
     */
    currentTaxAmt: number;

    /**
     * 增值税
     */
    vatRate: number;

    /**
     * 核定金额
     */
    currentAmt: number;

    /**
     * 单月累计收款区间最大金额
     */
    maxAmt: number;

    /**
     * id
     */
    id: number;

    /**
     * 单月累计收款区间最小金额
     */
    minAmt: number;

}

export interface TaxBatchDetailCostDto {

    /**
     * 合作税率
     */
    vatRateMemo: string;

    /**
     * 收款金额
     */
    amount: number;

    /**
     * 合作服务费率
     */
    deductRate: number;

    /**
     * 收款方姓名
     */
    accountName: string;

    /**
     * 实收服务费
     */
    deductAmount: number;

    /**
     * id
     */
    id: number;

    /**
     * 税费明细
     */
    taxOrderCostDetailList: TaxOrderCostDetailDto[];

    /**
     * 实收税费
     */
    vatAmount: number;

}

