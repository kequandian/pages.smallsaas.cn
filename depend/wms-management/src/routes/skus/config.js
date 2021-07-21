export default {
  header: {
    title: '商品管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.goods.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'skuName',
        placeholder: '商品名称',
        type: 'input',
      },
      {
        field: 'barCode',
        placeholder: '条形码',
        type: 'input',
      },
    ]
  },
  search: {
  },
  table: {
    columns: [
      {
        title: '商品编号', field: 'skuCode', valueType: 'path',
        options: {
          path: '/skus',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      { title: '商品名称', field: 'skuName' },
      // { title: '价格', field: 'skuPrice', align: 'right', valueType: 'currency' },
      { title: '条形码', field: 'barCode' },
      { title: '单位', field: 'field1' },
      // { title: '总库存', field: 'costPrice' },
      { title: '创建时间', field: 'createTime' },
    ],
    operation: [
      {
        title: '编辑', action: 'edit',
        options: {
          permission: 'wms.goods.edit',
          localtion: true,
        }
      },
      {
        title: '删除', action: 'delete',
        options: {
          permission: 'wms.goods.delete',
          localtion: true,
        }
      },
      { title: '详情', action: 'query' },
    ]
  },
  form: {
    fields: [
      { field: '基本信息', label: '', type: 'group', span: 2 },
      {
        field: 'productCode', type: 'serial-code', intlPrefix: 'skus.',
        props: { prefix: 'P' },
        rules: [
          { required: true }
        ]
      },
      // ajax-rule-input
      {
        field: 'productCategoryId', type: 'field-config-select', intlPrefix: 'skus.',
        API: '/api/product/categories',
        options: {
          name: 'categoryName',
          value: 'id',
        },
        rules: [
          { required: true }
        ]
      },

      {
        field: 'barCode', type: 'input', intlPrefix: 'skus.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'name', type: 'input', intlPrefix: 'skus.',
        // API: 'api/wms/unique',
        rules: [
          { required: true }
        ]
      },
      // { field: 'price', type: 'number', intlPrefix: 'skus.',
      //   props: { step: 0.01 },
      //   rules: [
      //     { required: true }
      //   ]
      // },
      //units-select
      // field1
      {
        field: 'field1', type: 'input', intlPrefix: 'skus.',
        API: '/api/wms/sku/units',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'costPrice', type: 'number', intlPrefix: 'skus.',
        props: { step: 0.01 },
        rules: [
          { required: true }
        ]
      },
      // { field: 'specifications', type: 'input', intlPrefix: 'skus.' },
      { field: 'spec', type: 'input', intlPrefix: 'skus.' },
      { field: 'volume', type: 'input', intlPrefix: 'skus.' },
      { field: 'weight', type: 'input', intlPrefix: 'skus.' },
      // { field: 'productUnits', type: 'input', intlPrefix: 'skus.',
      //   rules: [
      //     { required: true }
      //   ] 
      // },
      // { field: 'productUnits', type: 'json-select', intlPrefix: 'skus.',
      //   props: {
      //     mainField: 'unitName',
      //   },
      //   rules: [
      //     { required: true }
      //   ] 
      // },
      // { field: 'searchKeyWord', type: 'input', intlPrefix: 'skus.',span: 2, props: { placeholder: '以空格分割不同关键字' } },
      // { field: 'tagName', type: 'tags-checkbox', intlPrefix: 'skus.', span: 2,
      //   API: '/api/wms/sku/tags',
      // },
      // { field: '规格信息',  label: '', type: 'group', span: 2 },
      // { field: 'skus', type: 'product-specification', intlPrefix: 'skus.', span: 2, label: '  ',
      //   props: {
      //     productCategoryId: 'productCategoryId',
      //     productCodeField: 'productCode',
      //     productCategoryField: 'productCategoryId',
      //   }
      // },
    ],
    colNumber: 2
  },
  details: {
    form: {
      fields: [
        {
          field: 'productCode', type: 'plain', intlPrefix: 'skus.',
        },
        {
          field: 'productCategoryId', type: 'plain', intlPrefix: 'skus.',
        },
        {
          field: 'barCode', type: 'plain', intlPrefix: 'skus.',
        },
        {
          field: 'name', type: 'plain', intlPrefix: 'skus.',
        },
        {
          field: 'field1', type: 'plain', intlPrefix: 'skus.',
        },
        {
          field: 'costPrice', type: 'plain', intlPrefix: 'skus.',
        },
        { field: 'spec', type: 'plain', intlPrefix: 'skus.' },
        { field: 'volume', type: 'plain', intlPrefix: 'skus.' },
        { field: 'weight', type: 'plain', intlPrefix: 'skus.' },
      ],
      colNumber: 2
    }
  }
}