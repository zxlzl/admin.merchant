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
exports.update = exports.add = exports.queryPayChannel = exports.queryByMerchantNo = void 0;
/**
 * @file API：/supervisor/merchantproduct
 */
var request_1 = require("@/utils/request");
/**
 * 查询商户产品信息
 * @param merchantNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantproduct/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
/**
 * 查询所有可用发放通道
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPayChannel(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantproduct/queryPayChannel", success: success, error: error }, options));
}
exports.queryPayChannel = queryPayChannel;
/**
 * 配置商户产品信息
 * @param taxMerchantProductDTO  商户产品
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function add(taxMerchantProductDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantproduct/add", contentType: "application/json", data: {
            taxMerchantProductDTO: taxMerchantProductDTO
        }, success: success, error: error }, options));
}
exports.add = add;
/**
 * 配置商户产品信息
 * @param taxMerchantProductDTO  商户产品
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function update(taxMerchantProductDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantproduct/update", contentType: "application/json", data: {
            taxMerchantProductDTO: taxMerchantProductDTO
        }, success: success, error: error }, options));
}
exports.update = update;
