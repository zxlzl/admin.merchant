/**
 * @file API：/smcs_job
 */
import { ajax } from "@/utils/request";

/**
 * 获取上传图片所用的bid 每次上传图片时将bid传到后台
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getBid(success?: (data: Result<string>["data"], response: Result<string>, xhr: any) => void, error?: (message: Result<string>["message"], response: Result<string>, xhr: any) => void, options?: any): Promise<Result<string>["data"]> {
    return ajax({
        url: `/smcs_job/getBid`,
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 添加门店信息
 * @param storeMessageDto 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function insertStoreMessage(storeMessageDto?: StoreMessageDto, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/smcs_job/insertStoreMessage`,
        contentType: "application/json",
        data: {
            storeMessageDto: storeMessageDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 删除任务
 * @param id  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function deletJob(id?: JobTemplateDto, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/smcs_job/deletJob`,
        contentType: "application/json",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查看任务列表详情 以及详情页面的按条件查询
 * @param jobTemplateDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryJobMessage(jobTemplateDto?: JobTemplateDto, success?: (data: Result<Page<JobTemplateDto>>["data"], response: Result<Page<JobTemplateDto>>, xhr: any) => void, error?: (message: Result<Page<JobTemplateDto>>["message"], response: Result<Page<JobTemplateDto>>, xhr: any) => void, options?: any): Promise<Result<Page<JobTemplateDto>>["data"]> {
    return ajax({
        url: `/smcs_job/queryJobMessage`,
        contentType: "application/json",
        data: {
            jobTemplateDto: jobTemplateDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查看任务详情
 * @param jobTemplateDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function findJobMessage(jobTemplateDto?: JobTemplateDto, success?: (data: Result<JobTemplateDto>["data"], response: Result<JobTemplateDto>, xhr: any) => void, error?: (message: Result<JobTemplateDto>["message"], response: Result<JobTemplateDto>, xhr: any) => void, options?: any): Promise<Result<JobTemplateDto>["data"]> {
    return ajax({
        url: `/smcs_job/findJobMessage`,
        contentType: "application/json",
        data: {
            jobTemplateDto: jobTemplateDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 新建任务
 * @param jobTemplateDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function createJob(jobTemplateDto?: JobTemplateDto, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/smcs_job/createJob`,
        contentType: "application/json",
        data: {
            jobTemplateDto: jobTemplateDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 编辑任务
 * @param jobTemplateDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function updateJob(jobTemplateDto?: JobTemplateDto, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/smcs_job/updateJob`,
        contentType: "application/json",
        data: {
            jobTemplateDto: jobTemplateDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 上架任务
 * @param id  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function jobOnTheShelf(id?: number[], success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/smcs_job/jobOnTheShelf`,
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 下架任务
 * @param id  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function jobOffTheShelf(id?: number[], success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/smcs_job/jobOffTheShelf`,
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 任务执行列表 包括列表条件查询
 * @param jobEnrollDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryJobExecute(jobEnrollDto?: JobEnrollDto, success?: (data: Result<Page<JobEnrollDto>>["data"], response: Result<Page<JobEnrollDto>>, xhr: any) => void, error?: (message: Result<Page<JobEnrollDto>>["message"], response: Result<Page<JobEnrollDto>>, xhr: any) => void, options?: any): Promise<Result<Page<JobEnrollDto>>["data"]> {
    return ajax({
        url: `/smcs_job/queryJobExecute`,
        contentType: "application/json",
        data: {
            jobEnrollDto: jobEnrollDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查看任务执行详情 jobCode + userId
 * @param jobEnrollDto 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function findJobExecute(jobEnrollDto?: JobEnrollDto, success?: (data: Result<JobExecuteMessage>["data"], response: Result<JobExecuteMessage>, xhr: any) => void, error?: (message: Result<JobExecuteMessage>["message"], response: Result<JobExecuteMessage>, xhr: any) => void, options?: any): Promise<Result<JobExecuteMessage>["data"]> {
    return ajax({
        url: `/smcs_job/findJobExecute`,
        contentType: "application/json",
        data: {
            jobEnrollDto: jobEnrollDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 审核任务单 jobCode + userId + auditResult + auditIsnoReason
 * @param jobEnrollDto 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function auditJobTicket(jobEnrollDto?: JobEnrollDto, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/smcs_job/auditJobTicket`,
        contentType: "application/json",
        data: {
            jobEnrollDto: jobEnrollDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 验收任务单 jobCode + jobSonCode + userId + checkResult + checkIsnoReason + remuneration
 * @param jobAuditDto 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function checkJobTicket(jobAuditDto?: JobAuditDto, success?: (data: Result<boolean>["data"], response: Result<boolean>, xhr: any) => void, error?: (message: Result<boolean>["message"], response: Result<boolean>, xhr: any) => void, options?: any): Promise<Result<boolean>["data"]> {
    return ajax({
        url: `/smcs_job/checkJobTicket`,
        contentType: "application/json",
        data: {
            jobAuditDto: jobAuditDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 查询任务验收列表 pageNo pageSize jobCode userId
 * @param jobAuditDto 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryJobAudit(jobAuditDto?: JobAuditDto, success?: (data: Result<Page<JobAuditDto>>["data"], response: Result<Page<JobAuditDto>>, xhr: any) => void, error?: (message: Result<Page<JobAuditDto>>["message"], response: Result<Page<JobAuditDto>>, xhr: any) => void, options?: any): Promise<Result<Page<JobAuditDto>>["data"]> {
    return ajax({
        url: `/smcs_job/queryJobAudit`,
        contentType: "application/json",
        data: {
            jobAuditDto: jobAuditDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 获取门店
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function findStore(success?: (data: Result<StoreMessageDto[]>["data"], response: Result<StoreMessageDto[]>, xhr: any) => void, error?: (message: Result<StoreMessageDto[]>["message"], response: Result<StoreMessageDto[]>, xhr: any) => void, options?: any): Promise<Result<StoreMessageDto[]>["data"]> {
    return ajax({
        url: `/smcs_job/findStore`,
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface Result<T> {

    code?: string;

    data?: T;

    success?: boolean;

    message?: string;

}

export interface StoreMessageDto {

    /**
     * 公司code
     */
    companyCode: number;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 门店地址
     */
    storeAddress: string;

    /**
     * 修改人
     */
    updateUser: string;

    /**
     * 门店名称
     */
    storeName: string;

    /**
     * 修改时间
     */
    updateTime: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 0 未删除 1删除
     */
    isDel: number;

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

