import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ZEle } from 'zero-element';
import { Tabs } from 'antd';
import PortalConfig from './config/PortalConfig';
import ProductConfig from './config/ProductConfig';
import ElementConfig from './config/ElementConfig';
import ExperienceConfig from './config/ExperienceConfig';
import VIPCenterConfig from './config/VIPCenter';

const { TabPane } = Tabs;
const Wrapped = ({ children }) => {
  return <div style={{ padding: '16px', background: '#fff' }}>
    {children}
  </div>
}

@connect(({ carousels, loading }) => ({
  modelStatus: carousels,
  namespace: 'carousels',
  loading: loading.effects,
}))
export default class Carousels extends PureComponent {
  render() {
    return (
      <Wrapped>
        <Tabs defaultActiveKey="portal" destroyInactiveTabPane={true}>
          <TabPane tab="首页轮播图" key="portal">
            <Wrapped>
              <ZEle {...this.props} config={PortalConfig} />
            </Wrapped>
          </TabPane>
          <TabPane tab="产品轮播图" key="Product">
            <Wrapped>
              <ZEle {...this.props} config={ProductConfig} />
            </Wrapped>
          </TabPane>
          <TabPane tab="成分党轮播图" key="Element">
            <Wrapped>
              <ZEle {...this.props} config={ElementConfig} />
            </Wrapped>
          </TabPane>
          <TabPane tab="体验中心轮播图" key="Experience">
            <Wrapped>
              <ZEle {...this.props} config={ExperienceConfig} />
            </Wrapped>
          </TabPane>
          <TabPane tab="会员中心轮播图" key="VIPCenter">
            <Wrapped>
              <ZEle {...this.props} config={VIPCenterConfig} />
            </Wrapped>
          </TabPane>
        </Tabs>
      </Wrapped>
    );
  }
}