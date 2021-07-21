import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';

@connect(({ inventories, loading }) => ({
  modelStatus: inventories,
  namespace: 'inventories',
  loading: loading.models.inventories,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GMApp { ...this.props } config={ config }
          listProps={{
            rowSelection: false,
          }}
          APIObject={{
            API: '/api/wms/inventories',
            getAPI: '/api/wms/skus/[id]',
          }}
          routerMap={{
            query: Query,
          }}
          // setFaildDefaultValue={{
          //   id: null,
          //   warehouseName: null,
          // }}
          // queryMap={[
          //   {from: 'warehouseName', to: 'warehouseName'}
          // ]}
        />
    );
  }
}