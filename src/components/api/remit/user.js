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
exports.getPublicKey = exports.updateUserMerchant = exports.switchMerchantWechat = exports.switchMerchant = exports.updateUserStatus = exports.queryMerchantUserList = exports.resetPassword = exports.changePassword = exports.logout = exports.addUser = exports.login = void 0;
/**
 * @file API：/remit/user
 */
var request_1 = require("@/utils/request");
/**
 * 用户登陆
 * @param mobile  手机号
 * @param password  密码
 * @param userType  登录来源:1商户平台/2系统后台
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function login(mobile, password, userType, merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/login", type: "POST", data: {
            mobile: mobile,
            password: password,
            userType: userType,
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.login = login;
/**
 * 用户注册，管理后台新建商户用户
 * @param mobile  用户手机号
 * @param type  用户类型，非必传，1商户平台注册，2管理平台注册
 * @param merchantNo  关联商户号，可关联多个，逗号隔开
 * @param name  姓名
 * @param contactmobile  联系电话
 * @param company  企业
 * @param department  部门
 * @param position  职位
 * @param memo  备注
 * @param useremail  邮箱
 * @param role  角色
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function addUser(mobile, type, merchantNo, name, contactmobile, company, department, position, memo, useremail, role, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/addUser", data: {
            mobile: mobile,
            type: type,
            merchantNo: merchantNo,
            name: name,
            contactmobile: contactmobile,
            company: company,
            department: department,
            position: position,
            memo: memo,
            useremail: useremail,
            role: role
        }, success: success, error: error }, options));
}
exports.addUser = addUser;
/**
 * 用户登出
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function logout(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/logout", success: success, error: error }, options));
}
exports.logout = logout;
/**
 * 用户修改密码
 * @param oldPassword  用户老密码
 * @param newPassword  用户新密码
 * @param confirmPassword  确认新密码
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function changePassword(oldPassword, newPassword, confirmPassword, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/changePassword", data: {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }, success: success, error: error }, options));
}
exports.changePassword = changePassword;
/**
 * 管理后台重置商户密码
 * @param mobile  用户手机号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function resetPassword(mobile, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/resetPassword", data: {
            mobile: mobile
        }, success: success, error: error }, options));
}
exports.resetPassword = resetPassword;
/**
 * 商户账号列表
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryMerchantUserList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/queryMerchantUserList", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryMerchantUserList = queryMerchantUserList;
/**
 * 停用用户账号
 * @param id  用户主键
 * @param status  变更状态,账号状态:1正常,2注销
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateUserStatus(id, status, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/updateUserStatus", data: {
            id: id,
            status: status
        }, success: success, error: error }, options));
}
exports.updateUserStatus = updateUserStatus;
/**
 * 用户切换商户号
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function switchMerchant(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/switchMerchant", type: "POST", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.switchMerchant = switchMerchant;
/**
 * 用户切换商户号(企业微信)
 * @param merchantNo  商户号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function switchMerchantWechat(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/switchMerchantWechat", type: "POST", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.switchMerchantWechat = switchMerchantWechat;
/**
 * 管理后台修改商户用户
 * @param id  商户用户id
 * @param merchantNo  关联商户号，可关联多个，逗号隔开
 * @param name  姓名
 * @param contactmobile  联系电话
 * @param company  企业
 * @param department  部门
 * @param position  职位
 * @param memo  备注
 * @param useremail  管理员邮箱
 * @param role  角色
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateUserMerchant(id, merchantNo, name, contactmobile, company, department, position, memo, useremail, role, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/updateUserMerchant", data: {
            id: id,
            merchantNo: merchantNo,
            name: name,
            contactmobile: contactmobile,
            company: company,
            department: department,
            position: position,
            memo: memo,
            useremail: useremail,
            role: role
        }, success: success, error: error }, options));
}
exports.updateUserMerchant = updateUserMerchant;
/**
 * 获取公钥
 * @param mobile  获取公钥
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getPublicKey(mobile, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/user/getPublicKey", data: {
            mobile: mobile
        }, success: success, error: error }, options));
}
exports.getPublicKey = getPublicKey;
