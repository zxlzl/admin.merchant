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
exports.query = exports.queryByMerchantNo = void 0;
/**
 * @file API：/remit/subAccount
 */
var request_1 = require("@/utils/request");
/**
 * 根据商户号查询商户子账户
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/subAccount/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
/**
 * 根据账户类型查询商户本地账户信息
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function query(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/subAccount/query", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.query = query;
