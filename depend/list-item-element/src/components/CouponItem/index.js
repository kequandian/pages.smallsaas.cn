import React, { Fragment } from 'react';
import classname from 'classnames';
import './index.css';

/**
 * @author LLH
 * @editor 
 * @updated 2018年9月28日
 * @desc 优惠券 item。可根据传入的 valid_date 自动变换 有效/无效 样式.
 * @eg
      <CouponItem
        data={{
            name: '满减券',
            display_name: '满 50 减 5',
            created_date: '2018-08-17 15:03:19',
            valid_date: '2018-12-08 15:03:19',
            coupon_money: '5', // 若是折扣券，则该值为 0
            coupon_discount: 0, // 若是折扣券，则该值不为 0
        }}
      />
 */
export default (props) => {
  const { data = {} } = props;
  const boxClassName = classname({
    'CouponItemBox' : true,
    'CouponItem-expired': new Date(data.valid_date) < new Date(),
  });
  return <div className={ `${props.className} ${boxClassName}` }>
    <div className="CouponItem-bar"></div>
    <div className="CouponItem-info">
      <div className="CouponItem-title">{ data.coupon_name || data.name }</div>
      <div className="CouponItem-limit">{ data.coupon_display_name || data.display_name }</div>
      <div className="CouponItem-date">{ getYMD(data.created_date) }-{ getYMD(data.valid_date) }</div>
    </div>
    <div className="CouponItem-preferential">
      <span className="CouponItem-preferential-expired">
        <div>已过期</div>
      </span>
      { data.coupon_discount ? (
        <Fragment>
          <span className="CouponItem-discount">-</span>
          <span className="CouponItem-discount-value">{ 100 - data.coupon_discount }</span>
          <span> %</span>
        </Fragment>
      ) 
      : (
        <Fragment>
          <span className="CouponItem-currency">￥</span>
          <span className="CouponItem-value">{ data.coupon_money || data.money || 0 }</span>
        </Fragment>
      ) }
    </div>
  </div>
}

/**
 * 简单地截取年月日
 */
function getYMD(dateStr = ''){
  return dateStr.replace(/ \S+$/g,'').replace(/-/g,'.') || '当前时间';
}