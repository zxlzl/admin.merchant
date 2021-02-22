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
exports.getCurrentUser = exports.changePassword = exports.logout = exports.getPublicKeyByMobile = exports.login = void 0;
/**
 * @file API：/user
 */
var request_1 = require("@/utils/request");
/**
 * 用户名密码加密，密码必须是加密后的
 * @param user  用户名，密码等
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function login(user, success, error, options) {
    return request_1.ajax(__assign({ url: "/user/login", type: "POST", contentType: "application/json", data: {
            user: user
        }, success: success, error: error }, options));
}
exports.login = login;
/**
 * 根据登陆名获取加密公钥
 * @param mobile  用户名
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getPublicKeyByMobile(mobile, success, error, options) {
    return request_1.ajax(__assign({ url: "/user/getPublicKeyByMobile", type: "GET", data: {
            mobile: mobile
        }, success: success, error: error }, options));
}
exports.getPublicKeyByMobile = getPublicKeyByMobile;
/**
 * 退出
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function logout(success, error, options) {
    return request_1.ajax(__assign({ url: "/user/logout", type: "GET", success: success, error: error }, options));
}
exports.logout = logout;
/**
 * 用户名密码加密，密码必须是加密后的
 * @param userPwdRequest  用户名，密码等
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function changePassword(userPwdRequest, success, error, options) {
    return request_1.ajax(__assign({ url: "/user/changePassword", type: "POST", contentType: "application/json", data: {
            userPwdRequest: userPwdRequest
        }, success: success, error: error }, options));
}
exports.changePassword = changePassword;
/**
 * 获取当前登陆用户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getCurrentUser(success, error, options) {
    return request_1.ajax(__assign({ url: "/user/getCurrentUser", type: "GET", success: success, error: error }, options));
}
exports.getCurrentUser = getCurrentUser;
