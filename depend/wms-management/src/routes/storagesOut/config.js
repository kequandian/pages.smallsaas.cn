module.exports = {
  header: {
    title: '出库管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.out.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'transactionCode',
        placeholder: '出库单编号',
        type: 'input',
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
        field: 'transactionType',
        placeholder: '出库类型',
        type: 'select',
        options: [
          { key: '销售出货', value: 'SalesOut' },
          { key: '分销商出库', value: 'CustomerStorageOut' },
          { key: '采购退货', value: 'Refund' },
          { key: '调拨出库', value: 'TransferOut' },
          { key: '其它出库', value: 'OthersStorageOut' },
        ],
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      {
        title: '出库单编号', field: 'transactionCode', valueType: 'path',
        options: {
          path: '/storagesOut',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      { title: '出库时间', field: 'transactionTime', sorter: (a, b) => new Date(a.transactionTime) - new Date(b.transactionTime) },
      { title: '出库类型', field: 'transactionType', valueType: 'statusTag' },
      // { title: '批次号', field: 'batchNo', sorter: (a, b) => a.batchNo - b.batchNo },
      { title: '仓库名称', field: 'warehouseName' },
      { title: '订单号信息', field: 'outOrderNum' },
      { title: '客户', field: 'distributorCustomer' },
      { title: '状态', field: 'status', valueType: 'statusTag' },
      // { title: '备注', field: 'note' },
      { title: '经办人', field: 'transactionBy' }
    ],
    operation: [
      {
        title: '编辑', action: 'edit',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
          permission: 'wms.out.edit',
          localtion: true,
        },
      },
      {
        title: '审核', action: 'query',
        options: {
          expectedField: 'status',
          expectedValue: 'Wait_To_Audit',
          permission: 'wms.out.audit',
          localtion: true,
          icon: 'eye',
          color: '#1890ff',
          routerType: 'audit',
        }
      },
      {
        title: '完成出库', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'primary', // primary dashed danger
          method: 'put',
          expectedField: 'status',
          expectedValue: 'Audit_Passed',
          title: '确定要将该出库记录标记为 ‘已完成’ 吗？',
          API: '/api/wms/storages/out/(id)/execution',
          permission: 'wms.out.edit',
          localtion: true,
        }
      },
      { title: '详情', action: 'query' },
      // { title: '编辑', action: 'edit' },
      {
        title: '删除', action: 'delete',
        options: {
          name: 'transactionCode',
          expectedField: 'status',
          expectedValue: 'Draft',
          permission: 'wms.out.delete',
          localtion: true,
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'transactionCode', type: 'serial-code', intlPrefix: 'storagesOut.',
        props: { prefix: 'OUT' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'transactionType', type: 'select', intlPrefix: 'storagesIn.',
        options: [
          // { key: '销售出货', value: 'SalesOut' },
          { key: '分销商出库', value: 'CustomerStorageOut' },
          // { key: '批发出库', value: 'WholesalesOut' },
          { key: '其它出库', value: 'OthersStorageOut' },
        ],
        rules: [
          { required: true }
        ]
      },
      // { field: 'batchNo', type: 'input', intlPrefix: 'storagesOut.' },
      // { field: 'status', type: 'input', intlPrefix: 'storagesOut.' },
      // { field: 'warehouseId', type: 'field-config-select', intlPrefix: 'storagesIn.',
      //     API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'id' } },
      // { field: 'slotId', type: 'input', intlPrefix: 'storagesIn.' },
      {
        field: 'warehouseId', type: 'field-config-select', intlPrefix: 'storagesIn.',
        API: '/api/wms/warehouses',
        options: {
          name: 'warehouseName',
          value: 'id',
          queryData: {
            warehouseId: '{id}',
          }
        },
        rules: [
          { required: true }
        ]
      },
      // { field: 'warehouseId', type: 'concatenate-select', intlPrefix: 'storagesIn.', span: 2,
      //   label: '',
      //   API: '/api/wms/warehouses',
      //   options: {
      //     childrenLabel: '储位',
      //     childrenField: 'slotId',
      //     childrenAPI: '/api/wms/warehouses/{ID}',
      //     childrenName: 'slotName',
      //     childrenValue: 'id',
      //     childrenPlaceholder: '请选择储位',
      //     name: 'warehouseName',
      //     value: 'id',
      //     queryData: {
      //       warehouseId: '{id}',
      //     }
      //   },
      //   rules: [
      //     { required: true }
      //   ]
      // },
      { field: 'transactionBy', type: 'input', intlPrefix: 'storagesOut.' },
      { field: 'outOrderNum', type: 'input', intlPrefix: 'storagesOut.' },
      { field: 'distributorCustomer', type: 'input', intlPrefix: 'storagesOut.' },
      { field: 'transactionTime', type: 'datetime', intlPrefix: 'storagesOut.' },
      { field: 'originatorName', type: 'get-account', intlPrefix: 'storagesOut.' },
      { field: 'note', type: 'input', intlPrefix: 'storagesOut.', span: 2 },
      {
        field: 'storageOutItems', type: 'children', intlPrefix: 'storagesOut.',
        API: '/api/wms/skus',
        mapItemFieldTo: 'storageOutItems',
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
        { title: '添加', action: 'addItem' },
      ],
    },
    table: {
      operation: [
        { title: '删除', action: 'deleteItem', options: { name: 'skuName' } },
      ],
      columns: [
        { title: '商品条码', field: 'skuBarcode' },
        { title: '出库时间', field: 'transactionTime' },
        { title: '商品编号', field: 'skuCode' },
        { title: '商品名称', field: 'skuName' },
        {
          title: '出库数量', field: 'transactionQuantities', mark:'d->t', valueType: 'editQuantity',
          options: {
            minValue: 1,
          }
        },
        { title: '出库价格', field: 'transactionSkuPrice', valueType: 'editQuantity' },
        { title: '单位', field: 'skuUnit' },
      ]
    }
  },
}