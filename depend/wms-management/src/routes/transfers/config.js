module.exports = {
  header: {
    title: '调拨管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.allot.add',
          localtion: true,
        }
      },
    ],
  },
  search: {
    fields: [
      {
        field: 'transactionCode',
        type: 'input',
        label: '调拨编号',
        props: {
          placeholder: '调拨编号',
        },
      },
      {
        field: 'status',
        label: '状态',
        type: 'select',
        options: [
          { key: '调拨中', value: 'Transfer' },
          { key: '草稿', value: 'Draft' },
          { key: '待审核', value: 'Wait_To_Audit' },
          { key: '审核通过', value: 'Audit_Passed' },
          { key: '完成', value: 'Done' },
          { key: '关闭', value: 'Closed' },
        ],
      },
      {
        field: 'fromWarehouseName',
        label: '调出仓库',
        props: {
          placeholder: '调出仓库',
        },
        type: 'field-config-select',
        API: '/api/wms/warehouses',
        options: { name: 'warehouseName', value: 'id' }
      },
      {
        field: 'toWarehouseName',
        label: '调入仓库',
        props: {
          placeholder: '调入仓库',
        },
        type: 'field-config-select',
        API: '/api/wms/warehouses',
        options: { name: 'warehouseName', value: 'id' }
      },
      {
        field: 'transactionTime',
        label: '调出时间',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
        format: 'YYYY-MM-DD',
        props: {
          style: {
            width: '240px'
          }
        }
      },
    ],
    columnNum: 3,
    simpleSearchCount: 3,
  },
  table: {
    columns: [
      {
        title: '调拨编号', field: 'transactionCode', valueType: 'path',
        options: {
          path: '/transfers',
          queryData: {
            type: 'query',
            id: '{id}',
            tabs: '1',
          }
        }
      },
      { title: '调出仓库', field: 'fromWarehouseName' },
      { title: '调入仓库', field: 'toWarehouseName' },
      { title: '调出时间', field: 'transactionTime' },
      { title: '调入时间', field: 'finishTime' },
      { title: '状态', field: 'status', valueType: 'statusTag' },
      { title: '经办人', field: 'transactionBy' }
    ],
    operation: [
      // { title: '入库', action: 'query',
      //   options: {
      //     expectedField: 'status',
      //     expectedValue: '',
      //   }
      // },
      {
        title: '开始调拨', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'primary',
          expectedField: 'status',
          expectedValue: 'Audit_Passed',
          title: '您确定要 开始调拨 吗？',
          API: '/api/wms/transfers/(id)/execution',
          permission: 'wms.allot.add',
          localtion: true,
        }
      },
      {
        title: '编辑', action: 'edit',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
          permission: 'wms.allot.edit',
          localtion: true,
        },
      },
      {
        title: '完成', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'primary',
          expectedField: 'status',
          expectedValue: 'Transfer',
          title: '您确定要标记这份调拨单标记为 完成入库 吗？',
          API: '/api/wms/transfers/(id)/done',
          method: 'put',
          permission: 'wms.allot.close',
          localtion: true,
        }
      },
      {
        title: '作废', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'danger',
          expectedField: 'status',
          expectedValue: 'Transfer',
          title: '您确定要标记这份调拨单标记为 作废 吗？',
          API: '/api/wms/transfers/(id)/cancel',
          method: 'put',
          permission: 'wms.allot.cancel',
          localtion: true,
        }
      },
      {
        title: '审核', action: 'query',
        options: {
          expectedField: 'status',
          expectedValue: 'Wait_To_Audit',
          permission: 'wms.allot.audit',
          localtion: true,
          icon: 'eye',
          color: '#1890ff',
          routerType: 'audit',
        }
      },
      {
        title: '详情', action: 'query',
        options: {
          queryData: {
            tabs: '1',
          }
        }
      },
      {
        title: '删除', action: 'delete',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
          permission: 'wms.allot.delete',
          localtion: true,
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'transactionCode', type: 'serial-code', intlPrefix: 'transfers.',
        props: { prefix: 'TRF' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'field1', type: 'serial-code', intlPrefix: 'transfers.',
        props: { prefix: 'OUT' },
        rules: [
          { required: true }
        ]
      },
      // { field: 'fromWarehouseId', type: 'input', intlPrefix: 'transfers.' },
      // { field: 'toWarehouseId', type: 'input', intlPrefix: 'transfers.' },
      { field: 'transactionTime', type: 'datetime', intlPrefix: 'transfers.' },
      // competition
      {
        field: 'fromWarehouseId', type: 'concatenate-select', intlPrefix: 'transfers.', span: 2,
        label: ' ',
        API: '/api/wms/warehouses',
        options: {
          childrenLabel: '调入仓库',
          childrenField: 'toWarehouseId',
          childrenAPI: '/api/wms/warehouses',
          childrenName: 'warehouseName',
          childrenValue: 'id',
          childrenPlaceholder: '请选择调入仓库',
          name: 'warehouseName',
          value: 'id',
          type: 'competition',
          queryData: {
            warehouseId: '{id}',
          }
        },
        rules: [
          { required: true }
        ]
      },
      // { field: 'fromWarehouseId', type: 'field-config-select', intlPrefix: 'transfers.',
      //     API: '/api/wms/warehouses',
      //     options: {
      //       name: 'warehouseName',
      //       value: 'id',
      //       queryData: {
      //         warehouseId: '{id}',
      //       }
      //     },
      //     rules: [
      //       { required: true }
      //     ]
      // },
      // { field: 'toWarehouseId', type: 'field-config-select', intlPrefix: 'transfers.',
      //     API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'id' },
      //     rules: [
      //       { required: true }
      //     ]
      // },
      { field: 'transactionBy', type: 'input', intlPrefix: 'transfers.' },
      { field: 'originatorName', type: 'get-account', intlPrefix: 'transfers.' },
      { field: 'note', type: 'input', intlPrefix: 'transfers.', span: 2 },
      {
        field: 'outItems', type: 'children', intlPrefix: 'storagesIn.',
        API: '/api/wms/skus',
        mapItemFieldTo: 'outItems',
        fieldMap: [
          { from: 'id', to: 'skuId' },
          { from: 'skuPrice', to: 'transactionSkuPrice' },
          { from: '', to: 'transactionQuantities', value: 0 },
          { from: 'createTime', to: 'transactionTime' },
          { from: 'barCode', to: 'skuBarcode' },
          { from: 'field1', to: 'skuUnit' },
        ],
        columns: [
          { title: '商品条码', field: 'barCode' },
          { title: '商品编号', field: 'skuCode' },
          { title: '商品名称', field: 'skuName' },
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
        { title: '添加', action: 'addItem' }
      ],
    },
    table: {
      operation: [
        { title: '删除', action: 'deleteItem', options: { name: 'skuName' } },
      ],
      columns: [
        { title: '商品条码', field: 'skuBarcode' },
        // { title: '入库时间', field: 'transactionTime' },
        { title: '商品编号', field: 'skuCode' },
        { title: '商品名称', field: 'skuName' },
        { title: '库存余量', field: 'validSku' },
        {
          title: '调拨数量', field: 'transactionQuantities', mark:'d->t', valueType: 'editQuantity', // transactionQuantities
          options: {
            // maxField: 'transactionQuantities',
            // coverField: 'remainderCount',
            minValue: 0,
          }
        },
        // { title: '需求数量', field: 'transactionQuantities', mark:'d->t', valueType: 'editQuantity', },
        // { title: '调拨价格', field: 'transactionSkuPrice', align: 'right', valueType: 'currency' },
        { title: '单位', field: 'skuUnit' },
      ]
    }
  },
  details: {
    operation: {
      fields: [],
      action: [],
    },
    table: {
      columns: [
        { title: '商品编码', field: 'id' },
        { title: '商品条码', field: 'skuBarcode' },
        { title: '商品名称', field: 'skuName' },
        { title: '商品规格', field: 'tode' },
        { title: '单位', field: 'skuUnit' },
        { title: '调拨数量', field: 'transactionQuantities' },
      ],
    },
    form: {
      fields: [],
    }
  }
}