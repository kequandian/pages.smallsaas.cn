import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';

@connect(({ vipTags, loading }) => ({
  modelStatus: vipTags,
  namespace: 'vipTags',
  loading: loading.models.vipTags,
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
            listAPI: '/api/stock/tags?tagType=Member',
          }}
          setFieldDefaultValue={{
            tagType: 'Member',
          }}
          REDIRECT="vip-tags"
        />
    );
  }
}