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
exports.queryAccountOrderPage = void 0;
/**
 * @file API：/remit/accountorder
 */
var request_1 = require("@/utils/request");
/**
 * 账户流水
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAccountOrderPage(vo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/accountorder/queryAccountOrderPage", contentType: "application/json", data: {
            vo: vo
        }, success: success, error: error }, options));
}
exports.queryAccountOrderPage = queryAccountOrderPage;
