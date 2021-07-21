import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { WhiteSpace } from 'kqd-common';
import { TitledHeader, PageHeader } from 'kqd-page-header';
import {  GeneralList, ModalForm } from '../index';

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))
export default class TestModalForm extends PureComponent {

  render() {
    const newProps = {
      ...this.props,
      modelName: 'users',
      grid: true, columnNum: 2,
      title: '添加用户'
    };
    const userListProps = {
      ...newProps,
      showOperator: false,
      //ADD: '/general-form', // 不提供ADD，EDIT时，使用modal方式
      //EDIT: '/general-form',
      dataColumns: [
        {
          title: '登录名',
          intl: 'account',
          dataIndex: 'account',
        },
        {
          title: '名字',
          dataIndex: 'name',
        },
        {
          title: '注册时间',
          dataIndex: 'createtime',
        }
      ]
    }

    return (
      <PageHeader title="查询表格">
        <TitledHeader title="查询" showCollapse='true'>
          <GeneralList {...userListProps} />
          <ModalForm {...newProps} width={1100} />
        </TitledHeader>
      </PageHeader>
    );
  }
}
