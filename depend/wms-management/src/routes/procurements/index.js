import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';
import Audit from './Audit';

@connect(({ procurements, loading }) => ({
  modelStatus: procurements,
  namespace: 'procurements',
  loading: loading.models.procurements,
}))
export default class Index extends PureComponent {
  render() {
    const formProps = this.props.location.search.indexOf('edit') > -1 ? {
      submitButton: [
        { title: '提交审核', method: 'put', API: '/api/wms/procurements/[id]/audit' },
        { title: '保存修改', method: 'put', API: '/api/wms/procurements/[id]' },
        { title: '取消', type: 'return' },
      ],
    } : undefined;
    return (
      <GMApp {...this.props} config={config}
        listProps={{
          rowSelection: false,
        }}
        routerMap={{
          query: Query,
          audit: Audit,
        }}
        formProps={formProps}
      />
    );
  }
}