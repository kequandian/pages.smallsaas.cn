import React, { PureComponent } from 'react';

import { WhiteSpace } from 'kqd-common';
import { TitledHeader, PageHeader } from 'kqd-page-header';
import { UniformList, ModalForm } from '../index';

export default class TestUniformList extends PureComponent {

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      id: null,
    }
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    })
  }

  handleCreate = () => {
    this.setState({
      modalVisible: true,
    })
  }
  handleEdit = (id) => {
    this.setState({
      modalVisible: true,
      id,
    })
  }

  handleSubmit = () => {
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    const { id, modalVisible } = this.state;
    const newProps = { ...this.props, API: '/api/adm/users' };
    const userListProps = {
      ...newProps,
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
      onCreate: this.handleCreate,
      onEdit: this.handleEdit,
    }

    const userFormProps = {
      ...newProps,
      modalVisible,
      id,
      onCancel: this.handleCancel,
      onSubmit: this.handleSubmit,
      fields: [
        {
           field: 'account',
           type: 'select',//, password, number, input,email ,phone, mobile,idcard, datetime,
           value: 'b',
           options: [
             { key: 'A', value: 'a' }, { key: 'B', value: 'b' }, { key: 'C', value: 'c' }
           ],
           rules: [
             { required: true }
           ]
        },
        {
          field: 'password',
          type: 'password',
          rules: [
            { required: true }
          ]
        },
        {
          field: 'count',
          type: 'number',
          disabled: true,
          value: 5,
        },
        {
          field: 'perms',
          type: 'checkbox',
          value: [ 'edit' ],
          options: [
            {
              key: 'ADD',
              value: 'add'
            },
            {
              key: 'EDIT',
              value: 'edit'
            }
          ]
        }
      ]
    }

    return (
      <PageHeader title="查询表格">
        <TitledHeader title="用户列表">
          <UniformList {...userListProps} />
        </TitledHeader>
        <ModalForm {...userFormProps} />
      </PageHeader>
    );
  }
}
