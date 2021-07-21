import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { LRLayout } from 'kqd-layout-flex';
import SearchForm from './SearchForm';

import { Permissions } from 'kqd-common';
import { getPermissions } from 'kqd-utils/lib/token';
const { createPerm } = Permissions;
const store = createPerm();

export default class OperationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  actionMap = (type, options) => {
    if (this.props[`on${type}`]) {
      this.props[`on${type}`](options);
    }
  }

  actionRender = (item, i) => {
    const _this = this;
    const typeMap = {
      add(title, i, options) {
        return (<Button icon="plus" type="primary"
          key={i}
          onClick={_this.actionMap.bind(null, 'Add', options)}>{title}</Button>);
      },
      addItem(title, i, options) {
        return (<Button icon="plus" type="primary"
          key={i}
          onClick={_this.actionMap.bind(null, 'AddItem', options)}>{title}</Button>);
      },
      modal(title, i, options = {}) {
        return (<Button icon={options.icon || 'profile'} type="primary"
          key={i}
          onClick={_this.actionMap.bind(null, 'Modal', options)}>{title}</Button>);
      },
      batchDelete(title, i, options) {
        return (<Button icon="delete" type="danger"
          key={i}
          onClick={_this.actionMap.bind(null, 'BatchDelete', options)}>{title}</Button>);
      },
      import(title, i, options) {
        return (<Button icon="file-add" type="primary"
          key={i}
          onClick={_this.actionMap.bind(null, 'Import', options)}>{title}</Button>);
      },
      export(title, i, options) {
        return (<Button icon="export"
          key={i}
          onClick={_this.actionMap.bind(null, 'Export', options)}>{title}</Button>);
      },
      confirm(title, i, options) {
        return (<Button
          key={i}
          type={options.color}
          onClick={_this.actionMap.bind(null, 'Confirm', options)}>{title}</Button>);
      },
      router(title, i, options) {
        return (<Button
          key={i}
          icon={options.icon}
          type={options.color}
          onClick={_this.actionMap.bind(null, 'Router', options)}>{title}</Button>);
      },
      customize(title, i, options) {
        return (<Button type="primary"
          key={i}
          onClick={_this.actionMap.bind(null, 'Customize', options)}>{title}</Button>);
      },
    };
    const { options = {} } = item;
    const { permission, localtion } = options;
    // 若需要检测权限
    if (permission) {
      if (localtion) { // 是否直接从 本地存储里面读取 permission 用于无法使用 kqd-common Permission 的场合
        const permissionData = getPermissions();
        if (Array.isArray(permissionData) && permissionData.findIndex((item) => item === permission) === -1) {
          return null;
        }
      } else {
        if (!store.getPerm()[permission]) {
          return null;
        }
      }
    }
    return typeMap[item.action](item.title, i, options);
  };
  render() {
    const { action = [], selectedRows = [], searchProps = {}, onFetchList, columnNum, modelStatus } = this.props;
    let fields = this.props.fields || [];

    fields = fields.map(field => {
      return { ...field, label: null, props: { placeholder: field.placeholder, ...field.props } }
    });

    let span = [20, 4];
    if (action.length + selectedRows.length >= 4) {
      span = [14, 10];
    } else if (action.length + selectedRows.length >= 2) {
      span = [17, 7];
    } else if (action.length + selectedRows.length === 0) {
      span = [24, 0];
    }

    return (
      <LRLayout span={span}>
        {fields.length > 0 ? (<SearchForm
          fields={fields}
          columnNum={columnNum}
          modelStatus={modelStatus}
          {...{ requester: this.props.requester, dataPool: this.props.dataPool }}
        />) : <div></div>}
        <div style={{ textAlign: 'right' }}>
          {action.map((v, i) => {
            return this.actionRender(v, i);
          })}
          {selectedRows.length > 0 ? this.actionRender({
            title: '批量删除',
            action: 'batchDelete',
          }, 90) : ''}
        </div>
      </LRLayout>
    );
  }
}
