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
exports.executePay = exports.retryDetailPay = exports.auditPayBatch = exports.payBill = exports.queryPayBathSummary = exports.queryPayDetailsList = exports.downloadPayDetails = exports.detailPayStatus = exports.batchPayStatus = exports.payDetail = exports.queryPayBath = exports.queryPayBatchList = exports.bindUser = void 0;
/**
 * @file API：/supervisor
 */
var request_1 = require("@/utils/request");
/**
 * 关联商户账号
 * @param taxMerchantUserDTO  关联商户账号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function bindUser(taxMerchantUserDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/bindUser", data: {
            taxMerchantUserDTO: taxMerchantUserDTO
        }, success: success, error: error }, options));
}
exports.bindUser = bindUser;
/**
 * 打款批次列表
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBatchList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/queryPayBatchList", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayBatchList = queryPayBatchList;
/**
 * 打款批次
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBath(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/queryPayBath", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayBath = queryPayBath;
/**
 * 打款详情
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function payDetail(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/payDetail", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.payDetail = payDetail;
/**
 * 查询批次状态枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function batchPayStatus(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/batchPayStatus", success: success, error: error }, options));
}
exports.batchPayStatus = batchPayStatus;
/**
 * 查询明细订单状态枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function detailPayStatus(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/detailPayStatus", success: success, error: error }, options));
}
exports.detailPayStatus = detailPayStatus;
/**
 * 导出打款明细
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function downloadPayDetails(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/downloadPayDetails", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.downloadPayDetails = downloadPayDetails;
/**
 * 打款明细列表
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayDetailsList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/queryPayDetailsList", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayDetailsList = queryPayDetailsList;
/**
 * 打款批次概要
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBathSummary(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/queryPayBathSummary", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayBathSummary = queryPayBathSummary;
/**
 * 费用单
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function payBill(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/payBill", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.payBill = payBill;
/**
 * 打款批次审核
 * @param taxPayBatchAuditDTO  批次审核对象
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function auditPayBatch(taxPayBatchAuditDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/auditPayBatch", data: {
            taxPayBatchAuditDTO: taxPayBatchAuditDTO
        }, success: success, error: error }, options));
}
exports.auditPayBatch = auditPayBatch;
/**
 * 重试打款
 * @param taxPayBatchDetailDTO  批次明细
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function retryDetailPay(taxPayBatchDetailDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/retryDetailPay", contentType: "application/json", data: {
            taxPayBatchDetailDTO: taxPayBatchDetailDTO
        }, success: success, error: error }, options));
}
exports.retryDetailPay = retryDetailPay;
/**
 * 打款
 * @param taxPayBatchDTO  批次
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function executePay(taxPayBatchDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/executePay", contentType: "application/json", data: {
            taxPayBatchDTO: taxPayBatchDTO
        }, success: success, error: error }, options));
}
exports.executePay = executePay;
