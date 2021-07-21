import React, { PureComponent, Fragment } from 'react';
import Query from '../../components/query';

export default class Audit extends PureComponent {
  render() {
    return (
      <Query
        {...this.props}
        queryConfig={{
          title: '分销商出库审核',
          itemsField: 'outItems',
          // itemsFieldMap: 'outItems',
          info: [
            { label: '订单编号', field: 'salesCode' },
            { label: '订单创建人', field: 'originatorName' },
            { label: '创建日期', field: 'transactionTime' },
            { label: '分销商名称', field: 'traderName' },
            { label: '联系电话', field: 'traderContactPhone' },
            { label: '经办人', field: 'transactionBy' },
            { label: '收货地址', field: 'deliveredAddress' },
            { label: '备注', field: 'salesNote' },
          ],
          columns: [
            { title: ' ', field: 'total' },
            { title: '商品编号', field: 'skuCode' },
            { title: '商品条码', field: 'skuBarcode' },
            { title: '商品名称', field: 'skuName' },
            { title: '单位', field: 'skuUnit' },
            { title: '需求数量', field: 'demandQuantities', align: 'right', bottomTotal: true },
            { title: '销售数量', field: 'transactionQuantities', align: 'right', valueType: 'editQuantity', bottomTotal: true },
            { title: '销售单价', field: 'transactionSkuPrice', align: 'right', valueType: 'currency' },
            {
              title: '销售总价', field: 'transactionTotalSkuPrice', align: 'right', valueType: 'totalPrice', bottomTotal: true,
              options: {
                field: 'transactionTotalSkuPrice',
              },
              format: (v) => `￥ ${v}`,
            },
          ]
        }}
        audit={{
          API: '/api/warehouse/sales',
          permission: 'wms.sales.audit',
          statusField: 'salesStatus',
        }}
      />
    );
  }
}