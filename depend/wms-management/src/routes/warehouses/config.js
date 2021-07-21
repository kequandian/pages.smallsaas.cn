module.exports = {
  header: {
    title: '仓库管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.warehouse.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'warehouseName',
        placeholder: '仓库名称',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      {
        title: '仓库编号', field: 'warehouseCode', valueType: 'path',
        options: {
          path: '/warehouses',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      { title: '仓库名称', field: 'warehouseName' },
      { title: '所在省市', field: 'warehousePCD', valueType: 'PCD' },
      { title: '详细地址', field: 'warehouseAddress' },
      // { title: '负责人', field: 'chargerName' },
    ],
    operation: [
      {
        title: '编辑', action: 'edit',
        options: {
          permission: 'wms.warehouse.edit',
          localtion: true,
        }
      },
      {
        title: '删除', action: 'delete',
        options: {
          permission: 'wms.warehouse.delete',
          localtion: true,
        }
      },
      { title: '详情', action: 'query' },
    ]
  },
  form: {
    fields: [
      {
        field: 'warehouseCode', type: 'serial-code', intlPrefix: 'warehouses.',
        props: { prefix: 'WH' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'warehouseName', type: 'input', intlPrefix: 'warehouses.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'warehousePCD', type: 'pcd-select', intlPrefix: 'warehouses.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'warehouseAddress', type: 'input', intlPrefix: 'warehouses.',
        rules: [
          { required: true }
        ]
      },
      // { field: 'warehouseCharger', type: 'input', intlPrefix: 'warehouses.' },
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
        { title: '删除', action: 'deleteItem' },
      ]
    }
  },
  details: {
    form: {
      fields: [
        {
          field: 'warehouseCode', type: 'plain', intlPrefix: 'warehouses.',
        },
        {
          field: 'warehouseName', type: 'plain', intlPrefix: 'warehouses.',
        },
        {
          field: 'warehousePCD', type: 'plain', intlPrefix: 'warehouses.',
        },
        {
          field: 'warehouseAddress', type: 'plain', intlPrefix: 'warehouses.',
        },
      ],
      colNumber: 2
    }
  }
}