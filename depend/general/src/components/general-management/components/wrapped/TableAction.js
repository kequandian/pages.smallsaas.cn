/**
 * 接收 GeneralTable ，并为之赋予 action
 */
import React, { Component, Fragment } from 'react'
import Divider from 'antd/lib/divider';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import { Permissions } from 'kqd-common';
import { getPermissions } from 'kqd-utils/lib/token';
const { createPerm } = Permissions;
const store = createPerm();

import './index.css';

const confirm = Modal.confirm;

export default (GeneralTable) => {
  return class TableAction extends Component {

    actionMap = (type, record, options = {}) => {
      type = type.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
      const _this = this;
      if (this.props[`on${type}`]) {
        if (type.indexOf('Delete') >= 0) {
          confirm({
            title: options.title || '确定要删除该项数据吗？',
            content: record[options.name] || record.name || record.id,
            onOk() {
              _this.props[`on${type}`](record, options);
            },
            onCancel() {
              return false;
            },
          });
        } else {
          this.props[`on${type}`](record, options);
        }
      }
    }

    operationMap = {
      // 弃用预定
      'conditionButton': (v, i, a, text, record) => {
        console.error(' conditionButton 即将弃用，请改用 button ');
        return (
          <Menu.Item key={i} className="kqd-table-action-menuItem" >
            弃用的配置项
          </Menu.Item>
        );
      },
      // 预计实现：显示在下拉菜单之外
      'button': (v, i, a, text, record) => {
        if (!testValue(record, v.options)) {
          return false;
        }
        return (
          <Menu.Item key={i}>
            <Button type={v.options.color} size="small" onClick={this.actionMap.bind(null, v.action, record, v.options)}>{v.title}</Button>
          </Menu.Item>
        );
      },
      'defaults': (v, i, a, text, record) => {
        if (!testValue(record, v.options)) {
          return '';
        }
        const iconMap = {
          'edit': 'form',
          'query': 'file-text',
          'delete': 'delete',
          'default': 'right',
        };
        const iconColorMap = {
          'edit': '#1890ff',
          'query': '#666',
          'delete': '#f5222d',
          'default': '#666',
        };
        const { icon, color } = v.options || {};
        return (
          <Menu.Item key={i} className="kqd-table-action-menuItem" >
            <a onClick={this.actionMap.bind(null, v.action, record, v.options)}>
              <Icon type={icon || iconMap[v.action] || iconMap['default']} style={{ color: `${color || iconColorMap[v.action] || iconColorMap['default']}` }} />{v.title}
            </a>
          </Menu.Item>
        );
      }
    };

    formatOperationCol = () => {
      const operationCol = this.props.operation || [];
      const { operationWidth } = this.props;

      if (operationCol.length === 0) {
        return null;
      };

      const rst = {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'right',
        fixed: 'right',
        width: 60,
        render: (text, record) => {
          return this.renderActionButton(operationCol, text, record);
        }
      };
      return rst;
    }
    renderActionButton = (operationCol, text, record) => {
      const { operationMap } = this;
      const _this = this;
      let menuItemList = operationCol.map((v, i, a) => {
        v.options = v.options || {};
        return operationMap[v.options.type || 'defaults'].bind(_this, v, i, a, text, record)();
      }).filter(item => item);
      if (menuItemList.length === 0) {
        menuItemList.push(<Menu.Item key="99" disabled>暂无</Menu.Item>);
      }
      const menu = <Menu>
        {menuItemList}
      </Menu>;
      return <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Icon style={{ fontSize: '24px' }} type="ellipsis" />
      </Dropdown>
    }

    render() {
      console.log('TableAction props :', this.props);
      const operation = this.formatOperationCol();
      return <GeneralTable {...this.props} operation={operation} />
    }
  }
}

// 检测该行数据的字段的值 是否符合预期
function testValue(record, options) {
  const rulesMap = {
    'IS_NOT_NULL': /\S+/g
  };
  let { expectedField, expectedValue, permission, localtion = false } = options;

  // 若需要检测权限
  if (permission) {
    if (localtion) { // 是否直接从 本地存储里面读取 permission 用于无法使用 kqd-common Permission 的场合
      const localPermissionData = getPermissions();
      const permissionData = typeof localPermissionData === 'string' ? JSON.parse(localPermissionData) : localPermissionData;

      if (Array.isArray(permissionData) && permissionData.findIndex((item) => item === permission) === -1) {
        return false;
      }
    } else {
      if (!store.getPerm()[permission]) {
        return false;
      }
    }

  }
  const fieldList = expectedField instanceof Array ? expectedField : [expectedField];
  const valueList = expectedValue instanceof Array ? expectedValue : [expectedValue];
  return fieldList.every((field, i) => {
    let value = valueList[i];
    // 若不是简单的相等关系的话
    if (record[field] !== value) {
      // 先看看 expectedValue 是不是预设关键字
      if (rulesMap[value]) {
        if (!rulesMap[value].test(record[field])) {
          return false;
        }
      } else {
        // 再看看 expectedValue 是不是传入了正则表达式
        try {
          value = new RegExp(value, 'g');
        } catch (error) {
          return false;
        }
        if (value instanceof RegExp) {
          if (!value.test(record[field])) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return true;
  });
}