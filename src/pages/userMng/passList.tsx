import React from 'react';
import QueryTable from '@/components/QueryTable';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  CheckCircleOutlined,
  HistoryOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Modal,
  Descriptions,
  Steps,
  Input,
  Select,
  Radio,
  DatePicker,
  Upload,
  Button,
  message,
} from 'antd';
import router from 'umi/router';
import moment from 'moment';
import {
  idType,
  status,
  signSource,
  checkStatus,
  applySource,
  sex,
  validTypeEnum,
} from '@/components/Enum';
import { getEnumArray } from '@/utils/utils';
import { GlobalContext } from '@/components/GlobalContext';
import styles from './style.less';
import { API_URL } from '@/utils/request';

import {
  queryAuthenticationList,
  addAuthentication,
  updateAuthentication,
  queryAuthenticationDetail,
  cancelAuthentication,
} from '@/components/api/remit/authentication';
import { queryAllAvailable } from '@/components/api/supervisor/merchant';
import { queryAllAvailable as queryAllAvailable2 } from '@/components/api/supervisor/collectedsubject';
import { queryCountryList } from '@/components/api/remit/countryinfo';

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

export default class SignMng extends React.Component {
  static contextType = GlobalContext;
  querys = [
    {
      type: 'rangedatepicker',
      label: '申请时间',
      name: 'gmtCreate',
      attr: {
        disabledDate: (current: any) => {
          return current && current > moment().endOf('day');
        },
      },
    },
    { type: 'text', label: '用户名称', name: 'name' },
    { type: 'select', label: '证件类型', name: 'certType' },
    { type: 'text', label: '证件号码', name: 'certNo' },
    { type: 'select', label: '国家地区', name: 'countryCode' },
    { type: 'select', label: '免验证范围', name: 'validType' },
    { type: 'select', label: '申请来源', name: 'applySource' },
    { type: 'select', label: '验证状态', name: 'checkStatus' },
    // { type: "select", label: "商户名称", name: "merchantNo" },
    // { type: 'select', label: '代征主体', name: 'collectedSubjectNo' },
  ];

  operators = [{ name: '新增免验证', attr: { type: 'primary', onClick: () => this.add() } }];

  columns = [
    { title: '用户名称', dataIndex: 'name' },
    { title: '证件类型', render: (row: any) => idType[row.certType] },
    { title: '证件号码', dataIndex: 'certNo' },
    { title: '国家/地区', dataIndex: 'countryCode' },
    { title: '免验证范围', render: (row: any) => validTypeEnum[row.validType] },
    { title: '申请来源', render: (row: any) => applySource[row.applySource] },
    { title: '申请时间', dataIndex: 'gmtCreate' },
    { title: '验证状态', render: (row: any) => checkStatus[row.checkStatus] },
    {
      title: '操作',
      render: (row: any) => (
        <div>
          <a onClick={() => this.detail(row)}>详情</a>
          {row.checkStatus == 0 ? ['|', <a onClick={() => this.add(row)}>修改</a>] : ''}
          {row.checkStatus == 0 ? ['|', <a onClick={() => this.cancel(row)}>撤销</a>] : ''}
        </div>
      ),
    },
  ];

  queryTable: any;

  state = {
    entry: this.props.match.params.id,
    tableData: { rows: [], pagination: { page: 1, pageSize: 10, total: 0 } },
  };
  options = {
    certType: getEnumArray(idType),
    applySource: getEnumArray(applySource),
    checkStatus: getEnumArray(checkStatus),
    countryCode: [],
    validType: getEnumArray(validTypeEnum),
    // merchantNo: [],
    // collectedSubjectNo: []
  };

  async componentDidMount() {
    this.options.countryCode = ((await queryCountryList()) as any).data.map(x => {
      return { code: x.countryCode, desc: x.countryName };
    });
    this.options.countryCode.unshift({ code: '', desc: '全部' });
    // this.options.merchantNo = (await queryAllAvailable() as any).data.map(x => {
    //   return {code: x.merchantNo, desc: x.merchantName}
    // })
    // this.options.collectedSubjectNo = (await queryAllAvailable2() as any).data.map(x => {
    //   return {code: x.collectedSubjectNo, desc: x.collectedSubjectName}
    // })
  }

