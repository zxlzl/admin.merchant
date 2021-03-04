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
exports.disable = exports.update = exports.add = exports.able = exports.queryByMerchantNo = void 0;
/**
 * @file API：/supervisor/contact
 */
var request_1 = require("@/utils/request");
/**
 * 根据商户号查询商户联系人
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/contact/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
/**
 * 启用商户联系人
 * @param id  商户ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function able(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/contact/able", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.able = able;
/**
 * 新增商户联系人
 * @param taxContactDTO  商户联系人
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function add(taxContactDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/contact/add", data: {
            taxContactDTO: taxContactDTO
        }, success: success, error: error }, options));
}
exports.add = add;
/**
 * 更新商户联系人
 * @param taxContactDTO  商户联系人
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function update(taxContactDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/contact/update", data: {
            taxContactDTO: taxContactDTO
        }, success: success, error: error }, options));
}
exports.update = update;
/**
 * 停用商户商户联系人
 * @param id  商户联系人ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function disable(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/contact/disable", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.disable = disable;
