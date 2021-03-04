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
exports.queryByMerchantNo = exports.updateLegalPerson = exports.addLegalPerson = void 0;
/**
 * @file API：/supervisor/merchantLegalPerson
 */
var request_1 = require("@/utils/request");
/**
 * 新增法人信息
 * @param settleInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function addLegalPerson(settleInfoDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantLegalPerson/addLegalPerson", type: "POST", data: {
            settleInfoDTO: settleInfoDTO
        }, success: success, error: error }, options));
}
exports.addLegalPerson = addLegalPerson;
/**
 * 更新法人信息
 * @param settleInfoDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateLegalPerson(settleInfoDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantLegalPerson/updateLegalPerson", type: "POST", data: {
            settleInfoDTO: settleInfoDTO
        }, success: success, error: error }, options));
}
exports.updateLegalPerson = updateLegalPerson;
/**
 * 根据商户号查询法人信息
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchantLegalPerson/queryByMerchantNo", type: "POST", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
