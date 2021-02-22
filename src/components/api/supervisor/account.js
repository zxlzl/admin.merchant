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
exports.queryAllAvailable = exports.queryPage = exports.offlineRecharge = void 0;
/**
 * @file API：/supervisor/account
 */
var request_1 = require("@/utils/request");
/**
 * 线下充值
 * @param rechargeVO  充值内容
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function offlineRecharge(rechargeVO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/account/offlineRecharge", data: {
            rechargeVO: rechargeVO
        }, success: success, error: error }, options));
}
exports.offlineRecharge = offlineRecharge;
/**
 * 查询资金账户列表
 * @param accountVO  查询VO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPage(accountVO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/account/queryPage", contentType: "application/json", data: {
            accountVO: accountVO
        }, success: success, error: error }, options));
}
exports.queryPage = queryPage;
/**
 * 查询所有可用商户账户
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllAvailable(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/account/queryAllAvailable", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryAllAvailable = queryAllAvailable;
