import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { IntegrationConfig } from './queryConfig';

import ListItem from '../../components/ListItem';
import CouponItem from '../../components/CouponItem';

const List = GMApp.List;

export default class Integration extends Component {
  componentDidMount(){
    const { requester } = this.props;
    requester.fetchOne({
      API: '/api/vip/credit/histories/statistics/#account#',
      dataSourceMap: "Integration",
    },'integrationData');
  }
  render(){
    const props = {
      ...this.props,
      listProps: { title: false, rowSelection: false },
      APIObject: { listAPI: '/api/gw/credit/history?vipId=[id]&phone=#registerMobile#' },
      config: IntegrationConfig,
      dataSourceMap: "Integration",
    };
    let { modelStatus: { Integration = {} } } = this.props;
    const { integrationData = {} } = Integration;
    const itemList = [
      { title: '累计积分', text: integrationData.totalCredit },
      { title: '可用积分', text: integrationData.credit },
      { title: '已用积分', text: integrationData.usedCredit },
    ];
    return (
      <div>
        <ListItem data={ itemList }>
          <CouponItem />
        </ListItem>
        <List { ...props } />
      </div>
    )
  }
}