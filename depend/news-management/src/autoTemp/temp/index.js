import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GeneralManagement } from 'kqd-general';

@connect(({ PAGENAME, loading }) => ({
  modelState: PAGENAME,
  namespace: 'PAGENAME',
  loading: loading.models.PAGENAME,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GeneralManagement { ...this.props } />
    );
  }
}