export interface Page<T> {

    data?: T[];

    totalCount?: number;

}

export interface JobEnrollDto {

    /**
     * 任务结束日期
     */
    jobEndDate: string;

    /**
     * 任务名称
     */
    jobName: string;

    /**
     * 状态（1待审核、2执行中、6已验收、4已拒绝、7已取消）
     */
    jobStatus: number;

    /**
     * 报名结束时间
     */
    entrollEndTime: string;

    /**
     * 验收完成时间
     */
    auditEndTime: string;

    /**
     * 任务开始日期
     */
    jobStartDate: string;

    /**
     * 任务单号
     */
    jobCode: string;

    pageSize?: number;

    /**
     * (1、审核拒绝，0 审核通过)
     */
    auditResult: number;

    /**
     * 门店id
     */
    storeId: number;

    /**
     * 关联模版id
     */
    jobTemplateId: number;

    /**
     * 用户id
     */
    userId: string;

    /**
     * 审核拒绝原因
     */
    auditIsnoReason: string;

    /**
     * 门店1d
     */
    companyId: number;

    /**
     * 报名时间
     */
    enrollTime: string;

    /**
     * 审核时间
     */
    auditTime: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 报名开始时间
     */
    entrollStartTime: string;

    pageNo?: number;

    /**
     * 接单人姓名
     */
    staffName: string;

    /**
     * 门店名称
     */
    storeName: string;

    id: number;

    /**
     * 是否删除 0否 1是
     */
    isDel: number;

}

export interface JobAuditDto {

    /**
     * 任务名称
     */
    jobName: string;

    /**
     * 子单号
     */
    jobSonCode: string;

    /**
     * 任务单号
     */
    jobCode: string;

    pageSize?: number;

    /**
     * 拒绝原因
     */
    checkIsnoReason: string;

    /**
     * 验收人
     */
    checkName: string;

    /**
     * 1验收拒绝 0验收通过
     */
    checkResult: number;

    /**
     * 任务模版id
     */
    jobTemplateId: number;

    /**
     * 薪酬计算表id
     */
    remunerationId: number;

    /**
     * 用户id
     */
    userId: string;

    /**
     * 报名时间
     */
    enrollTime: string;

    /**
     * 验收时间
     */
    checkTime: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 状态（5 未验收，6已验收，4已拒绝，6已取消）
     */
    jobAuditStatus: number;

    pageNo?: number;

    /**
     * 任务结束时间
     */
    jobDateEnd: string;

    /**
     * 员工姓名
     */
    staffName: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 酬金
     */
    remuneration: number;

    /**
     * 0 否 1是
     */
    isDel: number;

    /**
     * 任务开始时间
     */
    jobDateStart: string;

}

export interface JobExecuteMessage {

    jobEnrollDto?: JobEnrollDto;

    jobTemplateDto?: JobTemplateDto;

    /**
     * 国籍
     */
    nationality: string;

    /**
     * 证件号
     */
    certificatesNum: string;

    /**
     * 姓名
     */
    name: string;

    jobAuditDtoList?: Page<JobAuditDto>;

    /**
     * 证件类型
     */
    certificatesType: string;

}

