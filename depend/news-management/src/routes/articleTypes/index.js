import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';

@connect(({ articleTypes, loading }) => ({
  modelStatus: articleTypes,
  namespace: 'articleTypes',
  loading: loading.models.articleTypes,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GMApp { ...this.props } config={config} />
    );
  }
}
