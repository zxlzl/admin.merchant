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
exports.queryNaturalPersonList = exports.queryNaturalPersonDetail = void 0;
/**
 * @file API：/remit/natural
 */
var request_1 = require("@/utils/request");
/**
 * 查询卡验证详情
 * @param id  查询卡验证详情
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryNaturalPersonDetail(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/natural/queryNaturalPersonDetail", type: "POST", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.queryNaturalPersonDetail = queryNaturalPersonDetail;
/**
 * 查询卡验证列表
 * @param query  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryNaturalPersonList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/natural/queryNaturalPersonList", type: "POST", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryNaturalPersonList = queryNaturalPersonList;
