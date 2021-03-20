import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'dva';
import axios from 'axios';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import {
  Typography,
  Button,
  Modal,
  Collapse,
  Select,
  Upload,
  Table,
  message,
  Input,
  Radio,
  InputNumber,
  Divider,
} from 'antd';

import { GlobalContextProps, GlobalContext } from '@/components/GlobalContext';
import { ModalConnectState, UploadFileProps, UploadFileState } from './data';
import { ajax, API_URL } from '@/utils/request';

import { queryPayChanleByMerchantNo } from '@/components/api/remit/merchantproduct';

const { Text, Title } = Typography;
const FormItem = Form.Item;

class UploadFile extends React.Component<UploadFileProps, UploadFileState> {
  static contextType = GlobalContext;

  state = {
    uploading: false,
    payChannels: [],
    fileList: [], // 已选择文件列表
    payBaseFileList: [] //打款依据文件列表
  };

  paramForm: any; // 上传参数表单对象

  render() {
    const {
      form: { getFieldDecorator },
      batchPayment: { customPanelStyle },
      currentUser = {},
    } = this.props;
    const { fileList,payBaseFileList, uploading, payChannels = [] } = this.state;
    const props = {
      fileList,
      // disabled: fileList.length,
      accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      onRemove: (file: any) => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file: any) => {
        this.setState(state => ({
          fileList: [file],
        }));
        return false;
      },
    };

