import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';
import AddStaff from './addStaff';
import CashiersAdd from './cashiers/cashiersAdd';
import cashiersEdit from './cashiers/cashiersEdit';

@connect(({ stores, loading }) => ({
  modelStatus: stores,
  namespace: 'stores',
  loading: loading.models.stores,
}))
export default class Index extends PureComponent {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'stores/getBaseUrl',
    });
  }
  render() {
    const { dataPool, BaseUrl } = this.props.modelStatus;
    if(dataPool){
      dataPool.addToTemp({
        BaseUrl
      });
    }
    return (
        <GMApp { ...this.props } config={ config }
          routerMap={{
            query: Query,
            addStaff: AddStaff,
            cashiersAdd: CashiersAdd,
            cashiersEdit: cashiersEdit,
          }}
          setFieldDefaultValue={{
            id: null,
            warehouseId: null,
          }}
        />
    );
  }
}