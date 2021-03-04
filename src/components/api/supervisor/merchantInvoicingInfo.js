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
exports.queryInvoicingInfo = exports.queryPrepaidInvoicingInfo = exports.addInvoicingInfo = exports.queryByMerchantNo = exports.updateInvoicingInfo = exports.queryPrepaidByMerchantNo = void 0;
/**
 * @file API：/supervisor/merchantInvoicingInfo
 */
var request_1 = require("@/utils/request");
/**
 * 根据商户号查询开票信息(开票页面使用，没有类目报错)
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPrepaidByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantInvoicingInfo/queryPrepaidByMerchantNo", type: "POST", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryPrepaidByMerchantNo = queryPrepaidByMerchantNo;
/**
 * 更新开票信息
 * @param billingInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateInvoicingInfo(billingInfoDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantInvoicingInfo/updateInvoicingInfo", type: "POST", data: {
            billingInfoDTO: billingInfoDTO
        }, success: success, error: error }, options));
}
exports.updateInvoicingInfo = updateInvoicingInfo;
/**
 * 根据商户号查询开票信息
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantInvoicingInfo/queryByMerchantNo", type: "POST", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
/**
 * 新增开票信息
 * @param billingInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function addInvoicingInfo(billingInfoDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantInvoicingInfo/addInvoicingInfo", type: "POST", data: {
            billingInfoDTO: billingInfoDTO
        }, success: success, error: error }, options));
}
exports.addInvoicingInfo = addInvoicingInfo;
/**
 * 查询开票信息(开票页面使用，没有类目报错)
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPrepaidInvoicingInfo(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantInvoicingInfo/queryPrepaidInvoicingInfo", type: "POST", success: success, error: error }, options));
}
exports.queryPrepaidInvoicingInfo = queryPrepaidInvoicingInfo;
/**
 * 查询开票信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryInvoicingInfo(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantInvoicingInfo/queryInvoicingInfo", type: "POST", success: success, error: error }, options));
}
exports.queryInvoicingInfo = queryInvoicingInfo;
