import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import { formatValueMap } from './config';
import { StandardTable } from 'kqd-common';
import { getPermissions } from 'kqd-utils/lib/token';

/**
 * 该组件仅仅用于数据展示，不包括其它逻辑。
 * 
 * 实现对表格列的格式化
 * 如对 valueType 为 currency 的数据渲染为货币形式。
 * 
 */
export default (props) => {

  function formatValue(type, ...data) {
    return formatValueMap[type](...data);
  }

  function formatColumns(columns) {
    const { onChangeColValue, operation } = props;
    let rst = [];
    const localPermissionData = getPermissions();

    for (let index = 0; index < columns.length; index++) {
      const item = columns[index];
      let { ...options } = item.options;
      if (options.permission) {
        if (localPermissionData.findIndex(perm => perm === options.permission) === -1) {
          continue ;
        }
      }
      options.dataIndex = item.field;
      options.onChangeColValue = onChangeColValue;
      rst.push({
        ...item,
        title: item.title,
        dataIndex: item.field,
        render: item.valueType ? formatValue.bind(null, item.valueType, options) : item.render,
      });
    }

    if (operation) {
      rst.push(operation);
    }
    rst.unshift({
      field: 'index',
      key: '_index',
      title: '',
      width: 24,
      align: 'center',
      render: formatValue.bind(null, 'index', {}),
    });

    return rst;
  }

  function handleOk() {
    const { onOk, selectedRows } = props;
    if (onOk) {
      onOk(selectedRows);
    }
  }
  function handleCancel() {
    const { onCancel } = props;
    if (onCancel) {
      onCancel();
    }
  }

  const { selectedRowKeys, selectedRows = [], isFooter = false, footer, className } = props;
  const { data, formatListData, pagination, loading, columns = [], rowSelection = true } = props;
  return (
    <div className={className}>
      <StandardTable
        scroll={props.scroll}
        loading={loading}
        data={typeof formatListData === 'function' ? formatListData(data) : data}
        pagination={pagination}
        columns={formatColumns(columns)}
        selectedRowKeys={selectedRowKeys || selectedRows.map(item => item.id)}
        rowSelection={rowSelection}
        footer={footer}
        onSelectRow={props.onSelectRow}
        onChange={props.onTableChange}
        onRefresh={props.onRefresh}
      />
      {isFooter ? (
        <Row type="flex" justify="end">
          <Col>
            <Button type='primary' onClick={handleOk}>确认</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>取消</Button>
          </Col>
        </Row>
      ) : ''}
    </div>
  );
}