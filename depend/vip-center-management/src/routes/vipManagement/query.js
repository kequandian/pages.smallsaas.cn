import React, { Component } from 'react';
import { Tabs } from 'antd';
import { TitledHeader } from 'kqd-page-header';
import { GMApp, GMAppList } from 'kqd-general';
import BaseInfo from './BaseInfo'
import Wallet from './wallet'
import Integration from './Integration'
import Coupon from './coupon'
import Skincheck from './skincheck'
import Costlist from './Costlist'

const TabPane = Tabs.TabPane;
const TitleLayout = GMApp.TitleLayout;

import UserInfo from '../../components/UserInfo';

export default class Query extends Component {
  componentDidMount() {
    const { requester } = this.props;
    requester.fetchOne({}, 'userData');
    requester.fetchList({
      API: '/api/stock/tags?tagType=Member',
    }, 'tagsData');
  }
  render() {
    const { modelStatus } = this.props;
    const appProps = {
      modelStatus: this.props.modelStatus,
      namespace: this.props.namespace,
      dispatch: this.props.dispatch,
      location: this.props.location,
      dataPool: this.props.dataPool,
      requester: this.props.requester,
    };
    console.log('Query props', this.props);
    return (
      <TitleLayout title="会员详情">
        {/* 标头 */}
        <UserInfo data={modelStatus.userData} tagsData={modelStatus.tagsData} requester={this.props.requester} dispatch={this.props.dispatch} />
        <hr />
        {/* tabs分支 */}
        <Tabs
          destroyInactiveTabPane={true} //销毁非激活的子页
        >
          <TabPane tab="基本信息" key="1"> <BaseInfo data={modelStatus.userData} /> </TabPane>
          <TabPane tab="钱包账户" key="2">
            <Wallet {...appProps} />
          </TabPane>
          <TabPane tab="积分账户" key="3">
            <Integration {...appProps} />
          </TabPane>
          <TabPane tab="优惠券" key="4">
            <Coupon {...appProps} />
          </TabPane>
          <TabPane tab="肌肤测试" key="5">
            <Skincheck {...appProps} />
          </TabPane>
          <TabPane tab="消费订单" key="6">
            <Costlist {...appProps} />
          </TabPane>
        </Tabs>
      </TitleLayout>
    )
  }
}