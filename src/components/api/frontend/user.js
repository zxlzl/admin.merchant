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
exports.queryUserBindBankCards = exports.updateRealNameAndContractState = exports.userContractCheck = exports.userRealNameCheck = exports.queryUserInfo = exports.loginByWeiXin = exports.queryUserCertificationAndContract = exports.logout = void 0;
/**
 * @file API：/frontend/user
 */
var request_1 = require("@/utils/request");
/**
 * 微信退出
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function logout(success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/user/logout", type: "GET", success: success, error: error }, options));
}
exports.logout = logout;
/**
 * 查询用户实名认证和签约的状态
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryUserCertificationAndContract(success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/user/queryUserCertificationAndContract", type: "GET", success: success, error: error }, options));
}
exports.queryUserCertificationAndContract = queryUserCertificationAndContract;
/**
 * 微信登陆
 * @param wxLoginInfo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function loginByWeiXin(wxLoginInfo, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/user/loginByWeiXin", type: "POST", contentType: "application/json", data: {
            wxLoginInfo: wxLoginInfo
        }, success: success, error: error }, options));
}
exports.loginByWeiXin = loginByWeiXin;
/**
 * 用户信息
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryUserInfo(success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/user/queryUserInfo", type: "GET", success: success, error: error }, options));
}
exports.queryUserInfo = queryUserInfo;
/**
 * 身份认证
 * @param userInfo  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function userRealNameCheck(userInfo, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/user/userRealNameCheck", type: "POST", contentType: "application/json", data: {
            userInfo: userInfo
        }, success: success, error: error }, options));
}
exports.userRealNameCheck = userRealNameCheck;
/**
 * 用户签约
 * @param contract  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function userContractCheck(contract, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/user/userContractCheck", type: "POST", contentType: "application/json", data: {
            contract: contract
        }, success: success, error: error }, options));
}
exports.userContractCheck = userContractCheck;
/**
 * 更新用户实名认证/签约状态为认证中
 * @param type  1:实名认证，2:签约
 * @param id  签约记录id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateRealNameAndContractState(type, id, success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/user/updateRealNameAndContractState", type: "GET", data: {
            type: type,
            id: id
        }, success: success, error: error }, options));
}
exports.updateRealNameAndContractState = updateRealNameAndContractState;
/**
 * 查询用户绑定的银行卡
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryUserBindBankCards(success, error, options) {
    return request_1.ajax(__assign({ url: "/frontend/user/queryUserBindBankCards", type: "GET", success: success, error: error }, options));
}
exports.queryUserBindBankCards = queryUserBindBankCards;
