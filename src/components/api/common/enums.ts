/**
 * @file API：/common/enums
 */
import { ajax } from "@/utils/request";

/**
 * 根据字典id获取二级字典值
 * @param id  字典id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function querySecondLevelDicListById(id: number, success?: (data: ServiceResult<TaxDictionaryDTO[]>["data"], response: ServiceResult<TaxDictionaryDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxDictionaryDTO[]>["message"], response: ServiceResult<TaxDictionaryDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxDictionaryDTO[]>["data"]> {
    return ajax({
        url: `/common/enums/querySecondLevelDicListById`,
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据字典id获取三级字典值
 * @param id  字典id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryThirdLevelDicListById(id: number, success?: (data: ServiceResult<TaxDictionaryDTO[]>["data"], response: ServiceResult<TaxDictionaryDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxDictionaryDTO[]>["message"], response: ServiceResult<TaxDictionaryDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxDictionaryDTO[]>["data"]> {
    return ajax({
        url: `/common/enums/queryThirdLevelDicListById`,
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据枚举类型查询枚举值
 * @param enumType  枚举类型
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryEnumsListByType(enumType: string, success?: (data: ServiceResult<{[key: string]: string}[]>["data"], response: ServiceResult<{[key: string]: string}[]>, xhr: any) => void, error?: (message: ServiceResult<{[key: string]: string}[]>["message"], response: ServiceResult<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<ServiceResult<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/common/enums/queryEnumsListByType`,
        data: {
            enumType: enumType
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据类型获取一级字典值
 * @param dicTypeCode  字典类型
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryFirstLevelDicListByType(dicTypeCode: string, success?: (data: ServiceResult<TaxDictionaryDTO[]>["data"], response: ServiceResult<TaxDictionaryDTO[]>, xhr: any) => void, error?: (message: ServiceResult<TaxDictionaryDTO[]>["message"], response: ServiceResult<TaxDictionaryDTO[]>, xhr: any) => void, options?: any): Promise<ServiceResult<TaxDictionaryDTO[]>["data"]> {
    return ajax({
        url: `/common/enums/queryFirstLevelDicListByType`,
        data: {
            dicTypeCode: dicTypeCode
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询所有可用发放通道
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryAllPayChannelList(success?: (data: ServiceResult<{[key: string]: string}[]>["data"], response: ServiceResult<{[key: string]: string}[]>, xhr: any) => void, error?: (message: ServiceResult<{[key: string]: string}[]>["message"], response: ServiceResult<{[key: string]: string}[]>, xhr: any) => void, options?: any): Promise<ServiceResult<{[key: string]: string}[]>["data"]> {
    return ajax({
        url: `/common/enums/queryAllPayChannelList`,
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

export interface TaxDictionaryDTO {

    /**
     * 选项编码
     */
    dicCode: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 备注
     */
    remark: string;

    /**
     * 最后更新时间
     */
    updateTime: string;

    /**
     * 序号
     */
    id: number;

    /**
     * 选项名称
     */
    dicName: string;

}

