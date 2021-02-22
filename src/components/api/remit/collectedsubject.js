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
exports.queryAllAvailable = exports.querybyCollectedSubjectNo = void 0;
/**
 * @file API：/remit/collectedsubject
 */
var request_1 = require("@/utils/request");
/**
 * 根据查询代征主体
 * @param collectedSubjectNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function querybyCollectedSubjectNo(collectedSubjectNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/collectedsubject/querybyCollectedSubjectNo", data: {
            collectedSubjectNo: collectedSubjectNo
        }, success: success, error: error }, options));
}
exports.querybyCollectedSubjectNo = querybyCollectedSubjectNo;
/**
 * 查询所有可用代征主体
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllAvailable(success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/collectedsubject/queryAllAvailable", success: success, error: error }, options));
}
exports.queryAllAvailable = queryAllAvailable;
