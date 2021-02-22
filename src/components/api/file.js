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
exports.deleteByBidAndType = exports.deleteById = exports.uploadPicture = void 0;
/**
 * @file API：/file
 */
var request_1 = require("@/utils/request");
/**
 * 文件上传，通过流的方式，KV 传参
 * @param fileUpload
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function uploadPicture(fileUpload, success, error, options) {
    return request_1.ajax(__assign({ url: "/file/uploadPicture", type: "POST", data: {
            fileUpload: fileUpload
        }, success: success, error: error }, options));
}
exports.uploadPicture = uploadPicture;
/**
 * 文件删除
 * @param fileId
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function deleteById(fileId, success, error, options) {
    return request_1.ajax(__assign({ url: "/file/deleteById", type: "GET", data: {
            fileId: fileId
        }, success: success, error: error }, options));
}
exports.deleteById = deleteById;
/**
 * 文件删除
 * @param bid
 * @param fileTypeEnum
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function deleteByBidAndType(bid, fileTypeEnum, success, error, options) {
    return request_1.ajax(__assign({ url: "/file/deleteByBidAndType", type: "GET", data: {
            bid: bid,
            fileTypeEnum: fileTypeEnum
        }, success: success, error: error }, options));
}
exports.deleteByBidAndType = deleteByBidAndType;
