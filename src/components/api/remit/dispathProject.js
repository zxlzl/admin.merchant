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
exports.queryDispatchProjectDetail = exports.queryDispatchProjectList = void 0;
/**
 * @file API：/remit/dispathProject
 */
var request_1 = require("@/utils/request");
/**
 * 派单项目列表查询
 * @param query
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryDispatchProjectList(query, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/dispathProject/queryDispatchProjectList", contentType: "application/json", data: {
            query: query
        }, success: success, error: error }, options));
}
exports.queryDispatchProjectList = queryDispatchProjectList;
/**
 * 查询项目详情
 * @param projectNo  项目编号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryDispatchProjectDetail(projectNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/dispathProject/queryDispatchProjectDetail", data: {
            projectNo: projectNo
        }, success: success, error: error }, options));
}
exports.queryDispatchProjectDetail = queryDispatchProjectDetail;
