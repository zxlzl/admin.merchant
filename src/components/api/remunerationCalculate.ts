/**
 * @file API：/remunerationCalculate
 */
import { ajax } from "@/utils/request";

/**
 * 查询酬金计算列表
 * @param remunerationCalculateDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryPageByRemunerationCalculateDto(remunerationCalculateDto?: RemunerationCalculateDto, success?: (data: Result<Page<RemunerationCalculate>>["data"], response: Result<Page<RemunerationCalculate>>, xhr: any) => void, error?: (message: Result<Page<RemunerationCalculate>>["message"], response: Result<Page<RemunerationCalculate>>, xhr: any) => void, options?: any): Promise<Result<Page<RemunerationCalculate>>["data"]> {
    return ajax({
        url: `/remunerationCalculate/queryPageByRemunerationCalculateDto`,
        type: "POST",
        contentType: "application/json",
        data: {
            remunerationCalculateDto: remunerationCalculateDto
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据企业remunerationCalculate主键 id 查询关联任务单，分页
 * @param remunerationCalculateId  remunerationCalculate主键
 * @param pageNo 
 * @param pageSize 
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function queryJobAuditsByRemunerationId(remunerationCalculateId?: number, pageNo?: number, pageSize?: number, success?: (data: Result<Page<JobAuditDto>>["data"], response: Result<Page<JobAuditDto>>, xhr: any) => void, error?: (message: Result<Page<JobAuditDto>>["message"], response: Result<Page<JobAuditDto>>, xhr: any) => void, options?: any): Promise<Result<Page<JobAuditDto>>["data"]> {
    return ajax({
        url: `/remunerationCalculate/queryJobAuditsByRemunerationId`,
        type: "GET",
        data: {
            remunerationCalculateId: remunerationCalculateId,
            pageNo: pageNo,
            pageSize: pageSize
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

/**
 * 根据 ID 查询酬金计算
 * @param id  主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
export function getById(id?: number, success?: (data: Result<RemunerationCalculate>["data"], response: Result<RemunerationCalculate>, xhr: any) => void, error?: (message: Result<RemunerationCalculate>["message"], response: Result<RemunerationCalculate>, xhr: any) => void, options?: any): Promise<Result<RemunerationCalculate>["data"]> {
    return ajax({
        url: `/remunerationCalculate/getById`,
        type: "GET",
        data: {
            id: id
        },
        success: success,
        error: error,
        ...options
    }) as any;
}

export interface RemunerationCalculateDto {

    /**
     * 收入额
     */
    income: number;

    /**
     * 创建人
     */
    createUserId: number;

    /**
     * 用户服务费率
     */
    userServiceRate: number;

    /**
     * 国籍
     */
    nation: string;

    /**
     * 计算规则 1 人工计算
     */
    calcRule: number;

    /**
     * 企业服务费率
     */
    companyServiceRate: number;

    pageSize?: number;

    /**
     * 备注
     */
    remark: string;

    /**
     * 个税申报地
     */
    incomeTaxLocation: string;

    /**
     * 商户主体
     */
    merchantName: string;

    /**
     * 银行
     */
    bank: string;

    /**
     * 证件类型，1 身份证
     */
    idCardType: number;

    /**
     * 实际收入
     */
    realIncome: number;

    /**
     * 付款总额
     */
    totalPay: number;

    /**
     * 企业服务费
     */
    companyServiceFee: number;

    pageNo?: number;

    /**
     * 用户服务费
     */
    userServiceFee: number;

    /**
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 银行卡号
     */
    bankNo: string;

    /**
     * 服务主体编号
     */
    collectedSubjectNo: string;

    /**
     * 证件号码
     */
    idCardNu: string;

    /**
     * 搜索开始时间
     */
    startTime: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 更新人
     */
    updateUserId: number;

    /**
     * 更新时间
     */
    updateTime: string;

    /**
     * 酬金编号
     */
    remunerationNo: string;

    /**
     * 用户ID，来源财税系统
     */
    userId: number;

    /**
     * 银行预留手机号
     */
    bankPhone: string;

    /**
     * 税款所属月份，例如 2020-06
     */
    month: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 个税
     */
    incomeTax: number;

    /**
     * 收款方式 1 银行卡
     */
    paymentMethod: number;

    /**
     * 搜索结束时间
     */
    endTime: string;

    /**
     * 0 未删除，1 删除
     */
    isDel: boolean;

    /**
     * 酬金模板，1-居民服务酬金；2-非居民服务酬金
     */
    remunerationTemplate: number;

    /**
     * 商户主体编号
     */
    merchantNo: string;

    /**
     * 0 待结算 1 已结算 2 已取消
     */
    status: number;

    /**
     * 姓名，来源财税系统
     */
    username: string;

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

export interface RemunerationCalculate {

    /**
     * 收入额
     */
    income: number;

    /**
     * 创建人
     */
    createUserId: number;

    /**
     * 用户服务费率
     */
    userServiceRate: number;

    /**
     * 国籍
     */
    nation: string;

    /**
     * 计算规则 1 人工计算
     */
    calcRule: number;

    /**
     * 企业服务费率
     */
    companyServiceRate: number;

    /**
     * 备注
     */
    remark: string;

    /**
     * 个税申报地
     */
    incomeTaxLocation: string;

    /**
     * 商户主体
     */
    merchantName: string;

    /**
     * 银行
     */
    bank: string;

    /**
     * 证件类型，1 身份证
     */
    idCardType: number;

    /**
     * 实际收入
     */
    realIncome: number;

    /**
     * 付款总额
     */
    totalPay: number;

    /**
     * 企业服务费
     */
    companyServiceFee: number;

    /**
     * 用户服务费
     */
    userServiceFee: number;

    /**
     * 服务主体名称
     */
    collectedSubjectName: string;

    /**
     * 银行卡号
     */
    bankNo: string;

    /**
     * 服务主体编号
     */
    collectedSubjectNo: string;

    /**
     * 证件号码
     */
    idCardNu: string;

    /**
     * 主键
     */
    id: number;

    /**
     * 更新人
     */
    updateUserId: number;

    /**
     * 更新时间
     */
    updateTime: string;

    /**
     * 酬金编号
     */
    remunerationNo: string;

    /**
     * 用户ID，来源财税系统
     */
    userId: number;

    /**
     * 银行预留手机号
     */
    bankPhone: string;

    /**
     * 税款所属月份，例如 2020-06
     */
    month: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 个税
     */
    incomeTax: number;

    /**
     * 收款方式 1 银行卡
     */
    paymentMethod: number;

    /**
     * 0 未删除，1 删除
     */
    isDel: boolean;

    /**
     * 酬金模板，1-居民服务酬金；2-非居民服务酬金
     */
    remunerationTemplate: number;

    /**
     * 商户主体编号
     */
    merchantNo: string;

    /**
     * 0 待结算 1 已结算 2 已取消
     */
    status: number;

    /**
     * 姓名，来源财税系统
     */
    username: string;

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

