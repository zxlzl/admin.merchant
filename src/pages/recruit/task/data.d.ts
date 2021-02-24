export interface TableListItem {
  /**
   * 报名截止日期
   */
  enrollEnd: string;

  /**
   * 结束日期
   */
  jobEndDate: string;

  /**
   * 分类 1-线上；2-线下。默认线下
   */
  classify: number;

  /**
   * 报名开始日期
   */
  enrollStart: string;

  pageSize?: number;

  /**
   * 任务审核状态 小程序用
   */
  jobAuditStatus: number;

  pageNo?: number;

  /**
   * 图片路径
   */
  pictureCode: string;

  /**
   * 开始时间 前端条件查询的时间条件
   */
  startTime: string;

  /**
   * 主键
   */
  id: number;

  /**
   * 标签 1-高薪
   */
  tag: []|string;

  /**
   * 前台是否展示（0为展示，1为否）
   */
  receptionIsshow: number;

  /**
   * 任务名称
   */
  jobName: string;

  /**
   * 任务模版编号
   */
  jobTemplateCode: string;

  /**
   * 开始日期
   */
  jobStartDate: string;

  /**
   * 图片路径  用于前端展示
   */
  pictureUrl: string[];

  /**
   * 重复类型（0不重复，1每天，2每周）
   */
  repeatType: number;

  /**
   * 修改时间
   */
  updateTime: string;

  /**
   * 门店
   */
  storeId: number;

  /**
   * 公司id
   */
  companyId: number;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 人数
   */
  peopleNumber: number;

  /**
   * 门店地址
   */
  storeAddress: string;

  /**
   * 预算范围最大值
   */
  budgetScopeMix: string;

  /**
   * 报名状态（1未报名，2已报名）
   */
  enrollStatus: number;

  /**
   * 预算范围最小值
   */
  budgetScopeMin: string;

  /**
   * 创建人
   */
  createUser: string;

  /**
   * 结束时间 前端条件查询的时间条件
   */
  endTime: string;

  /**
   * 是否删除（0否，1是）
   */
  isDel: number;

  /**
   * 每天则为空，每周1-7，星期日为1
   */
  repeatCode: []|string;
  jobRepeatCode:[]|string;

  /**
   * 描述
   */
  represent: string;

  /**
   * 状态(0未上架、1已上架、2已下架、3已结束)
   */
  status: number;

  /**
   * 任务开始时间
   */
  jobStartTime: string;

  /**
   * 任务结束时间
   */
  jobEndTime: string;

  enrollRange?: any;
  jobTimeRange?: any;
  jobDateRange?: any;
  budgetScope?: any;
  repeatCascader?: any;
  [key: string]: any
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

