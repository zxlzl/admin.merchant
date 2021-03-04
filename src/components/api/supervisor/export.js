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
exports.exportAccountDetail = exports.exportPayOrderDetail = exports.exportPayBatchDetail = exports.exportPayBatch = void 0;
/**
 * @file API：/supervisor/export
 */
var request_1 = require("@/utils/request");
/**
 * 导出批次记录
 * @param request
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function exportPayBatch(request, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/export/exportPayBatch", contentType: "application/json", data: {
            request: request
        }, success: success, error: error }, options));
}
exports.exportPayBatch = exportPayBatch;
/**
 * 导出批次详情
 * @param request  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function exportPayBatchDetail(request, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/export/exportPayBatchDetail", contentType: "application/json", data: {
            request: request
        }, success: success, error: error }, options));
}
exports.exportPayBatchDetail = exportPayBatchDetail;
/**
 * 导出明细订单
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function exportPayOrderDetail(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/export/exportPayOrderDetail", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.exportPayOrderDetail = exportPayOrderDetail;
/**
 * 导出账务详情
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function exportAccountDetail(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/export/exportAccountDetail", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.exportAccountDetail = exportAccountDetail;
