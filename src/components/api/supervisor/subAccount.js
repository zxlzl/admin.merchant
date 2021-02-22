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
exports.update = exports.queryByMerchantNo = exports.getTaxMerchantPayProject = exports.addPayProject = exports.queryPinganyiByMerchant = exports.queryAccount = void 0;
/**
 * @file API：/supervisor/subAccount
 */
var request_1 = require("@/utils/request");
/**
 * 平安充值专户查询
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAccount(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/subAccount/queryAccount", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryAccount = queryAccount;
/**
 * 查询商户平安易资金监管充值账户（项目）
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPinganyiByMerchant(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/subAccount/queryPinganyiByMerchant", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryPinganyiByMerchant = queryPinganyiByMerchant;
/**
 * 添加商户平安易项目
 * @param taxSubAccountDTO  添加商户平安易项目
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function addPayProject(taxSubAccountDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/subAccount/addPayProject", data: {
            taxSubAccountDTO: taxSubAccountDTO
        }, success: success, error: error }, options));
}
exports.addPayProject = addPayProject;
/**
 * 项目信息查询
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getTaxMerchantPayProject(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/subAccount/getTaxMerchantPayProject", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.getTaxMerchantPayProject = getTaxMerchantPayProject;
/**
 * 根据商户号查询商户子账户
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/subAccount/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
/**
 * 更新商户平安易项目
 * @param taxSubAccountDTO  商户子账户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function update(taxSubAccountDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/subAccount/update", data: {
            taxSubAccountDTO: taxSubAccountDTO
        }, success: success, error: error }, options));
}
exports.update = update;
