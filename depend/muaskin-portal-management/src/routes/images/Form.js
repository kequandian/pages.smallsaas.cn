import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ZEle } from 'zero-element';
import config from './config/HTMLConfig/Form.config';

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
export default class Index extends PureComponent {
  render() {
    return (
      <Wrapped>
        <ZEle {...this.props} config={config} />
      </Wrapped>
    );
  }
}