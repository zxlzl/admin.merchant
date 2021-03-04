import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { Menu, message } from 'antd';
import BaseView from './components/base';
import ContactView from './components/contact';
import SettleView from './components/settle';
import InvoiceView from './components/invoice';
import CorpnView from './components/corpn';

import { BaseData, ContactData, SettleData, InvoiceData } from './data.d';
import styles from './style.less';

import { queryByMerchantNo } from '@/components/api/remit/merchant'
import { queryByMerchantNo as queryContactByMerchantNo } from '@/components/api/remit/contact'
import { querySettleInfo } from '@/components/api/remit/merchantSettleInfo'
import { queryInvoicingInfo } from '@/components/api/remit/merchantInvoicingInfo'

import getQuery from '@/utils/query';

const { Item } = Menu;

interface MerchantProps {
  dispatch: Dispatch<any>;
}

type MerchantStateKeys = 'base' | 'contact' | 'settle' | 'invoice' | 'corpn';
interface MerchantState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: MerchantStateKeys;
  /** 基本信息 */
  baseData: BaseData;
  /** 联系人信息 */
  contactData: ContactData;
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
      base: '基本信息',
      corpn: '法人信息',
      contact: '联系信息',
      settle: '结算信息',
      invoice: '开票信息',
    };
    this.state = {
      menuMap,
      mode: 'inline',
      selectKey: 'base',
      merchantNo: '',
    };
  }

  async componentDidMount() {
    const merchantNo = localStorage.getItem('merchant_no')
    if (merchantNo) {

      try {
        const { data = {} } = await queryByMerchantNo(merchantNo)
        this.setState({ baseData: data })
      } catch (error) {

      }

      try {
        const { data = [] } = await queryContactByMerchantNo(merchantNo)
        this.setState({ contactData: data[0] || {} })
      } catch (error) {

      }

      try {
        const { data = {} } = await querySettleInfo()
        this.setState({ settleData: data })
      } catch (error) {

      }

      try {
        const { data = {} } = await queryInvoicingInfo()
        this.setState({ invoiceData: data })
      } catch (error) {

      }

      this.setState({ merchantNo });
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
    const { merchantNo } = this.state
    if (!merchantNo && key !== 'base') { message.info('请先保存基本信息！'); return false }

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
    const { selectKey, baseData, contactData, settleData, invoiceData, merchantNo } = this.state;
    const commonProps = { merchantNo, setParentState: this.setParentState }
    switch (selectKey) {
      case 'base':
        return <BaseView baseData={baseData} {...commonProps} />;
      case 'contact':
        return <ContactView contactData={contactData} {...commonProps} />;
      case 'settle':
        return <SettleView settleData={settleData} {...commonProps} />;
      case 'invoice':
        return <InvoiceView invoiceData={invoiceData} {...commonProps} />;
        case 'corpn':
        return <CorpnView contactData={contactData} {...commonProps} />;
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
