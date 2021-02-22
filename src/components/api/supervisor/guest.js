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
exports.add = exports.queryPage = exports.queryAllTaxPlanningType = void 0;
/**
 * @file API：/supervisor/guest
 */
var request_1 = require("@/utils/request");
/**
 * 获取节税类型
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllTaxPlanningType(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/guest/queryAllTaxPlanningType", success: success, error: error }, options));
}
exports.queryAllTaxPlanningType = queryAllTaxPlanningType;
/**
 * 访客列表
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPage(vo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/guest/queryPage", contentType: "application/json", data: {
            vo: vo
        }, success: success, error: error }, options));
}
exports.queryPage = queryPage;
/**
 * 新增访客
 * @param taxGuestUserDTO  访客记录
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function add(taxGuestUserDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/guest/add", contentType: "application/json", data: {
            taxGuestUserDTO: taxGuestUserDTO
        }, success: success, error: error }, options));
}
exports.add = add;
