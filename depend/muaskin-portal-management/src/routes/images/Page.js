import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import { ZEle } from 'zero-element';
import { endpointSet, setLayoutExtends } from 'zero-element';
import ImagesTile from '../../layout/ImagesTile';
import ImagesConfig from './config/ImagesConfig';
import HTMLConfig from './config/HTMLConfig';

setLayoutExtends({
  ImagesTile,
});

const { TabPane } = Tabs;
const Wrapped = ({ children }) => {
  return <div style={{ padding: '16px', background: '#fff' }}>
    {children}
  </div>
}

@connect(({ images, loading }) => ({
  modelStatus: images,
  namespace: 'images',
  loading: loading.effects,
}))
export default class Carousels extends PureComponent {
  render() {
    return (
      <Wrapped>
        <Tabs defaultActiveKey="images" destroyInactiveTabPane={true}>
          <TabPane tab="图片替换" key="images">
            <Wrapped>
              <ZEle {...this.props} config={ImagesConfig} />
            </Wrapped>
          </TabPane>
          <TabPane tab="HTML编辑" key="HTML">
            <Wrapped>
              <ZEle {...this.props} config={HTMLConfig} />
            </Wrapped>
          </TabPane>
        </Tabs>
      </Wrapped>
    );
  }
}