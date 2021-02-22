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
exports.updateById = exports.getById = exports.switchCompany = exports.getByCompanyNo = exports.queryPageByCompanyDto = exports.save = void 0;
/**
 * @file API：/company
 */
var request_1 = require("@/utils/request");
/**
 * 新建公司
 * @param companyDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function save(companyDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/company/save", type: "POST", contentType: "application/json", data: {
            companyDto: companyDto
        }, success: success, error: error }, options));
}
exports.save = save;
/**
 * 分页获取企业列表
 * @param companyDto  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPageByCompanyDto(companyDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/company/queryPageByCompanyDto", type: "POST", contentType: "application/json", data: {
            companyDto: companyDto
        }, success: success, error: error }, options));
}
exports.queryPageByCompanyDto = queryPageByCompanyDto;
/**
 * 根据企业编号查询企业
 * @param companyNo  企业编号
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getByCompanyNo(companyNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/company/getByCompanyNo", type: "GET", data: {
            companyNo: companyNo
        }, success: success, error: error }, options));
}
exports.getByCompanyNo = getByCompanyNo;
/**
 * 根据企业 id 切换当前用户企业
 * @param id  企业id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function switchCompany(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/company/switchCompany", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.switchCompany = switchCompany;
/**
 * 根据企业 id 查询企业
 * @param id  企业id
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function getById(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/company/getById", type: "GET", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.getById = getById;
/**
 * 根据 ID 更新
 * @param company  企业
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateById(company, success, error, options) {
    return request_1.ajax(__assign({ url: "/company/updateById", type: "POST", contentType: "application/json", data: {
            company: company
        }, success: success, error: error }, options));
}
exports.updateById = updateById;
