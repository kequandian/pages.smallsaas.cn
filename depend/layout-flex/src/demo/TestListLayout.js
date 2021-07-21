import React, { PureComponent } from 'react';
import { ListLayout } from '../index';

export default class TestListLayout extends PureComponent {

  render() {

    return (
      <ListLayout>
        <div style={{backgroundColor: '#999', margin: 5}}>
          I am the child 1
        </div>
        <div style={{backgroundColor: '#999', margin: 5}}>
          I am the child 2
        </div>
        <div style={{backgroundColor: '#999', margin: 5}}>
          I am the child 3
        </div>
      </ListLayout>
    );
  }
}
