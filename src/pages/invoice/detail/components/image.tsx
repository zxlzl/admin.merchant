import { Descriptions } from 'antd';
import React, { Component } from 'react';

import { GlobalContext } from '@/components/GlobalContext';

import { Radio, Empty } from "antd"

import * as Utils from '@/utils/utils'


interface ImageProps {
  invoiceDetail: {},
  setParentState: (commonState: {}) => void
}

class Image extends Component<ImageProps> {
  view: HTMLDivElement | undefined = undefined;
  static contextType = GlobalContext;
  state = {}

  async componentDidMount() {
  }


  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  render() {
    const { invoiceDetail = {} } = this.props
    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        {/* <Radio.Group defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">Hangzhou</Radio.Button>
          <Radio.Button value="b">Shanghai</Radio.Button>
          <Radio.Button value="c">Beijing</Radio.Button>
          <Radio.Button value="d">Chengdu</Radio.Button>
        </Radio.Group> */}
        <div>
          {invoiceDetail['invoiceUrl'] ? <img style={{ width: '100%' }} src={invoiceDetail['invoiceUrl']} alt="" /> : <Empty />}
        </div>
      </div>
    );
  }
}

export default Image;
