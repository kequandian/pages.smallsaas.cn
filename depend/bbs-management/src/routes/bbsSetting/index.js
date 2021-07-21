import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';

@connect(({ bbsSetting, loading }) => ({
  modelStatus: bbsSetting,
  namespace: 'bbsSetting',
  loading: loading.models.bbsSetting,
}))
export default class Index extends PureComponent {
  render() {
    const routerMap = {
      default: Query,
    };
    return (
        <GMApp { ...this.props } config={ config }
          routerMap={ routerMap }
          // setFieldDefaultValue={{
          //   type: 'DIARY_SHOW_WAY',
          // }}
        />
    );
  }
}