import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from '../../components/query';
import Audit from './Audit';

@connect(({ storagesIn, loading }) => ({
  modelStatus: storagesIn,
  namespace: 'storagesIn',
  loading: loading.models.storagesIn,
}))
export default class Index extends PureComponent {
  render() {
    const submitButton = this.props.location.search.indexOf('edit') > -1 ? [
      { title: '提交审核', method: 'put', API: '/api/wms/storages/in/[id]/audit' },
      { title: '保存修改', method: 'put', API: '/api/wms/storages/in/[id]' },
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
            title: '入库详情',
            itemsField: 'storageInItems',
            info: [
              { label: '入库编号', field: 'transactionCode' },
              { label: '仓库', field: 'warehouseName' },
              { label: '经办人', field: 'transactionBy' },
              { label: '入库日期', field: 'transactionTime' },
              {
                label: '订单号信息',
                field: 'outOrderNum',
                substitute: 'procurementCode',
              },
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
              { title: '入库数量', field: 'transactionQuantities', align: 'right', bottomTotal: true },
              { title: '单位', field: 'skuUnit' },
            ]
          }}
            logType="in"
          />,
          audit: Audit,
        }}
      />
    );
  }
}
