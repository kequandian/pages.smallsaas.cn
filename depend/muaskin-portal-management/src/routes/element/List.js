import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ZEle } from 'zero-element';
import config from './List.config';

@connect(({ element, loading }) => ({
  modelStatus: element,
  namespace: 'element',
  loading: loading.effects,
}))
export default class List extends PureComponent {
  render() {
    return (
      <ZEle { ...this.props } config={ config }
       CPortal={{
         'BatchOperation': () => {
           return null;
         }
       }}
       />
    );
  }
}