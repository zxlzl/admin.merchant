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
exports.error = exports.jsp = void 0;
/**
 * @file API：index
 */
var request_1 = require("@/utils/request");
/**
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function jsp(success, error, options) {
    return request_1.ajax(__assign({ url: "/status.jsp", type: "GET", success: success, error: error }, options));
}
exports.jsp = jsp;
/**
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function error(success, error, options) {
    return request_1.ajax(__assign({ url: "/error", success: success, error: error }, options));
}
exports.error = error;
