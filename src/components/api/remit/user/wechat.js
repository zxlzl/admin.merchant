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
exports.login = void 0;
/**
 * @file API：/remit/user/wechat
 */
var request_1 = require("@/utils/request");
/**
 * 微信用户登陆
 * @param wechatUserInfoDto  微信用户信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 * @since 彭晓峰
 */
function login(wechatUserInfoDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/wechat/login", type: "POST", contentType: "application/json", cache: 5000, data: {
            wechatUserInfoDto: wechatUserInfoDto
        }, success: success, error: error }, options));
}
exports.login = login;
