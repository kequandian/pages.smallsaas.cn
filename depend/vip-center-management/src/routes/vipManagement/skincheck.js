import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { SkinConfig } from './queryConfig';

const { List } = GMApp;

export default class SkinCheck extends Component {
  render() {
    const props = {
      ...this.props,
      listProps: { title: false, rowSelection: false },
      APIObject: { listAPI: '/api/meice/reports?userPhone=#registerMobile#' },
      config: SkinConfig,
      dataSourceMap: "SkinCheck",
    };
    return (
      <div>
        <List {...props} />
      </div>
    )
  }
}