import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from '../setting/setting/Level/config';
import Setting from './setting';
import DepositForm from './setting/Recharge/Form';

@connect(({ setting, loading }) => ({
  modelStatus: setting,
  namespace: 'setting',
  loading: loading.models.setting,
}))
export default class Index extends PureComponent {
  render() {
    const routerMap = {
      default: Setting,
      depositForm: DepositForm,
    };
    return (
        <GMApp { ...this.props } config={ config }
          routerMap={ routerMap }
          APIObject={{
            getAPI: '/api/vip/account/grades/[id]',
            createAPI: '/api/vip/account/grades',
            updateAPI: '/api/vip/account/grades/[id]',
          }}
          REDIRECT="/vip-setting"
        />
    );
  }
}