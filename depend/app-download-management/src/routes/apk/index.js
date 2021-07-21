import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
const { Form } = GMApp;

@connect(({ apk, loading }) => ({
  modelStatus: apk,
  namespace: 'apk',
  loading: loading.models.apk,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <Form
        {...this.props}
        formProps={{
          title: '应用下载设置',
          FORMTYPE: 'update',
          ALWAYSRENDER: true,
        }}
        APIObject={{
          getAPI: '/api/download/apk/info',
          updateAPI: '/api/download/apk/info',
        }}
        config={config}
      />
    );
  }
}