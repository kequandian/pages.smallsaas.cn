/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <LRBLayout>
      left = ''
      right = ''
      children   //传入子元素
    </LRBLayout>
 */

import React, { PureComponent, Fragment } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

export default class Index extends PureComponent {

  render() {
    const { left = null, right = null } = this.props;
    return (
      <Fragment>
        {left || right ?
          <Row type="flex" justify="space-between">
            <Col>{left}</Col>
            <Col>{right}</Col>
          </Row>
        : ''}
        <Row>
          {this.props.children}
        </Row>
      </Fragment>
    )
  }
}
