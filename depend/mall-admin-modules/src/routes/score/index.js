import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';

@connect(({ scoreManagement, loading }) => ({
  modelStatus: scoreManagement,
  namespace: 'scoreManagement',
  loading: loading.models.scoreManagement,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GMApp { ...this.props } config={ config } />
    );
  }
}