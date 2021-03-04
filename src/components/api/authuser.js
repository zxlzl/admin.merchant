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
exports.verifyCode = exports.verifyUserBindVerifyCode = exports.sentUserBindVerifyCode = exports.sentVerificationCode = exports.getAdminMobile = exports.getCurrentTaxUser = exports.weChatWorkWebAuthLogin = exports.passwordReset = exports.loginWithPhoneNumber = exports.sendGraphicVerificationCode = exports.sendSmsVerificationCode = exports.weChatWorkScanCodeAuthLogin = void 0;
/**
 * @file API：/authuser
 */
var request_1 = require("@/utils/request");
/**
 * 扫码授权登录
 * @param auth_code
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function weChatWorkScanCodeAuthLogin(auth_code, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/weChatWorkScanCodeAuthLogin", data: {
            auth_code: auth_code
        }, success: success, error: error }, options));
}
exports.weChatWorkScanCodeAuthLogin = weChatWorkScanCodeAuthLogin;
/**
 * 获取短信验证码
 * @param phoneNumber  手机号
 * @param type  type = 1:手机号登录 = 2:重置/找回/忘记密码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function sendSmsVerificationCode(phoneNumber, type, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/sendSmsVerificationCode", type: "POST", data: {
            phoneNumber: phoneNumber,
            type: type
        }, success: success, error: error }, options));
}
exports.sendSmsVerificationCode = sendSmsVerificationCode;
/**
 * 获取图形验证码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function sendGraphicVerificationCode(success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/sendGraphicVerificationCode", type: "POST", success: success, error: error }, options));
}
exports.sendGraphicVerificationCode = sendGraphicVerificationCode;
/**
 * 手机号登录
 * @param phoneNumber  手机号
 * @param smsVerificationCode  验证码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function loginWithPhoneNumber(phoneNumber, smsVerificationCode, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/loginWithPhoneNumber", type: "POST", data: {
            phoneNumber: phoneNumber,
            smsVerificationCode: smsVerificationCode
        }, success: success, error: error }, options));
}
exports.loginWithPhoneNumber = loginWithPhoneNumber;
/**
 * 密码重置
 * @param taxPwdResetDto  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function passwordReset(taxPwdResetDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/passwordReset", type: "POST", contentType: "application/json", data: {
            taxPwdResetDto: taxPwdResetDto
        }, success: success, error: error }, options));
}
exports.passwordReset = passwordReset;
/**
 * 网页授权登录
 * @param code
 * @param state
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function weChatWorkWebAuthLogin(code, state, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/weChatWorkWebAuthLogin", data: {
            code: code,
            state: state
        }, success: success, error: error }, options));
}
exports.weChatWorkWebAuthLogin = weChatWorkWebAuthLogin;
/**
 * 网页授权登录
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getCurrentTaxUser(success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/getCurrentTaxUser", success: success, error: error }, options));
}
exports.getCurrentTaxUser = getCurrentTaxUser;
/**
 * 根据商户号查询管理员手机号
 * @param merchantNo  根据商户号查询管理员手机号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getAdminMobile(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/getAdminMobile", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.getAdminMobile = getAdminMobile;
/**
 * 发送绑定验证码
 * @param merchantNo  发送绑定验证码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function sentVerificationCode(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/sentVerificationCode", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.sentVerificationCode = sentVerificationCode;
/**
 * 发送绑定验证码
 * @param mobile  手机号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function sentUserBindVerifyCode(mobile, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/sentUserBindVerifyCode", data: {
            mobile: mobile
        }, success: success, error: error }, options));
}
exports.sentUserBindVerifyCode = sentUserBindVerifyCode;
/**
 * 校验绑定验证码
 * @param userBindDto
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function verifyUserBindVerifyCode(userBindDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/verifyUserBindVerifyCode", contentType: "application/json", data: {
            userBindDto: userBindDto
        }, success: success, error: error }, options));
}
exports.verifyUserBindVerifyCode = verifyUserBindVerifyCode;
/**
 * 校验绑定验证码
 * @param verifyCodeBindDto
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function verifyCode(verifyCodeBindDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/authuser/verifyCode", contentType: "application/json", data: {
            verifyCodeBindDto: verifyCodeBindDto
        }, success: success, error: error }, options));
}
exports.verifyCode = verifyCode;
