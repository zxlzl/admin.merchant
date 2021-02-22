import { ConnectState } from '@/models/connect';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { CurrentUser } from '@/models/user';

export interface ModalState  {
  currentStep: number; // 进度条步骤
  customPanelStyle: object; // 公共panel样式
}

export interface ModalConnectState extends ConnectState {
  batchPayment: ModalState,
}

export interface UploadFileProps extends FormComponentProps {
  batchPayment: ModalState,
  currentUser: CurrentUser,
}
export interface UploadFileState {}
export interface ResultTableState {}

export interface LockTableProps {}
export interface ResultTableProps {}
export interface LockTableState {}
export interface LockTableRow {}

export interface BatchPaymentProps {}

export interface Row {
  accountName: string;
  payAmount: string;
  flowNo: string;
  orderNo: string;
  createTime: string;
  modifyTime: string;
  uid: string;
  payChannel: string;
  bizTypeDesc: string;
  batchNo: string;
  accountNo: string;
  bankName: string;
  idNo: string;
  phone: string;
  target: string;
  fee: string;
  requestAmount: string;
  receipt: string;
  payStatusDesc: string;
  memo: string;
  realAmount: string;
  merchantRefundFee: string;
  userRefundFee: string;
  orderStatusDesc: string;
}

interface EditFormProps extends FormComponentProps {
  /** 修改数据源 */
  data: Row;
  /** 请求状态 */
  loading: boolean;
  /** 弹窗确认按钮事件 */
  onOk: (e: any) => any;
  /** 弹窗取消事件 */
  onCancel: (e: any) => any;
  /** 显隐状态 */
  visible: boolean;
}
