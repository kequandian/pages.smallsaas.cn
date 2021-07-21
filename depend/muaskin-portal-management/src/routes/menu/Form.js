import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ZEle } from 'zero-element';
import config from './Form.config.js';

@connect(({ menu, loading }) => ({
  modelStatus: menu,
  namespace: 'menu',
  loading: loading.effects,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <ZEle { ...this.props } config={ config }/>
    );
  }
}