import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';
import CouponForm from './CouponForm';

@connect(({ vipManagement, loading }) => ({
  modelStatus: vipManagement,
  namespace: 'vipManagement',
  loading: loading.models.vipManagement,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GMApp { ...this.props } config={ config }
          routerMap={{
            query: Query,
            couponForm: CouponForm,
            // setting: Setting,
            // levelAdd: levelForm,
            // levelEdit: levelForm,
          }}
          setFieldDefaultValue={{
            id: null,
            registerMobile: null,
            account: null,
          }}
        />
    );
  }
}