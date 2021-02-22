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
exports.OperatorSourceEnum = exports.disable = exports.update = exports.add = exports.queryWeChatWorkCorpInfos = exports.addMerchant = exports.queryBalanceListByMerchant = exports.queryBalanceByMerchantAndAccountType = exports.queryByMerchantNo = exports.operatorSource = exports.sendEmail = exports.queryAllMerchant = exports.updateMerchant = exports.queryAllAvailable = exports.queryPage = exports.able = exports.belongMerchant = exports.queryWeChatWorkCorpAdmins = exports.queryWeChatWorkAgentInfos = void 0;
/**
 * @file API：/supervisor/merchant
 */
var request_1 = require("@/utils/request");
/**
 * 查询所有授权方应用信息
 * @param merchantNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryWeChatWorkAgentInfos(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryWeChatWorkAgentInfos", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryWeChatWorkAgentInfos = queryWeChatWorkAgentInfos;
/**
 * 查询所有授权方管理员信息
 * @param merchantNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryWeChatWorkCorpAdmins(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryWeChatWorkCorpAdmins", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryWeChatWorkCorpAdmins = queryWeChatWorkCorpAdmins;
/**
 * 获取服务商枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function belongMerchant(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/belongMerchant", success: success, error: error }, options));
}
exports.belongMerchant = belongMerchant;
/**
 * 启用商户
 * @param id  商户ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function able(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/able", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.able = able;
/**
 * 商户列表
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryPage(vo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryPage", contentType: "application/json", data: {
            vo: vo
        }, success: success, error: error }, options));
}
exports.queryPage = queryPage;
/**
 * 查询所有可用商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllAvailable(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryAllAvailable", success: success, error: error }, options));
}
exports.queryAllAvailable = queryAllAvailable;
/**
 * 更新商户---新
 * @param merchantDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function updateMerchant(merchantDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/updateMerchant", contentType: "application/json", data: {
            merchantDTO: merchantDTO
        }, success: success, error: error }, options));
}
exports.updateMerchant = updateMerchant;
/**
 * 查询所有可用商户及代征主体列表
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryAllMerchant(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryAllMerchant", success: success, error: error }, options));
}
exports.queryAllMerchant = queryAllMerchant;
/**
 * 发送邮件
 * @param merchantNo
 * @param useremail
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function sendEmail(merchantNo, useremail, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/sendEmail", data: {
            merchantNo: merchantNo,
            useremail: useremail
        }, success: success, error: error }, options));
}
exports.sendEmail = sendEmail;
/**
 * 获取操作来源枚举
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function operatorSource(success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/operatorSource", success: success, error: error }, options));
}
exports.operatorSource = operatorSource;
/**
 * 根据商户号查询商户
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryByMerchantNo(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryByMerchantNo", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryByMerchantNo = queryByMerchantNo;
/**
 * 根据商户号查询商户账户余额（payaccount）
 * @param vo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryBalanceByMerchantAndAccountType(vo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryBalanceByMerchantAndAccountType", data: {
            vo: vo
        }, success: success, error: error }, options));
}
exports.queryBalanceByMerchantAndAccountType = queryBalanceByMerchantAndAccountType;
/**
 * 根据商户号查询商户可用账户列表余额（payaccount）
 * @param merchantNo  查询条件
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryBalanceListByMerchant(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryBalanceListByMerchant", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryBalanceListByMerchant = queryBalanceListByMerchant;
/**
 * 新增商户（商户基本信息）
 * @param merchantDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function addMerchant(merchantDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/addMerchant", contentType: "application/json", data: {
            merchantDTO: merchantDTO
        }, success: success, error: error }, options));
}
exports.addMerchant = addMerchant;
/**
 * 查询授权方企业信息
 * @param merchantNo
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function queryWeChatWorkCorpInfos(merchantNo, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/queryWeChatWorkCorpInfos", data: {
            merchantNo: merchantNo
        }, success: success, error: error }, options));
}
exports.queryWeChatWorkCorpInfos = queryWeChatWorkCorpInfos;
/**
 * 新增商户
 * @param merchantDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function add(merchantDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/add", contentType: "application/json", data: {
            merchantDTO: merchantDTO
        }, success: success, error: error }, options));
}
exports.add = add;
/**
 * 更新商户
 * @param merchantDTO  商户
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function update(merchantDTO, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/update", contentType: "application/json", data: {
            merchantDTO: merchantDTO
        }, success: success, error: error }, options));
}
exports.update = update;
/**
 * 停用商户
 * @param id  商户ID
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function disable(id, success, error, options) {
    return request_1.ajax(__assign({ url: "/supervisor/merchant/disable", data: {
            id: id
        }, success: success, error: error }, options));
}
exports.disable = disable;
var OperatorSourceEnum;
(function (OperatorSourceEnum) {
})(OperatorSourceEnum = exports.OperatorSourceEnum || (exports.OperatorSourceEnum = {}));
