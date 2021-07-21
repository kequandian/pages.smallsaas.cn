import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'kqd-common';

import { GeneralForm } from '../index';
import pageLayoutWrapper from './pageLayoutWrapper';
import titleLayoutWrapper from './titleLayoutWrapper';

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))
@pageLayoutWrapper({ title: '表单页' })
@titleLayoutWrapper({ title: '表单详情', showCollapse: false })
export default class TestGeneralForm extends PureComponent {

  render() {

    const userFormProps = {
      ...this.props,
      isFooterSubmit: true,
      modelName: 'users',
      REDIRECT: '/list',
      additionalFields: [
        // {
        //   field: 'roleSelect',
        //   type: 'roleSelect',
        //   value: '2',
        // }
      ]
    }

    return (
      <GeneralForm {...userFormProps} />
    );
  }
}
