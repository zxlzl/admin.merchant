import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Table,
  Spin,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

@Form.create()
class QueryTable extends PureComponent {
  constructor(props) {
    super(props);
    const { onRef } = this.props;
    if (onRef) onRef(this);

    this.state = {
      expandForm: false,
      formValues: {},
      columns: props.columns,
      pagination: { current: 1, page: 1, pageSize: 10 },
    };
  }

  componentDidMount() {
    const { noInitLoad } = this.props;

    if (!noInitLoad) this.load();
  }

  // 异步加载表格数据
  load = (extraProps = {}) => {
    const { form, onLoad } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        formValues: fieldsValue,
        selectedRowKeys: [],
        pagination: { current: 1, pageSize: 10 },
      });

      const params = {
        ...fieldsValue,
        ...extraProps,
        page: 1,
        pageSize: 10,
      };

      if (onLoad) {
        onLoad(params);
      }
    });
  };

  // 表格数据重载
  reload = () => {
    const { form, onLoad, onSelectRow } = this.props;
    const { pagination } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        formValues: fieldsValue,
        selectedRowKeys: [],
      });

      if (onSelectRow) {
        onSelectRow([]);
      }
      if (onLoad) {
        onLoad({ ...fieldsValue, pageSize: pagination.pageSize, page: pagination.current });
      }
    });
  };

  // 选择当前页表各项
  selectCurrentPage = () => {
    const { tableData, onSelectRow, rowKey } = this.props;
    const {
      rows = [],
      pagination: { pageSize },
    } = tableData;
    let newSelectedKeys = [];
    let newSelectedRows = [];

    if (rows.length > pageSize) {
      newSelectedRows = rows.slice(0, pageSize);
      newSelectedKeys = newSelectedRows.map(r => {
        return r[rowKey];
      });
    } else {
      newSelectedRows = [...rows];
      newSelectedKeys = newSelectedRows.map(r => {
        return r[rowKey];
      });
    }

    this.setState({ selectedRowKeys: newSelectedKeys });

    if (onSelectRow) onSelectRow(newSelectedRows);
  };

  // 清除已选择项
  clearSelectedKeys = () => {
    const { onSelectRow } = this.props;

    this.setState({ selectedRowKeys: [] });

    if (onSelectRow) onSelectRow([]);
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { form, onLoad } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        formValues: fieldsValue,
        pagination: { current: 1, pageSize: 10 },
      });

      const params = {
        ...fieldsValue,
        page: 1,
        pageSize: 10,
      };

      if (onLoad) {
        onLoad(params);
      }
    });
  };

  handleFormReset = () => {
    const { form, onLoad, columns } = this.props;
    form.resetFields();

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        formValues: form.getFieldsValue(),
        pagination: { current: 1, pageSize: 10 },
      });

      const params = {
        ...fieldsValue,
        page: 1,
        pageSize: 10,
      };

      if (onLoad) {
        onLoad(params);
      }
    });
  };

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { onSelectRow, rowKey } = this.props;
    // 保存所有选择项
    if (selectedRowKeys.length > selectedRows.length) {
      const partialSelectedRowKeys = selectedRows.map(row => row[rowKey]);

      // 原有选择项去重
      const leftRows = this.cachedSelectedRows.filter(
        row =>
          selectedRowKeys.indexOf(row[rowKey]) >= 0 &&
          partialSelectedRowKeys.indexOf(row[rowKey]) < 0,
      );

      // 保存去重后的选择项
      this.cachedSelectedRows = leftRows.concat(selectedRows);
    } else {
      this.cachedSelectedRows = selectedRows;
    }

    // eslint-disable-next-line react/no-unused-state
    this.setState({ selectedRowKeys, selectedRow: this.cachedSelectedRows });
    if (onSelectRow) {
      onSelectRow(this.cachedSelectedRows);
    }
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange, onLoad } = this.props;
    const { formValues } = this.state;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...formValues,
      ...filters,
    };

    this.setState({ pagination });

    if (onLoad) onLoad(params);
    if (onChange) onChange(formValues, pagination);
  };

  renderQueryItem(query) {
    const {
      form: { getFieldDecorator },
      options = {},
    } = this.props;
    let queryItem;

    if (query.render) return query.render(this.props);

    switch (query.type) {
      case 'text':
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(query.name, query.options)(<Input {...query.attr} allowClear />)}
          </FormItem>
        );
        break;
      case 'select':
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(
              query.name,
              query.options,
            )(
              <Select {...query.attr} style={{ width: '100%' }} allowClear>
                {options[query.name] &&
                  options[query.name].map(o => (
                    <Option key={o.code} value={o.code}>
                      {o.desc}
                    </Option>
                  ))}
              </Select>,
            )}
          </FormItem>
        );
        break;
      case 'rangedatepicker':
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(
              query.name,
              query.options,
            )(<RangePicker style={{ width: '100%' }} {...query.attr} />)}
          </FormItem>
        );
        break;
      case 'monthdatepicker':
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(
              query.name,
              query.options,
            )(<MonthPicker style={{ width: '100%' }} {...query.attr} />)}
          </FormItem>
        );
        break;
      case 'weekdatepicker':
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(
              query.name,
              query.options,
            )(<WeekPicker style={{ width: '100%' }} {...query.attr} />)}
          </FormItem>
        );
        break;
      case 'datepicker':
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(
              query.name,
              query.options,
            )(<DatePicker style={{ width: '100%' }} {...query.attr} />)}
          </FormItem>
        );
        break;
      case 'search':
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(
              query.name,
              query.options,
            )(
              <Select showSearch showArrow={false} filterOption={false} {...query.attr} allowClear>
                {options[query.name] &&
                  options[query.name].map(o => (
                    <Option key={o.code} value={o.code}>
                      {o.desc}
                    </Option>
                  ))}
              </Select>,
            )}
          </FormItem>
        );
        break;
      case 'rangeData':
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(query.names[0], query.options)(<InputNumber style={{width:'40%'}} {...query.attr} allowClear />)} - {getFieldDecorator(query.names[1], query.options)(<InputNumber style={{width:'40%'}} {...query.attr} allowClear />)}
          </FormItem>
        );
        break;
      default:
        queryItem = (
          <FormItem label={query.label}>
            {getFieldDecorator(query.name, query.options)(<Input {...query.attr} allowClear />)}
          </FormItem>
        );
    }

    return queryItem;
  }

  renderSimpleForm() {
    const { querys = [] } = this.props;
    if (querys.length) {
      return (
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            {querys[0] && !querys[0].isHide && (
              <Col md={8} sm={24}>
                {this.renderQueryItem(querys[0])}
              </Col>
            )}
            {querys[1] && !querys[1].isHide && (
              <Col md={8} sm={24}>
                {this.renderQueryItem(querys[1])}
              </Col>
            )}
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                {querys.length > 2 && (
                  <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                    展开
                    <DownOutlined />
                  </a>
                )}
              </span>
            </Col>
          </Row>
        </Form>
      );
    }
    return '';
  }

  renderAdvancedForm() {
    const { querys } = this.props;

    if (querys.length) {
      const list = [];

      querys.forEach(t => {
        if (t.isHide) return;
        list.push(t);
      });

      return (
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row type="flex" gutter={{ md: 8, lg: 24, xl: 48 }}>
            {list.map(i => (
              <Col xxl={8} xl={12} lg={12} md={12} sm={24} key={`${i.key}-${i.name}`}>
                {this.renderQueryItem(i)}
              </Col>
            ))}
          </Row>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起
                <UpOutlined />
              </a>
            </div>
          </div>
        </Form>
      );
    }
    return '';
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  /**
   * 动态渲染表头操作按钮
   *
   * @author shixin.deng
   * @returns
   * @memberof QueryTable
   */
  renderOperator() {
    const { operators = [] } = this.props;
    if (operators.length) {
      return (
        <div className={styles.tableListOperator}>
          {operators.map(o => {
            if (o.isHide) return false;

            if (o.type === 'render') return o.render();
            return (
              <Button {...o.attr} key={o.name}>
                {o.name}
              </Button>
            );
          })}
        </div>
      );
    }

    return '';
  }

  render() {
    const {
      loading,
      bodyStyle,
      tableData = {},
      rowSelectType = true,
      showPagination = true,
      rowKey,
      cardTitle,
      tableHeader,
      onExpand,
      scroll,
      extra,
      props,
    } = this.props;
    const { rows = [], pagination: serverPagination } = tableData;
    const { pagination, columns, selectedRowKeys } = this.state;
    // columns.map(c => {
    //   if (!c.width) {
    //     c.width = 100;
    //   }
    //   // if (!c.render) {
    //   //   c.render = (text, record) => (
    //   //     <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>{text}</div>
    //   //   );
    //   // }
    // });
    // console.log(columns);
    const paginationProps = showPagination
      ? {
          ...serverPagination,
          ...pagination,
          showTotal: total => `总计 ${serverPagination.total} 条`,
          showSizeChanger: true,
          showQuickJumper: true,
        }
      : false;

    // console.log(paginationProps);

    const rowSelection = rowSelectType
      ? {
          selectedRowKeys,
          onChange: this.handleRowSelectChange,
          getCheckboxProps: record => ({
            disabled: record.disabled,
          }),
        }
      : null;

    return (
      <Card bordered={false} bodyStyle={bodyStyle} title={cardTitle} extra={extra}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          {this.renderOperator()}
          <Table
            {...props}
            scroll={scroll || { x: 'max-content' }}
            title={tableHeader}
            loading={loading}
            rowSelection={rowSelection}
            dataSource={rows}
            columns={columns}
            rowKey={rowKey}
            onExpand={onExpand}
            pagination={paginationProps}
            onChange={this.handleTableChange}
          />
        </div>
      </Card>
    );
  }
}

export default QueryTable;
