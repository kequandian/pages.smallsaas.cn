import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';

@connect(({ articleCategories, loading }) => ({
  modelStatus: articleCategories,
  namespace: 'articleCategories',
  loading: loading.models.articleCategories,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GMApp { ...this.props } config={ config } />
    );
  }
}
