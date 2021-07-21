import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import Query from './Query';
import config from './config';

@connect(({ appointment, loading }) => ({
  modelStatus: appointment,
  namespace: 'appointment',
  loading: loading.models.appointment,
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