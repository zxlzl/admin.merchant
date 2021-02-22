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
exports.getUserInfoByMobile = exports.unbind = exports.bind = void 0;
/**
 * @file API：/accountCompanyRelation
 */
var request_1 = require("@/utils/request");
/**
 * 财税用户和企业绑定
 * @param accountCompanyRelation  参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function bind(accountCompanyRelation, success, error, options) {
    return request_1.ajax(__assign({ url: "/accountCompanyRelation/bind", type: "POST", contentType: "application/json", data: {
            accountCompanyRelation: accountCompanyRelation
        }, success: success, error: error }, options));
}
exports.bind = bind;
/**
 * 财税用户和企业解绑
 * @param id  企业id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function unbind(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/accountCompanyRelation/unbind", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.unbind = unbind;
/**
 * 根据财税系统用户账号查询用户
 * @param mobile  财税系统账号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getUserInfoByMobile(mobile, success, error, options) {
    return request_1.ajax(__assign({ url: "/accountCompanyRelation/getUserInfoByMobile", type: "GET", data: {
            mobile: mobile
        }, success: success, error: error }, options));
}
exports.getUserInfoByMobile = getUserInfoByMobile;
