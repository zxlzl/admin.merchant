import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { Menu, message } from 'antd';
import ProductView from './components/product';
import MerchantView from './components/merchant';
import UserView from './components/user';
import RiskView from './components/risk';

import { BaseData, ProductData, MerchantRuleData, MerchantExtendData, SettleData, InvoiceData } from './data';
import styles from './style.less';

import { queryByMerchantNo as queryBaseData } from '@/components/api/remit/merchant'
import { queryByMerchantNo as queryProductByMerchantNo } from '@/components/api/remit/merchantproduct'
import { queryByMerchantNo as queryExtendByMerchantNo } from '@/components/api/remit/merchantextend'


const { Item } = Menu;

interface MerchantProps {
  dispatch: Dispatch<any>;
}

type MerchantStateKeys = 'cooperation' | 'merchant' | 'user' | 'risk';
interface MerchantState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: MerchantStateKeys;
  /** 基本信息 */
  baseData: BaseData;
  /** 产品信息 */
  productData: ProductData;
  /** 商户扩展信息 */
  merchantExtend: MerchantExtendData;
  /** 结算信息 */
  settleData: SettleData;
  /** 开票信息 */
  invoiceData: InvoiceData;
  merchantNo: string;
}

class Merchant extends Component<
  MerchantProps,
  MerchantState
  > {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: MerchantProps) {
    super(props);
    const menuMap = {
      cooperation: '签约产品',
      merchant: '商户配置',
      user: '用户配置',
      risk: '税务配置',
    };
    this.state = {
      menuMap,
      mode: 'inline',
      selectKey: 'cooperation',
      merchantNo: '',
    };
  }

  async componentDidMount() {
    const merchantNo = localStorage.getItem('merchant_no')
    if (merchantNo) {
      const [baseRes = {}, productRes = {}, merchantExtendRes = {}, settleRes = {}, invoiceRes = {}] = await Promise.all([
        queryBaseData(merchantNo),
        queryProductByMerchantNo(merchantNo),
        queryExtendByMerchantNo(merchantNo),
      ])

      this.setState({
        merchantNo,
        baseData: baseRes.data || {},
        productData: productRes.data || {},
        merchantExtend: merchantExtendRes.data ? merchantExtendRes.data : {},
        settleData: settleRes.data || {},
        invoiceData: invoiceRes.data || {}
      });
    }

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: MerchantStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  setParentState = (commonState = {}) => {
    this.setState({ ...commonState })
  }

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey, productData, merchantExtend, baseData, merchantNo } = this.state;
    const commonProps = { baseData, merchantNo, setParentState: this.setParentState }
    switch (selectKey) {
      case 'cooperation':
        return <ProductView productData={productData} {...commonProps} />;
      case 'merchant':
        return <MerchantView merchantExtend={merchantExtend} {...commonProps} />;
      case 'user':
        return <UserView merchantExtend={merchantExtend} {...commonProps} />;
      case 'risk':
        return <RiskView merchantExtend={merchantExtend} {...commonProps} />;
      default:
        break;
    }

    return null;
  };

  render() {
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div className={styles.main} ref={ref => { if (ref) { this.main = ref; } }}>
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => { this.selectKey(key as MerchantStateKeys) }}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Merchant;
