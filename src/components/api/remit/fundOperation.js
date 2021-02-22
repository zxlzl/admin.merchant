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
exports.getOne = exports.getRebateAmount = exports.getList = exports.export_1 = void 0;
/**
 * @file API：/remit/fundOperation
 */
var request_1 = require("@/utils/request");
/**
 * 资金操作记录导出
 * @param fundOperationQuery
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function export_1(fundOperationQuery, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/fundOperation/export", type: "POST", contentType: "application/json", data: {
            fundOperationQuery: fundOperationQuery
        }, success: success, error: error }, options));
}
exports.export_1 = export_1;
/**
 * 资金操作记录列表
 * @param fundOperationQuery
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getList(fundOperationQuery, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/fundOperation/getList", type: "POST", contentType: "application/json", data: {
            fundOperationQuery: fundOperationQuery
        }, success: success, error: error }, options));
}
exports.getList = getList;
/**
 * 查询可用余额 上月返点 累计返点
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getRebateAmount(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/fundOperation/getRebateAmount", type: "POST", success: success, error: error }, options));
}
exports.getRebateAmount = getRebateAmount;
/**
 * 资金操作记录详情
 * @param id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getOne(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/fundOperation/getOne", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.getOne = getOne;
