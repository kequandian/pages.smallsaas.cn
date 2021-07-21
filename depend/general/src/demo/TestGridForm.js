import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { WhiteSpace } from 'kqd-common';
import { TitledHeader, PageHeader } from 'kqd-page-header';
import { GridForm } from '../index';

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))
export default class TestGridForm extends PureComponent {

  render() {
    const newProps = {
      ...this.props,
      isFooterSubmit: true,
      modelName: 'users',
      REDIRECT: '/list',
      columnNum: 2
     };

    return (
      <PageHeader title="GirdForm">
        <TitledHeader title="Gird表单">
          <GridForm {...newProps} />
        </TitledHeader>
      </PageHeader>
    );
  }
}
