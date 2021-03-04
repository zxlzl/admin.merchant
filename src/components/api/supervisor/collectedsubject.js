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
exports.update = exports.add = exports.queryAllAvailable = exports.querybyCollectedSubjectNo = void 0;
/**
 * @file API：/supervisor/collectedsubject
 */
var request_1 = require("@/utils/request");
/**
 * 查询所有可用服务主体
 * @param collectedSubjectNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function querybyCollectedSubjectNo(collectedSubjectNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/collectedsubject/querybyCollectedSubjectNo", data: {
            collectedSubjectNo: collectedSubjectNo
        }, success: success, error: error }, options));
}
exports.querybyCollectedSubjectNo = querybyCollectedSubjectNo;
/**
 * 查询所有可用服务主体
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllAvailable(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/collectedsubject/queryAllAvailable", success: success, error: error }, options));
}
exports.queryAllAvailable = queryAllAvailable;
/**
 * 新增服务主体
 * @param taxCollectedSubjectDTO  关联商户账号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function add(taxCollectedSubjectDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/collectedsubject/add", data: {
            taxCollectedSubjectDTO: taxCollectedSubjectDTO
        }, success: success, error: error }, options));
}
exports.add = add;
/**
 * 修改服务主体
 * @param taxCollectedSubjectDTO  关联商户账号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function update(taxCollectedSubjectDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/collectedsubject/update", data: {
            taxCollectedSubjectDTO: taxCollectedSubjectDTO
        }, success: success, error: error }, options));
}
exports.update = update;
