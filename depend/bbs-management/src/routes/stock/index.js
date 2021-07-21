import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import { MiniCard } from 'kqd-list-item-element';

import config from './config';
import Query from './query';

@connect(({ stock, loading }) => ({
  modelStatus: stock,
  namespace: 'stock',
  loading: loading.models.stock,
}))
export default class Index extends PureComponent {
  render() {
    const { modelStatus } = this.props
    return (
      <GMApp
        { ...this.props }
        config={ config }
        APIObject={{
          // listAPI: '/api/cms/articles?type=Diary',
          listAPI: '/api/cms/diarys?viewForbidden=1',
          deleteAPI: '/api/cms/articles/(id)',
        }}
        routerMap={{
          query: Query,
        }}
        listProps={{
          listHeaderComponent: <div>
            <MiniCard data={{
              title: '用户日志总数',
              value: modelStatus.total || 0,
            }}/>
            <br /><br />
          </div>
        }}
      />
    );
  }
}
