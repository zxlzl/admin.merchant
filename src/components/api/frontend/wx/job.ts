/**
 * @file API：/frontend/wx/job
 */
import { ajax } from "@/utils/request";

/**
 * 获取最新任务
 * @param JobTemplateDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryLatestJobs(JobTemplateDto?: JobTemplateDto, success?: (data: Result<Page<JobTemplateDto>>["data"], response: Result<Page<JobTemplateDto>>, xhr: any) => void, error?: (message: Result<Page<JobTemplateDto>>["message"], response: Result<Page<JobTemplateDto>>, xhr: any) => void, options?: any): Promise<Result<Page<JobTemplateDto>>["data"]> {
    return ajax({
        url: `/frontend/wx/job/queryLatestJobs`,
        type: "POST",
        contentType: "application/json",
        data: {
            JobTemplateDto: JobTemplateDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据任务状态获取用户关联的任务
 * @param JobTemplateDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryJobsByState(JobTemplateDto?: JobTemplateDto, success?: (data: Result<Page<JobTemplateDto>>["data"], response: Result<Page<JobTemplateDto>>, xhr: any) => void, error?: (message: Result<Page<JobTemplateDto>>["message"], response: Result<Page<JobTemplateDto>>, xhr: any) => void, options?: any): Promise<Result<Page<JobTemplateDto>>["data"]> {
    return ajax({
        url: `/frontend/wx/job/queryJobsByState`,
        type: "POST",
        contentType: "application/json",
        data: {
            JobTemplateDto: JobTemplateDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据任务id获取任务详情信息
 * @param id  任务id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getJobDetails(id?: number, success?: (data: Result<JobTemplateDto>["data"], response: Result<JobTemplateDto>, xhr: any) => void, error?: (message: Result<JobTemplateDto>["message"], response: Result<JobTemplateDto>, xhr: any) => void, options?: any): Promise<Result<JobTemplateDto>["data"]> {
    return ajax({
        url: `/frontend/wx/job/getJobDetails`,
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
 * 报名某任务
 * @param id  任务id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function applyJobById(id?: number, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/frontend/wx/job/applyJobById`,
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
 * 取消某任务
 * @param id  任务id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function cancelJobById(id?: number, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/frontend/wx/job/cancelJobById`,
        type: "GET",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface Attachment {

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 修改人
     */
    updateUserName: string;

    /**
     * 上传人
     */
    createUserName: string;

    /**
     * 修改时间
     */
    updateTime: string;

    id: number;

    /**
     * 一组文件的唯一标示
     */
    bid: string;

    /**
     * 原始文件名
     */
    srcFileName: string;

    /**
     * 是否删除
     */
    isDel: boolean;

    /**
     * 文件地址
     */
    url: string;

    /**
     * 文件的分类，标示文件在哪个地方上传的
     */
    attaType: string;

}

export interface JobTemplateDto {

    /**
     * 报名截止日期
     */
    enrollEnd: string;

    /**
     * 结束日期
     */
    jobEndDate: string;

    /**
     * 分类 1-线上；2-线下。默认线下
     */
    classify: number;

    /**
     * 图片路径  用于前端展示
     */
    attachments: Attachment[];

    /**
     * 报名开始日期
     */
    enrollStart: string;

    pageSize?: number;

    /**
     * 开始时间
     */
    jobStartTime: string;

    /**
     * 任务审核状态 小程序用
     */
    jobAuditStatus: number;

    pageNo?: number;

    /**
     * 图片路径
     */
    pictureCode: string;

    /**
     * 开始时间 前端条件查询的时间条件
     */
    startTime: string;

    /**
     * 门店名称  小程序用
     */
    storeName: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 标签 1-高薪
     */
    tag: number;

    /**
     * 前台是否展示（0为展示，1为否）
     */
    receptionIsshow: number;

    /**
     * 任务名称
     */
    jobName: string;

    /**
     * 任务模版编号
     */
    jobTemplateCode: string;

    /**
     * 开始日期
     */
    jobStartDate: string;

    /**
     * 重复类型（0不重复，1每天，2每周）
     */
    repeatType: number;

    /**
     * 修改时间
     */
    updateTime: string;

    /**
     * 门店
     */
    storeId: number;

    /**
     * 公司id
     */
    companyId: number;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 人数
     */
    peopleNumber: number;

    /**
     * 门店地址
     */
    storeAddress: string;

    /**
     * 预算范围最大值
     */
    budgetScopeMix: number;

    /**
     * 报名状态（1未报名，2已报名）
     */
    enrollStatus: number;

    /**
     * 预算范围最小值
     */
    budgetScopeMin: number;

    /**
     * 创建人
     */
    createUser: string;

    /**
     * 是否可以报名 0可以 1不可以  用于小程序报名按钮
     */
    isEnroll: number;

    /**
     * 结束时间 前端条件查询的时间条件
     */
    endTime: string;

    /**
     * 是否删除（0否，1是）
     */
    isDel: number;

    /**
     * 每天则为空，每周1-7和星期对应
     */
    repeatCode: string;

    /**
     * 结束时间
     */
    jobEndTime: string;

    /**
     * 描述
     */
    represent: string;

    /**
     * 状态(0未上架、1已上架、2已下架、3已结束)
     */
    status: number;

}

export interface Result<T> {

    code?: string;

    data?: T;

    success?: boolean;

    message?: string;

}

export interface Page<T> {

    data?: T[];

    totalCount?: number;

}

