import React,{ Fragment } from 'react';
import { GMApp } from 'kqd-general';
import { Alert } from 'antd';
import config from './config';

const List = GMApp.List;

export default (props) => {
  const { dataPool, ...restProps } = props;
  return <Fragment>
    <Alert message="最多支持6个会员等级,等级 1 为最低级。" type="info" showIcon />
    <br />
    <List { ...restProps } config={ config }
      listProps={{
        title: false,
        rowSelection: false,
      }}
      APIObject={{
        listAPI: '/api/vip/account/grades',
        deleteAPI: '/api/vip/account/grades/(id)',
        // listAPI: null,
      }}
      dataSourceMap="level"
    />
  </Fragment>;
}