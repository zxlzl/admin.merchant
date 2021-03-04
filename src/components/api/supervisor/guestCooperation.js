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
exports.queryAllTaxPlanningType = exports.addRecord = exports.queryPage = void 0;
/**
 * @file API：/supervisor/guestCooperation
 */
var request_1 = require("@/utils/request");
/**
 * 查询合作内容对象列表
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPage(vo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/guestCooperation/queryPage", contentType: "application/json", data: {
            vo: vo
        }, success: success, error: error }, options));
}
exports.queryPage = queryPage;
/**
 * 添加合作内容对象
 * @param taxGuestCooperationDTO  合作内容对象
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function addRecord(taxGuestCooperationDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/guestCooperation/addRecord", contentType: "application/json", data: {
            taxGuestCooperationDTO: taxGuestCooperationDTO
        }, success: success, error: error }, options));
}
exports.addRecord = addRecord;
/**
 * 获取合作内容枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllTaxPlanningType(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/guestCooperation/queryAllTaxPlanningType", success: success, error: error }, options));
}
exports.queryAllTaxPlanningType = queryAllTaxPlanningType;
