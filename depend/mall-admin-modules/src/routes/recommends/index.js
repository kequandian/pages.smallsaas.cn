import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';

@connect(({ recommendsManagement, loading }) => ({
  modelStatus: recommendsManagement,
  namespace: 'recommendsManagement',
  loading: loading.models.recommendsManagement,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GMApp { ...this.props } config={ config } />
    );
  }
}