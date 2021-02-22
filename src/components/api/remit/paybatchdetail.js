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
exports.queryOrderCostDetail = exports.updateTaxPayBatchDetail = exports.updateStatusById = void 0;
/**
 * @file API：/remit/paybatchdetail
 */
var request_1 = require("@/utils/request");
/**
 * 更新打款批次明细状态,商户后台挂起和撤销
 * @param status  挂起/撤销状态
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateStatusById(status, id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatchdetail/updateStatusById", data: {
            status: status,
            id: id
        }, success: success, error: error }, options));
}
exports.updateStatusById = updateStatusById;
/**
 * 修改批次订单明细
 * @param taxPayBatchDetailDto  批次明细
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateTaxPayBatchDetail(taxPayBatchDetailDto, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatchdetail/updateTaxPayBatchDetail", data: {
            taxPayBatchDetailDto: taxPayBatchDetailDto
        }, success: success, error: error }, options));
}
exports.updateTaxPayBatchDetail = updateTaxPayBatchDetail;
/**
 * 费用单明细查询
 * @param id  批次明细主键
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryOrderCostDetail(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/remit/paybatchdetail/queryOrderCostDetail", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.queryOrderCostDetail = queryOrderCostDetail;
