import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { WhiteSpace } from 'kqd-common';
import { TitledHeader, PageHeader } from 'kqd-page-header';
import { GeneralList, SearchForm } from '../index';

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))
export default class TestGeneralList extends PureComponent {

  render() {
    const newProps = { ...this.props, modelName: 'users' };
    const userListProps = {
      ...newProps,
      ADD: '/general-form', // 不提供ADD，EDIT时，使用modal方式
      EDIT: '/general-form',
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
      ],
      rowSelection: true,
      orderBy: [
        { key: '编号', value: 'id' }, { key: '创建时间', value: 'createTime' }
      ],
      fields: [
        {
           field: 'account',
           placeholder: '账号',
           type: 'select',
           options: [
             { key: 'A', value: 'a' }, { key: 'B', value: 'b' }, { key: 'C', value: 'c' }
           ],
        },
        {
          field: 'count',
          placeholder: '输入一个数字',
          type: 'input',
        },
        {
          field: 'email',
          type: 'email',
        },
        {
          field: 'count3',
          type: 'input',
        },
        {
          field: 'count4',
          type: 'input',
        },
        {
          field: 'count5',
          type: 'input',
        },
        {
          field: 'count6',
          type: 'input',
        },
      ]
    }



    return (
      <PageHeader title="查询表格">
        <TitledHeader title="用户列表">
          <GeneralList {...userListProps} />
        </TitledHeader>
      </PageHeader>
    );
  }
}
