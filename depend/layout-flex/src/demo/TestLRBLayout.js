import React, { PureComponent } from 'react';
import { LRBLayout } from '../index';

export default class TestLRBLayout extends PureComponent {

  render() {
    const left = <div style={{backgroundColor: '#ddd'}}>left box</div>;
    const right = <div style={{backgroundColor: '#ccc'}}>right box</div>;

    return (
      <LRBLayout left={left} right={right}>
        <div style={{backgroundColor: '#999'}}>
          I am the child.
        </div>
      </LRBLayout>
    );
  }
}
