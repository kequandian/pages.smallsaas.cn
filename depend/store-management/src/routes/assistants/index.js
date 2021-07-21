import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import queryString from 'query-string';

import { GeneralManagement, GMApp } from 'kqd-general';
import Query from './query';
import config from './config';

@connect(({ assistants, loading }) => ({
  modelStatus: assistants,
  namespace: 'assistants',
  loading: loading.models.assistants,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <GMApp { ...this.props } config={ config }
        routerMap={{
          query: Query,
        }}
      />
    );
  }
}