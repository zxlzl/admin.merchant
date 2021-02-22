import React from 'react';
import styles from './UserLayout.less';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => <div className={styles.container}>{children}
<div className={styles.footer}><Footer /></div></div>;

export default Layout;
