import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TitledHeader } from 'kqd-page-header';
import { Chart } from 'kqd-statistic-element';
import { LRLayout } from 'kqd-layout-flex';
import TimeList from './components/TimeList';
import ProductItem from './components/TimeList/components/ProductItem';
import StoreItem from './components/TimeList/components/StoreItem';

@connect(({ dashboard, loading }) => ({
  modelStatus: dashboard,
  namespace: 'dashboard',
  loading: loading.models.dashboard,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <div>
        <Chart group="stat:b:home" />
        <LRLayout justify="space-between">
          <TimeList
            {...this.props}
            title="商品销量 Top 10 排行榜"
            config={{
              table: {},
            }}
            APIObject={{
              listAPI: '/api/stat/cross/product/top_ten',
              // listAPI: null,
            }}
            listProps={{
              title: false,
              rowSelection: false,
              pagination: false,
              ItemComponent: ProductItem,
            }}
            dataSourceMap="product"
          />
          <TimeList
            style={{float: 'right'}}
            {...this.props}
            title="店铺业绩排行榜"
            config={{table: {}}}
            APIObject={{
              listAPI: '/api/stat/cross/store/top_ten',
            }}
            listProps={{
              title: false,
              rowSelection: false,
              pagination: false,
              ItemComponent: StoreItem,
            }}
            dataSourceMap="store"
          />
        </LRLayout>
      </div>
    );
  }
}