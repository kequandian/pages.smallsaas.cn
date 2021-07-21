import React,{ Fragment } from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
import GetIntegralSetting from './components/GetIntegralSetting';
import * as getIntegralConfig from './getIntegralConfig';
import cashConfig from './cashConfig';
import Empty from './components/Empty';

export default (props) => {
  return <Fragment>
    <Tabs tabPosition="top" type="card">
      <TabPane tab="积分获取规则" key="1">
        <Tabs tabPosition="left">
          <TabPane tab="注册会员获取积分" key="1">
            <GetIntegralSetting config={ getIntegralConfig.registered } { ...props } />
          </TabPane>
          <TabPane tab="消费获取积分" key="2">
            <GetIntegralSetting config={ getIntegralConfig.consume } { ...props } />
          </TabPane>
          <TabPane tab="充值获取积分" key="3">
            <GetIntegralSetting config={ getIntegralConfig.recharge } { ...props } />
          </TabPane>
          <TabPane tab="论坛发帖获取积分" key="4">
            <GetIntegralSetting config={ getIntegralConfig.post } { ...props } />
          </TabPane>
          <TabPane tab="分享获取积分" key="5">
            <GetIntegralSetting config={ getIntegralConfig.share } { ...props } />
          </TabPane>
          <TabPane tab="购物发好评获取积分" key="6">
            <GetIntegralSetting config={ getIntegralConfig.praise } { ...props } />
          </TabPane>
        </Tabs>
      </TabPane>
      <TabPane tab="积分抵现规则" key="2">
        <GetIntegralSetting config={ cashConfig } { ...props } noSwitch={ true } />
      </TabPane>
      <TabPane tab="积分清零规则" key="3">
        <Empty { ...props } />
      </TabPane>
    </Tabs>
  </Fragment>;
}