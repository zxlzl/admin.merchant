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
exports.revoke = exports.applyPay = exports.repay = exports.cancelDetail = exports.lockBatch = exports.updateStatusByPayBatchNo = exports.queryPayDetailsStatistics = exports.queryPayDetailsList = exports.updatePaymentBasisDocument = exports.downLoadTemplate = exports.uploadMerchantDetail = exports.queryPayBatchDetail = exports.queryPayBatchList = exports.detailPayStatus = exports.batchPayStatus = exports.payDetail = exports.queryPayBath = exports.queryPayBatchByPayBatchNo = exports.payBill = exports.queryPayBathSummary = exports.updatePayBatchNo = void 0;
/**
 * @file API：/remit/paybatch
 */
var request_1 = require("@/utils/request");
/**
 * 数据订正批次号
 * @param oldPayBatchNo  旧批次号
 * @param newPayBatchNo  新批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updatePayBatchNo(oldPayBatchNo, newPayBatchNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/updatePayBatchNo", type: "GET", data: {
            oldPayBatchNo: oldPayBatchNo,
            newPayBatchNo: newPayBatchNo
        }, success: success, error: error }, options));
}
exports.updatePayBatchNo = updatePayBatchNo;
/**
 * 打款批次概要
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBathSummary(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/queryPayBathSummary", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayBathSummary = queryPayBathSummary;
/**
 * 费用单
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function payBill(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/payBill", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.payBill = payBill;
/**
 * 按批次号查询打款批次信息
 * @param payBatchNo  打款批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBatchByPayBatchNo(payBatchNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/queryPayBatchByPayBatchNo", data: {
            payBatchNo: payBatchNo
        }, success: success, error: error }, options));
}
exports.queryPayBatchByPayBatchNo = queryPayBatchByPayBatchNo;
/**
 * 打款批次
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBath(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/queryPayBath", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayBath = queryPayBath;
/**
 * 打款详情
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function payDetail(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/payDetail", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.payDetail = payDetail;
/**
 * 查询批次状态枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function batchPayStatus(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/batchPayStatus", success: success, error: error }, options));
}
exports.batchPayStatus = batchPayStatus;
/**
 * 查询明细订单状态枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function detailPayStatus(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/detailPayStatus", success: success, error: error }, options));
}
exports.detailPayStatus = detailPayStatus;
/**
 * 打款批次列表
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBatchList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/queryPayBatchList", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayBatchList = queryPayBatchList;
/**
 * 打款批次详情查询
 * @param payBatchNo  打款批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBatchDetail(payBatchNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/queryPayBatchDetail", data: {
            payBatchNo: payBatchNo
        }, success: success, error: error }, options));
}
exports.queryPayBatchDetail = queryPayBatchDetail;
/**
 * 商户上传打款明细EXCEL
 * @param payBatchNo  批次号
 * @param merchantPayBatchNo  商户自定义批次号
 * @param payChannelCode  打款通道
 * @param totalAmount  总金额
 * @param count  总笔数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function uploadMerchantDetail(payBatchNo, merchantPayBatchNo, payChannelCode, totalAmount, count, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/uploadMerchantDetail", data: {
            payBatchNo: payBatchNo,
            merchantPayBatchNo: merchantPayBatchNo,
            payChannelCode: payChannelCode,
            totalAmount: totalAmount,
            count: count
        }, success: success, error: error }, options));
}
exports.uploadMerchantDetail = uploadMerchantDetail;
/**
 * 下载批量打款明细模板EXCEL
 * @param payChannelCode  打款通道
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function downLoadTemplate(payChannelCode, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/downLoadTemplate", data: {
            payChannelCode: payChannelCode
        }, success: success, error: error }, options));
}
exports.downLoadTemplate = downLoadTemplate;
/**
 * 修改打款依据文件
 * @param payBatchNo  批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updatePaymentBasisDocument(payBatchNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/updatePaymentBasisDocument", data: {
            payBatchNo: payBatchNo
        }, success: success, error: error }, options));
}
exports.updatePaymentBasisDocument = updatePaymentBasisDocument;
/**
 * 打款明细列表
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayDetailsList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/queryPayDetailsList", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayDetailsList = queryPayDetailsList;
/**
 * 打款明细统计
 * @param payBatchNo  批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayDetailsStatistics(payBatchNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/queryPayDetailsStatistics", data: {
            payBatchNo: payBatchNo
        }, success: success, error: error }, options));
}
exports.queryPayDetailsStatistics = queryPayDetailsStatistics;
/**
 * 更新打款批次状态
 * @param status  要变更的状态
 * @param payBatchNo  批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateStatusByPayBatchNo(status, payBatchNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/updateStatusByPayBatchNo", data: {
            status: status,
            payBatchNo: payBatchNo
        }, success: success, error: error }, options));
}
exports.updateStatusByPayBatchNo = updateStatusByPayBatchNo;
/**
 * 锁定批次
 * @param taxPayBatchDTO  批次
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function lockBatch(taxPayBatchDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/lockBatch", contentType: "application/json", data: {
            taxPayBatchDTO: taxPayBatchDTO
        }, success: success, error: error }, options));
}
exports.lockBatch = lockBatch;
/**
 * 撤销
 * @param taxPayBatchDTO  批次明细
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function cancelDetail(taxPayBatchDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/cancelDetail", data: {
            taxPayBatchDTO: taxPayBatchDTO
        }, success: success, error: error }, options));
}
exports.cancelDetail = cancelDetail;
/**
 * 重新打款
 * @param taxPayBatchDTO  批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function repay(taxPayBatchDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/repay", data: {
            taxPayBatchDTO: taxPayBatchDTO
        }, success: success, error: error }, options));
}
exports.repay = repay;
/**
 * 打款申请
 * @param taxPayBatchDTO  批次
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function applyPay(taxPayBatchDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/applyPay", data: {
            taxPayBatchDTO: taxPayBatchDTO
        }, success: success, error: error }, options));
}
exports.applyPay = applyPay;
/**
 * 批次打款撤销
 * @param taxPayBatchDTO  批次
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function revoke(taxPayBatchDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatch/revoke", data: {
            taxPayBatchDTO: taxPayBatchDTO
        }, success: success, error: error }, options));
}
exports.revoke = revoke;
