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
exports.signByCode = exports.preSignByCode = exports.querySignRecords = exports.authQuery = exports.personAuth = exports.sign = void 0;
/**
 * @file API：/contract/wechat
 */
var request_1 = require("@/utils/request");
/**
 * 签约
 * @param signId  签约ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function sign(signId, success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/wechat/sign", cache: 5000, data: {
            signId: signId
        }, success: success, error: error }, options));
}
exports.sign = sign;
/**
 * 个人实名认证
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function personAuth(success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/wechat/personAuth", cache: 5000, success: success, error: error }, options));
}
exports.personAuth = personAuth;
/**
 * 个人实名认证查询
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function authQuery(success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/wechat/authQuery", cache: 5000, success: success, error: error }, options));
}
exports.authQuery = authQuery;
/**
 * 查询签约记录
 * @param signQuery  签约状态，不填默认查询所有记录
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function querySignRecords(signQuery, success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/wechat/querySignRecords", cache: 5000, data: {
            signQuery: signQuery
        }, success: success, error: error }, options));
}
exports.querySignRecords = querySignRecords;
/**
 * 使用签约邀请码进行签约，预请求
 * @param signCode  签约邀请码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function preSignByCode(signCode, success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/wechat/preSignByCode", data: {
            signCode: signCode
        }, success: success, error: error }, options));
}
exports.preSignByCode = preSignByCode;
/**
 * 使用签约邀请码进行签约
 * @param signCode  签约邀请码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function signByCode(signCode, success, error, options) {
    return request_1.ajax(__assign({ url: "/contract/wechat/signByCode", data: {
            signCode: signCode
        }, success: success, error: error }, options));
}
exports.signByCode = signByCode;
