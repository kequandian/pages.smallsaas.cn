import React, { PureComponent } from 'react';
import queryString from 'querystring';
import { GMApp } from 'kqd-general';
import config from './cashiersConfig';

const { Form } = GMApp;

export default class cashiersAdd extends PureComponent {
  
  render() {
    const { namespace, dataPool, location } = this.props;
    
    let storeId = queryString.parse(location.search.replace('?','')).id;
    if(storeId === undefined){
      // 避免无 storeId 的情况下的渲染
      return '请从店铺详情页重新进入该页面';
    }
    dataPool.delToForm('id');
    dataPool.addToForm({storeId});

    const props = {
      ...this.props,
      formProps: {
        title: '添加终端',
        FORMTYPE: 'create',
      },
      config: config,
      APIObject: {
        createAPI: '/api/store/cashiers',
      },
      REDIRECT: `/${namespace}?type=query&id=${storeId}`,
    };
    return (
        <Form { ...props } />
    );
  }
}