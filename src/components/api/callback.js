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
exports.authRedirectUri = void 0;
/**
 * @file API：/callback
 */
var request_1 = require("@/utils/request");
/**
 * 从服务商网站授权
 * @param auth_code
 * @param state
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function authRedirectUri(auth_code, state, success, error, options) {
    return request_1.ajax(__assign({ url: "/callback/authRedirectUri", data: {
            auth_code: auth_code,
            state: state
        }, success: success, error: error }, options));
}
exports.authRedirectUri = authRedirectUri;
