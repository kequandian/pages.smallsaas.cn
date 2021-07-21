import React, { PureComponent, Fragment } from 'react';
import Query from '../../components/query';

export default class Audit extends PureComponent {
  render() {
    return (
      <Query
        {...this.props}
        queryConfig={{
          title: '采购审核',
          itemsField: 'items',
          // itemsFieldMap: 'items',
          info: [
            { label: '采购单编号', field: 'procurementCode' },
            { label: '供应商', field: 'supplierName' },
            { label: '采购员', field: 'transactionBy' },
            { label: '采购日期', field: 'procurementTime' },
            { label: '制单人', field: 'originatorName' },
            { label: '备注', field: 'procurementNote' },
          ],
          columns: [
            { title: ' ', field: 'total' },
            { title: '商品条码', field: 'skuBarcode' },
            { title: '采购时间', field: 'transactionTime' },
            { title: '商品编号', field: 'skuCode' },
            { title: '商品名称', field: 'skuName' },
            { title: '需求数量', field: 'demandQuantities', align: 'right', bottomTotal: true },
            { title: '采购数量', field: 'transactionQuantities', align: 'right', valueType: 'editQuantity', bottomTotal: true },
            { title: '已入库数量', field: 'sectionInCount', align: 'right', bottomTotal: true },
            { title: '采购单价', field: 'transactionSkuPrice', align: 'right', valueType: 'currency' },
            {
              title: '采购总价', field: 'transactionTotalSkuPrice', align: 'right', valueType: 'totalPrice', bottomTotal: true,
              options: {
                field: 'transactionTotalSkuPrice',
              },
              format: (v) => `￥ ${v}`,
            },
            { title: '单位', field: 'skuUnit' },
          ]
        }}
        audit={{
          API: '/api/wms/procurements',
          permission: 'wms.purchase.audit',
          statusField: 'procureStatus',
        }}
      />
    );
  }
}