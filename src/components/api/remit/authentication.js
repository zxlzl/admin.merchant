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
exports.queryAuthenticationList = exports.cancelAuthentication = exports.updateAuthentication = exports.queryAuthenticationDetail = exports.addAuthentication = void 0;
/**
 * @file API：/remit/authentication
 */
var request_1 = require("@/utils/request");
/**
 * 新增免验证
 * @param authenticationInfoDto  新增免验证
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function addAuthentication(authenticationInfoDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/authentication/addAuthentication", type: "POST", data: {
            authenticationInfoDto: authenticationInfoDto
        }, success: success, error: error }, options));
}
exports.addAuthentication = addAuthentication;
/**
 * 查询免验证详情
 * @param id  查询免验证详情
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAuthenticationDetail(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/authentication/queryAuthenticationDetail", type: "POST", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.queryAuthenticationDetail = queryAuthenticationDetail;
/**
 * 修改免验证
 * @param authenticationInfoDto  修改免验证
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateAuthentication(authenticationInfoDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/authentication/updateAuthentication", type: "POST", data: {
            authenticationInfoDto: authenticationInfoDto
        }, success: success, error: error }, options));
}
exports.updateAuthentication = updateAuthentication;
/**
 * 撤销免验证
 * @param id  撤销免验证
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function cancelAuthentication(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/authentication/cancelAuthentication", type: "POST", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.cancelAuthentication = cancelAuthentication;
/**
 * 免验证列表查询
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAuthenticationList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/authentication/queryAuthenticationList", type: "POST", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryAuthenticationList = queryAuthenticationList;
