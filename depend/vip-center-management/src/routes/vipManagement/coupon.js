import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { CouponConfig } from './queryConfig';
import queryString from 'querystring';

const List = GMApp.List;

export default class Coupon extends Component {
  state = {
    reQuery: false,
  }
  componentDidMount() {
    const { requester } = this.props;
    requester.fetchOne({
      API: '/rest/admin/coupon_type',
    })
  }
  static getDerivedStateFromProps(prevProps, state) {
    const { location, modelStatus } = prevProps;
    if (Object.keys(modelStatus.userData).length === 0) {
      //  if (location.search.indexOf('id') > -1 && Object.keys(modelStatus.userData).length === 0)
      return {
        reQuery: true,
      }
    }
    return {
      reQuery: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.reQuery && this.state.reQuery) {
      this.query();
    }
  }
  query = () => {
    const { requester, location } = this.props;
    const queryObj = queryString.parse(location.search.replace('?', ''));
    requester.fetchOne({
      API: `/api/vip/accounts/${queryObj.id}`,
    }, 'userData');
  }
  render() {
    const props = {
      ...this.props,
      listProps: { title: false, rowSelection: false },
      APIObject: {
        listAPI: '/api/gw/coupon?phone=#registerMobile#',
      },
      config: CouponConfig,
      dataSourceMap: "Coupon",
    };
    return (
      <div>
        <List {...props} />
      </div>
    )
  }
}