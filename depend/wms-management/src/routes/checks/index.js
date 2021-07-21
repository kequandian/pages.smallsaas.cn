import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Quert from './query';
import Checking from './checking';
import Audit from './Audit';

@connect(({ checks, loading }) => ({
  modelStatus: checks,
  namespace: 'checks',
  loading: loading.models.checks,
}))
export default class Index extends PureComponent {
  render() {
    const formProps = this.props.location.search.indexOf('edit') > -1 ? {
      submitButton: [
        // { title: '提交审核', method: 'put', API: '/api/wms/checks/[id]/audit' },
        { title: '保存修改', method: 'put', API: '/api/wms/checks/[id]' },
        { title: '取消', type: 'return' },
      ],
    } : undefined;
    return (
        <GMApp { ...this.props } config={ config } rowSelection={ false }
          routerMap={{
            query: Quert,
            checking: Checking,
            audit: Audit,
          }}
          formProps={formProps}
        />
    );
  }
}