import React, { PureComponent } from 'react';
import { TitledHeader } from '../index';

export default class TestTitledHeader extends PureComponent {

  render() {


    return (
      <div>
        <TitledHeader title='默认'>
          <div>abc</div>
          <div>efg</div>
        </TitledHeader>
        <div style={{height: 50}}></div>
        <TitledHeader title='自定义'
          extra={<a>更多</a>}
          showCollapse='true'
          style={{ border: '1px solid #000'}}
          headStyle={{ backgroundColor: '#ccc', color: 'red', borderBottom: '1px solid #000'}}>
          <div>abc</div>
          <div>efg</div>
        </TitledHeader>
      </div>
    );
  }
}
