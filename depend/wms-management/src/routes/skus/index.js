import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './Query';

@connect(({ skus, loading }) => ({
  modelStatus: skus,
  namespace: 'skus',
  loading: loading.models.skus,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GMApp 
          { ...this.props }
          config={ config }
          APIObject={{
            deleteAPI: '/api/wms/products/(id)',
          }}
          formProps={{
            beforeSubmit: (values) => {
              // values.id = null;
              delete values.skus;
              return values;
            }
          }}
          routerMap={{
            query: Query,
          }}
        />
    );
  }
}