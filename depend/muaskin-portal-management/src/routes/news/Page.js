import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ZEle } from 'zero-element';
import { Tabs } from 'antd';

import lore from './config/lore/List.config';
import fashion from './config/fashion/List.config';
import video from './config/video/List.config';

const { TabPane } = Tabs;
const Wrapped = ({ children }) => {
  return <div style={{ padding: '16px', background: '#fff' }}>
    {children}
  </div>
}

@connect(({ news, loading }) => ({
  modelStatus: news,
  namespace: 'news',
  loading: loading.effects,
}))
export default class Carousels extends PureComponent {
  render() {
    return (
      <Wrapped>
        <Tabs defaultActiveKey="lore" destroyInactiveTabPane={true}>
          <TabPane tab="美丽知识" key="lore">
            <Wrapped>
              <ZEle {...this.props} config={lore} />
            </Wrapped>
          </TabPane>
          <TabPane tab="潮流资讯" key="fashion">
            <Wrapped>
              <ZEle {...this.props} config={fashion} />
            </Wrapped>
          </TabPane>
          <TabPane tab="美丽课堂视频轮播" key="video">
            <Wrapped>
              <ZEle {...this.props} config={video} />
            </Wrapped>
          </TabPane>
        </Tabs>
      </Wrapped>
    );
  }
}