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
exports.getDropDownList = exports.getOne = void 0;
/**
 * @file API：/remit/discountPackageData
 */
var request_1 = require("@/utils/request");
/**
 * 优惠套餐详情
 * @param id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getOne(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/discountPackageData/getOne", type: "GET", data: {
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
    return request_1.ajax(__assign({ url: "/remit/discountPackageData/getDropDownList", type: "POST", success: success, error: error }, options));
}
exports.getDropDownList = getDropDownList;
