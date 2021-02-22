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
exports.queryOrder = exports.queryPayOrderPage = void 0;
/**
 * @file API：/supervisor/payorder
 */
var request_1 = require("@/utils/request");
/**
 * 资金明细列表
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayOrderPage(vo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/payorder/queryPayOrderPage", contentType: "application/json", data: {
            vo: vo
        }, success: success, error: error }, options));
}
exports.queryPayOrderPage = queryPayOrderPage;
/**
 * 资金明细
 * @param id  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryOrder(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/payorder/queryOrder", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.queryOrder = queryOrder;
