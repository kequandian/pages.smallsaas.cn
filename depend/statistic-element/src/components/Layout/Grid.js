/**
  * @author LLH
  * @editor
  * @updated 2018年10月23日
  * @desc  可配置的 Grid 布局
  * @eg
  const Grid_2 = Grid(2);
  <Grid_2>
    <child span={ 1 } />
    <child span={ 1 } />
  <Grid_2>
*/

import React from 'react';
import { Row, Col } from 'antd';

export default (baseSpan) => {
  return ({ children }) => {
    return <Row type="flex" justify="space-between" align="middle">
      { React.Children.map( children, child => {
        return <Col sm={ computeSpan( child.props && child.props.span, baseSpan ) }>
          { child }
        </Col>
      } ) }
    </Row>
  }
}

function computeSpan(childSpan = 1,baseSpan = 1){
  const rst = childSpan * ( 24/baseSpan );
  return rst > 24 ? 24 : rst;
}