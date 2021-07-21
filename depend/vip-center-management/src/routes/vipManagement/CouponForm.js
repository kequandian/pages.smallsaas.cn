import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { CouponConfig } from './queryConfig';
import queryString from 'querystring';

const { Form } = GMApp;

export default class Coupon extends Component {
  render(){
    const { location } = this.props;
    const queryObj = queryString.parse(location.search.replace('?',''));
    const props = {
      ...this.props,
      formProps: {
        title: '发放优惠券',
        FORMTYPE: 'create',
        beforeSubmit: (values) => {
          return {
            phone: values.registerMobile,
            couponTypeIds: values.couponTypeIds.map( item => item.id)
          };
        }
      },
      APIObject: {
        getAPI: '/rest/admin/coupon_type',
        createAPI: '/rest/admin/coupon',
        updateAPI: '/rest/admin/coupon',
      },
      config: CouponConfig,
      dataSourceMap: "Coupon",
      REDIRECT: `/vipManagement?id=${queryObj.toId}&type=query`,
    };
    return (
      <div>
        <Form { ...props } />
      </div>
    )
  }
}