import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';

@connect(({ tags, loading }) => ({
  modelStatus: tags,
  namespace: 'tags',
  loading: loading.models.tags,
}))
export default class Index extends PureComponent {
  render() {
    const routerMap = {
      query: Query,
    };
    return (
        <GMApp { ...this.props } config={ config }
          routerMap={ routerMap }
          APIObject={{
            listAPI: '/api/stock/tags?tagType=Diary',
          }}
          setFieldDefaultValue={{
            tagType: 'Diary',
          }}
        />
    );
  }
}