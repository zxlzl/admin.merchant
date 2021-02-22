import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, DatePicker, message, Radio, Upload, Checkbox } from 'antd';
import React, { Component, Fragment } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { GlobalContext } from '@/components/GlobalContext';

import * as Utils from '@/utils/utils';

import { BaseData, ProductData } from '../data';
import moment from 'moment';

import { queryAllAvailable } from '@/components/api/remit/collectedsubject';
import { queryAll } from '@/components/api/remit/product';
import { add } from '@/components/api/supervisor/merchantproduct';
import { queryAllPayChannelList } from '@/components/api/common/enums';

const FormItem = Form.Item;
const { Option } = Select;

interface ProductViewProps extends FormComponentProps {
  merchantNo?: string;
  baseData?: BaseData;
  productData?: ProductData;
  setParentState: (commonState: {}) => void;
}

class ProductView extends Component<ProductViewProps> {
  view: HTMLDivElement | undefined = undefined;
  static contextType = GlobalContext;
  state = { subjects: [], products: [], fileList: [], channelList: [] };

  async componentDidMount() {
    this.setProductInfo();
    const { data: channelList = [] } = await queryAllPayChannelList();

    const [subjectRes, productRes] = await Promise.all([queryAllAvailable(), queryAll()]);
    this.setState({
      subjects: subjectRes.data || [],
      products: productRes.data || [],
      channelList,
    });
  }

  componentDidUpdate(prevProps: ProductViewProps) {
    if (this.props.productData !== prevProps.productData) {
      this.setProductInfo();
    }
  }

  setProductInfo = () => {
    const { productData, baseData = {}, form } = this.props;
    if (productData?.downloadUrl) {
      this.setState({
        fileList: productData.downloadUrl.split('|').map((x, i) => {
          return {
            uid: i,
            key: i,
            status: 'done',
            url: x,
            name: '下载签约合同附件',
            response: {
              data: x,
            },
          };
        }),
      });
    }
    if (productData) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = productData[key] || baseData[key] || null;

        if (key === 'mode') {
          obj[key] = '01';
        }
        if (key === 'payWagesChannel') {
          obj[key] = productData[key] ? productData[key].split(';') : [];
        }

        if (key === 'effectDate') {
          obj[key] = moment(productData[key]);
        }
        if (key === 'failureDate') {
          obj[key] = moment(productData[key]);
        }

        form.setFieldsValue(obj);
      });
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { form, setParentState, productData = {} } = this.props;
    form.validateFields(async (err, value) => {
      if (!err) {
        if (productData) {
          value['id'] = productData['id'];
        }
        value.payWagesChannel = value.payWagesChannel.join(';');
        // 删除多余字段
        delete value.collectedSubjectNo;
        delete value.merchantName;
        delete value.mode;

        const { data } = await add(value);
        message.success('保存成功');
        setParentState({ productData: data });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      productData = {},
      baseData = {},
    } = this.props;
    const { subjects, products, fileList, channelList } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <div ref={this.getViewDom} style={{ marginTop: 24 }}>
        <Form {...formItemLayout}>
          <FormItem label="商户ID">
            {getFieldDecorator('merchantNo', {})(<Input readOnly />)}
          </FormItem>
          <FormItem label="商户名称">
            {getFieldDecorator('merchantName', {})(<Input readOnly />)}
          </FormItem>
          <FormItem label="签约代征主体">
            {getFieldDecorator('collectedSubjectNo', {
              rules: [{ required: true, message: '请选择签约代征主体！' }],
            })(
              <Select disabled>
                {subjects.map((s: any) => (
                  <Option key={s.collectedSubjectNo}>{s.collectedSubjectName}</Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem label="签约产品">
            {getFieldDecorator('productId', {
              // initialValue: productData["productId"],
              rules: [{ required: true, message: '请选择合作产品类型！' }],
            })(
              <Radio.Group disabled>
                {products.map((p: any, i: number) => (
                  <Radio key={p.id} value={String(p.id)}>
                    {p.productName}
                  </Radio>
                ))}
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem label="税务模式">
            {getFieldDecorator('mode', {
              rules: [{ required: true, message: '请选择税务管理模式！' }],
            })(
              <Select disabled>
                <Option value="01">TPT模式</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="打款通道">
            {getFieldDecorator('payWagesChannel', {
              rules: [{ required: true, message: '请选择酬薪打款通道！' }],
            })(
              <Checkbox.Group disabled>
                {...channelList.map(item => (
                  <Checkbox id={item.key} value={item.key}>
                    {item.value}
                  </Checkbox>
                ))}
              </Checkbox.Group>,
            )}
          </FormItem>

          <FormItem label="产品状态">
            {getFieldDecorator('productStatus', {
              rules: [{ required: true }],
            })(
              <Select disabled>
                <Option value="0">失效</Option>
                <Option value="1">生效</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="生效时间">
            {getFieldDecorator('effectDate', {
              rules: [{ required: true, message: '请选择生效时间！' }],
            })(<DatePicker disabled showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </FormItem>
          <FormItem label="到期时间">
            {getFieldDecorator('failureDate', {
              rules: [{ required: true, message: '请选择到期时间！' }],
            })(
              <DatePicker
                disabled
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="到期有效，自动续约"
              />,
            )}
          </FormItem>
          <FormItem label="签约合同编号">
            {getFieldDecorator('contractId', {
              rules: [{ required: true, message: '请填写签约合同编号！' }],
            })(<Input readOnly />)}
          </FormItem>
          <Form.Item label="签约合同附件" extra="支持扩展名：.rar .zip .doc .docx .pdf .jpg...">
            {getFieldDecorator('downloadUrl')(
              <Upload disabled name="downloadUrl" fileList={fileList}></Upload>,
            )}
          </Form.Item>
          <FormItem label="备注">
            {getFieldDecorator('remark')(<Input.TextArea readOnly />)}
          </FormItem>

          {/* <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </FormItem> */}
        </Form>
      </div>
    );
  }
}

export default Form.create<ProductViewProps>({})(ProductView);
