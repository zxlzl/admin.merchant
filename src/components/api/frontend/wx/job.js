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
exports.cancelJobById = exports.applyJobById = exports.getJobDetails = exports.queryJobsByState = exports.queryLatestJobs = void 0;
/**
 * @file API：/frontend/wx/job
 */
var request_1 = require("@/utils/request");
/**
 * 获取最新任务
 * @param JobTemplateDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryLatestJobs(JobTemplateDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/wx/job/queryLatestJobs", type: "POST", contentType: "application/json", data: {
            JobTemplateDto: JobTemplateDto
        }, success: success, error: error }, options));
}
exports.queryLatestJobs = queryLatestJobs;
/**
 * 根据任务状态获取用户关联的任务
 * @param JobTemplateDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryJobsByState(JobTemplateDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/wx/job/queryJobsByState", type: "POST", contentType: "application/json", data: {
            JobTemplateDto: JobTemplateDto
        }, success: success, error: error }, options));
}
exports.queryJobsByState = queryJobsByState;
/**
 * 根据任务id获取任务详情信息
 * @param id  任务id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getJobDetails(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/wx/job/getJobDetails", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.getJobDetails = getJobDetails;
/**
 * 报名某任务
 * @param id  任务id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function applyJobById(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/wx/job/applyJobById", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.applyJobById = applyJobById;
/**
 * 取消某任务
 * @param id  任务id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function cancelJobById(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/wx/job/cancelJobById", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.cancelJobById = cancelJobById;
