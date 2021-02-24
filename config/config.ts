import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  history: 'hash',
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/trans',
      component: '../layouts/BlankLayout',
      routes: [
        {
          name: '企业微信登录',
          path: '/trans/wechat',
          component: './user/wechatTrans',
        },
        {
          name: '企业微信登录',
          path: '/trans/fail',
          component: './user/wechatFail',
        },
      ],
    },
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: '登录',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: '首页',
              icon: 'home',
              component: './Welcome',
            },
            {
              path: '/send_single',
              name: '用工管理',
              icon: 'solution',
              routes: [
                {
                  path: '/send_single/project',
                  name: '用工任务',
                  component: './sendSingle/project/Project',
                },
                {
                  path: '/send_single/project_detail',
                  name: '项目详情',
                  component: './sendSingle/project/ProjectDetail',
                  hideInMenu: true,
                },
                {
                  path: '/send_single/service',
                  name: '任务订单',
                  component: './sendSingle/service/Service',
                },
                {
                  path: '/send_single/service_detail',
                  name: '订单详情',
                  component: './sendSingle/service/ServiceDetail',
                  hideInMenu: true,
                },
              ],
            },
            // {
            //   path: '/recruit',
            //   name: '用工管理',
            //   icon: 'robot',
            //   routes: [
            //     {
            //       path: '/recruit/task',
            //       name: '用工任务',
            //       component: './recruit/task',
            //     },
            //     {
            //       path: '/recruit/order',
            //       name: '任务订单',
            //       component: './recruit/order',
            //     },
            //   ]
            // },
            {
              path: '/order_manage',
              name: '发放管理',
              icon: 'reconciliation',
              routes: [
                {
                  path: '/order_manage/batch_payment',
                  name: '批量发放',
                  component: './tradeCenter/batchPayment/BatchPayment',
                },
                {
                  path: '/order_manage/hang_up_list',
                  name: '挂起订单',
                  component: './tradeCenter/hungUpOrder/HungUpOrder',
                },
                {
                  path: '/order_manage/batch_payment_record',
                  name: '发放批次',
                  component: './tradeCenter/batchPaymentRecord/BatchPaymentRecord',
                },
                
                {
                  path: '/order_manage/order_list',
                  name: '发放明细',
                  component: './tradeCenter/order/Order',
                },
                {
                  path: '/order_manage/order_detail',
                  name: '订单详情',
                  component: './tradeCenter/order/OrderDetail',
                  hideInMenu: true,
                },
                {
                  path: '/order_manage/batch_payment_record_detail',
                  name: '批次详情',
                  component: './tradeCenter/batchDetail/BatchDetail',
                  hideInMenu: true,
                },
              ],
            },
            {
              icon: 'pay-circle',
              path: '/fund_mange',
              name: '资金管理',
              routes: [
                {
                  path: '/fund_mange/account',
                  name: '资金账户',
                  component: './tradeCenter/account/Account',
                },
                {
                  path: '/fund_mange/account/transfer',
                  name: '转账申请',
                  hideInMenu: true,
                  component: './tradeCenter/transfer/Transfer',
                },
                // {
                //   path: '/fund_mange/deduction_account',
                //   name: '抵扣账户',
                //   component: './tradeCenter/deductionAccount/DeductionAccount',
                // },
                {
                  path: '/fund_mange/account_flow',
                  name: '资金账务',
                  component: './tradeCenter/accountFlow/AccountFlow',
                },
              ],
            },
            {
              path: '/invoice',
              name: '发票管理',
              icon: 'audit',
              routes: [
                {
                  path: '/invoice/application',
                  name: '发票申请',
                  component: './invoice/Application',
                },
                {
                  path: '/invoice/application/detail',
                  name: '账单详情',
                  component: './invoice/applicationDetail',
                  hideInMenu: true,
                },
                {
                  path: '/invoice/application/pre_bill',
                  name: '预充开票',
                  component: './invoice/PreBill',
                  hideInMenu: true,
                },
                {
                  path: '/invoice/list',
                  name: '发票列表',
                  component: './invoice/List',
                },
                {
                  path: '/invoice/apply',
                  name: '开票申请',
                  hideInMenu: true,
                  component: './invoice/ApplyInvoice',
                },
                {
                  path: '/invoice/detail',
                  name: '发票详情',
                  hideInMenu: true,
                  component: './invoice/detail',
                },
              ],
            },
            {
              path: '/userMng',
              name: '个人管理',
              icon: 'user',
              routes: [
                {
                  path: '/userMng/cardList/:id',
                  menuPath: '/userMng/cardList/taxForMerchant',
                  name: '个人验证',
                  component: './userMng/cardList',
                },
                {
                  path: '/userMng/passList/:id',
                  menuPath: '/userMng/passList/taxForMerchant',
                  name: '个人免验证',
                  component: './userMng/passList',
                },
                {
                  path: '/userMng/signMng/:id',
                  menuPath: '/userMng/signMng/taxForMerchant',
                  name: '个人签约',
                  component: './userMng/signMng',
                },
                // {
                //   path: '/userMng/import',
                //   name: '用户导入',
                //   component: './userMng/import',
                // },
              ],
            },
            {
              path: '/setting',
              name: '商户设置',
              icon: 'setting',
              routes: [
                {
                  path: '/setting/merchant',
                  name: '商户信息',
                  component: './setting/merchant',
                },
                {
                  path: '/setting/function',
                  name: '功能设置',
                  component: './setting/function',
                },
              ],
            },
            
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    'process.env': {
      DEFINED_ENV: process.env.DEFINED_ENV,
    },
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
} as IConfig;
