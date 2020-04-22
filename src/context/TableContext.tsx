import * as React from 'react';
import { GetComponent } from '../interface';

export interface TableContextProps {
  // Table context
  prefixCls: string;
  getComponent: GetComponent;

  scrollbarSize: number;

  direction: 'ltr' | 'rtl';
  scroll?: any;
}

const TableContext = React.createContext<TableContextProps>(null);

export default TableContext;
