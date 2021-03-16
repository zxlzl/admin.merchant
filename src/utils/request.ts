/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from 'antd';
import { getQuery } from './query';

let apiUrl, loginUrl, middlewareApi;
switch (process.env.DEFINED_ENV) {
  case 'dev':
    // apiUrl = 'http://swy-taxmng.wdai.com/api'; // 稳定环境
    // middlewareApi = 'http://basicservice.wdai.com/api';

    apiUrl = 'https://settlement.szjh.com/api'; 
    middlewareApi = 'https://basicservice.wdai.com/api';
    break;
  case 'fat':
    apiUrl = 'https://settlement.szjh.com/api'; 
    middlewareApi = 'https://basicservice.wdai.com/api';
    break;
  case 'uat':
    apiUrl = 'https://settlement.szjh.com/api'; 
    middlewareApi = 'https://basicservice.wdai.com/api';
    break;
  case 'prd':
    apiUrl = 'https://settlement.szjh.com/api'; 
    middlewareApi = 'https://basicservice.wdai.com/api';
    break;
}

// 后台服务地址
export const API_URL = apiUrl;
// 中间件省市区地址
export const MIDDLEWARE_URL = middlewareApi;
// 登录页地址
export const LOGIN_URL = loginUrl;

const errorHandler = function(error: any) {
  const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  console.log(error);
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    console.log(codeMessage[error.data.status]);
    message.error(codeMessage[error.data.status]);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log(error.message);

    // 过滤特殊code，不报错提示
    if (error.code !== '90001') {
      message.error(error.message);
    }
  }

  throw error; // 如果throw. 错误将继续抛出.

  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  // return {some: 'data'};
};

const cleanData = (obj: any) => {
  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        cleanData(item);
      }
    } else {
      for (const key in obj) {
        let value = obj[key];
        if (typeof value === 'string') obj[key] = value = value.trim();
        if (value === undefined || value === '') {
          delete obj[key];
        } else {
          cleanData(value);
        }
      }
    }
  }
};

const isMock = !!getQuery('mock', window.location);

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  /** 默认错误处理 */
  errorHandler,

  /** 请求前缀 */
  prefix: isMock ? window.location.origin : apiUrl,

  /** 超时 */
  timeout: 10000,

  /** 跨域cookie */
  // credentials: 'include',

  /** 默认表单请求 */
  requestType: 'form',

  /** 默认返回数据格式 */
  responseType: 'json',

  /**  */
  getResponse: false,
});

request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('merchant_token') as string;
  return {
    options: {
      ...options,
      interceptors: true,
      /** 公共继承请求头 */
      headers: {
        Device: '1',
        Authorization: token,
      },
    },
  };
});

// 克隆响应对象做解析处理
request.interceptors.response.use(async (response, options) => {
  if (options.responseType === 'json') {
    const res = await response.clone().json();
    const { code, data } = res;
    // 未登录跳转
    if (String(code) === '40016' || String(code) === '40004') {
      localStorage.clear();
      window.location.replace('#/user/login');
      return Promise.reject(res);
    }

    // 微信扫码出错
    if (String(code) === '10011') {
      localStorage.clear();
      window.location.replace('#/trans/fail');
      return Promise.reject(res);
    }

    if (String(code) === '90001') {
      return Promise.resolve(res);
    }

    if (String(code) !== '0') {
      // message.error(res.message);
      return Promise.reject(res);
    }
  }

  if (options.responseType === 'blob') {
    try {
      const res = await response.clone().json();
      let code = res.code
      if (String(code) === '40016') {
        localStorage.clear();
        window.location.replace('#/user/login');
        // return Promise.reject(response);
      }
      if (String(code) !== '0') {
        // message.error(res.message);
        return Promise.reject(res);
      }
      return Promise.reject(res);
    } catch (error) {
      return Promise.resolve(response);
    }
  }
  
  return response;
});

/**
 * ajax 请求
 * @param options
 */
export function ajax(options: any) {
  let { url } = options;
  options.method = options.type || (options.data == null ? 'get' : 'post');
  switch (options.method.toLocaleUpperCase()) {
    case 'GET':
      options.params = options.data;
      break;
  }

  if (options.cleanData !== false && options.data != null) {
    cleanData(options.data);
  }

  // 是否扁平化数据，默认为true
  if (!('flattenData' in options)) {
    options.flattenData = true;
  }

  if (options.contentType && options.contentType === 'application/json') {
    options.requestType = 'json';
  }

  if (
    options.flattenData &&
    Object.prototype.toString.call(options.data) === '[object Object]' &&
    !(options.data instanceof FormData)
  ) {
    const data = options.data;
    options.data = {};
    for (const key in data) {
      const value = data[key];
      if (Object.prototype.toString.call(value) === '[object Object]') {
        options.data = {
          ...options.data,
          ...value,
        };
      } else {
        options.data[key] = value;
      }
    }
  }

  return request(url, options);
}

export default request;
