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
exports.queryServiceOrderPage = exports.queryServiceOrderDetail = exports.queryOrderSettlePage = void 0;
/**
 * @file API：/remit/serviceOrder
 */
var request_1 = require("@/utils/request");
/**
 * 结算明细列表分页查询
 * @param query  传服务单号serviceNo、接单人姓名receiptName、接单人证件号码receiptIdNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryOrderSettlePage(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/serviceOrder/queryOrderSettlePage", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryOrderSettlePage = queryOrderSettlePage;
/**
 * 服务订单列表详情
 * @param id  服务订单主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryServiceOrderDetail(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/serviceOrder/queryServiceOrderDetail", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.queryServiceOrderDetail = queryServiceOrderDetail;
/**
 * 服务订单列表
 * @param query  查询对象
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryServiceOrderPage(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/serviceOrder/queryServiceOrderPage", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryServiceOrderPage = queryServiceOrderPage;
