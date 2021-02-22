import React from 'react';
import { GlobalContext } from './GlobalContext';

// hooks调用context
export default function ModalHooks() {
  return React.useContext(GlobalContext);
}
