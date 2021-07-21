import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ZEle } from 'zero-element';
import fieldsConfig from './Form.config.js';

@connect(({ lore, loading }) => ({
  modelStatus: lore,
  namespace: 'lore',
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
            REDIRECT: '/website-lore/list',
            API: {
              getAPI: '/api/cms/articles/[id]',
              createAPI: '/api/cms/website/lore',
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