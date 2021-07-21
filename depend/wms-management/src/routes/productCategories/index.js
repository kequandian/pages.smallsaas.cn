import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';

@connect(({ productCategories, loading }) => ({
  modelStatus: productCategories,
  namespace: 'productCategories',
  loading: loading.models.productCategories,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <GMApp {...this.props} config={config}
        APIObject={{
          deleteAPI: '/api/wms/sku/category/(id)',
        }}
      />
    );
  }
}