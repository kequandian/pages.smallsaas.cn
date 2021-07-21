module.exports = {
  header: {
    title: '分销单管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.sales.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'salesCode',
        placeholder: '分销订单编号',
        type: 'input',
      },
      {
        field: 'status',
        placeholder: '状态',
        type: 'select',
        options: [
          { key: '待出库', value: 'WaitForStorageOut' },
          { key: '部分出库', value: 'SectionStorageOut' },
          { key: '全部出库', value: 'TotalStorageOut' },
          { key: '草稿', value: 'Draft' },
          { key: '待审核', value: 'Wait_To_Audit' },
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
        title: '订单编号', field: 'salesCode', valueType: 'path',
        options: {
          path: '/sales',
          queryData: {
            type: 'query',
            id: '{id}',
            tabs: '1',
          }
        }
      },
      { title: '分销商', field: 'traderName' },
      // { title: '仓库名', field: 'warehouseName' },
      // { title: '分销折扣', field: 'salesDiscount', align: 'right', valueType: 'currency' },
      // { title: '其它支出', field: 'salesOthersPayment', align: 'right', valueType: 'currency' },
      { title: '订单总费用', field: 'salesTotal', align: 'right', valueType: 'currency' },
      { title: '订单总数量', field: 'totalCount', align: 'right' },
      { title: '创建时间', field: 'transactionTime' },
      { title: '状态', field: 'salesStatus', valueType: 'statusTag' },
    ],
    operation: [
      {
        title: '出库', action: 'query',
        options: {
          expectedField: 'salesStatus',
          expectedValue: 'WaitForStorageOut',
          permission: 'wms.sales.add',
          localtion: true,
        }
      },
      {
        title: '审核', action: 'query',
        options: {
          expectedField: 'salesStatus',
          expectedValue: 'Wait_To_Audit',
          permission: 'wms.sales.audit',
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
        title: '编辑', action: 'edit',
        options: {
          expectedField: 'salesStatus',
          expectedValue: 'Draft',
          permission: 'wms.sales.edit',
          localtion: true,
        },
      },
      {
        title: '删除', action: 'delete',
        options: {
          expectedField: 'salesStatus',
          expectedValue: 'Draft',
          permission: 'wms.sales.delete',
          localtion: true,
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'salesCode', type: 'serial-code', intlPrefix: 'sales.',
        props: { prefix: 'SAL' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'traderId', type: 'field-config-select', intlPrefix: 'sales.',
        API: '/api/warehouse/traders?traderStatus=Normal',
        options: {
          name: 'traderName',
          value: 'id',
          saveToForm: {
            traderContactPhone: 'traderContactPhone',
            traderName: 'traderName',
            deliveredAddress: 'deliveredAddress',
          },
        },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'deliveredAddress', type: 'transparent-input', intlPrefix: 'sales.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'traderContactPhone', type: 'transparent-input', intlPrefix: 'sales.',
        rules: [
          { required: true }
        ]
      },
      { field: 'salesTime', type: 'datetime', intlPrefix: 'sales.' },
      { field: 'transactionBy', type: 'input', intlPrefix: 'sales.' },
      { field: 'originatorName', type: 'get-account', intlPrefix: 'sales.' },
      { field: 'salesNote', type: 'input', intlPrefix: 'sales.' },
      // { field: 'transactionTime', type: 'datetime', intlPrefix: 'sales.' },
      {
        field: 'outItems', type: 'children', intlPrefix: 'sales.',
        API: '/api/wms/skus',
        mapItemFieldTo: 'outItems',
        filterField: 'skuCode',
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
        { title: '时间', field: 'transactionTime' },
        { title: '商品编号', field: 'skuCode' },
        { title: '商品名称', field: 'skuName' },
        {
          title: '销售数量', field: 'transactionQuantities', mark:'d->t', valueType: 'editQuantity', // transactionQuantities
          value: 1,
          options: {
            minValue: 1,
          }
        },
        { title: '单价', field: 'transactionSkuPrice', valueType: 'editCurrency' },
        { title: '总价', field: 'transactionTotalSkuPrice', valueType: 'totalPrice' },
        { title: '单位', field: 'skuUnit' },
      ],
      footer: {
        type: 'showPrice',
        totalPriceText: '商品总额',
        totalPriceField: 'salesTotal',
      }
    }
  },
  details: {
    operation: {
      fields: [],
      action: [
        // { 
        //   title: '作废', action: 'confirm', 
        //   options: {
        //       type: 'defaults',
        //       color: 'danger',
        //       title: '您确定要标记这份分销单标记为 作废 吗？',
        //       API: '/api/wms/saless/{QueryId}/cancel',
        //   } 
        // },
        // { 
        //   title: '出库', action: 'confirm', 
        //   options: {
        //       type: 'defaults',
        //       color: 'primary',
        //       title: '您确定要标记这份分销单标记为 完成 吗？',
        //       API: '/api/wms/saless/{QueryId}/done',
        //   } 
        // },
      ],
    },
    table: {
      columns: [
        { title: '分销订单编号', field: 'salesCode' },
        { title: '分销商', field: 'traderName' },
        { title: '总价', field: 'salesTotal', align: 'right', valueType: 'currency' },
        { title: '时间', field: 'salesTime' },
        { title: '备注', field: 'salesNote' },
        { title: '制单人', field: 'originatorName' },
        { title: '状态', field: 'salesStatus', valueType: 'statusTag' },
      ],
    },
    form: {
      fields: [
        // { field: 'salesCode', type: 'plain', intlPrefix: 'sales.' },
        // { field: 'traderName', type: 'plain', intlPrefix: 'sales.' },
        {
          field: 'field1', type: 'field-config-select', intlPrefix: 'sales.',
          API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'id' },
          rules: [
            { required: true }
          ]
        },
        {
          field: 'field2', type: 'serial-code', intlPrefix: 'sales.',
          props: { prefix: 'IN', reset: true },
          rules: [
            { required: true }
          ]
        },
        {
          field: 'transactionTime', type: 'datetime', intlPrefix: 'sales.',
          rules: [
            { required: true }
          ]
        },
        { field: 'transactionBy', type: 'input', intlPrefix: 'sales.' },
        { field: 'note', type: 'input', intlPrefix: 'sales.' },
        { field: 'originatorName', type: 'get-account', intlPrefix: 'storagesOut.' },
        {
          field: 'outItems', type: 'children', intlPrefix: 'sales.',
          API: '/api/wms/skus',
          mapItemFieldTo: 'outItems',
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
      colNumber: 2
    },
    children: {
      table: {
        operation: [
          // { title: '删除', action: 'deleteItem', options: { name: 'skuName' } },
        ],
        columns: [
          { title: '商品编号', field: 'skuCode' },
          { title: '商品条码', field: 'skuBarcode' },
          { title: '商品名称', field: 'skuName' },
          { title: '单位', field: 'skuUnit' },
          { title: '总数', field: 'totalCount' },
          { title: '已出库数', field: 'finishedCount' },
          {
            title: '本次出库数量', field: 'transactionQuantities', valueType: 'editQuantity',
            options: {
              maxField: 'totalCount',
              coverField: 'finishedCount',
              minValue: 0,
            }
          },
        ]
      }
    }
  }
}