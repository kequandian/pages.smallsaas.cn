import moment from 'moment';
export default {
  header: {
    title: '入库管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.in.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'transactionCode',
        placeholder: '入库单编号',
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
        field: 'transactionType', type: 'select',
        placeholder: '入库类型',
        options: [
          { key: '销售退货', value: 'SalesIn' },
          { key: '调拨入库', value: 'TransferIn' },
          { key: '采购入库', value: 'Procurement' },
          { key: '分销商退货', value: 'CustomerStorageIn' },
          { key: '其它入库', value: 'OthersStorageIn' },
        ]
      },
    ]
  },
  search: {
  },
  table: {
    columns: [
      {
        title: '入库单编号', field: 'transactionCode', valueType: 'path',
        options: {
          path: '/storagesIn',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      { title: '入库时间', field: 'transactionTime', sorter: (a, b) => new Date(a.transactionTime) - new Date(b.transactionTime) },
      { title: '入库类型', field: 'transactionType', valueType: 'statusTag' },
      // { title: '批次号', field: 'batchNo', sorter: (a, b) => a.batchNo - b.batchNo },
      { title: '仓库', field: 'warehouseName' },
      // { title: '储位', field: 'slotName' },
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
          permission: 'wms.in.edit',
          localtion: true,
        },
      },
      {
        title: '审核', action: 'query',
        options: {
          expectedField: 'status',
          expectedValue: 'Wait_To_Audit',
          permission: 'wms.in.audit',
          localtion: true,
          icon: 'eye',
          color: '#1890ff',
          routerType: 'audit',
        }
      },
      {
        title: '完成入库', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'primary', // primary dashed danger
          method: 'put',
          expectedField: 'status',
          expectedValue: 'Audit_Passed',
          title: '确定要将该入库记录标记为 ‘已完成’ 吗？',
          API: '/api/wms/storages/in/(id)/execution',
          permission: 'wms.in.edit',
          localtion: true,
        }
      },
      { title: '详情', action: 'query' },
      {
        title: '删除', action: 'delete',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
          permission: 'wms.in.delete',
          localtion: true,
        }
      },
    ]
  },
  form: {
    fields: [
      // field-config-select
      {
        field: 'transactionCode', type: 'serial-code', intlPrefix: 'storagesIn.',
        props: { prefix: 'IN' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'transactionType', type: 'select', intlPrefix: 'storagesIn.',
        options: [
          // { key: '销售退货', value: 'SalesIn' },
          { key: '分销商退货', value: 'CustomerStorageIn' },
          { key: '其它入库', value: 'OthersStorageIn' },
        ],
        rules: [
          { required: true }
        ]
      },
      // { field: 'batchNo', type: 'input', intlPrefix: 'storagesIn.' },
      // { field: 'status', type: 'input', intlPrefix: 'storagesIn.' },
      {
        field: 'warehouseId', type: 'field-config-select', intlPrefix: 'storagesIn.',
        API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'id' },
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
      //   },
      //   rules: [
      //     { required: true }
      //   ]
      // },
      // { field: 'readjustCostPrice', type: 'number', intlPrefix: 'storagesIn.', props: { step: 0.01 }, span: 2 },
      { field: 'transactionBy', type: 'input', intlPrefix: 'storagesIn.' },
      { field: 'transactionTime', type: 'datetime', intlPrefix: 'storagesIn.' },
      { field: 'originatorName', type: 'get-account', intlPrefix: 'storagesIn.' },
      { field: 'note', type: 'input', intlPrefix: 'storagesIn.', span: 2 },
      {
        field: 'storageInItems', type: 'children', intlPrefix: 'storagesIn.',
        API: '/api/wms/skus',
        mapItemFieldTo: 'storageInItems',
        fieldMap: [
          { from: 'id', to: 'skuId' },
          { from: 'skuPrice', to: 'transactionSkuPrice' },
          { from: '', to: 'transactionQuantities', value: 1 },
          { from: 'createTime', to: 'transactionTime', value: moment().format('YYYY-MM-DD HH:mm:ss') },
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
        { title: '入库时间', field: 'transactionTime' },
        { title: '商品编号', field: 'skuCode' },
        { title: '商品名称', field: 'skuName' },
        {
          title: '入库数量', field: 'transactionQuantities', mark: 'd->t', valueType: 'editQuantity', // transactionQuantities
          value: 1,
          options: {
            minValue: 1,
          }
        },
        // { title: '入库价格', field: 'transactionSkuPrice', align: 'right', valueType: 'currency' },
        { title: '单位', field: 'skuUnit' },
      ]
    }
  },
  details: {
    operation: {
      action: [
        { title: '打印', action: 'add', options: { path: '/TODO' } },
      ]
    },
    search: {},
    form: {
      fields: [
        { field: 'warehouseName', type: 'plain', intlPrefix: 'storagesIn.' },
        { field: 'transactionCode', type: 'plain', intlPrefix: 'storagesIn.' },
        { field: 'transactionTime', type: 'plain', intlPrefix: 'storagesIn.' },
        { field: 'originatorName', type: 'plain', intlPrefix: 'storagesIn.' },
      ],
      colNumber: 4
    },
    table: {
      API: '/api/wms/storages/in',
      dataField: 'currentItem.storageInItemRecords',
      columns: [
        { title: '商品条码', field: 'skuBarcode' },
        { title: '商品名称', field: 'skuName' },
        { title: '单位', field: 'skuUnit' },
        { title: '数量', field: 'transactionQuantities' },
        { title: '单价', field: 'transactionSkuPrice', align: 'right', valueType: 'currency' },
        { title: '入库类型', field: 'transactionType', valueType: 'statusTag' },
      ]
    }
  }
}
