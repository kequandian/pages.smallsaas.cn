import React, { PureComponent, Fragment } from 'react';
import Query from '../../components/query';

export default class Audit extends PureComponent {
  render() {
    return (
      <Query
        {...this.props}
        queryConfig={{
          title: '退货审核',
          itemsField: 'items',
          // itemsFieldMap: 'items',
          info: [
            { label: '退货编号', field: 'productRefundCode' },
            { label: '仓库', path: 'records[0] && records[0].warehouseName' },
            { label: '经办人', field: 'transactionBy' },
            { label: '退货日期', field: 'transactionTime' },
            { label: '备注', field: 'productRefundNote' },
            { label: '制单人', field: 'originatorName' },
            { label: '关联的采购单', field: 'procurementCode' },
            { label: '产生的出库单', field: 'field1' },
            { label: '供应商', field: 'supplierName' },
          ],
          columns: [
            { title: ' ', field: 'total' },
            { title: '商品条码', field: 'skuBarcode' },
            { title: '商品编号', field: 'skuCode' },
            { title: '商品名称', field: 'skuName' },
            { title: '需求数量', field: 'demandQuantities', align: 'right', bottomTotal: true },
            { title: '退货数量', field: 'transactionQuantities', align: 'right', valueType: 'editQuantity', bottomTotal: true, width: 114 },
            { title: '退货单价', field: 'transactionSkuPrice', align: 'right', valueType: 'currency' },
            {
              title: '退货总价', field: 'transactionTotalSkuPrice', align: 'right', valueType: 'totalPrice', bottomTotal: true, width: 114,
              options: {
                field: 'transactionTotalSkuPrice',
              },
              format: (v) => `￥ ${v}`,
            },
            { title: '单位', field: 'skuUnit' },
          ]
        }}
        audit={{
          API: '/api/wms/refunds',
          permission: 'wms.purchase.audit',
          statusField: 'productRefundStatus',
        }}
      />
    );
  }
}