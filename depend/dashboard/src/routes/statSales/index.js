import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TitledHeader } from 'kqd-page-header';
import { Tabs } from 'antd';
import { GMApp } from 'kqd-general';
import RankList from './components/RankList';
import config from './config';
import inventoryConfig from './inventory.config'

const { TabPane } = Tabs;

@connect(({ statSales, loading }) => ({
  modelStatus: statSales,
  namespace: 'statSales',
  loading: loading.models.statSales,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <TitledHeader>
        <Tabs defaultActiveKey="rank">
          <TabPane tab="商品销量统计" key="rank">
            <RankList
              {...this.props}
              title="商品销量 Top 10 排行榜"
              config={config}
              APIObject={{
                listAPI: '/api/stat/cross/product/rank',
              }}
              listProps={{
                title: false,
                rowSelection: false,
                pagination: false,
              }}
              dataSourceMap="rank"
            />
          </TabPane>
          <TabPane tab="存销比统计" key="inventory">
            <GMApp
              {...this.props}
              config={inventoryConfig}
              listProps={{
                title: false,
              }}
              APIObject={{
                listAPI: '/api/stat/cross/inventory',
              }}
            />
          </TabPane>
        </Tabs>
      </TitledHeader>
    );
  }
}