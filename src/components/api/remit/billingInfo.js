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
exports.confirmInvoicing = exports.invoicingApply = exports.queryInvoiceStatusList = exports.queryInvoiceCategoryList = exports.billDetail = exports.pageBillingInfo = void 0;
/**
 * @file API：/remit/billingInfo
 */
var request_1 = require("@/utils/request");
/**
 * 查询账单
 * @param params
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function pageBillingInfo(params, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/billingInfo/pageBillingInfo", data: {
            params: params
        }, success: success, error: error }, options));
}
exports.pageBillingInfo = pageBillingInfo;
/**
 * 查看账单详情
 * @param query  查询对象，参数billNo必填
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function billDetail(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/billingInfo/billDetail", type: "POST", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.billDetail = billDetail;
/**
 * 查询开票类目枚举列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryInvoiceCategoryList(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/billingInfo/queryInvoiceCategoryList", type: "POST", success: success, error: error }, options));
}
exports.queryInvoiceCategoryList = queryInvoiceCategoryList;
/**
 * 查询开票状态枚举列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryInvoiceStatusList(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/billingInfo/queryInvoiceStatusList", type: "POST", success: success, error: error }, options));
}
exports.queryInvoiceStatusList = queryInvoiceStatusList;
/**
 * 申请开票(查询开票信息,商户号自动获取)
 * @param billNoJson  账单编号数组
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function invoicingApply(billNoJson, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/billingInfo/invoicingApply", type: "POST", data: {
            billNoJson: billNoJson
        }, success: success, error: error }, options));
}
exports.invoicingApply = invoicingApply;
/**
 * 确定开票(商户号自动获取)
 * @param invoiceDTO  开票信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function confirmInvoicing(invoiceDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/billingInfo/confirmInvoicing", type: "POST", data: {
            invoiceDTO: invoiceDTO
        }, success: success, error: error }, options));
}
exports.confirmInvoicing = confirmInvoicing;
