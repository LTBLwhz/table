function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import classNames from 'classnames';
import ColGroup from './ColGroup';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import ExpandableRow from './ExpandableRow';

var BaseTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaseTable, _React$Component);

  function BaseTable() {
    var _this;

    _classCallCheck(this, BaseTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseTable).apply(this, arguments));

    _this.handleRowHover = function (isHover, key) {
      _this.props.store.setState({
        currentHoverKey: isHover ? key : null
      });
    };

    _this.renderRows = function (renderData, indent) {
      var ancestorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var table = _this.context.table;
      var columnManager = table.columnManager,
          components = table.components;
      var _table$props = table.props,
          prefixCls = _table$props.prefixCls,
          childrenColumnName = _table$props.childrenColumnName,
          rowClassName = _table$props.rowClassName,
          rowRef = _table$props.rowRef,
          onRowClick = _table$props.onRowClick,
          onRowDoubleClick = _table$props.onRowDoubleClick,
          onRowContextMenu = _table$props.onRowContextMenu,
          onRowMouseEnter = _table$props.onRowMouseEnter,
          onRowMouseLeave = _table$props.onRowMouseLeave,
          onRow = _table$props.onRow;
      var _this$props = _this.props,
          getRowKey = _this$props.getRowKey,
          fixed = _this$props.fixed,
          expander = _this$props.expander,
          isAnyColumnsFixed = _this$props.isAnyColumnsFixed;
      var rows = [];

      var _loop = function _loop(i) {
        var record = renderData[i];
        var key = getRowKey(record, i);
        var className = typeof rowClassName === 'string' ? rowClassName : rowClassName(record, i, indent);
        var onHoverProps = {};

        if (columnManager.isAnyColumnsFixed()) {
          onHoverProps.onHover = _this.handleRowHover;
        }

        var leafColumns = void 0;

        if (fixed === 'left') {
          leafColumns = columnManager.leftLeafColumns();
        } else if (fixed === 'right') {
          leafColumns = columnManager.rightLeafColumns();
        } else {
          leafColumns = _this.getColumns(columnManager.leafColumns());
        }

        var rowPrefixCls = "".concat(prefixCls, "-row");
        var row = React.createElement(ExpandableRow, Object.assign({}, expander.props, {
          fixed: fixed,
          index: i,
          prefixCls: rowPrefixCls,
          record: record,
          key: key,
          rowKey: key,
          onRowClick: onRowClick,
          needIndentSpaced: expander.needIndentSpaced,
          onExpandedChange: expander.handleExpandChange
        }), function (expandableRow) {
          return React.createElement(TableRow, Object.assign({
            fixed: fixed,
            indent: indent,
            parentPrefixCls: prefixCls,
            className: className,
            record: record,
            index: i,
            prefixCls: rowPrefixCls,
            childrenColumnName: childrenColumnName,
            columns: leafColumns,
            onRow: onRow,
            onRowDoubleClick: onRowDoubleClick,
            onRowContextMenu: onRowContextMenu,
            onRowMouseEnter: onRowMouseEnter,
            onRowMouseLeave: onRowMouseLeave
          }, onHoverProps, {
            rowKey: key,
            ancestorKeys: ancestorKeys,
            ref: rowRef(record, i, indent),
            components: components,
            isAnyColumnsFixed: isAnyColumnsFixed
          }, expandableRow));
        });
        rows.push(row);
        expander.renderRows(_this.renderRows, rows, record, i, indent, fixed, key, ancestorKeys);
      };

      for (var i = 0; i < renderData.length; i += 1) {
        _loop(i);
      }

      return rows;
    };

    return _this;
  }

  _createClass(BaseTable, [{
    key: "getColumns",
    value: function getColumns(cols) {
      var _this$props2 = this.props,
          _this$props2$columns = _this$props2.columns,
          columns = _this$props2$columns === void 0 ? [] : _this$props2$columns,
          fixed = _this$props2.fixed;
      var table = this.context.table;
      var prefixCls = table.props.prefixCls;
      return (cols || columns).map(function (column) {
        return _objectSpread({}, column, {
          className: !!column.fixed && !fixed ? classNames("".concat(prefixCls, "-fixed-columns-in-body"), column.className) : column.className
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var table = this.context.table;
      var components = table.components;
      var _table$props2 = table.props,
          prefixCls = _table$props2.prefixCls,
          scroll = _table$props2.scroll,
          data = _table$props2.data,
          getBodyWrapper = _table$props2.getBodyWrapper;
      var _this$props3 = this.props,
          expander = _this$props3.expander,
          tableClassName = _this$props3.tableClassName,
          hasHead = _this$props3.hasHead,
          hasBody = _this$props3.hasBody,
          fixed = _this$props3.fixed;
      var tableStyle = {};

      if (!fixed && scroll.x) {
        // not set width, then use content fixed width
        tableStyle.width = scroll.x === true ? 'max-content' : scroll.x;
      }

      var Table = hasBody ? components.table : 'table';
      var BodyWrapper = components.body.wrapper;
      var body;

      if (hasBody) {
        body = React.createElement(BodyWrapper, {
          className: "".concat(prefixCls, "-tbody")
        }, this.renderRows(data, 0));

        if (getBodyWrapper) {
          body = getBodyWrapper(body);
        }
      }

      var columns = this.getColumns();
      return React.createElement(Table, {
        className: tableClassName,
        style: tableStyle,
        key: "table"
      }, React.createElement(ColGroup, {
        columns: columns,
        fixed: fixed
      }), hasHead && React.createElement(TableHeader, {
        expander: expander,
        columns: columns,
        fixed: fixed
      }), body);
    }
  }]);

  return BaseTable;
}(React.Component);

BaseTable.contextTypes = {
  table: PropTypes.any
};
export default connect()(BaseTable);