  render() {
    const { tableData } = this.state;
    const tableProps = {
      tableData, // 表格数据
      onRef: (e: any) => (this.queryTable = e),
      rowSelectType: null,
      columns: this.columns, // 表格列配置
      querys: this.querys, // 表格筛选条件配置
      operators: this.operators, // 操作按钮
      options: this.options, // 表格筛选条件下拉枚举配置
      onLoad: this.loadData, // 加载表格数据函数
    };
    return (
      <PageHeaderWrapper>
        <QueryTable {...tableProps} />
      </PageHeaderWrapper>
    );
  }

  loadData = async (options: any) => {
    // 拼装请求参数
    const cloneOptions = { ...options } as any;

    if (options.gmtCreate && options.gmtCreate.length) {
      cloneOptions.startDate = moment(options.gmtCreate[0])
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      cloneOptions.endDate = moment(options.gmtCreate[1])
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    delete cloneOptions.page;
    delete cloneOptions.pageSize;
    delete cloneOptions.gmtCreate;
    const params = {
      query: cloneOptions,
      page: {
        curPage: options.page,
        pageSize: options.pageSize,
      },
    };
    this.setState({
      tableLoading: true,
    });
    const {
      data: { list = [], recordCount },
    } = await queryAuthenticationList(params);

    this.setState({
      tableLoading: false,
      tableData: { rows: list, pagination: { total: recordCount } },
    });
  };

  /**
   * 详情
   *
   * @memberof SignMng
   */
  detail = async (row: any) => {
    const { showModal, closeModal } = this.context;
    const { data = {} } = await queryAuthenticationDetail(row.id);

    showModal((props: any) => {
      const modalProps = {
        ...props, // 挂载到context的公共参数，visible，loading
        data,
        title: '查看免验证详情',
        onOk: () => closeModal(),
        onCancel: () => closeModal(),
      };
      return <PassDetail {...modalProps} />;
    });
  };

  /**
   * 新增免验证
   *
   */
  addPassForm: any;
  add = (data?) => {
    const title = data ? '修改免验证申请' : '新增免验证申请';
    const AddPassForm = Form.create()(AddPass);
    confirm({
      title,
      content: (
        <AddPassForm
          ref={inst => (this.addPassForm = inst)}
          country={this.options.countryCode}
          formData={data}
        />
      ),
      okText: '确定',
      cancelText: '取消',
      icon: null,
      width: 500,
      onOk: close => {
        this.addPassForm.validateFieldsAndScroll().then(() => {
          let params = this.addPassForm.getFieldsValue();
          params.birthday = moment(params.birthday)
            .startOf('day')
            .format('YYYY-MM-DD');
          this.options.countryCode.map((x: any) => {
            if (x.code == params.countryCode) {
              params.countryName = x.desc;
            }
          });

          let fileList = params?.imageUrl ? params?.imageUrl?.fileList : data?.imageUrl;
          let otherFile = params?.otherMaterials ? params?.otherMaterials?.fileList : data?.otherMaterials;
          // 只要修改过 params.imageUrl.fileList就会有值
          if (Array.isArray(fileList)) {
            fileList.length && (params.imageUrl = fileList.map(x => x.response.data).join('|'));
            fileList.length == 0 && (params.imageUrl = ' ')
          } else {
            params.imageUrl = fileList
          }
          if (Array.isArray(otherFile)) {
            params.otherMaterials = otherFile.map(x => x.response.data).join('')
          } else {
            params.otherMaterials = otherFile
          }
          if (data) {
            updateAuthentication({
              ...params,
              id: data.id,
            }).then(res => {
              message.success(res.message);
              close();
              this.queryTable.reload();
            });
          } else {
            addAuthentication(params).then(res => {
              message.success(res.message);
              close();
              this.queryTable.reload();
            });
          }
        });
      },
      onCancel() {},
    });
  };

  /**
   * 撤销
   *
   * @memberof SignMng
   */
  cancel = (data: any) => {
    confirm({
      title: '确认提示',
      content: `确定撤销该笔免验证申请（姓名: ${data.name}；证件类型：${
        idType[data.certType]
      }；证件号：${data.certNo}）吗？撤销后不可撤回。`,
      okText: '确定',
      cancelText: '取消',
      icon: null,
      onOk: close => {
        cancelAuthentication(data.id).then(res => {
          message.success(res.message);
          close();
          this.queryTable.reload();
        });
      },
      onCancel() {},
    });
  };
}

const PassDetail = (props: any) => {
  const { loading, onCancel, onOk, visible, title, data } = props;

  const modalProps = {
    title,
    visible,
    onOk,
    onCancel,
    width: 1000,
    destroyOnClose: true,
    okButtonProps: { loading },
  };
  const { Step } = Steps;

  return (
    <Modal {...modalProps}>
      <Steps current={data.checkStatus == 0 ? 1 : 2}>
        <Step title="已创建" description={data.gmtCreate} icon={<CheckCircleOutlined />} />
        <Step title="审核中" icon={<HistoryOutlined />} />
        <Step
          title={data.checkStatus == 0 ? '审核结果' : checkStatus[data.checkStatus]}
          icon={<HistoryOutlined />}
        />
      </Steps>
      <br />
      <Descriptions title="免验证信息" bordered column={2} size="small">
        <Descriptions.Item label="商户号">{data.merchantNo}</Descriptions.Item>
        <Descriptions.Item label="商户名称">{data.merchantName}</Descriptions.Item>
        <Descriptions.Item label="服务主体">{data.collectedSubjectName}</Descriptions.Item>
        <Descriptions.Item label="用户姓名">{data.name}</Descriptions.Item>
        <Descriptions.Item label="证件类型">{idType[data.certType]}</Descriptions.Item>
        <Descriptions.Item label="证件号码">{data.certNo}</Descriptions.Item>
        <Descriptions.Item label="国家/地区">{data.countryName}</Descriptions.Item>
        <Descriptions.Item label="性别">{sex[data.sex]}</Descriptions.Item>
        <Descriptions.Item label="出生日期">{data.birthday}</Descriptions.Item>
        <Descriptions.Item label="申请来源">{applySource[data.applySource]}</Descriptions.Item>
        <Descriptions.Item label="免验证范围">
          {validTypeEnum[data.validType] ?? '--'}
        </Descriptions.Item>
        <Descriptions.Item label="申请原因">{data.applyMemo}</Descriptions.Item>
        <Descriptions.Item label="证件影像件">
          {data.imageUrl ? (
            <Upload
              disabled
              listType="picture-card"
              fileList={
                data.imageUrl
                  ? data.imageUrl.split('|').map((x, i) => {
                      return {
                        uid: i,
                        status: 'done',
                        url: x,
                      };
                    })
                  : []
              }
            ></Upload>
          ) : (
            '--'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="其他补充材料">
          {data.otherMaterials ? (
            <Upload
              disabled
              fileList={
                data.otherMaterials
                  ? data.otherMaterials.split('|').map((x, i) => {
                      return {
                        uid: i,
                        status: 'done',
                        url: x,
                        name: '下载补充材料'
                      };
                    })
                  : []
              }
            ></Upload>
          ) : (
            '--'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="验证状态">
          {checkStatus[data.checkStatus] ?? '--'}
        </Descriptions.Item>
        <Descriptions.Item label="状态描述">{data.returnMessage ?? '--'}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

class AddPass extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fileList: [],
      otherFile: [],
    };
  }

  componentDidMount() {
    const { formData = {} } = this.props;
    if (formData.imageUrl) {
      this.setState({
        fileList: formData.imageUrl.split('|').map((x, i) => {
          return {
            uid: i,
            status: 'done',
            url: x,
            response: {
              data: x,
            },
          };
        }),
        
      });
      
    }
    if (formData.otherMaterials) {
      this.setState({
        otherFile: formData.otherMaterials.split('|').map((x, i) => {
          return {
            uid: i,
            status: 'done',
            url: x,
            name:'下载补充材料',
            response: {
              data: x,
            },
          };
        }),
      })
    }
  }

  render() {
    const { country, formData = {} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { fileList, otherFile } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>选择文件</div>
      </div>
    );

    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="用户姓名">
          {getFieldDecorator('name', {
            initialValue: formData.name,
            rules: [{ required: true, message: '请输入用户姓名' }],
          })(<Input placeholder="最多64个字符" maxLength={64} />)}
        </Form.Item>
        <Form.Item label="证件类型">
          {getFieldDecorator('certType', {
            initialValue: formData.certType,
            rules: [{ required: true, message: '请选择证件类型' }],
          })(
            <Select placeholder="选择证件类型">
              {getEnumArray(idType).map(x => (
                <Option key={x.code} value={x.code}>
                  {x.desc}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="证件号码">
          {getFieldDecorator('certNo', {
            initialValue: formData.certNo,
            rules: [
              { required: true, message: '请填写证件号' },
              {
                // pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                // message:'身份证不合法'
              },
            ],
          })(<Input placeholder="请填写证件号" />)}
        </Form.Item>
        <Form.Item label="国家/地区">
          {getFieldDecorator('countryCode', {
            initialValue: formData.countryCode,
            rules: [{ required: true, message: '请选择国家/地区' }],
          })(
            <Select placeholder="选择国家/地区">
              {country.map(x => (
                <Option key={x.code} value={x.code}>
                  {x.desc}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="性别">
          {getFieldDecorator('sex', {
            initialValue: formData.sex,
            rules: [{ required: true, message: '请选择性别' }],
          })(
            <Radio.Group>
              {getEnumArray(sex, false).map(x => (
                <Radio key={x.code} value={x.code}>
                  {x.desc}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="出生日期">
          {getFieldDecorator('birthday', {
            initialValue: formData.birthday ? moment(formData.birthday, 'YYYY-MM-DD') : '',
            rules: [{ required: true, message: '请选择出生日期' }],
          })(<DatePicker placeholder="选择出生日期" />)}
        </Form.Item>
        <Form.Item label="免验证范围">
          {getFieldDecorator('validType', {
            initialValue: formData.validType,
            rules: [{ required: true, message: '请选择免验证范围' }],
          })(
            <Select placeholder="选择免验证范围">
              <Option value="1">全免</Option>
              <Option value="2">仅免年龄准入</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="申请原因">
          {getFieldDecorator('applyMemo', {
            initialValue: formData.applyMemo,
            rules: [{ required: true, message: '请填写申请原因' }],
          })(<TextArea placeholder="最多400字符" maxLength={400} />)}
        </Form.Item>
        <Form.Item
          label="证件影像件"
          extra="支持jpg, jpeg, png, bmp格式文件，不超过1MB，最多上传两张"
        >
          {getFieldDecorator('imageUrl')(
            <Upload
              name="file"
              listType="picture-card"
              className="certificate-uploader"
              action={`${API_URL}/remit/attachment/uploadAttachment`}
              headers={{ Device: 1, Authorization: localStorage.getItem('merchant_token') }}
              accept="image/jpeg, image/png, image/bmp"
              multiple
              fileList={fileList}
              beforeUpload={(file, fileList) => {
                if (file.size > 1024 * 1024) {
                  message.error(file.name + '大小超出1M');
                  return false;
                }
              }}
              onChange={info => {
                if (info.file.size <= 1024 * 1024 || !info.file.size) {
                  let fileList = [...info.fileList];
                  fileList = fileList.slice(-2);
                  this.setState({ fileList });
                }
                if (info.file.status == 'done') {
                  if (!info.file.response.success) {
                    message.error(info.file.response.message);
                    return false;
                  }
                }
              }}
            >
              {fileList.length >= 2 ? null : uploadButton}
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="其他补充材料" extra="支持扩展名：.rar .zip .doc .docx .pdf .jpg..">
          {getFieldDecorator('otherMaterials')(
            <Upload
              name="otherFile"
              action={`${API_URL}/remit/attachment/uploadAttachment`}
              headers={{ Device: 1, Authorization: localStorage.getItem('merchant_token') }}
              fileList={otherFile}
              onChange={info => {
                let fileList = [...info.fileList];
                this.setState({ otherFile: fileList });
                if (info.file.status == 'done') {
                  if (!info.file.response.success) {
                    message.error(info.file.response.message);
                    return false;
                  }
                }
              }}
            >
              {otherFile.length ? null : <Button icon={<UploadOutlined />}>选择文件</Button>}
            </Upload>,
          )}
        </Form.Item>
      </Form>
    );
  }
}
