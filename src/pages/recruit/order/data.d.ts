export interface TableListItem {
  jobCode: string;
  jobName: string;
  auditTime: string;
  staffName: string;
  storeName: string;
  enrollTime: string;
  jobStatus: number;
  userId:number;
  jobStartDate: string;
  jobEndDate: string;
  entrollEndTime:string;
  entrollStartTime:string;
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


export interface AdvancedOperation1 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation2 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation3 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedProfileData {
  advancedOperation1: AdvancedOperation1[];
  advancedOperation2: AdvancedOperation2[];
  advancedOperation3: AdvancedOperation3[];
}


export interface BasicListItemDataType {
  auditResult: string;
  auditIsnoReason: string;
  jobSonCode: string;
  checkResult: string;
  checkIsnoReason: string;
  remuneration: string;
}