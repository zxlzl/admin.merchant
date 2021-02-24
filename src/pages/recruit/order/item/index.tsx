import { ConnectState } from '@/models/connect';
import { Badge, Button, Card, Descriptions, Popover, Steps, Table, message } from 'antd';
import { getQuery } from '@/utils/utils';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect, Dispatch, history } from 'umi';
import { AdvancedProfileData } from '../data';
import { getEnumDesc } from '@/utils/utils';
import OperationModal from './operate';
import { Enums } from '@/models/common';
import styles from './style.less';

// api
import {
  findJobExecute,
  queryJobAudit,
  auditJobTicket,
  checkJobTicket,
} from '@/components/api/smcs_job';

const { Step } = Steps;

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (
  dot: React.ReactNode,
  {
    status,
  }: {
    status: string;
  },
) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }
  return dot;
};

interface AdvancedState {
  jobDetail: {
    [key: string]: any;
  }; //任务单详情
  pagination: {
    [key: string]: any;
  }; //分页
  loading: boolean; // 任务单表格加载状态
  taskListData: {
    data: [];
  };
  pageType?: string | null;
  operationModal?: boolean;
  jobCode?: string | null;
  userId?: string | null;
}

class Advanced extends Component<
  { loading: boolean; profileAndadvanced: AdvancedProfileData; dispatch: Dispatch<any> },
  AdvancedState
