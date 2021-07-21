import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TitledHeader } from 'kqd-page-header';
import { Chart } from 'kqd-statistic-element';
import { Tabs } from 'antd';
import { GMApp } from 'kqd-general';
import productConfig from './product.config';
import categoryConfig from './category.config';

const { TabPane } = Tabs;

@connect(({ statProfit, loading }) => ({
  modelStatus: statProfit,
  namespace: 'statProfit',
  loading: loading.models.statProfit,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <TitledHeader>
        <Chart group="stat:profit" />
        <Tabs defaultActiveKey="Product">
          <TabPane tab="产品毛利统计" key="Product">
            <GMApp
              {...this.props}
              config={productConfig}
              listProps={{
                title: false,
              }}
              APIObject={{
                listAPI: '/api/stat/cross/profit?type=Product',
              }}
              dataSourceMap="Product"
            />
          </TabPane>
          <TabPane tab="产品类别毛利统计" key="Category">
            <GMApp
              {...this.props}
              config={categoryConfig}
              listProps={{
                title: false,
              }}
              APIObject={{
                listAPI: '/api/stat/cross/profit?type=Category',
              }}
              dataSourceMap="Category"
            />
          </TabPane>
        </Tabs>
      </TitledHeader>
    );
  }
}