/**
 * @file API：/company
 */
import { ajax } from "@/utils/request";

/**
 * 新建公司
 * @param companyDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function save(companyDto?: Company, success?: (data: Result<Company>["data"], response: Result<Company>, xhr: any) => void, error?: (message: Result<Company>["message"], response: Result<Company>, xhr: any) => void, options?: any): Promise<Result<Company>["data"]> {
    return ajax({
        url: `/company/save`,
        type: "POST",
        contentType: "application/json",
        data: {
            companyDto: companyDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 分页获取企业列表
 * @param companyDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPageByCompanyDto(companyDto?: CompanyDto, success?: (data: Result<Page<CompanyDto>>["data"], response: Result<Page<CompanyDto>>, xhr: any) => void, error?: (message: Result<Page<CompanyDto>>["message"], response: Result<Page<CompanyDto>>, xhr: any) => void, options?: any): Promise<Result<Page<CompanyDto>>["data"]> {
    return ajax({
        url: `/company/queryPageByCompanyDto`,
        type: "POST",
        contentType: "application/json",
        data: {
            companyDto: companyDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据企业编号查询企业
 * @param companyNo  企业编号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getByCompanyNo(companyNo?: string, success?: (data: Result<Company>["data"], response: Result<Company>, xhr: any) => void, error?: (message: Result<Company>["message"], response: Result<Company>, xhr: any) => void, options?: any): Promise<Result<Company>["data"]> {
    return ajax({
        url: `/company/getByCompanyNo`,
        type: "GET",
        data: {
            companyNo: companyNo
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据企业 id 切换当前用户企业
 * @param id  企业id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function switchCompany(id?: number, success?: (data: Result<Company>["data"], response: Result<Company>, xhr: any) => void, error?: (message: Result<Company>["message"], response: Result<Company>, xhr: any) => void, options?: any): Promise<Result<Company>["data"]> {
    return ajax({
        url: `/company/switchCompany`,
        type: "GET",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据企业 id 查询企业
 * @param id  企业id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getById(id?: number, success?: (data: Result<CompanyDto>["data"], response: Result<CompanyDto>, xhr: any) => void, error?: (message: Result<CompanyDto>["message"], response: Result<CompanyDto>, xhr: any) => void, options?: any): Promise<Result<CompanyDto>["data"]> {
    return ajax({
        url: `/company/getById`,
        type: "GET",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据 ID 更新
 * @param company  企业
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateById(company?: Company, success?: (data: Result<Company>["data"], response: Result<Company>, xhr: any) => void, error?: (message: Result<Company>["message"], response: Result<Company>, xhr: any) => void, options?: any): Promise<Result<Company>["data"]> {
    return ajax({
        url: `/company/updateById`,
        type: "POST",
        contentType: "application/json",
        data: {
            company: company
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface Company {

    /**
     * 营业执照
     */
    businessLicense: string;

    /**
     * 营业执照图片
     */
    businessLicensePic: string;

    /**
     * 创建人
     */
    createUserId: number;

    /**
     * 企业类型，01-个体工商户；02企业；03-党政机关及事业单位；04-其他组织
     */
    companyType: number;

    /**
     * 更新人
     */
    updateUserId: number;

    /**
     * 企业简称
     */
    abbrName: string;

    /**
     * 备注
     */
    remark: string;

    /**
     * 更新时间
     */
    updateTime: string;

    /**
     * 商户编号，固定 9 位，商家类型（2位）+经营类目（2位）+序列号（4位）
     */
    companyNo: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 企业全称
     */
    name: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 营业地址
     */
    businessAddress: string;

    /**
     * 经营类目，01 共享服务
     */
    businessType: number;

    /**
     * 0 未删除，1 删除
     */
    isDel: boolean;

    /**
     * 0 未启用 1 启用
     */
    status: boolean;

}

export interface Result<T> {

    code?: string;

    data?: T;

    success?: boolean;

    message?: string;

}

export interface CompanyDto {

    /**
     * 营业执照
     */
    businessLicense: string;

    /**
     * 创建人
     */
    createUserId: number;

    /**
     * 企业简称
     */
    abbrName: string;

    pageSize?: number;

    /**
     * 备注
     */
    remark: string;

    /**
     * 商户号
     */
    merchantNos: string[];

    /**
     * 商户编号，固定 9 位，商家类型（2位）+经营类目（2位）+序列号（4位）
     */
    companyNo: string;

    pageNo?: number;

    startTime?: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 营业地址
     */
    businessAddress: string;

    /**
     * 营业执照图片
     */
    businessLicensePic: string;

    /**
     * 企业类型，01-个体工商户；02企业；03-党政机关及事业单位；04-其他组织
     */
    companyType: number;

    /**
     * 更新人
     */
    updateUserId: number;

    mobile?: string;

    /**
     * 更新时间
     */
    updateTime: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 营业执照地址
     */
    businessLicensePicUrls: string[];

    /**
     * 企业全称
     */
    name: string;

    ids?: number[];

    endTime?: string;

    /**
     * 经营类目，01 共享服务
     */
    businessType: number;

    /**
     * 0 未删除，1 删除
     */
    isDel: boolean;

    /**
     * 0 未启用 1 启用
     */
    status: boolean;

    username?: string;

}

export interface Page<T> {

    data?: T[];

    totalCount?: number;

}

