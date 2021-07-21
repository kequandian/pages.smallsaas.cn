import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ZEle } from 'zero-element';
import fieldsConfig from './Form.config.js';

@connect(({ fashion, loading }) => ({
  modelStatus: fashion,
  namespace: 'fashion',
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
            REDIRECT: '/website-fashion/list',
            API: {
              getAPI: '/api/cms/articles/[id]',
              createAPI: '/api/cms/website/fashion',
              updateAPI: '/api/cms/articles/[id]',
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