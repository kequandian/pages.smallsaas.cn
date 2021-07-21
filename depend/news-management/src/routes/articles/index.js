import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';

@connect(({ articles, loading }) => ({
  modelStatus: articles,
  namespace: 'articles',
  loading: loading.models.articles,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GMApp { ...this.props }
          config={ config }
          routerMap={{
            query: Query,
          }}
          APIObject={{
            listAPI: '/api/cms/articles?type=Article',
          }}
        />
    );
  }
}
