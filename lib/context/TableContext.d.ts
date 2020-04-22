import * as React from 'react';
import { GetComponent } from '../interface';
export interface TableContextProps {
    prefixCls: string;
    getComponent: GetComponent;
    scrollbarSize: number;
    direction: 'ltr' | 'rtl';
    scroll?: any;
}
declare const TableContext: React.Context<TableContextProps>;
export default TableContext;
