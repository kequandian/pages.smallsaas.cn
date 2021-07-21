import React, { PureComponent, Fragment } from 'react';
import Query from '../../components/query';

export default class Audit extends PureComponent {
  render() {
    return (
      <Query
        {...this.props}
        queryConfig={{
          title: '调拨审核',
          itemsField: 'outItems',
          // itemsFieldMap: 'outItems',
          info: [
            { label: '调出仓库', field: 'fromWarehouseName' },
            { label: '调出时间', field: 'transactionTime' },
            { label: '调入仓库', field: 'toWarehouseName' },
            { label: '调入时间', field: 'finishTime' },
            { label: '经办人', field: 'transactionBy' },
            { label: '制单人', field: 'originatorName' },
            { label: '备注', field: 'note' },
          ],
          columns: [
            { title: ' ', field: 'total' },
            { title: '商品条码', field: 'skuBarcode' },
            { title: '商品编号', field: 'skuCode' },
            { title: '商品名称', field: 'skuName' },
            { title: '需求数量', field: 'demandQuantities', align: 'right', bottomTotal: true },
            { title: '调拨数量', field: 'transactionQuantities', align: 'right', bottomTotal: true, valueType: 'editQuantity' },
            { title: '单位', field: 'skuUnit' },
          ]
        }}
        audit={{
          API: '/api/wms/transfers',
          permission: 'wms.allot.audit',
        }}
      />
    );
  }
}