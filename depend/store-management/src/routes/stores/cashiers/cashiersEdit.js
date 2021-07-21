import React, { PureComponent } from 'react';
import queryString from 'querystring';
import { GMApp } from 'kqd-general';
import config from './cashiersConfig';

const { Form } = GMApp;

export default class cashiersEdit extends PureComponent {
  
  render() {
    const { namespace, dataPool, location } = this.props;
    
    let storeId = queryString.parse(location.search.replace('?','')).storeId;
    if(storeId === undefined){
      // 避免无 storeId 的情况下的渲染
      return '请从店铺详情页重新进入该页面';
    }
    dataPool.delToForm('id');
    dataPool.addToForm({storeId});

    const props = {
      ...this.props,
      formProps: {
        title: '编辑终端',
        FORMTYPE: 'update',
      },
      config: config,
      APIObject: {
        getAPI: '/api/store/cashiers/[id]',
        updateAPI: '/api/store/cashiers/[id]',
      },
      REDIRECT: `/${namespace}?type=query&id=${storeId}`,
    };
    return (
        <Form { ...props } />
    );
  }
}