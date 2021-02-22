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
exports.checkAuthentication = exports.queryAuthenticationList = exports.queryAuthenticationDetail = void 0;
/**
 * @file API：/supervisor/authentication
 */
var request_1 = require("@/utils/request");
/**
 * 查询免验证详情
 * @param id  查询免验证详情
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAuthenticationDetail(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/authentication/queryAuthenticationDetail", type: "POST", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.queryAuthenticationDetail = queryAuthenticationDetail;
/**
 * 免验证列表查询
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAuthenticationList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/authentication/queryAuthenticationList", type: "POST", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryAuthenticationList = queryAuthenticationList;
/**
 * 审核免验证
 * @param id  免验证id
 * @param checkStatus  审核状态1:审核通过 2:审核拒绝
 * @param checkMemo  审核备注
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function checkAuthentication(id, checkStatus, checkMemo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/authentication/checkAuthentication", type: "POST", data: {
            id: id,
            checkStatus: checkStatus,
            checkMemo: checkMemo
        }, success: success, error: error }, options));
}
exports.checkAuthentication = checkAuthentication;
