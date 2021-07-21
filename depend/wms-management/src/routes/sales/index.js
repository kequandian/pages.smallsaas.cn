import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';
import Audit from './Audit';

@connect(({ sales, loading }) => ({
  modelStatus: sales,
  namespace: 'sales',
  loading: loading.models.sales,
}))
export default class Index extends PureComponent {
  render() {
    const formProps = this.props.location.search.indexOf('edit') > -1 ? {
      submitButton: [
        { title: '提交审核', method: 'put', API: '/api/warehouse/sales/[id]/audit' },
        { title: '保存修改', method: 'put', API: '/api/warehouse/sales/[id]' },
        { title: '取消', type: 'return' },
      ],
    } : undefined;
    return (
        <GMApp { ...this.props } config={ config }
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