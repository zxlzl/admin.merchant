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
exports.invoiceDetail = exports.pageInvoiceInfo = exports.PrepaidInvoice = exports.cancelRefundApply = exports.refundInvoiceApply = exports.cancelApply = exports.invoiceBillDetail = void 0;
/**
 * @file API：/remit/invoiceInfo
 */
var request_1 = require("@/utils/request");
/**
 * 查看发票账单明细
 * @param applyNo  申请单号
 * @param curPage  当前页码
 * @param pageSize  每页多少条
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function invoiceBillDetail(applyNo, curPage, pageSize, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/invoiceInfo/invoiceBillDetail", type: "POST", data: {
            applyNo: applyNo,
            curPage: curPage,
            pageSize: pageSize
        }, success: success, error: error }, options));
}
exports.invoiceBillDetail = invoiceBillDetail;
/**
 * 撤销开票申请
 * @param applyNo  申请单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function cancelApply(applyNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/invoiceInfo/cancelApply", type: "POST", data: {
            applyNo: applyNo
        }, success: success, error: error }, options));
}
exports.cancelApply = cancelApply;
/**
 * 退票申请
 * @param refundInvoiceDto  退票参数对象
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function refundInvoiceApply(refundInvoiceDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/invoiceInfo/refundInvoiceApply", type: "POST", data: {
            refundInvoiceDto: refundInvoiceDto
        }, success: success, error: error }, options));
}
exports.refundInvoiceApply = refundInvoiceApply;
/**
 * 撤销退票申请
 * @param applyNo  申请单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function cancelRefundApply(applyNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/invoiceInfo/cancelRefundApply", type: "POST", data: {
            applyNo: applyNo
        }, success: success, error: error }, options));
}
exports.cancelRefundApply = cancelRefundApply;
/**
 * 查询预充值发票(商户后台商户号自动获取)
 * @param params
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function PrepaidInvoice(params, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/invoiceInfo/PrepaidInvoice", data: {
            params: params
        }, success: success, error: error }, options));
}
exports.PrepaidInvoice = PrepaidInvoice;
/**
 * 查询发票(商户后台商户号自动获取)
 * @param params
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function pageInvoiceInfo(params, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/invoiceInfo/pageInvoiceInfo", data: {
            params: params
        }, success: success, error: error }, options));
}
exports.pageInvoiceInfo = pageInvoiceInfo;
/**
 * 查看发票详情&查看发票影像
 * @param applyNo  申请单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function invoiceDetail(applyNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/invoiceInfo/invoiceDetail", type: "POST", data: {
            applyNo: applyNo
        }, success: success, error: error }, options));
}
exports.invoiceDetail = invoiceDetail;
