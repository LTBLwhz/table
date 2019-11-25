/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { connect } from 'mini-store';
import classNames from 'classnames';
import {
  TableComponents,
  GetComponentProps,
  ColumnType,
  Cell,
  TableStoreState,
  FixedType,
} from './interface';

export interface TableHeaderRowProps {
  row: Cell[];
  index: number;
  height: string | number;
  components: TableComponents;
  onHeaderRow: GetComponentProps<ColumnType[]>;
  prefixCls: string;
  columns: ColumnType[];
  rows: Cell[];
  fixed: FixedType;
}

function TableHeaderRow({
  row,
  index,
  height,
  components,
  onHeaderRow,
  prefixCls,
}: TableHeaderRowProps) {
  const HeaderRow = components.header.row;
  const HeaderCell = components.header.cell;
  const rowProps = onHeaderRow(row.map(cell => cell.column), index);
  const customStyle = rowProps ? rowProps.style : {};
  const style = { height, ...customStyle };
  return (
    <HeaderRow {...rowProps} style={style}>
      {row.map((cell, i) => {
        const { column, ...cellProps } = cell;
        const customProps = column.onHeaderCell ? column.onHeaderCell(column) : {};
        if (column.align) {
          customProps.style = { ...customProps.style, textAlign: column.align };
        }
        customProps.className = classNames(customProps.className, column.className, {
          [`${prefixCls}-align-${column.align}`]: !!column.align,
          [`${prefixCls}-row-cell-ellipsis`]: !!column.ellipsis,
          [`${prefixCls}-row-cell-break-word`]: !!column.width,
        });

        return column.fixed === 'left' && i === row.length - 1 ? (
          <HeaderCell
            {...cellProps}
            {...customProps}
            key={column.key || column.dataIndex || i}
            onMouseOver={onMouseOverLeft}
            onMouseOut={onMouseOutLeft}
          />
        ) : column.fixed === 'right' && i === 0 ? (
          <HeaderCell
            {...cellProps}
            {...customProps}
            key={column.key || column.dataIndex || i}
            onMouseOver={onMouseOverRight}
            onMouseOut={onMouseOutRight}
          />
        ) : (
          <HeaderCell {...cellProps} {...customProps} key={column.key || column.dataIndex || i} />
        );
      })}
    </HeaderRow>
  );
}

function getRowHeight(state: TableStoreState, props: TableHeaderRowProps) {
  const { fixedColumnsHeadRowsHeight } = state;
  const { columns, rows, fixed } = props;
  const headerHeight = fixedColumnsHeadRowsHeight[0];

  if (!fixed) {
    return null;
  }

  if (headerHeight && columns) {
    if (headerHeight === 'auto') {
      return 'auto';
    }
    return headerHeight / rows.length;
  }
  return null;
}
(window as any).leftTimer = null;
(window as any).rightTimer = null;
function onMouseOverLeft() {
  if ((window as any).leftTimer) {
    clearTimeout((window as any).leftTimer);
    (window as any).leftTimer = null;
  }
  document.getElementById('fixedLeftBar').style.display = 'block';
}
function onMouseOutLeft() {
  (window as any).leftTimer = setTimeout(() => {
    document.getElementById('fixedLeftBar').style.display = 'none';
  }, 300);
}

function onMouseOverRight() {
  if ((window as any).rightTimer) clearTimeout((window as any).rightTimer);
  document.getElementById('fixedRightBar').style.display = 'block';
}
function onMouseOutRight() {
  (window as any).rightTimer = setTimeout(() => {
    document.getElementById('fixedRightBar').style.display = 'none';
  }, 300);
}

export default connect((state: TableStoreState, props: TableHeaderRowProps) => ({
  height: getRowHeight(state, props),
}))(TableHeaderRow);
