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
exports.updateSettleInfo = exports.queryByMerchantNo = exports.addSettleInfo = void 0;
/**
 * @file API：/supervisor/merchantSettleInfo
 */
var request_1 = require("@/utils/request");
/**
 * 新增结算信息
 * @param settleInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function addSettleInfo(settleInfoDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantSettleInfo/addSettleInfo", type: "POST", data: {
            settleInfoDTO: settleInfoDTO
        }, success: success, error: error }, options));
}
exports.addSettleInfo = addSettleInfo;
/**
 * 根据商户号查询结算信息
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantSettleInfo/queryByMerchantNo", type: "POST", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
/**
 * 更新结算信息
 * @param settleInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateSettleInfo(settleInfoDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantSettleInfo/updateSettleInfo", type: "POST", data: {
            settleInfoDTO: settleInfoDTO
        }, success: success, error: error }, options));
}
exports.updateSettleInfo = updateSettleInfo;
