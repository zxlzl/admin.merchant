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
exports.queryByMerchantNo = exports.queryPayChanleByMerchantNo = void 0;
/**
 * @file API：/remit/merchantproduct
 */
var request_1 = require("@/utils/request");
/**
 * 查询商户配置的可用发放通道
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayChanleByMerchantNo(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchantproduct/queryPayChanleByMerchantNo", success: success, error: error }, options));
}
exports.queryPayChanleByMerchantNo = queryPayChanleByMerchantNo;
/**
 * 查询商户产品信息
 * @param merchantNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchantproduct/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
