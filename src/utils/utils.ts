import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

/**
 * 企业微信扫码登录相关配置
 */
export const appid = 'wwe47a63319a607f3d';
export let redirect_uri: string;
export const wechat_state = '';
export const usertype = 'admin';
switch (process.env.DEFINED_ENV) {
  case 'dev':
    redirect_uri = 'http://tax1.free.idcfengye.com/#/trans/wechat';
    break;
  case 'fat':
    redirect_uri = 'http://taxformerchant.fat1.weidai.work/#/trans/wechat';
    break;
  case 'uat':
    redirect_uri = 'http://taxformerchant.wdai.com/#/trans/wechat';
  case 'prd':
    redirect_uri = 'https://b.fin-cloud.com.cn/#/trans/wechat';
}

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 根据locale格式化金额
 *
 * @author shixin.deng
 * @export
 * @param {number} [num=0] 需格式化的金额
 * @param {*} locale 国际locale
 * @param {*} currency 货币单位
 * @returns
 */
export function formatCurrency(
  num: string | number | null | undefined,
  locale: string | string[] | undefined,
  currency: any,
) {
  if (num === undefined || num === null || num === '') num = 0;
  return Number(num).toLocaleString(locale, {
    currency,
    style: 'currency',
  });
}

export const getEnumArray = (enu: object, all = true) => {
  let result = [];
  if (all) {
    result.push({
      code: '',
      desc: '全部',
    });
  }
  for (let item in enu) {
    if (!(typeof enu[item] === 'number' && !isNaN(enu[item]))) {
      result.push({
        code: item,
        desc: enu[item],
      });
    }
  }
  return result;
};

export function transformBlobToFile(blob, title, extension = 'xlsx') {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, `${title}.${extension}`);
  } else {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${title}.${extension}`;

    //此写法兼容可火狐浏览器
    document.body.appendChild(link);

    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    link.dispatchEvent(evt);

    document.body.removeChild(link);
  }
}

/**
 * 生成表格枚举
 * @param allOptions 所有的枚举对象
 * @param target 枚举目标
 * @param filter 过滤的选项
 */
export function getTableEnum(allOptions: { [key: string]: any }, target: string, filter?: any) {
  const res = {};
  if (allOptions && allOptions[target]) {
    const targetEnum = allOptions[target];
    for (const [key, value] of Object.entries(targetEnum)) {
      if (key == filter) {
        continue;
      }
      res[key] = { text: value };
    }
  }
  return res;
}
