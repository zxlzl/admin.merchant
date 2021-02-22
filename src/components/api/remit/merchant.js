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
exports.getCurrentMerchant = exports.queryBalanceListByMerchant = exports.queryBalanceByMerchantAndAccountType = exports.queryByMerchantNo = exports.queryWeChatWorkCorpAgents = exports.belongMerchant = exports.queryByUid = void 0;
/**
 * @file API：/remit/merchant
 */
var request_1 = require("@/utils/request");
/**
 * 根据用户id查询商户列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByUid(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchant/queryByUid", success: success, error: error }, options));
}
exports.queryByUid = queryByUid;
/**
 * 获取服务商枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function belongMerchant(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchant/belongMerchant", success: success, error: error }, options));
}
exports.belongMerchant = belongMerchant;
/**
 * 查询授权应用信息
 * @param merchantNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryWeChatWorkCorpAgents(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchant/queryWeChatWorkCorpAgents", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryWeChatWorkCorpAgents = queryWeChatWorkCorpAgents;
/**
 * 根据商户号查询商户
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchant/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
/**
 * 根据商户号查询商户账户余额（payaccount）
 * @param queryMerchantAccountBalanceVO  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryBalanceByMerchantAndAccountType(queryMerchantAccountBalanceVO, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchant/queryBalanceByMerchantAndAccountType", data: {
            queryMerchantAccountBalanceVO: queryMerchantAccountBalanceVO
        }, success: success, error: error }, options));
}
exports.queryBalanceByMerchantAndAccountType = queryBalanceByMerchantAndAccountType;
/**
 * 根据商户号查询商户可用账户列表余额（payaccount）
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryBalanceListByMerchant(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchant/queryBalanceListByMerchant", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryBalanceListByMerchant = queryBalanceListByMerchant;
/**
 * 根据商户号查询商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getCurrentMerchant(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/merchant/getCurrentMerchant", success: success, error: error }, options));
}
exports.getCurrentMerchant = getCurrentMerchant;
