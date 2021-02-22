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
exports.queryByMerchantNo = exports.updateInviteCode = void 0;
/**
 * @file API：/remit/merchantextend
 */
var request_1 = require("@/utils/request");
/**
 * 更新商户邀请码
 * @param inviteCode
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateInviteCode(inviteCode, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchantextend/updateInviteCode", data: {
            inviteCode: inviteCode
        }, success: success, error: error }, options));
}
exports.updateInviteCode = updateInviteCode;
/**
 * 查询商户扩展信息
 * @param merchantNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchantextend/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
