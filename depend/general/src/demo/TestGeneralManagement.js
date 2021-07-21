/**
* 以下是最简单的调用，详情请看组件源码下的自述文件 README.md
*/
import React, { PureComponent } from 'react';
import { connect } from 'dva';

import GeneralManagement from '../components/general-management';

@connect(({ users, loading }) => ({
  modelState: users,
  loading: loading.models.users,
}))
export default class Index extends PureComponent {
  render() {
    return (
        <GeneralManagement { ...this.props }>
        </GeneralManagement>
    );
  }
}