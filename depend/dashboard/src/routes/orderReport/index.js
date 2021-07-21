import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TitledHeader } from 'kqd-page-header';
import { GMApp } from 'kqd-general';
import config from './config';

@connect(({ orderReport, loading }) => ({
  modelStatus: orderReport,
  namespace: 'orderReport',
  loading: loading.models.orderReport,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <TitledHeader>
        <GMApp
          {...this.props}
          config={config}
          listProps={{
            title: false,
          }}
          APIObject={{
            listAPI: '/api/stat/cross/order_report',
          }}
        // dataSourceMap="orderReport"
        />
      </TitledHeader>
    );
  }
}