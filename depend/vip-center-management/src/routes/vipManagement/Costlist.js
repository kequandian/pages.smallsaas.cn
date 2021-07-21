import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { CostlistConfig } from './queryConfig';

import ListItem from '../../components/ListItem';
import CouponItem from '../../components/CouponItem';

const List = GMApp.List;

export default class Costlist extends Component {
  componentDidMount(){
    const { requester } = this.props;
    requester.fetchOne({
      API: '/rest/admin/order_count?phone=#registerMobile#',
      dataSourceMap: "Costlist",
    },'costlistData')
  }
  render(){
    const props = {
      ...this.props,
      listProps: { title: false, rowSelection: false },
      APIObject: { listAPI: '/rest/order?phone=#registerMobile#&v=2' },
      config: CostlistConfig,
      dataSourceMap: "Costlist",
    };
    let { modelStatus: { Costlist = {} } } = this.props;
    const { costlistData = {} } = Costlist;
    const itemList = [
      { title: '线上订单', text: `${costlistData.onlineOrder || 0}单` },
      { title: '线下订单', text: `${costlistData.storeOrder || 0}单` },
      { title: '订单数量', text: `${costlistData.total || 0}单` },
      { title: '订单总额', text: `￥${costlistData.totalPrice || 0}` },
    ];
    // console.log(222222,this.props)
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