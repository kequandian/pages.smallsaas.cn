import React, { PureComponent, Fragment } from 'react';
import { Tabs, Button } from 'antd';
import PropTypes from 'prop-types';
import { GMApp } from 'kqd-general';

import { ImageView } from 'kqd-common';

import './style.css';
import config from './config';
import cashiersConfig from './cashiers/cashiersConfig';
import warehouseConfig from './warehouseConfig';
import concatAddress from '../utils/concatAddress';
const TabPane = Tabs.TabPane;
const { List, TitleLayout } = GMApp;

export default class Query extends PureComponent {
  static contextTypes = {
    dataPool: PropTypes.object,
    requester: PropTypes.object,
  }
  componentDidMount(){
    const { requester } = this.props;
    requester.fetchOne({},'storeData');
  }
  renderIntroduce = (html) => {
    return {__html: html };
  }
  render() {
    const { storeData = {} } = this.props.modelStatus;
    const staffProps = {
      ...this.props,
      dataSourceMap: 'staffStatus',
      config,
      queryProps: {
        title: '员工列表',
      },
      APIObject: {
        API: '/api/store/assistants',
        // listAPI: '/api/store/assistants?storeId=[id]',
        listAPI: '/api/gw/assistants?storeId=[id]',
        deleteAPI: '/api/store/[id]/assistants/(id)/action/delete',
      },
    };
    const cashiersProps = {
      ...this.props,
      config: cashiersConfig,
      dataSourceMap: 'cashiers',
      listProps: {
        title: '收银终端列表',
      },
      APIObject: {
        API: '/api/store/cashiers',
        listAPI: '/api/store/cashiers?storeId=[id]',
      },
    };
    const warehouseProps = {
      ...this.props,
      dataSourceMap: 'storageData',
      config: warehouseConfig,
      APIObject: {
        listAPI: `/api/wms/inventories?warehouseId=#warehouseId#`,
      },
      listProps: { 
        title: false,
        rowSelection: false,
      },
    };
    const imgList = storeData.images || [] ;
    return (
      <TitleLayout title="店铺详情">
        <div className="storeInfo">
          <div>店铺类型：<span>{ storeData.type && storeData.type === 'Store' ? '店铺' : '小屋' }</span></div>
          <div>店铺编号：<span>{ storeData.code }</span></div>
          <div>店铺名称：<span>{ storeData.name }</span></div>
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="店铺信息" key="1">
            <div className="storeInfo">
              <div>开店时间：<span>{ storeData.createTime }</span></div>
            </div>
            <div className="storeInfo">
              <div>联系方式：<span>{ storeData.telephone }</span></div>
            </div>
            <div className="storeInfo">
              <div>店铺地址：<span>{ concatAddress(storeData) }</span></div>
            </div>
            <div className="storeInfo">
              <div>店铺照片：</div>
              <div className="imgList">
                { imgList.map( (img,i) => <ImageView key={ i } data={{
                  url: img.url,
                }} /> ) }
              </div>
            </div>
            <div className="storeInfo">
              <div>店铺描述：</div>
              <div style={{border: '1px solid #ccc',marginTop: '1rem', padding: '1rem'}} dangerouslySetInnerHTML={ this.renderIntroduce(storeData.introduce) }></div>
            </div>
          </TabPane>
          <TabPane tab="店员管理" key="2">
            <GMApp { ...staffProps } />
          </TabPane>
          <TabPane tab="店铺库存" key="3">
            <div className="storeInfo">
              <div>仓库名称：<span>{ storeData.warehouseName }</span></div>
            </div>
            <div className="storeInfo">
              <div>仓库地址：<span>{ storeData.warehouseAddress }</span></div>
            </div>
            <List { ...warehouseProps }/>
          </TabPane>
          <TabPane tab="收银终端" key="4">
            <List { ...cashiersProps } />
          </TabPane>
        </Tabs>
      </TitleLayout>
    );
  }
}