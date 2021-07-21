import React,{ Component } from 'react';
import { GMApp } from 'kqd-general';
import config from './config';

const { Form } = GMApp;

export default class DepositForm extends Component{
  render(){
    return <Form { ...this.props } config={ config }
      formProps={{
        title: '储值规则信息',
      }}
      APIObject={{
        getAPI: '/api/vip/deposit/package/[id]',
        createAPI: '/api/vip/deposit/package',
        updateAPI: '/api/vip/deposit/package/[id]',
      }}
    />;
  }
}