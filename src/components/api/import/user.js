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
exports.downLoadTemplate = exports.queryUserImportList = exports.importUserExcel = void 0;
/**
 * @file API：/import/user
 */
var request_1 = require("@/utils/request");
/**
 * 用户导入excel
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function importUserExcel(success, error, options) {
    return request_1.ajax(__assign({ url: "/import/user/importUserExcel", type: "POST", success: success, error: error }, options));
}
exports.importUserExcel = importUserExcel;
/**
 * 查询用户导入列表信息
 * @param taxImportRecordDTO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryUserImportList(taxImportRecordDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/import/user/queryUserImportList", type: "POST", contentType: "application/json", data: {
            taxImportRecordDTO: taxImportRecordDTO
        }, success: success, error: error }, options));
}
exports.queryUserImportList = queryUserImportList;
/**
 * 用户导入模版下载EXCEL
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function downLoadTemplate(success, error, options) {
    return request_1.ajax(__assign({ url: "/import/user/downLoadTemplate", success: success, error: error }, options));
}
exports.downLoadTemplate = downLoadTemplate;
