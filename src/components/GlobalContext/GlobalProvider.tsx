import React from 'react';

import { GlobalContext } from './GlobalContext';

// interface ContextState {
//   loading: boolean;
//   visible: boolean;
//   Modal: React.Component;
//   mountedData: () => any;
// }

export default class GlobalProvider extends React.Component {
  state = {
    loading: false, // 接口请求状态
    visible: false, // modal展示状态
    Modal: null, // 弹窗主体
    mountedData: {}, // 挂载的数据
  };

  toggleLoading = (flag: boolean) => {
    this.setState({ loading: flag });
  };

  /**
   * modal关闭事件
   * @param callback 外部回调
   * @memberof GlobalProvider
   */
  handleClose = (callback?: () => any) => {
    this.setState({ visible: false, mountedData: {} });
    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  /**
   * modal展示
   *
   * @memberof GlobalProvider
   */
  handleShow = (Modal: React.ReactNode) => {
    this.setState({ visible: true });
    if (Modal) {
      this.setState({ Modal });
    }
  };

  /**
   * 挂载数据至上层context，便于modal内部使用，用于异步更新modal数据
   *
   * @memberof GlobalProvider
   */
  mountAsyncData = (data: any) => {
    this.setState({ mountedData: data });
  };

  render() {
    const { visible, loading, Modal, mountedData } = this.state;
    const { children } = this.props;

    return (
      <GlobalContext.Provider
        value={{
          visible,
          loading,
          mountedData,
          showModal: this.handleShow,
          closeModal: this.handleClose,
          toggleLoading: this.toggleLoading,
          mountAsyncData: this.mountAsyncData,
        }}
      >
        {children}
        {Modal && <Modal visible={visible} loading={loading} mountedData={mountedData} />}
      </GlobalContext.Provider>
    );
  }
}
