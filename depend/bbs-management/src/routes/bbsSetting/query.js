import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { update } from 'kqd-utils/lib/services';
import { Button } from 'antd';
import config from './config';

const { Form } = GMApp;

export default class Query extends Component {
  componentWillMount(){
    const { requester } = this.props;
    requester.request({
      method: 'get',
      API: '/api/cms/sys/config',
      key: 'settingList',
      callback: function format(data){
        const formatData = {};
        data.forEach( item => {
          formatData[item.dataKey] = item.dataValue;
        });
        this.props.requester.save({
          settingObject: {
            currentItem: {
              ...formatData,
            }
          }
        });
      }.bind(this)
    });
  }
  render(){
    const formProps = {
      ...this.props,
      // visible: id,
      config: config,
      formProps: {
        title: '论坛设置',
        FORMTYPE: 'update',
        // ALWAYSRENDER: true,
        beforeSubmit: (values) => {
          const rst = Object.keys(values).map( key => {
            return {
              dataKey: key,
              dataValue: values[key],
            }
          } );
          
          return {
            systemConfigs: rst,
          }
        },
      },
      APIObject: {
        getAPI: null,
        updateAPI: '/api/cms/sys/config/bulk',
      },
      REDIRECT: null,
      dataSourceMap: 'settingObject'
    };
    return <Form { ...formProps } />;
  }
}