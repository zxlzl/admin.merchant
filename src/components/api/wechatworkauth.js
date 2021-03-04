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
exports.setSessionInfo = exports.getAuthUrl = exports.getRegisterCode = void 0;
/**
 * @file API：/wechatworkauth
 */
var request_1 = require("@/utils/request");
/**
 * 获取应用授权 URL
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getRegisterCode(success, error, options) {
    return request_1.ajax(__assign({ url: "/wechatworkauth/getRegisterCode", success: success, error: error }, options));
}
exports.getRegisterCode = getRegisterCode;
/**
 * 获取应用授权 URL
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getAuthUrl(success, error, options) {
    return request_1.ajax(__assign({ url: "/wechatworkauth/getAuthUrl", success: success, error: error }, options));
}
exports.getAuthUrl = getAuthUrl;
/**
 * 设置授权配置
 * @param authType
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function setSessionInfo(authType, success, error, options) {
    return request_1.ajax(__assign({ url: "/wechatworkauth/setSessionInfo", data: {
            authType: authType
        }, success: success, error: error }, options));
}
exports.setSessionInfo = setSessionInfo;
