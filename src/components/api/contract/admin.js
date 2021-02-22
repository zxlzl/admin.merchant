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
exports.signType = exports.batchInvite = exports.page = exports.detail = void 0;
/**
 * @file API：/contract/admin
 */
var request_1 = require("@/utils/request");
/**
 * 签约详情
 * @param signId  签约记录ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function detail(signId, success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/admin/detail", data: {
            signId: signId
        }, success: success, error: error }, options));
}
exports.detail = detail;
/**
 * 分页查询签约记录
 * @param contractSignQuery  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function page(contractSignQuery, success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/admin/page", data: {
            contractSignQuery: contractSignQuery
        }, success: success, error: error }, options));
}
exports.page = page;
/**
 * 批量邀请
 * @param contractSignQuery  签约记录ID们,英文逗号分隔
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function batchInvite(contractSignQuery, success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/admin/batchInvite", contentType: "application/json", data: {
            contractSignQuery: contractSignQuery
        }, success: success, error: error }, options));
}
exports.batchInvite = batchInvite;
/**
 * 签约配置枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function signType(success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/admin/signType", success: success, error: error }, options));
}
exports.signType = signType;
