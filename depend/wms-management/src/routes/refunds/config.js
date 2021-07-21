export default {
  header: {
    title: '采购退货管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.return.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'search',
        placeholder: '退货单编号/供应商/采购单编号',
        type: 'input',
        props: {
          style: {
            width: '240px'
          }
        }
      },
      {
        field: 'status',
        placeholder: '状态',
        type: 'select',
        options: [
          { key: '草稿', value: 'Draft' },
          { key: '待审核', value: 'Wait_To_Audit' },
          { key: '审核通过', value: 'Audit_Passed' },
          { key: '完成', value: 'Done' },
          { key: '关闭', value: 'Closed' },
        ],
      },
      {
        field: 'productRefundTime',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
        format: 'YYYY-MM-DD',
        props: {
          style: {
            width: '240px'
          }
        }
      },
    ]
  },
  search: {
  },
  table: {
    columns: [
      {
        title: '退货单编号', field: 'productRefundCode', valueType: 'path',
        options: {
          path: '/refunds',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      { title: '退货数量', field: 'productRefundQuantities' },
      { title: '退货时间', field: 'productRefundTime' },
      { title: '退货状态', field: 'productRefundStatus', valueType: 'statusTag' },
      { title: '备注', field: 'productRefundNote' },
      { title: '经办人', field: 'transactionBy' },
      { title: '交易时间', field: 'transactionTime' }
    ],
    operation: [
      // { title: '编辑', action: 'edit' },
      {
        title: '编辑', action: 'edit',
        options: {
          expectedField: 'productRefundStatus',
          expectedValue: 'Draft',
          permission: 'wms.return.edit',
          localtion: true,
        },
      },
      {
        title: '审核', action: 'query',
        options: {
          expectedField: 'productRefundStatus',
          expectedValue: 'Wait_To_Audit',
          permission: 'wms.return.audit',
          localtion: true,
          icon: 'eye',
          color: '#1890ff',
          routerType: 'audit',
        }
      },
      {
        title: '删除', action: 'delete',
        options: {
          expectedField: 'productRefundStatus',
          expectedValue: 'Draft',
          permission: 'wms.return.delete',
          localtion: true,
        }
      },
      { title: '详情', action: 'query' },
    ]
  },
  form: {
    fields: [
      {
        field: 'productRefundCode', type: 'serial-code', intlPrefix: 'refunds.',
        props: { prefix: 'REF' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'field1', type: 'serial-code', intlPrefix: 'refunds.',
        props: { prefix: 'OUT' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'productProcurementId', type: 'search-select', intlPrefix: 'refunds.', // search-select
        API: '/api/wms/procurements?procureStatus=TotalStorageIn',
        // API: '/api/wms/procurements?procureStatus=SectionStorageIn&procureStatus=TotalStorageIn',
        options: {
          name: 'procurementCode',
          value: 'id',
          API: '/api/wms/procurements',
          itemsField: 'items',
          // itemsFieldMap: 'itemRecords',
          saveToForm: {
            supplierName: 'supplierName',
            productRefundWarehouseId: '',
          },
          searchField: 'procurementCode',
        },
        // rules: [
        //   { required: true }
        // ]
      },
      {
        field: 'supplierName', type: 'field-config-select', intlPrefix: 'refunds.', // search-select
        API: '/api/wms/suppliers?supplierStatus=Normal',
        options: {
          name: 'supplierName',
          value: 'id',
          saveToForm: {
            supplierName: 'supplierName',
            id: 'supplierId',
          }
        },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'productRefundWarehouseId', type: 'field-config-select', intlPrefix: 'refunds.', // search-select
        API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'id' },
        rules: [
          { required: true }
        ]
      },
      { field: 'productRefundTime', type: 'datetime', intlPrefix: 'refunds.' },
      { field: 'productRefundNote', type: 'input', intlPrefix: 'refunds.' },
      { field: 'transactionBy', type: 'input', intlPrefix: 'refunds.' },
      // { field: 'transactionTime', type: 'datetime', intlPrefix: 'refunds.' },
      { field: 'originatorName', type: 'get-account', intlPrefix: 'refunds.' },
      {
        field: 'items', type: 'children', intlPrefix: 'procurements.',
        API: '/api/wms/skus',
        mapItemFieldTo: 'items',
        fieldMap: [
          { from: 'id', to: 'skuId' },
          { from: 'skuPrice', to: 'transactionSkuPrice' },
          { from: '', to: 'transactionQuantities', value: 1 },
          { from: 'createTime', to: 'transactionTime' },
          { from: 'barCode', to: 'skuBarcode' },
          { from: 'field1', to: 'skuUnit' },
        ],
        columns: [
          { title: '商品条码', field: 'barCode' },
          { title: '退货时间', field: 'createTime', value: new Date(), options: [{ key: 'format', value: 'YYYY-MM-DD HH:mm:ss' }] },
          { title: '商品编号', field: 'skuCode' },
          { title: '商品名称', field: 'skuName' },
          { title: '退货价格', field: 'skuPrice', align: 'right', valueType: 'currency' },
          { title: '单位', field: 'field1' },
        ],
        operation: {
          fields: [
            {
              field: 'search',
              placeholder: '商品名称/编号/条码',
              type: 'input',
            },
          ],
        }
      },
    ],
    colNumber: 2
  },
  children: {
    operation: {
      fields: [],
      action: [
        { title: '添加', action: 'addItem' },
      ],
    },
    table: {
      operation: [
        { title: '删除', action: 'deleteItem', options: { name: 'skuName' } },
      ],
      columns: [
        { title: ' ', field: 'total' },
        { title: '商品条码', field: 'skuBarcode' },
        // { title: '退货时间', field: 'transactionTime' },
        { title: '商品编号', field: 'skuCode' },
        { title: '商品名称', field: 'skuName' },
        { title: '可退货数量', field: 'canRefundCount', },
        {
          title: '退货数量', field: 'transactionQuantities', mark:'d->t', valueType: 'editQuantity', bottomTotal: true,
          options: {
            // maxField: 'canRefundCount',
            minValue: 0,
          }
        },
        { title: '退货单价', field: 'transactionSkuPrice', valueType: 'editCurrency' },
        {
          title: '退货总价', field: 'transactionTotalSkuPrice', valueType: 'totalPrice', bottomTotal: true,
          options: {
            field: 'transactionTotalSkuPrice',
            quantity: 'transactionQuantities', mark:'d->t',
          }
        },
        { title: '单位', field: 'skuUnit' },
      ],
      footer: {
        type: 'showPrice',
        totalPriceText: '退货总额',
        totalPriceField: 'procurementTotal',
      }
    }
  },
}