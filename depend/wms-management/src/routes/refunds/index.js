import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from '../../components/query';
import Audit from './Audit';

// import './index.css';

@connect(({ refunds, loading }) => ({
  modelStatus: refunds,
  namespace: 'refunds',
  loading: loading.models.refunds,
}))
export default class Index extends PureComponent {
  render() {
    const formProps = this.props.location.search.indexOf('edit') > -1 ? {
      submitButton: [
        { title: '提交审核', method: 'put', API: '/api/wms/refunds/[id]/audit' },
        { title: '保存修改', method: 'put', API: '/api/wms/refunds/[id]' },
        { title: '取消', type: 'return' },
      ],
    } : undefined;
    return (
      <GMApp {...this.props} config={config}
        listProps={{
          rowSelection: false,
        }}
        formProps={formProps}
        routerMap={{
          query: <Query queryConfig={{
            title: '退货详情',
            itemsField: 'items',
            info: [
              { label: '退货编号', field: 'productRefundCode' },
              { label: '仓库', field: 'warehouseName' },
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
              { title: '退货数量', field: 'transactionQuantities', align: 'right', bottomTotal: true, width: 114 },
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
            dispatch={this.props.dispatch}
            namespace={this.props.namespace}
            location={this.props.location}
            statusField="productRefundStatus"
            API="/api/wms/refunds"
            logType="refund"
          />,
          audit: Audit,
        }}
      />
    );
  }
}
