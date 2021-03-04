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
exports.queryAllPayChannelList = exports.queryFirstLevelDicListByType = exports.queryEnumsListByType = exports.queryThirdLevelDicListById = exports.querySecondLevelDicListById = void 0;
/**
 * @file API：/common/enums
 */
var request_1 = require("@/utils/request");
/**
 * 根据字典id获取二级字典值
 * @param id  字典id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function querySecondLevelDicListById(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/common/enums/querySecondLevelDicListById", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.querySecondLevelDicListById = querySecondLevelDicListById;
/**
 * 根据字典id获取三级字典值
 * @param id  字典id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryThirdLevelDicListById(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/common/enums/queryThirdLevelDicListById", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.queryThirdLevelDicListById = queryThirdLevelDicListById;
/**
 * 根据枚举类型查询枚举值
 * @param enumType  枚举类型
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryEnumsListByType(enumType, success, error, options) {
    return request_1.ajax(__assign({ url: "/common/enums/queryEnumsListByType", data: {
            enumType: enumType
        }, success: success, error: error }, options));
}
exports.queryEnumsListByType = queryEnumsListByType;
/**
 * 根据类型获取一级字典值
 * @param dicTypeCode  字典类型
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryFirstLevelDicListByType(dicTypeCode, success, error, options) {
    return request_1.ajax(__assign({ url: "/common/enums/queryFirstLevelDicListByType", data: {
            dicTypeCode: dicTypeCode
        }, success: success, error: error }, options));
}
exports.queryFirstLevelDicListByType = queryFirstLevelDicListByType;
/**
 * 查询所有可用发放通道
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllPayChannelList(success, error, options) {
    return request_1.ajax(__assign({ url: "/common/enums/queryAllPayChannelList", success: success, error: error }, options));
}
exports.queryAllPayChannelList = queryAllPayChannelList;
