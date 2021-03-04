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
exports.invoiceBillDetail = exports.invoiceDetail = exports.PrepaidInvoice = exports.cancelRefundApply = exports.refundInvoiceApply = exports.cancelApply = exports.invoicingVerify = exports.pagePrepaidInvoice = exports.refundVerify = exports.pageInvoiceInfo = void 0;
/**
 * @file API：/supervisor/invoiceInfo
 */
var request_1 = require("@/utils/request");
/**
 * 查询发票(管理后台商户号选填)
 * @param params
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function pageInvoiceInfo(params, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/pageInvoiceInfo", data: {
            params: params
        }, success: success, error: error }, options));
}
exports.pageInvoiceInfo = pageInvoiceInfo;
/**
 * 退票核销
 * @param refundInvoiceVerifyDTO  退票核销参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function refundVerify(refundInvoiceVerifyDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/refundVerify", type: "POST", data: {
            refundInvoiceVerifyDTO: refundInvoiceVerifyDTO
        }, success: success, error: error }, options));
}
exports.refundVerify = refundVerify;
/**
 * 查询预充值发票(管理后台商户号选填)
 * @param params
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function pagePrepaidInvoice(params, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/pagePrepaidInvoice", data: {
            params: params
        }, success: success, error: error }, options));
}
exports.pagePrepaidInvoice = pagePrepaidInvoice;
/**
 * 开票核销
 * @param inoicingVerifyDTO  开票核销参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function invoicingVerify(inoicingVerifyDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/invoicingVerify", type: "POST", data: {
            inoicingVerifyDTO: inoicingVerifyDTO
        }, success: success, error: error }, options));
}
exports.invoicingVerify = invoicingVerify;
/**
 * 撤销开票申请
 * @param applyNo  申请单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function cancelApply(applyNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/cancelApply", type: "POST", data: {
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
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/refundInvoiceApply", type: "POST", data: {
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
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/cancelRefundApply", type: "POST", data: {
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
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/PrepaidInvoice", data: {
            params: params
        }, success: success, error: error }, options));
}
exports.PrepaidInvoice = PrepaidInvoice;
/**
 * 查看发票详情&查看发票影像
 * @param applyNo  申请单号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function invoiceDetail(applyNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/invoiceDetail", type: "POST", data: {
            applyNo: applyNo
        }, success: success, error: error }, options));
}
exports.invoiceDetail = invoiceDetail;
/**
 * 查看发票账单明细
 * @param applyNo  申请单号
 * @param curPage  当前页码
 * @param pageSize  每页多少条
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function invoiceBillDetail(applyNo, curPage, pageSize, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/invoiceInfo/invoiceBillDetail", type: "POST", data: {
            applyNo: applyNo,
            curPage: curPage,
            pageSize: pageSize
        }, success: success, error: error }, options));
}
exports.invoiceBillDetail = invoiceBillDetail;
