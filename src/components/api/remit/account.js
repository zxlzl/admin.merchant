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
exports.allocationPay = exports.queryAllAvailable = void 0;
/**
 * @file API：/remit/account
 */
var request_1 = require("@/utils/request");
/**
 * 查询指定商户可用商户账户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllAvailable(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/account/queryAllAvailable", success: success, error: error }, options));
}
exports.queryAllAvailable = queryAllAvailable;
/**
 * 账户间转账
 * @param allocationVO  账户间转账明细
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function allocationPay(allocationVO, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/account/allocationPay", data: {
            allocationVO: allocationVO
        }, success: success, error: error }, options));
}
exports.allocationPay = allocationPay;
