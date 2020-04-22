import * as React from 'react';
import { DataIndex, ColumnType, CustomizeComponent, DefaultRecordType, AlignType, AuxType } from '../interface';
export interface CellProps<RecordType extends DefaultRecordType> {
    prefixCls?: string;
    className?: string;
    record?: RecordType;
    /** `record` index. Not `column` index. */
    index?: number;
    dataIndex?: DataIndex;
    render?: ColumnType<RecordType>['render'];
    component?: CustomizeComponent;
    children?: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    ellipsis?: boolean;
    align?: AlignType;
    fixLeft?: number | false;
    fixRight?: number | false;
    firstFixLeft?: boolean;
    lastFixLeft?: boolean;
    firstFixRight?: boolean;
    lastFixRight?: boolean;
    /** @private Used for `expandable` with nest tree */
    appendNode?: React.ReactNode;
    additionalProps?: React.HTMLAttributes<HTMLElement>;
    aux?: AuxType;
}
declare const RefCell: React.ForwardRefExoticComponent<CellProps<Record<string, any>> & React.RefAttributes<any>>;
export default RefCell;
