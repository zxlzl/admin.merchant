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
exports.queryByMerchantNo = exports.add = exports.delById = void 0;
/**
 * @file API：/supervisor/merchanttaxrule
 */
var request_1 = require("@/utils/request");
/**
 * 删除商户配置的税费规则
 * @param id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function delById(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchanttaxrule/delById", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.delById = delById;
/**
 * 给商户配置的税费规则
 * @param taxMerchantTaxRuleDTO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function add(taxMerchantTaxRuleDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchanttaxrule/add", contentType: "application/json", data: {
            taxMerchantTaxRuleDTO: taxMerchantTaxRuleDTO
        }, success: success, error: error }, options));
}
exports.add = add;
/**
 * 根据商户号查询配置的费率规则
 * @param merchantNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchanttaxrule/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
