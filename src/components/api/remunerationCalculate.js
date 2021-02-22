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
exports.getById = exports.queryJobAuditsByRemunerationId = exports.queryPageByRemunerationCalculateDto = void 0;
/**
 * @file API：/remunerationCalculate
 */
var request_1 = require("@/utils/request");
/**
 * 查询酬金计算列表
 * @param remunerationCalculateDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPageByRemunerationCalculateDto(remunerationCalculateDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/remunerationCalculate/queryPageByRemunerationCalculateDto", type: "POST", contentType: "application/json", data: {
            remunerationCalculateDto: remunerationCalculateDto
        }, success: success, error: error }, options));
}
exports.queryPageByRemunerationCalculateDto = queryPageByRemunerationCalculateDto;
/**
 * 根据企业remunerationCalculate主键 id 查询关联任务单，分页
 * @param remunerationCalculateId  remunerationCalculate主键
 * @param pageNo
 * @param pageSize
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryJobAuditsByRemunerationId(remunerationCalculateId, pageNo, pageSize, success, error, options) {
    return request_1.ajax(__assign({ url: "/remunerationCalculate/queryJobAuditsByRemunerationId", type: "GET", data: {
            remunerationCalculateId: remunerationCalculateId,
            pageNo: pageNo,
            pageSize: pageSize
        }, success: success, error: error }, options));
}
exports.queryJobAuditsByRemunerationId = queryJobAuditsByRemunerationId;
/**
 * 根据 ID 查询酬金计算
 * @param id  主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getById(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remunerationCalculate/getById", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.getById = getById;
