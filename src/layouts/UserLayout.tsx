import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import Footer from './Footer';
import { ConnectProps, ConnectState } from '@/models/connect';
import logo from '../assets/index-logo.png';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                {/* <span className={styles.title}>Ant Design</span> */}
              </Link>
            </div>
            <div className={styles.desc}>平 台 级 薪 税 结 算 SaaS 服 务 提 供 商</div>
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
