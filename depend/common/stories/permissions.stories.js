import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withReadme, withDocs } from 'storybook-readme';

import { PermissionsProxy, Permissions, createPerm } from '../src/components/Permissions';
import README from '../src/components/avatar-list/README.md';

const store = createPerm();

storiesOf('Permissions', module)
  .addDecorator(withReadme(README))
  .add('权限控制',
    withNotes('权限控制示例')( () => <Demo /> ))

class Demo extends Component{
  componentDidMount(){
    setTimeout( _=> {
      store.setPerm('addUser');
    }, 2000);
    setTimeout( _=> {
      store.setPerm(['editUser','delUser']);
    }, 4000);
    setTimeout( _=> {
      store.clearPerm();
    }, 6000);
  }
  render(){
    return <div style={{ padding: 30 }}>
      <PermissionsProxy>
        <div>两秒后允许 添加用户</div>
        <div>四秒后允许 删除用户</div>
        <div>六秒后清空全部权限</div>
        <Permissions permKey="addUser">
          <div>添加用户</div>
        </Permissions>
        <Permissions permKey="delUser">
          <div>删除用户</div>
        </Permissions>
      </PermissionsProxy>
    </div>
  }
}
