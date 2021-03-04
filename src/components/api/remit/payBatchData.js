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
exports.queryPayBatchDetail = exports.queryMyInfo = exports.queryMerchantChannelListBalance = exports.countPayBatchData = exports.queryPayBatchList = void 0;
/**
 * @file API：/remit/payBatchData
 */
var request_1 = require("@/utils/request");
/**
 * 打款批次列表
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBatchList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/payBatchData/queryPayBatchList", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryPayBatchList = queryPayBatchList;
/**
 * 查询商户批次统计数据
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function countPayBatchData(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/payBatchData/countPayBatchData", success: success, error: error }, options));
}
exports.countPayBatchData = countPayBatchData;
/**
 * 查询商户已开通通道列表余额
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryMerchantChannelListBalance(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/payBatchData/queryMerchantChannelListBalance", success: success, error: error }, options));
}
exports.queryMerchantChannelListBalance = queryMerchantChannelListBalance;
/**
 * 查询我的信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryMyInfo(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/payBatchData/queryMyInfo", success: success, error: error }, options));
}
exports.queryMyInfo = queryMyInfo;
/**
 * 打款批次详情查询
 * @param payBatchNo  打款批次号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayBatchDetail(payBatchNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/payBatchData/queryPayBatchDetail", data: {
            payBatchNo: payBatchNo
        }, success: success, error: error }, options));
}
exports.queryPayBatchDetail = queryPayBatchDetail;
