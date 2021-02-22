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
exports.bind = exports.getTaxMerchantDTOByMerchantNo = void 0;
/**
 * @file API：/companyMerchantRelation
 */
var request_1 = require("@/utils/request");
/**
 * 根据商户号查询商户信息
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getTaxMerchantDTOByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/companyMerchantRelation/getTaxMerchantDTOByMerchantNo", type: "GET", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.getTaxMerchantDTOByMerchantNo = getTaxMerchantDTOByMerchantNo;
/**
 * 财税商户和企业绑定
 * @param companyMerchantRelation  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function bind(companyMerchantRelation, success, error, options) {
    return request_1.ajax(__assign({ url: "/companyMerchantRelation/bind", type: "POST", contentType: "application/json", data: {
            companyMerchantRelation: companyMerchantRelation
        }, success: success, error: error }, options));
}
exports.bind = bind;
