import React,{ Fragment, Component } from 'react';
import { TitledHeader } from 'kqd-page-header';
import { GMApp } from 'kqd-general';

import '../../components/query/style.css';
import config from './config';

const TitleLayout = GMApp.TitleLayout;
const { List } = GMApp;

export default class Quert extends Component {
  componentDidMount(){
    const { requester } = this.props;
    requester.fetchOne({
      API: '/api/wms/skus/[id]',
    },'skuData');
  }
  formatData = (data = []) => {
    data.map( item => {
      if(item.recordType === 'sin'){
        item.inQuantities = Math.abs(item.transactionQuantities);
        item.outQuantities  = '-';
      }else{
        item.inQuantities = '-';
        item.outQuantities  = Math.abs(item.transactionQuantities);
      }
      return item;
    } )
    return data;
  }

  render(){
    const { modelStatus } = this.props;
    const { skuData = {} } = modelStatus;

    const appProps = {
      ...this.props,
      listProps: {
        title: false,
        rowSelection: false,
        formatListData: this.formatData,
      },
      config: config.details,
      visible: skuData.id !== undefined,
    };

    return (
      <TitleLayout title="商品出入库详情" { ...this.props }>
        <div className="wms-query-info">
          <span>商品编号：{ skuData.productCode }</span>
          <span>商品条码：{ skuData.barCode }</span>
          <span>商品名称：{ skuData.name }</span>
        </div>
        <br />
        <TitledHeader title="商品出入库记录"
        // showCollapse={ true }
        >
          <List { ...appProps } APIObject={{ listAPI: `/api/wms/inventories/skus/[id]?warehouseName=[warehouseName]` }} dataSourceMap='inAndOut' />
        </TitledHeader>
      </TitleLayout>
    );
  }
}
