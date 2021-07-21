import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TitledHeader } from 'kqd-page-header';
import { Chart } from 'kqd-statistic-element';
import { Tabs } from 'antd';
import { GMApp } from 'kqd-general';
import productConfig from './product.config';
import categoryConfig from './category.config';
import storeConfig from './store.config';

const { TabPane } = Tabs;

@connect(({ statRevenue, loading }) => ({
  modelStatus: statRevenue,
  namespace: 'statRevenue',
  loading: loading.models.statRevenue,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <TitledHeader>
        <Chart group="stat:revenue" />
        <Tabs defaultActiveKey="Product">
          <TabPane tab="产品成交量统计" key="Product">
            <GMApp
              {...this.props}
              config={productConfig}
              listProps={{
                title: false,
              }}
              APIObject={{
                listAPI: '/api/stat/cross/trading_product?type=Product',
              }}
              dataSourceMap="Product"
            />
          </TabPane>
          <TabPane tab="产品类别成交量统计" key="Category">
            <GMApp
              {...this.props}
              config={categoryConfig}
              listProps={{
                title: false,
              }}
              APIObject={{
                listAPI: '/api/stat/cross/trading_product?type=Category',
              }}
              dataSourceMap="Category"
            />
          </TabPane>
          <TabPane tab="店铺成交量统计" key="Store">
            <GMApp
              {...this.props}
              config={storeConfig}
              listProps={{
                title: false,
              }}
              APIObject={{
                listAPI: '/api/stat/cross/trading_product?type=Store',
              }}
              dataSourceMap="Store"
            />
          </TabPane>
        </Tabs>
      </TitledHeader>
    );
  }
}