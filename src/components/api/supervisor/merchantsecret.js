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
exports.downLoadSecret = exports.queryPlatformSecret = exports.saveMerchantSecret = exports.querySecretByMerchantNo = void 0;
/**
 * @file API：/supervisor/merchantsecret
 */
var request_1 = require("@/utils/request");
/**
 * 根据商户号查询商户密钥等信息
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function querySecretByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantsecret/querySecretByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.querySecretByMerchantNo = querySecretByMerchantNo;
/**
 * 保存商户API公钥等信息
 * @param taxMerchantSecretVO  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function saveMerchantSecret(taxMerchantSecretVO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantsecret/saveMerchantSecret", data: {
            taxMerchantSecretVO: taxMerchantSecretVO
        }, success: success, error: error }, options));
}
exports.saveMerchantSecret = saveMerchantSecret;
/**
 * 查询平台公钥
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPlatformSecret(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantsecret/queryPlatformSecret", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryPlatformSecret = queryPlatformSecret;
/**
 * 下载平台公钥
 * @param fileName  下载文件名
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function downLoadSecret(fileName, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantsecret/downLoadSecret", data: {
            fileName: fileName
        }, success: success, error: error }, options));
}
exports.downLoadSecret = downLoadSecret;
