import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Query from './query';
import { GMApp } from 'kqd-general';
import config from './config';

@connect(({ notices, loading }) => ({
  modelStatus: notices,
  namespace: 'notices',
  loading: loading.models.notices,
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
