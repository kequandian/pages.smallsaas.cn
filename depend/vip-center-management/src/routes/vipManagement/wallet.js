import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { walletConfig } from './queryConfig';

import ListItem from '../../components/ListItem';
import CouponItem from '../../components/CouponItem';

const List = GMApp.List;

export default class Wallet extends Component {
  componentDidMount(){
    const { requester } = this.props;
    requester.fetchOne({
      API: '/api/gw/account/wallet?phone=#registerMobile#',
      dataSourceMap: "Wallet",
    },'walletData');
  }
  render(){
    const props = {
      ...this.props,
      listProps: {
        title: false,
        rowSelection: false,
        formatListData: (data = []) => {
          return data.map( row => {
            if(row.type === 'PAY'){
              return {
                ...row,
                totalBalance: row.balance + row.gift_balance,
                totalAmount: -(row.amount + row.gift_amount),
              };
            }
            return {
              ...row,
              totalBalance: row.balance + row.gift_balance,
              totalAmount: row.amount + row.gift_amount,
            };
          } );;
        }
      },
      APIObject: { listAPI: '/rest/wallet_history?phone=#registerMobile#' },
      config: walletConfig,
      dataSourceMap: "Wallet",
    };
    let { modelStatus: { Wallet = {} } } = this.props;
    const { walletData = {} } = Wallet;
    const itemList = [
      { title: '储值余额', text: `${ fixedFloat(walletData.balance + walletData.gift_balance) || 0 }元`,
        subText: `实际储值${ walletData.balance || 0 }元+赠送${ walletData.gift_balance || 0 }元` },
      { title: '累计储值', text: `${ fixedFloat(walletData.accumulative_amount + walletData.accumulative_gift_amount) || 0 }元`,
        subText: `实际储值${ walletData.accumulative_amount || 0 }元+赠送${ walletData.accumulative_gift_amount || 0 }元` },
      { title: '提成余额', text: `${ walletData.reward || 0 }元` },
      { title: '累计提成', text: `${ walletData.total_reward || 0 }元` },
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
function fixedFloat(number){
  return number.toFixed(2);
}