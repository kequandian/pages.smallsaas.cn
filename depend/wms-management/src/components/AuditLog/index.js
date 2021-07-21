import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import config from './config';

const { List } = GMApp;

export default class AuditLog extends Component {
  render() {
    const props = {
      ...this.props,
      listProps: {
        title: '日志记录',
        rowSelection: false,
      },
      config,
    }
    return <div>
      <br/>
      <List {...props} dataSourceMap="logs" />
    </div>
  }
}