    const uploadPayBaseProps = {
      payBaseFileList,
      // disabled: fileList.length,
      // accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      onRemove: (file: any) => {
        this.setState(state => {
          const index = state.payBaseFileList.indexOf(file);
          const newFileList = state.payBaseFileList.slice();
          newFileList.splice(index, 1);
          return {
            payBaseFileList: newFileList,
          };
        });
      },
      beforeUpload: (file: any) => {
        this.setState(state => ({
          payBaseFileList: [file],
        }));
        return false;
      },
    };

    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 9 },
      },
    };
    return (
      <>
        <Form {...formItemLayout} ref={e => (this.paramForm = e)}>
          <FormItem label="选择代征主体">
            {getFieldDecorator('target', {
              initialValue: currentUser['collectedSubjectName'],
              rules: [{ required: true, message: '请选择代征主体!' }],
            })(<Input readOnly />)}
          </FormItem>
          <FormItem
            extra={
              <a onClick={this.handleDownload} download="打款模板.xlsx" target="_blank">
                <DownloadOutlined /> 请下载发放文件EXCEL模板
              </a>
            }
            label="选择打款通道"
          >
            {getFieldDecorator('payChannelCode', {
              rules: [{ required: true, message: '请选择打款渠道!' }],
            })(
              <Radio.Group>
                {payChannels.map((c: any, i: number) => (
                  <Radio.Button key={c.key} value={String(c.key)}>
                    {c.value}
                  </Radio.Button>
                ))}
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem extra="仅支持excel文件" label="上传打款文件" required>
            <Upload name="logo" {...props}>
              {fileList.length ? '' : <Button icon={<UploadOutlined />}>上传文件</Button>}
            </Upload>
          </FormItem>
          <FormItem label="商户批次号">
            {getFieldDecorator('merchantPayBatchNo', {
              rules: [{ required: true, message: '请填写商户批次号!' }],
            })(<Input placeholder="请与文件名保持一致，参考：杭州掌升-20191010-01" />)}
          </FormItem>
          <FormItem label="总金额">
            {getFieldDecorator('totalAmount', {
              rules: [{ required: true, message: '请填写打款文件合计总金额!' }],
            })(<InputNumber style={{ width: '100%' }} placeholder="请填写打款文件合计总金额" />)}
          </FormItem>
          <FormItem label="总笔数">
            {getFieldDecorator('count', {
              rules: [{ required: true, message: '请填写打款文件合计总笔数，最多不超过1000笔!' }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                max={1000}
                placeholder="请填写打款文件合计总笔数，最多不超过1000笔"
              />,
            )}
          </FormItem>
          <FormItem
            extra="建议上传打款依据文件，说明此次打款的发放或结算场景。
            支持扩展名：.rar .zip .doc .docx .pdf .jpg…，
            文件大小请控制在 10MB 以内"
            label="打款依据文件"
          >
            <Upload name="logo" {...uploadPayBaseProps}>
              {payBaseFileList.length ? '' : <Button icon={<UploadOutlined />}>上传文件</Button>}
            </Upload>
          </FormItem>

          <FormItem style={{ marginTop: 24 }} wrapperCol={{ span: 12, offset: 4 }}>
            <Button type="primary" loading={uploading} onClick={this.handleUpload}>
              下一步
            </Button>
          </FormItem>
        </Form>
        <Divider />
        <Typography>
          <Title type="secondary" level={5}>
            说明
          </Title>
          <Text type="secondary">
          1.平台支持银行卡通道发放，支持所有银联借记卡收款。请选择发放通道，然后下载对应的发放模板完成发放；
          </Text>
          <br />
          <Text type="secondary">
          2.单批次限制：1000笔；单笔限额：1～100万元；单人单月限额：签订合作时约定；
          </Text>
          <br />
          <Text type="secondary">
          3.自定义批次名称会作为商户批次好保存，文件名格式建议为「商户名称+日期+编号」，例如：XX商户-20160909-01。
          </Text>
        </Typography>
      </>
    );
  }

  async componentDidMount() {
    const { data: payChannels = [] } = await queryPayChanleByMerchantNo();
    this.setState({ payChannels });
  }

  handleDownload = async () => {
    const {
      form: { validateFields },
    } = this.props;
    validateFields(['payChannelCode'], async (errors, values) => {
      if (!errors) {
        const { payChannelCode } = values;
        const href = `${API_URL}/remit/paybatch/downLoadTemplate?payChannelCode=${payChannelCode}`;
        window.open(href, 'blank');
      }
    });
  };

  /**
   * 上传批次文件
   *
   * @memberof UploadFile
   */
  handleUpload = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { fileList,payBaseFileList } = this.state;
    const {
      dispatch,
      batchPayment: { reUpload, payBatchNo },
      form: { validateFields },
    } = this.props;
    validateFields(async (errors, values) => {
      if (!errors) {
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('file', file);
        });
        payBaseFileList.forEach(file => {
          formData.append('paymentBasisDocument', file);
        });
        for (const key of Object.keys(values)) {
          formData.append(key, values[key]);
        }

        if (reUpload) {
          formData.append('payBatchNo', payBatchNo);
        }

        this.setState({ uploading: true });

        axios
          .post(`${API_URL}/remit/paybatch/uploadMerchantDetail`, formData, {
            headers: {
              Device: '1',
              Authorization: localStorage.getItem('merchant_token'),
            },
          })
          .then(res => {
            const { data = {} } = res;
            if (data.code == 0) {
              this.setState({ uploading: false });
              message.success('文件上传成功！');
              dispatch({
                type: 'batchPayment/fetchCurrentBatch',
              });
            } else {
              this.setState({ uploading: false });
              if (data.code == 99999 && data.data) {
                this.showError(data.data);
              } else {
                message.error(data.message);
              }
            }
          });
      }
    });
  };

  /**
   * 展示错误批次信息
   *
   * @memberof UploadFile
   */
  showError = async (data = []) => {
    const { showModal, closeModal } = this.context;
    showModal((props: GlobalContextProps) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        title: '上传结果',
        width: 800,
        footer: null,
        onOk: () => closeModal(), // 确认事件
        onCancel: () => closeModal(), // 取消事件
      };
      return (
        <Modal {...modalProps}>
          <p>
            批次文件校验失败，你可以下载文件以查看错误订单修改后重新上传，或者选项继续上传在系统中进行修改。
          </p>
          <Table
            columns={[
              { title: '错误行', dataIndex: 'errorLine', width: 100, fixed: 'left' },
              { title: '姓名', dataIndex: 'accountName' },
              { title: '身份证号', dataIndex: 'identityNo' },
              { title: '收款银行账号', dataIndex: 'accountNo' },
              { title: '银行预留手机号', dataIndex: 'mobile' },
              { title: '错误详情', dataIndex: 'errorDetails' },
            ]}
            scroll={{ x: 'max-content' }}
            pagination={false}
            rowKey="errorLine"
            dataSource={data}
          />
        </Modal>
      );
    });
  };
}

export default connect(({ global, user, settings, batchPayment }: ModalConnectState) => ({
  batchPayment,
  currentUser: user.currentUser,
}))(Form.create<UploadFileProps>()(UploadFile));
