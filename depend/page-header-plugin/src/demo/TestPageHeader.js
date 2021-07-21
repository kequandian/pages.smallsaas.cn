import React, { PureComponent } from 'react';
import { Button, Row, Col } from 'antd';
import { PageHeader } from '../index';

export default class TestPageHeader extends PureComponent {

  render() {
    const props = {
      title: '订单详情',
      logo: <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />,
      action: <Button>操作</Button>,
      breadcrumbList: [{
        title: '一级菜单',
        href: '/',
      }, {
        title: '二级菜单',
        href: '/',
      }, {
        title: '三级菜单',
      }]
    };

    return (
      <div>
        <PageHeader />
        <div style={{height: 50}}></div>
        <PageHeader {...props} />
      </div>
    );
  }
}
