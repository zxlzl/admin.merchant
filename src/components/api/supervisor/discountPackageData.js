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
exports.getDropDownList = exports.getOne = exports.delete_1 = exports.getList = exports.getPackageStatusDropDownList = exports.getPackageTypeDropDownList = exports.deleteRebate = exports.saveOrUpdate = void 0;
/**
 * @file API：/supervisor/discountPackageData
 */
var request_1 = require("@/utils/request");
/**
 * 优惠套餐列表添加/修改
 * @param taxDiscountPackageDataPO
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function saveOrUpdate(taxDiscountPackageDataPO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/discountPackageData/saveOrUpdate", type: "POST", contentType: "application/json", data: {
            taxDiscountPackageDataPO: taxDiscountPackageDataPO
        }, success: success, error: error }, options));
}
exports.saveOrUpdate = saveOrUpdate;
/**
 * 返点费率列表删除
 * @param id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function deleteRebate(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/discountPackageData/deleteRebate", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.deleteRebate = deleteRebate;
/**
 * 优惠套餐==类型==下拉列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getPackageTypeDropDownList(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/discountPackageData/getPackageTypeDropDownList", type: "POST", success: success, error: error }, options));
}
exports.getPackageTypeDropDownList = getPackageTypeDropDownList;
/**
 * 优惠套餐==状态==下拉列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getPackageStatusDropDownList(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/discountPackageData/getPackageStatusDropDownList", type: "POST", success: success, error: error }, options));
}
exports.getPackageStatusDropDownList = getPackageStatusDropDownList;
/**
 * 优惠套餐列表查询
 * @param taxDiscountPackageDataQuery
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getList(taxDiscountPackageDataQuery, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/discountPackageData/getList", type: "POST", contentType: "application/json", data: {
            taxDiscountPackageDataQuery: taxDiscountPackageDataQuery
        }, success: success, error: error }, options));
}
exports.getList = getList;
/**
 * 优惠套餐列表删除
 * @param id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function delete_1(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/discountPackageData/delete", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.delete_1 = delete_1;
/**
 * 优惠套餐详情
 * @param id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getOne(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/discountPackageData/getOne", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.getOne = getOne;
/**
 * 优惠套餐下拉列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getDropDownList(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/discountPackageData/getDropDownList", type: "POST", success: success, error: error }, options));
}
exports.getDropDownList = getDropDownList;
