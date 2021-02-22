/**
 * @file API：/file
 */
import { ajax } from "@/utils/request";

/**
 * 文件上传，通过流的方式，KV 传参
 * @param fileUpload 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function uploadPicture(fileUpload?: FileUpload, success?: (data: Result<FileUploadResult[]>["data"], response: Result<FileUploadResult[]>, xhr: any) => void, error?: (message: Result<FileUploadResult[]>["message"], response: Result<FileUploadResult[]>, xhr: any) => void, options?: any): Promise<Result<FileUploadResult[]>["data"]> {
    return ajax({
        url: `/file/uploadPicture`,
        type: "POST",
        data: {
            fileUpload: fileUpload
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 文件删除
 * @param fileId 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function deleteById(fileId?: number, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/file/deleteById`,
        type: "GET",
        data: {
            fileId: fileId
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 文件删除
 * @param bid 
 * @param fileTypeEnum 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function deleteByBidAndType(bid?: string, fileTypeEnum?: FileTypeEnum, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/file/deleteByBidAndType`,
        type: "GET",
        data: {
            bid: bid,
            fileTypeEnum: fileTypeEnum
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface FileTypeEnum {

    SMCS_CODE_JOB: any;

    SMCS_COMPANY_BUSINESS_LICENSE: any;

}

export interface FileUpload {

    fileTypeEnum?: FileTypeEnum;

    bid?: string;

    username?: string;

}

export interface Result<T> {

    code?: string;

    data?: T;

    success?: boolean;

    message?: string;

}

export interface FileUploadResult {

    fileName?: string;

    fileId?: number;

}

