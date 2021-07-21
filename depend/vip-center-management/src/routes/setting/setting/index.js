import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { Tabs } from 'antd';

const TabPane= Tabs.TabPane;
const TitleLayout = GMApp.TitleLayout;

import Level from './Level';
import Point from './Point';
import Integral from './Integral';
import Recharge from './Recharge';

export default class SettingIndex extends Component {
  componentDidMount(){
    const { requester } = this.props;
    requester.request({
      method: 'get',
      API: '/api/vip/account/grades',
      key: 'grades',
      callback: function format(data){
        this.props.requester.save({
            grades: {
            currentItem: {
              items: data,
            },
          }
        });
      }.bind(this)
    });
    requester.fetchOne({
      API: '/api/vip/account/grade/rules',
    },'rules');
  }
  render(){
    const { props } = this;
    const appProps = {
      modelStatus: props.modelStatus,
      namespace: props.namespace,
      dispatch: props.dispatch,
      location: props.location,
      dataPool: props.dataPool,
      requester: props.requester,
      APIObject: {
        API: '/api/vip/account/grades/bulk',
        getAPI: null,
        updateAPI: '/api/vip/account/grades/bulk',
      }
    };
    // console.log(1111,props.modelStatus);
    return <TitleLayout title="会员设置">
    <Tabs>
      <TabPane tab="会员等级设置" key="1">
        <Level { ...appProps } />
      </TabPane>
      <TabPane tab="成长值获取设置" key="2">
        <Point { ...appProps } />
      </TabPane>
      <TabPane tab="积分规则设置" key="3">
        <Integral { ...appProps } />
      </TabPane>
      <TabPane tab="储值规则设置" key="4">
        <Recharge { ...appProps } />
      </TabPane>
    </Tabs>
  </TitleLayout>;
  }
}