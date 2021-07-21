import React,{ Fragment } from 'react';
import { GMApp } from 'kqd-general';
import depositConfig from './config';

export default (props) => {
  const { APIObject, config, ...restProps } = props;
  return <Fragment>
    <GMApp { ...restProps } config={ depositConfig }
      listProps={{
        title: false,
      }}
      routerMap={{
        // depositForm: DepositForm,
      }}
      APIObject={{
        listAPI: '/api/vip/deposit/package',
        deleteAPI: '/api/vip/deposit/package/(id)',
      }}
    />
  </Fragment>;
}