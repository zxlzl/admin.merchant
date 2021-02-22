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
exports.queryAll = void 0;
/**
 * @file API：/remit/product
 */
var request_1 = require("@/utils/request");
/**
 * 查询所有产品
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAll(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/product/queryAll", success: success, error: error }, options));
}
exports.queryAll = queryAll;
