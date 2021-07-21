module.exports = {
  header: {
    title: '商品分类管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.category.add',
          localtion: true,
        }
      },
    ],
    fields: [
      { field: 'categoryName', type: 'input', placeholder: '类别名称' },
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '类别编号', field: 'categoryCode' },
      { title: '类别名称', field: 'categoryName' },
      { title: '类别描述', field: 'categoryDescription' },
    ],
    operation: [
      {
        title: '编辑', action: 'edit',
        options: {
          permission: 'wms.category.edit',
          localtion: true,
        }
      },
      {
        title: '删除', action: 'delete',
        options: {
          permission: 'wms.category.delete',
          localtion: true,
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'categoryCode', type: 'input', intlPrefix: 'productCategories.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'categoryName', type: 'input', intlPrefix: 'productCategories.',
        rules: [
          { required: true }
        ]
      },
      { field: 'categoryDescription', type: 'input', intlPrefix: 'productCategories.' },
      // { field: 'groups', type: 'specification', intlPrefix: 'productCategories.', span: 2 },
    ],
    colNumber: 2
  }
}