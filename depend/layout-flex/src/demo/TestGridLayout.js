import React, { PureComponent } from 'react';
import { GridLayout } from '../index';

export default class TestGridLayout extends PureComponent {

  render() {

    const props = {
      listNumber:3,                   //flex布局，listNumber表示按多少列排布
      style:{                         //style是对组件的布局
        border: '2px solid #DFDFDF',
        padding: '0 10px',
        borderRadius: '1px',
        backgroundColor: '#fff',
      }
    }

    return (
      <div>
        <GridLayout {...props}>
          <div style={{backgroundColor:'#999',height: '100px'}}>子组件</div>
          <div style={{backgroundColor:'#999',height: '100px'}}>子组件</div>
          <div style={{backgroundColor:'#999',height: '100px'}}>子组件</div>
          <div style={{backgroundColor:'#999',height: '100px'}}>子组件</div>
          <div style={{backgroundColor:'#999',height: '100px'}}>子组件</div>
          <div style={{backgroundColor:'#999',height: '100px'}}>子组件</div>
          <div style={{backgroundColor:'#999',height: '100px'}}>子组件</div>
        </GridLayout>
      </div>
    );
  }
}
