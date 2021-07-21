import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from '../../components/query';
import Audit from './Audit';

@connect(({ storagesOut, loading }) => ({
  modelStatus: storagesOut,
  namespace: 'storagesOut',
  loading: loading.models.storagesOut,
}))
export default class Index extends PureComponent {
  render() {
    const submitButton = this.props.location.search.indexOf('edit') > -1 ? [
      { title: '提交审核', method: 'put', API: '/api/wms/storages/out/[id]/audit' },
      { title: '保存修改', method: 'put', API: '/api/wms/storages/out/[id]' },
      { title: '取消', type: 'return' },
    ] : [];
    return (
      <GMApp {...this.props} config={config}
        listProps={{
          rowSelection: false,
        }}
        formProps={{
          submitButton,
        }}
        routerMap={{
          query: <Query queryConfig={{
            title: '出库详情',
            itemsField: 'storageOutItems',
            info: [
              { label: '出库编号', field: 'transactionCode' },
              { label: '仓库', field: 'warehouseName' },
              { label: '经办人', field: 'transactionBy' },
              { label: '出库日期', field: 'transactionTime' },
              { label: '订单号信息', field: 'outOrderNum' },
              { label: '客户', field: 'distributorCustomer' },
              { label: '制单人', field: 'originatorName' },
              { label: '备注', field: 'note' },
            ],
            columns: [
              { title: ' ', field: 'total' },
              { title: '商品条码', field: 'skuBarcode' },
              { title: '商品编号', field: 'skuCode' },
              { title: '商品名称', field: 'skuName' },
              { title: '需求数量', field: 'demandQuantities', align: 'right', bottomTotal: true },
              { title: '出库数量', field: 'transactionQuantities', align: 'right', bottomTotal: true },
              { title: '商品价格', field: 'transactionSkuPrice', align: 'right', valueType: 'currency' },
              { title: '单位', field: 'skuUnit' },
            ]
          }}
            logType="out"
          />,
          audit: Audit,
        }}
      />
    );
  }
}
