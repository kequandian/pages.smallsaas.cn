module.exports = {
  header: {
    title: '采购单管理'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields: [
      {
        field: 'search',
        placeholder: '采购单编号/供应商',
        type: 'input',
      },
      {
        field: 'status',
        placeholder: '状态',
        type: 'select',
        options: [
          { key: '等待入库', value: 'WaitForStorageIn' },
          { key: '部分入库', value: 'SectionStorageIn' },
          { key: '全部入库', value: 'TotalStorageIn' },
          { key: '草稿', value: 'Draft' },
          { key: '待审核', value: 'Wait_To_Audit' },
          { key: '审核通过', value: 'Audit_Passed' },
          { key: '关闭', value: 'Closed' },
        ],
      },
      {
        field: 'procurementTime',
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
        title: '采购单编号', field: 'procurementCode', valueType: 'path',
        options: {
          path: '/procurements',
          queryData: {
            type: 'query',
            id: '{id}',
            tabs: '1',
          }
        }
      },
      { title: '供应商', field: 'supplierName' },
      // { title: '仓库名', field: 'warehouseName' },
      // { title: '采购折扣', field: 'procurementDiscount', align: 'right', valueType: 'currency' },
      // { title: '其它支出', field: 'procurementOthersPayment', align: 'right', valueType: 'currency' },
      { title: '总花费', field: 'procurementTotal', align: 'right', valueType: 'currency' },
      { title: '采购时间', field: 'procurementTime' },
      { title: '状态', field: 'procureStatus', valueType: 'statusTag' },
    ],
    operation: [
      {
        title: '入库', action: 'query',
        options: {
          expectedField: 'procureStatus',
          expectedValue: 'Audit_Passed',
          permission: 'wms.purchase.in',
          localtion: true,
        }
      },
      {
        title: '入库', action: 'query',
        options: {
          expectedField: 'procureStatus',
          expectedValue: 'SectionStorageIn',
          permission: 'wms.purchase.in',
          localtion: true,
        }
      },
      {
        title: '关闭', action: 'confirm',
        options: {
          expectedField: 'procureStatus',
          expectedValue: 'SectionStorageIn',
          permission: 'wms.purchase.in',
          localtion: true,
          title: '确定要将这份采购单 ‘关闭’ 吗？',
          API: '/api/wms/procurements/(id)/closed',
          method: 'put',
        }
      },
      {
        title: '编辑', action: 'edit',
        options: {
          expectedField: 'procureStatus',
          expectedValue: 'Draft',
        },
      },
      {
        title: '审核', action: 'query',
        options: {
          expectedField: 'procureStatus',
          expectedValue: 'Wait_To_Audit',
          permission: 'wms.purchase.audit',
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
          expectedField: 'procureStatus',
          expectedValue: 'Draft',
          permission: 'wms.purchase.delete',
          localtion: true,
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'procurementCode', type: 'serial-code', intlPrefix: 'procurements.',
        props: { prefix: 'PUR' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'supplierId', type: 'field-config-select', intlPrefix: 'procurements.',
        API: '/api/wms/suppliers?supplierStatus=Normal', options: { name: 'supplierName', value: 'id' },
        rules: [
          { required: true }
        ]
      },
      // { field: 'storageInId', type: 'field-config-select', intlPrefix: 'procurements.',
      //     API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'id' },
      //     rules: [
      //       { required: true }
      //     ]
      // },
      // { field: 'procureStatus', type: 'select', intlPrefix: 'procurements.',
      //     options: [
      //       { key: '待入库', value: 'Audit_Passed' },
      //       { key: '部分入库', value: 'SectionStorageIn' },
      //       { key: '全部入库', value: 'TotalStorageIn' },
      //     ],
      //     rules: [
      //       { required: true }
      //     ]
      // },
      // { field: 'procurementOthersPayment', type: 'number', intlPrefix: 'procurements.', props: { step: 0.01 } },
      // { field: 'procurementDiscount', type: 'number', intlPrefix: 'procurements.', props: { step: 0.01 } },
      // { field: 'procurementTotal', type: 'number', intlPrefix: 'procurements.', props: { step: 0.01 } },
      { field: 'procurementTime', type: 'datetime', intlPrefix: 'procurements.' },
      { field: 'procurementNote', type: 'input', intlPrefix: 'procurements.' },
      { field: 'transactionBy', type: 'input', intlPrefix: 'procurements.' },
      { field: 'originatorName', type: 'get-account', intlPrefix: 'procurements.' },
      // { field: 'transactionTime', type: 'datetime', intlPrefix: 'procurements.' },
      {
        field: 'items', type: 'children', intlPrefix: 'procurements.',
        API: '/api/wms/skus',
        mapItemFieldTo: 'items',
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
        { title: '采购时间', field: 'transactionTime' },
        { title: '商品编号', field: 'skuCode' },
        { title: '商品名称', field: 'skuName' },
        {
          title: '采购数量', field: 'transactionQuantities', mark:'d->t', valueType: 'editQuantity',
          value: 1,
          options: {
            minValue: 1,
          }
        },
        // { title: '采购数量', field: 'transactionQuantities', valueType: 'editQuantity', },
        { title: '采购单价', field: 'transactionSkuPrice', valueType: 'editCurrency' },
        { title: '采购总价', field: 'transactionTotalSkuPrice', valueType: 'totalPrice' },
        { title: '单位', field: 'skuUnit' },
      ],
      footer: {
        type: 'showPrice',
        totalPriceText: '商品采购总额',
        totalPriceField: 'procurementTotal',
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
        //       title: '您确定要标记这份采购单标记为 作废 吗？',
        //       API: '/api/wms/procurements/{QueryId}/cancel',
        //   } 
        // },
        // { 
        //   title: '入库', action: 'confirm', 
        //   options: {
        //       type: 'defaults',
        //       color: 'primary',
        //       title: '您确定要标记这份采购单标记为 完成 吗？',
        //       API: '/api/wms/procurements/{QueryId}/done',
        //   } 
        // },
      ],
    },
    table: {
      columns: [
        { title: '采购编码', field: 'procurementCode' },
        { title: '供应商', field: 'supplierName' },
        { title: '采购总价', field: 'procurementTotal', align: 'right', valueType: 'currency' },
        { title: '采购时间', field: 'procurementTime' },
        { title: '备注', field: 'procurementNote' },
        { title: '制单人', field: 'originatorName' },
        { title: '状态', field: 'procureStatus', valueType: 'statusTag' },
      ],
    },
    form: {
      fields: [
        // { field: 'procurementCode', type: 'plain', intlPrefix: 'procurements.' },
        // { field: 'supplierName', type: 'plain', intlPrefix: 'procurements.' },
        {
          field: 'field1', type: 'field-config-select', intlPrefix: 'procurements.',
          API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'id' },
          rules: [
            { required: true }
          ]
        },
        {
          field: 'field2', type: 'serial-code', intlPrefix: 'procurements.',
          props: { prefix: 'IN', reset: true },
          rules: [
            { required: true }
          ]
        },
        {
          field: 'transactionTime', type: 'datetime', intlPrefix: 'procurements.',
          rules: [
            { required: true }
          ]
        },
        { field: 'transactionBy', type: 'input', intlPrefix: 'procurements.' },
        { field: 'note', type: 'input', intlPrefix: 'procurements.' },
        { field: 'originatorName', type: 'get-account', intlPrefix: 'storagesIn.' },
        {
          field: 'items', type: 'children', intlPrefix: 'procurements.',
          API: '/api/wms/skus',
          mapItemFieldTo: 'items',
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
          // { title: '删除', action: 'deleteItem', options:{ name: 'skuName' } },
        ],
        columns: [
          { title: '商品编号', field: 'skuCode' },
          { title: '商品条码', field: 'skuBarcode' },
          { title: '商品名称', field: 'skuName' },
          { title: '单位', field: 'skuUnit' },
          { title: '采购总数', field: 'totalCount' },
          { title: '已入库数', field: 'sectionInCount' },
          { title: '待审核的数量', field: 'auditCount' },
          {
            title: '本次入库数量', field: 'transactionQuantities', mark:'d->t', valueType: 'editQuantity',
            options: {
              maxField: 'totalCount',
              coverField: ['sectionInCount', 'auditCount'],
              minValue: 0,
            }
          },
        ]
      }
    }
  }
}