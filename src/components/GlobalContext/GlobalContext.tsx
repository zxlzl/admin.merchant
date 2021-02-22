import { createContext } from 'react';

export interface GlobalContextProps {
  visible: boolean;
  loading: boolean;
  mountedData: any;
  showModal: (Modal: React.ReactNode) => void;
  closeModal: (callback?: () => any) => void;
  toggleLoading: (flag: boolean) => void;
  mountAsyncData: (data: any) => void;
}

// 创建modal context
export const GlobalContext: React.Context<GlobalContextProps> = createContext({});