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
exports.queryAllAccounts = exports.updateAccount = exports.genSequence = exports.adjustAccount = exports.openAccount = exports.queryAllChangeTypes = void 0;
/**
 * @file API：/supervisor/accountOpt
 */
var request_1 = require("@/utils/request");
/**
 * 查询所有的账务类型
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllChangeTypes(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/accountOpt/queryAllChangeTypes", success: success, error: error }, options));
}
exports.queryAllChangeTypes = queryAllChangeTypes;
/**
 * 开户操作
 * @param accountDO  accountDO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function openAccount(accountDO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/accountOpt/openAccount", contentType: "application/json", data: {
            accountDO: accountDO
        }, success: success, error: error }, options));
}
exports.openAccount = openAccount;
/**
 * 调账
 * @param adjustBillOrder  调账
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function adjustAccount(adjustBillOrder, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/accountOpt/adjustAccount", contentType: "application/json", data: {
            adjustBillOrder: adjustBillOrder
        }, success: success, error: error }, options));
}
exports.adjustAccount = adjustAccount;
/**
 * 生成订单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function genSequence(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/accountOpt/genSequence", success: success, error: error }, options));
}
exports.genSequence = genSequence;
/**
 * 账户更新
 * @param accountDO  accountDO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateAccount(accountDO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/accountOpt/updateAccount", contentType: "application/json", data: {
            accountDO: accountDO
        }, success: success, error: error }, options));
}
exports.updateAccount = updateAccount;
/**
 * 查询所有平台账户
 * @param query  查询参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllAccounts(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/accountOpt/queryAllAccounts", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryAllAccounts = queryAllAccounts;
