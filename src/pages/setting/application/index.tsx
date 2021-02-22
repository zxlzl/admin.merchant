import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Divider, Avatar, Space, List, Card, Popover, Button, Typography, Modal, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { InfoCircleOutlined } from '@ant-design/icons';
import avatar from '@/assets/favicon.png';
import getQuery from '@/utils/query';

import { queryWeChatWorkCorpAgents } from '@/components/api/remit/merchant';
import { getAuthUrl, getRegisterCode } from '@/components/api/wechatworkauth';
import { authRedirectUri } from '@/components/api/callback';

const { Text } = Typography;
class Application extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loadingList: false,
    };
  }

  async componentDidMount() {
    const auth_code = getQuery('auth_code');
    const state = Number(getQuery('state'));
    const expires_in = getQuery('expires_in');
    if (auth_code) {
      const { data } = await authRedirectUri(auth_code, expires_in, state);
      if (data == 'success') {
        this.setState(
          {
            loadingList: true,
          },
          () => {
            setTimeout(() => {
              const {data}=this.getList();
              if (!data) {
                Modal.info({
                  title: '提示',
                  content: (
                    <div>
                      <p>正在授权中，请稍后手动刷新页面查看！</p>
                    </div>
                  ),
                  okText: '确定',
                  onOk() {
                    // location.reload()
                  },
                });
              }
              this.setState({loadingList: false})
            }, 5000);
          },
        );
      }
    } else {
      this.getList();
    }
  }

  getList = async () => {
    const merchantNo = localStorage.getItem('merchant_no') || '';
    const { data = [] } = await queryWeChatWorkCorpAgents(merchantNo);
    this.setState({ data });
  };

  deauthorize = () => {
    Modal.info({
      title: '解除应用授权说明',
      content: (
        <p>
          如需解除应用授权，请至
          <a target="_blank" href="https://work.weixin.qq.com/">
            企业微信后台&gt;&gt;
          </a>
          ，应用管理-选中应用-应用详情-删除应用
        </p>
      ),
      onOk() {},
      icon: null,
      okText: '我知道了',
    });
  };

  install = async () => {
    const { data } = await getAuthUrl();
    window.open(data, '_self');
  };

  register = async () => {
    const { data } = await getRegisterCode();
    const url = `https://open.work.weixin.qq.com/3rdservice/wework/register?register_code=${data}`;
    window.open(url, '_blank');
  };

  render() {
    const { data, loadingList } = this.state;
    const content = (
      <div>
        修改应用可见范围请至
        <a target="_blank" href="https://work.weixin.qq.com/">
          企业微信后台&gt;&gt;
        </a>
      </div>
    );
    const IconText = ({ icon, text }) => (
      <Space>
        <Popover content={content} title={null}>
          <InfoCircleOutlined />
        </Popover>
        {text}
      </Space>
    );
    const unauthorized = [
      {
        name: '宫薪记',
        agentId: 0,
        description:
          '宫薪记是杭州宫薪科技有限公司旗下品牌，深耕FinTech与“互联网+人力资源”领域，以移动互联网构建信息平台载体，一端连接企业客户，基于客户项目或任务需求.',
      },
    ];

    const listData = data.length ? data : unauthorized;
    // const listData = data.length? unauthorized: data

    return (
      <PageHeaderWrapper>
        <Spin spinning={loadingList}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            dataSource={listData}
            renderItem={item => (
              <Card style={{ marginBottom: 20 }}>
                <List.Item
                  key={item.agentId}
                  actions={[
                    <Popover content={content} title={null}>
                      <IconText
                        icon={InfoCircleOutlined}
                        text={`可见范围：${
                          item?.agentId === 0
                            ? '无'
                            : `${item?.allowUser}${
                                item?.allowParty ? '、' + item?.allowParty : ''
                              }${item?.allowTag ? '、'+item?.allowTag : ''}`
                        }`}
                        key="list-vertical-star-o"
                      />
                    </Popover>,
                  ]}
                  extra={
                    item?.agentId === 0 ? (
                      <Space direction="vertical" size="middle">
                        <Text type="secondary">已有企业微信</Text>
                        <Button type="primary" onClick={this.install}>
                          安装到企业微信
                        </Button>
                        <Text type="secondary">没有企业微信</Text>
                        <Button onClick={this.register}>注册企业微信</Button>
                      </Space>
                    ) : (
                      <Space direction="vertical" size="middle">
                        <Text type="secondary">已授权应用</Text>
                        <Button onClick={this.deauthorize}>解除应用授权</Button>
                      </Space>
                    )
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item?.agentId === 0 ? avatar : item.squareLogoUrl} />}
                    title={<a>{item.name}</a>}
                    description={
                      <span style={{ color: '#f59a23d8' }}>
                        {item?.agentId === 0 ? '未授权' : '已授权'}
                      </span>
                    }
                  />
                  {item.description}
                  <Divider />
                </List.Item>
              </Card>
            )}
          />
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Application);
