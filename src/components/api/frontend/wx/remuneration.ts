/**
 * @file API：/frontend/wx/remuneration
 */
import { ajax } from "@/utils/request";

/**
 * 查询用户酬金
 * @param JobAuditDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryUserRemuneration(JobAuditDto?: JobAuditDto, success?: (data: Result<WxUserRemunerationDto>["data"], response: Result<WxUserRemunerationDto>, xhr: any) => void, error?: (message: Result<WxUserRemunerationDto>["message"], response: Result<WxUserRemunerationDto>, xhr: any) => void, options?: any): Promise<Result<WxUserRemunerationDto>["data"]> {
    return ajax({
        url: `/frontend/wx/remuneration/queryUserRemuneration`,
        type: "POST",
        contentType: "application/json",
        data: {
            JobAuditDto: JobAuditDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
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

export interface WxUserJobRemunerationDto {

    /**
     * 任务名称
     */
    jobName: string;

    /**
     * 酬金是否发放
     */
    isPay: string;

    /**
     * 任务时间
     */
    jobStartDate: number;

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
     * 任务总酬金
     */
    sumRemuneration: number;

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

export interface WxUserRemunerationDto {

    /**
     * 总金额
     */
    total: number;

    /**
     * 任务金额列表
     */
    jobRemunerationDtos: Page<WxUserJobRemunerationDto>;

}