> {
  public state: AdvancedState = {
    jobDetail: {
      jobEnrollDto: {},
      jobTemplateDto: {},
    },
    pagination: {
      pageNo: 1,
      pageSize: 10,
    },
    loading: false,
    taskListData: { data: [] },
    operationModal: false,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileAndadvanced/fetchAdvanced',
    });

    const jobCode = getQuery('jobCode'); // 任务id
    const userId = getQuery('userId'); // 任务id
    const pageType = getQuery('type'); // 任务id

    const { data: jobDetail = {} } = await findJobExecute({ jobCode, userId });

    // 首次加载任务单表格数据
    const { pagination } = this.state;
    const { data: taskListData } = await queryJobAudit({ ...pagination, jobCode, userId });
    this.setState({ jobDetail, taskListData, jobCode, userId, pageType });
  }

  loadData = async (options: any) => {
    const { jobCode, userId } = this.state;
    const { current: pageNo, pageSize } = options;
    const { data: taskListData } = await queryJobAudit({ jobCode, userId, pageNo, pageSize });
    this.setState({ taskListData });
  };

  getTime = (time: string) => (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
      <div>{time}</div>
    </div>
  );

  /**
   * 任务单进度
   */
  getCurrent = (jobStatus: number) => {
    let step = -1;
    if (jobStatus) {
      switch (jobStatus) {
        case 2:
          step = jobStatus;
          break;
        case 6:
          step = 3;
          break;
        case 3 || 4 || 5 || 7:
          step = -1;
          break;
        case 1:
          step = 0;
          break;
        default:
          step = -1;
          break;
      }
    }
    return step;
  };

  //审核后
  operate = () => {
    this.setState({ operationModal: true });
  };

  cancelOperationModal = () => {
    this.setState({ operationModal: false });
  };

  /**
   * 审核 验收
   * @param valus 审核或验收表单传值
   */
  submitOperationModal = async (valus: any) => {
    const { pageType, jobCode, userId } = this.state;
    const fixedParams = { jobCode, userId };
    if (pageType === 'check') {
      await auditJobTicket({ ...valus, ...fixedParams });
    } else if (pageType === 'accept') {
      await checkJobTicket({ ...valus, ...fixedParams });
    }
    message.success('操作成功！');
    history.push({
      pathname: '/task/execute',
    });
    this.setState({ operationModal: false });
  };

  render() {
    const { jobDetail, taskListData, pageType, operationModal = false } = this.state;
    const enums: Enums = this.props.enums;
    const taskListColumns = [
      {
        title: '子任务单',
        dataIndex: 'jobSonCode',
        key: 'jobSonCode',
        width: 220,
        fixed: 'left',
      },
      // {
      //   title: '开始时间',
      //   dataIndex: 'jobDateStart',
      //   width: 190,
      // },
      // {
      //   title: '结束时间',
      //   width: 190,
      //   dataIndex: 'jobDateEnd',
      // },
      {
        title: '验收结论',
        dataIndex: 'checkResult',
        render: (text, row: { [key: string]: any }, index: number) => {
          let result = row.checkResult;
          let str;
          if (result != undefined) {
            str = result == 0 ? '验收通过' : '验收拒绝';
          } else {
            str = null;
          }
          return str;
        },
      },
      {
        title: '验收意见',
        dataIndex: 'checkIsnoReason',
        width: 150,
        ellipsis: true
      },
      {
        title: '核对金额',
        dataIndex: 'remuneration',
      },
      {
        title: '验收人',
        dataIndex: 'staffName',
      },
      {
        title: '验收时间',
        width: 190,
        dataIndex: 'checkTime',
      },
      {
        title: '状态',
        dataIndex: 'jobAuditStatus',
        render: (text, row: { [key: string]: any }, index: number) => {
          let status = row.jobAuditStatus;
          return getEnumDesc(enums, 'jobAuditStatus', status);
        },
      },
      // {
      //   title: '操作',
      //   dataIndex: 'options',
      //   key: 'options',
      //   render: (text: string) => {
      //       return <a onClick={()=>{}}>验收</a>
      //   },
      // },
    ];

    const {
      jobEnrollDto = {},
      jobTemplateDto = {},
      nationality,
      certificatesNum,
      name,
      certificatesType,
    } = jobDetail;
    const {
      jobStatus,
      enrollTime,
      auditTime,
      auditEndTime,
      auditIsnoReason,
      jobCode,
      auditResult,
      id,
      jobTemplateId,
    } = jobEnrollDto;
    const {
      jobName,
      classify,
      tag,
      budgetScopeMin,
      budgetScopeMix,
      jobStartDate,
      jobEndDate,
      repeatType,
      repeatCode,
      jobStartTime,jobEndTime
    } = jobTemplateDto;

    // 重复字段
    let repeatDesc = '';
    if (enums) {
      const { jobRepeatType = {}, jobRepeatCode = {} } = enums;
      let rtype = jobRepeatType[repeatType] && jobRepeatType[repeatType];
      let rcode = '';
      let code = repeatCode ? repeatCode.split(',') : repeatCode;
      code && code.forEach((item) => (rcode += jobRepeatCode[item] + ','));
      repeatDesc = rcode ? rtype + '/' + rcode : rtype;
    }
    // 拿到当前可验收的第一条数据
    const tableData = taskListData.data;
    let acceptItem: {} | undefined = {};
    acceptItem =
      tableData &&
      tableData.find((item: any) => {
        return item.jobAuditStatus == 5;
      });

    /**
     * 任务单明细表格数据
     */
    const tableProps = {
      rowKey: 'jobSonCode',
      pagination: { defaultPageSize: 10 },
      columns: taskListColumns,
      dataSource: taskListData.data,
      onChange: this.loadData, // 加载表格数据函数
      scroll: {
        x: 1400,
        y: 500,
      },
    };

    let footerButtonText = pageType === 'check' ? '审核' : pageType === 'accept' ? '验收' : '';

    const operationModalProps = {
      title: `${footerButtonText}任务单`,
      visible: operationModal,
      onCancel: this.cancelOperationModal,
      onSubmit: this.submitOperationModal,
      type: pageType,
      data: acceptItem,
    };
    return (
      <PageHeaderWrapper className={styles.pageHeader}>
        <div className={styles.main}>
          <GridContent>
            <Card title="任务单进度" style={{ marginBottom: 24 }}>
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    progressDot
                    // ={customDot}
                    current={this.getCurrent(jobStatus)}
                  >
                    <Step title="已报名" description={this.getTime(enrollTime)} />
                    <Step title="已审核" description={this.getTime(auditTime)} />
                    <Step title="执行中" description={this.getTime(auditTime)} />
                    <Step title="已验收" description={this.getTime(auditEndTime)} />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>

            <Card title="订单信息" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions>
                <Descriptions.Item label="任务单号">{jobCode}</Descriptions.Item>
                <Descriptions.Item label="审核结论">
                  {auditResult == 0 ? '审核通过' : auditResult == 1 ? '审核拒绝' : null}
                </Descriptions.Item>
                <Descriptions.Item label="审核时间">{auditTime}</Descriptions.Item>
                <Descriptions.Item label="审核意见">{auditIsnoReason}</Descriptions.Item>
                <Descriptions.Item label="备注">{/* 预留字段 */}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions>
                <Descriptions.Item label="用户姓名">{name}</Descriptions.Item>
                <Descriptions.Item label="证件类型">{certificatesType}</Descriptions.Item>
                <Descriptions.Item label="证件号码">{certificatesNum}</Descriptions.Item>
                <Descriptions.Item label="国籍">{nationality}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              style={{ marginBottom: 24 }}
              title="任务单明细"
              className={styles.tabsCard}
              bordered={false}
            >
              <Table {...tableProps} />
            </Card>

            <Card title="任务信息" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions>
                <Descriptions.Item label="任务名称">{jobName}</Descriptions.Item>
                <Descriptions.Item label="分类">
                  {getEnumDesc(enums, 'jobClassify', classify)}
                </Descriptions.Item>
                <Descriptions.Item label="标签">
                  {getEnumDesc(enums, 'jobTag', tag)}
                </Descriptions.Item>
                <Descriptions.Item label="预算范围(元)">{budgetScopeMin}-{budgetScopeMix}</Descriptions.Item>
                <Descriptions.Item label="开始时间">{jobStartDate&&jobStartDate.slice(0,10)} {jobStartTime&&jobStartTime.slice(11)}</Descriptions.Item>
                <Descriptions.Item label="结束时间">{jobEndDate&&jobEndDate.slice(0,10)} {jobEndTime&&jobEndTime.slice(11)}</Descriptions.Item>
                <Descriptions.Item label="重复">{repeatDesc}</Descriptions.Item>
                <Descriptions.Item label="操作">
                  <a
                    onClick={() => {
                      history.push({
                        pathname: '/task/release/detail',
                        query: { taskId: jobTemplateId, type: 'detail' },
                      });
                    }}
                  >
                    详情
                  </a>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {pageType === 'detail' ? null : (
              <Card style={{ textAlign: 'right' }}>
                <Button
                  style={{ marginRight: 20 }}
                  htmlType="button"
                  onClick={() => {
                    history.push({
                      pathname: '/task/execute',
                    });
                  }}
                >
                  取消
                </Button>
                <Button type="primary" onClick={this.operate}>
                  {footerButtonText}
                </Button>
              </Card>
            )}
          </GridContent>
        </div>
        <OperationModal {...operationModalProps} />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ global }: ConnectState) => ({
  enums: global.enums,
}))(Advanced);
