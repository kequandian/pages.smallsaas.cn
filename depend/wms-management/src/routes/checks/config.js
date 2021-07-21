module.exports = {
  header: {
    title: '库存盘点管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.check.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'checkCode',
        placeholder: '盘点编号',
        type: 'input',
      },
      {
        field: 'status',
        placeholder: '状态',
        type: 'select',
        options: [
          { key: '待盘点', value: 'WaitForCheck' },
          { key: '盘点中', value: 'Checking' },
          { key: '盘点结束', value: 'CheckOut' },
          { key: '草稿', value: 'Draft' },
          { key: '待审核', value: 'Wait_To_Audit' },
          { key: '完成', value: 'Done' },
          { key: '关闭', value: 'Closed' },
        ],
      },
    ]
  },
  search: {
  },
  table: {
    columns: [
      {
        title: '盘点编号', field: 'checkCode', valueType: 'path',
        options: {
          path: '/checks',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      { title: '盘点仓库', field: 'warehouseName' },
      { title: '经办人', field: 'transactionBy' },
      { title: '备注', field: 'checkNote' },
      { title: '盘点时间', field: 'checkTime' },
      // { title: '完成时间', field: 'checkTime'},
      { title: '状态', field: 'status', valueType: 'statusTag' },
      { title: '制单人', field: 'originatorName' },
    ],
    operation: [
      {
        title: '编辑', action: 'edit',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
        },
      },
      {
        title: '盘点', action: 'query',
        options: {
          routerType: 'checking',
          expectedField: 'status',
          expectedValue: 'Draft',
          permission: 'wms.check.check',
          localtion: true,
        }
      },
      {
        title: '继续盘点', action: 'query',
        options: {
          routerType: 'checking',
          expectedField: 'status',
          expectedValue: 'Checking',
          permission: 'wms.check.check',
          localtion: true,
        }
      },
      {
        title: '完成盘点', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'primary', // primary dashed danger
          expectedField: 'status',
          expectedValue: 'Checking',
          title: '确定要将该盘点记录标记为 ‘已完成盘点’ 吗？',
          API: '/api/wms/checks/(id)/done',
          permission: 'wms.check.close',
          localtion: true,
        }
      },
      // { title: '编辑', action: 'edit' },
      {
        title: '删除', action: 'delete',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
          permission: 'wms.check.delete',
          localtion: true,
        }
      },
      {
        title: '审核', action: 'query',
        options: {
          expectedField: 'status',
          expectedValue: 'CheckOut',
          permission: 'wms.check.audit',
          localtion: true,
          icon: 'eye',
          color: '#1890ff',
          routerType: 'audit',
        }
      },
      {
        title: '详情', action: 'query',
        options: {
          // expectedField: 'status',
          // expectedValue: 'CheckOut',
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'checkCode', type: 'serial-code', intlPrefix: 'checks.',
        props: { prefix: 'CHK', reset: true },
        rules: [
          { required: true }
        ]
      },
      // { field: 'profitLost', type: 'number', intlPrefix: 'checks.' },
      {
        field: 'warehouseId', type: 'field-config-select', intlPrefix: 'checks.',
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
      { field: 'transactionBy', type: 'input', intlPrefix: 'checks.' },
      { field: 'checkNote', type: 'input', intlPrefix: 'checks.' },
      { field: 'checkTime', type: 'datetime', intlPrefix: 'checks.' },
      { field: 'originatorName', type: 'get-account', intlPrefix: 'checks.' },
      {
        field: 'skuRecords', type: 'children', intlPrefix: 'checks.',
        API: '/api/wms/inventories',
        mapItemFieldTo: 'checkSkus',
        fieldMap: [
          { from: 'validSku', to: 'deservedQuantities', mark: 'd->t|t->d', value: 0 },
        ],
        columns: [
          { title: '商品条码', field: 'skuBarcode' },
          { title: '商品编号', field: 'skuCode' },
          { title: '商品名称', field: 'skuName' },
          { title: '数量', field: 'validSku' },
          { title: '单位', field: 'skuUnit' },
        ],
        operation: {
          fields: [
            {
              field: 'search',
              placeholder: '商品名称/条码',
              type: 'input',
            }
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
        {
          title: '添加', action: 'addItem', options: {
            disable: true,
            message: '请先选择盘点仓库',
          }
        },
      ],
    },
    table: {
      operation: [
        { title: '删除', action: 'deleteItem', options: { name: 'skuName' } },
      ],
      columns: [
        { title: ' ', field: 'total' },
        { title: '商品编号', field: 'skuCode' },
        { title: '商品条码', field: 'skuBarcode' },
        { title: '商品名称', field: 'skuName' },
        {
          title: '应有数量', field: 'deservedQuantities', mark: 'd->t|t->d', 
          align: 'right', bottomTotal: true
        },
      ],
    }
  },
  details: {
    table: {},
    form: {
      fields: [
        { field: 'checkCode', type: 'plain', intlPrefix: 'checks.' },
        { field: 'warehouseName', type: 'plain', intlPrefix: 'checks.' },
        { field: 'checkTime', type: 'plain', intlPrefix: 'checks.' },
        { field: 'originatorName', type: 'plain', intlPrefix: 'checks.' },
        { field: 'checkNote', type: 'plain', intlPrefix: 'checks.', span: 2 },
        {
          field: 'skuRecords', type: 'children', intlPrefix: 'procurements.',
          API: '/api/wms/skus',
          mapItemFieldTo: 'checkSkus',
          fieldMap: [
            { from: 'id', to: 'skuId' },
            { from: 'skuPrice', to: 'transactionSkuPrice', value: 0 },
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
          ]
        },
      ],
      colNumber: 3
    },
    children: {
      table: {
        operation: [
          // { title: '删除', action: 'deleteItem', options:{ name: 'skuName' } },
        ],
        columns: [
          { title: ' ', field: 'total' },
          { title: '商品编号', field: 'skuCode' },
          { title: '商品条码', field: 'skuBarcode' },
          { title: '商品名称', field: 'skuName' },
          { title: '单位', field: 'skuUnit' },
          {
            title: '应有数量', field: 'deservedQuantities',
            align: 'right',
            bottomTotal: true,
          },
          {
            title: '实际数量', field: 'factQuantities', valueType: 'editQuantity',
            bottomTotal: true,
            options: {
              minValue: 0,
            }
          },
        ]
      }
    }
  }
}