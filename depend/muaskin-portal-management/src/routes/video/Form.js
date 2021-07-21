import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ZEle } from 'zero-element';
import fieldsConfig from './Form.config.js';

@connect(({ video, loading }) => ({
  modelStatus: video,
  namespace: 'video',
  loading: loading.effects,
}))
export default class Index extends PureComponent {
  render() {
    const config = {
      items: [
        {
          span: 24,
          layout: 'DefaultForm',
          component: 'BaseForm',
          config: {
            REDIRECT: '/website-video/list',
            API: {
              getAPI: '/api/stock/images/[id]',
              createAPI: '/api/stock/images',
              updateAPI: '/api/stock/images/[id]',
            },
            ...fieldsConfig,
          },
        },
      ],
    };
    return (
      <ZEle {...this.props} config={config} />
    );
  }
}