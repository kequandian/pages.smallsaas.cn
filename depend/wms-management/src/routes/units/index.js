import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';

@connect(({ units, loading }) => ({
  modelStatus: units,
  namespace: 'units',
  loading: loading.models.units,
}))
export default class Index extends PureComponent {
  render() {
    const routerMap = {
      query: Query,
    };
    return (
        <GMApp { ...this.props } config={ config }
          routerMap={ routerMap }
        />
    );
  }
}