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
exports.queryPrepaidInvoicingInfo = exports.queryInvoicingInfo = void 0;
/**
 * @file API：/remit/merchantInvoicingInfo
 */
var request_1 = require("@/utils/request");
/**
 * 查询开票信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryInvoicingInfo(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchantInvoicingInfo/queryInvoicingInfo", type: "POST", success: success, error: error }, options));
}
exports.queryInvoicingInfo = queryInvoicingInfo;
/**
 * 查询开票信息(开票页面使用，没有类目报错)
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPrepaidInvoicingInfo(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchantInvoicingInfo/queryPrepaidInvoicingInfo", type: "POST", success: success, error: error }, options));
}
exports.queryPrepaidInvoicingInfo = queryPrepaidInvoicingInfo;
