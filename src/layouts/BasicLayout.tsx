/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import RightContent2 from '@/components/GlobalHeader2/RightContent';
import RightContent from '@/components/GlobalHeader/RightContent';
import { GlobalProvider } from '@/components/GlobalContext';
import { ConnectState } from '@/models/connect';
import styles from './BasicLayout.less';
import Footer from './Footer';
import logo from '../assets/logo.png';
import { API_URL } from '@/utils/request';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
      dispatch({
        type: 'user/fetchCurrent',
        callback: (response: any) => {
          // console.log('callback resp : ', response);
        },
      });
      dispatch({
        type: 'user/fetchMerchant',
      });
    }
  }, []);
  /**
   * init variables
   */

  const href = location.href
  let to = ''
  if (href.indexOf('.fat')!==-1) {
    // 迭代环境
    to = 'http://smcs.fat1.weidai.work/b/index.html#/task/release'
  } else if (href.indexOf('.wdai.com')!==-1) {
    // 综测环境
    to = 'http://smcs.wdai.com/b/index.html#/task/release'
  } else{
    to = 'https://smcs.gongxinji.com.cn/b/index.html#/task/release'
  }
  // const to = location.href.indexOf('.gongxinji.com') == -1 ? `${API_URL}`:''
  const topmMenu = [
    { path: '/welcome', name: '商户后台' },
    { path: to, name: '用工中心', },
  ];

  return (
    <ProLayout
      disableContentMargin
      layout="topmenu"
      title="服务平台"
      {...props}
      // logo={<img style={{height: '23px'}} src={logo}></img>}
      logo={logo}
      // route={{
      //   routes: topmMenu,
      // }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.name==='用工中心') {
          return <a href={to} target='_blank'>用工中心</a>
        }
        if (menuItemProps.isUrl) {
          return defaultDom;
        }
        return <Link to={menuItemProps.menuPath || menuItemProps.path}>{defaultDom}</Link>;
      }}
      rightContentRender={() => <RightContent />}
    >
      <ProLayout
        // collapsedButtonRender={() => null}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }
          return <Link to={menuItemProps.menuPath || menuItemProps.path}>{defaultDom}</Link>;
        }}
        menuHeaderRender={(logoDom, titleDom) => {
          return (
            <Link to="/">
              <div className={styles.title}>交易中心</div>
            </Link>
          );
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '收入结算',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        
        footerRender={() => <Footer />}
        menuDataRender={menuDataRender}
        rightContentRender={rightProps => <RightContent2 {...rightProps} />}
        {...props}
        {...settings}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </ProLayout>
    </ProLayout>
  );
};

export default connect(({ user, settings }: ConnectState) => ({
  user,
  settings,
}))(BasicLayout);
