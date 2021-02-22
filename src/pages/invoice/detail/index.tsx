import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { Menu, message } from 'antd';
import InvoiceView from './components/invoice';
import ImageView from './components/image';
import BillView from './components/bill';

import styles from './style.less';

import getQuery from '@/utils/query';

import { invoiceDetail } from '@/components/api/remit/invoiceInfo'

const { Item } = Menu;

interface InvoiceProps {
  dispatch: Dispatch<any>;
}

type InvoiceStateKeys = 'invoiceData' | 'bill' | 'image';
interface InvoiceState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: InvoiceStateKeys;
  invoiceDetail: {}
}

class Invoice extends Component<
  InvoiceProps,
  InvoiceState
  > {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: InvoiceProps) {
    super(props);
    const menuMap = {
      invoiceData: '开票信息',
      bill: '账单明细',
      image: '发票影像',
    };

    this.state = {
      menuMap,
      mode: 'inline',
      selectKey: 'invoiceData',
      invoiceDetail: {} // 发票详情
    };
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();

    this.judgeMode()

    const { data = {} } = await invoiceDetail(getQuery('applyNo') || '')
    this.setState({ invoiceDetail: data })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  judgeMode = () => {
    const invoiceMode = getQuery('invoiceMode') || ''
    if (invoiceMode==2) {
      this.setState({
        menuMap:{
          invoiceData: '开票信息',
          image: '发票影像',
        }
      })
    }
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: InvoiceStateKeys) => {
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
    const { selectKey, invoiceDetail } = this.state;
    const commonProps = { invoiceDetail, setParentState: this.setParentState }
    switch (selectKey) {
      case 'invoiceData':
        return <InvoiceView  {...commonProps} />;
      case 'bill':
        return <BillView  {...commonProps} />;
      case 'image':
        return <ImageView  {...commonProps} />;
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
              onClick={({ key }) => { this.selectKey(key as InvoiceStateKeys) }}
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

export default Invoice;
