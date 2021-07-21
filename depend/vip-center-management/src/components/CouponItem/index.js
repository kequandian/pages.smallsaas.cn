import React from 'react';
import { Col } from 'antd';
import { LRLayout } from 'kqd-layout-flex';
import './style.css';
export default (props) => {
  const { data } = props;
  const colProps = {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    span: 12,
  };
  return <Col { ...colProps } className="CouponItem" >
    <LRLayout span={ [8,16] } align="stretch" className="--ab-background-color-light" leftClassName="--ab-background-color-dark">
      <div className="CouponItem-title">{ data.title }</div>
      <div>
        <div>{ data.text }</div>
        <div>{ data.subText }</div>
      </div>
    </LRLayout>
  </Col>
}