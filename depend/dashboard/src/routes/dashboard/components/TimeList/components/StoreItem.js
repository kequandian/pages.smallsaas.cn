import React from 'react';
import { TextEllipsis, ImageView } from 'kqd-common';
import './index.css';

export default (props) => {
  const { rank, name, cover, quantity, amount } = props.data;
  return <div className="dashboard-ProductItem">
    <div className="dashboard-ProductItem-rank">{rank}</div>
    <div className="dashboard-ProductItem-title">
      <TextEllipsis data={{
        title: name,
        row: 1,
      }} />
    </div>
    <div className="dashboard-ProductItem-image">
      {/* <ImageView
        data={{
          url: cover,
          alt: '商品图片',
        }}
      /> */}
    </div>
    <div className="dashboard-ProductItem-stat">
    <div>成交订单：{quantity}</div>
    <div>成交金额：￥{amount}</div>
    </div>
  </div>
}