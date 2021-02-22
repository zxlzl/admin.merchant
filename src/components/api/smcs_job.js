"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.findStore = exports.queryJobAudit = exports.checkJobTicket = exports.auditJobTicket = exports.findJobExecute = exports.queryJobExecute = exports.jobOffTheShelf = exports.jobOnTheShelf = exports.updateJob = exports.createJob = exports.findJobMessage = exports.queryJobMessage = exports.deletJob = exports.insertStoreMessage = exports.getBid = void 0;
/**
 * @file API：/smcs_job
 */
var request_1 = require("@/utils/request");
/**
 * 获取上传图片所用的bid 每次上传图片时将bid传到后台
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getBid(success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/getBid", success: success, error: error }, options));
}
exports.getBid = getBid;
/**
 * 添加门店信息
 * @param storeMessageDto
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function insertStoreMessage(storeMessageDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/insertStoreMessage", contentType: "application/json", data: {
            storeMessageDto: storeMessageDto
        }, success: success, error: error }, options));
}
exports.insertStoreMessage = insertStoreMessage;
/**
 * 删除任务
 * @param id  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function deletJob(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/deletJob", contentType: "application/json", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.deletJob = deletJob;
/**
 * 查看任务列表详情 以及详情页面的按条件查询
 * @param jobTemplateDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryJobMessage(jobTemplateDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/queryJobMessage", contentType: "application/json", data: {
            jobTemplateDto: jobTemplateDto
        }, success: success, error: error }, options));
}
exports.queryJobMessage = queryJobMessage;
/**
 * 查看任务详情
 * @param jobTemplateDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function findJobMessage(jobTemplateDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/findJobMessage", contentType: "application/json", data: {
            jobTemplateDto: jobTemplateDto
        }, success: success, error: error }, options));
}
exports.findJobMessage = findJobMessage;
/**
 * 新建任务
 * @param jobTemplateDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function createJob(jobTemplateDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/createJob", contentType: "application/json", data: {
            jobTemplateDto: jobTemplateDto
        }, success: success, error: error }, options));
}
exports.createJob = createJob;
/**
 * 编辑任务
 * @param jobTemplateDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateJob(jobTemplateDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/updateJob", contentType: "application/json", data: {
            jobTemplateDto: jobTemplateDto
        }, success: success, error: error }, options));
}
exports.updateJob = updateJob;
/**
 * 上架任务
 * @param id  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function jobOnTheShelf(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/jobOnTheShelf", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.jobOnTheShelf = jobOnTheShelf;
/**
 * 下架任务
 * @param id  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function jobOffTheShelf(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/jobOffTheShelf", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.jobOffTheShelf = jobOffTheShelf;
/**
 * 任务执行列表 包括列表条件查询
 * @param jobEnrollDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryJobExecute(jobEnrollDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/queryJobExecute", contentType: "application/json", data: {
            jobEnrollDto: jobEnrollDto
        }, success: success, error: error }, options));
}
exports.queryJobExecute = queryJobExecute;
/**
 * 查看任务执行详情 jobCode + userId
 * @param jobEnrollDto
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function findJobExecute(jobEnrollDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/findJobExecute", contentType: "application/json", data: {
            jobEnrollDto: jobEnrollDto
        }, success: success, error: error }, options));
}
exports.findJobExecute = findJobExecute;
/**
 * 审核任务单 jobCode + userId + auditResult + auditIsnoReason
 * @param jobEnrollDto
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function auditJobTicket(jobEnrollDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/auditJobTicket", contentType: "application/json", data: {
            jobEnrollDto: jobEnrollDto
        }, success: success, error: error }, options));
}
exports.auditJobTicket = auditJobTicket;
/**
 * 验收任务单 jobCode + jobSonCode + userId + checkResult + checkIsnoReason + remuneration
 * @param jobAuditDto
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function checkJobTicket(jobAuditDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/checkJobTicket", contentType: "application/json", data: {
            jobAuditDto: jobAuditDto
        }, success: success, error: error }, options));
}
exports.checkJobTicket = checkJobTicket;
/**
 * 查询任务验收列表 pageNo pageSize jobCode userId
 * @param jobAuditDto
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryJobAudit(jobAuditDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/queryJobAudit", contentType: "application/json", data: {
            jobAuditDto: jobAuditDto
        }, success: success, error: error }, options));
}
exports.queryJobAudit = queryJobAudit;
/**
 * 获取门店
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function findStore(success, error, options) {
    return request_1.ajax(__assign({ url: "/smcs_job/findStore", success: success, error: error }, options));
}
exports.findStore = findStore;
