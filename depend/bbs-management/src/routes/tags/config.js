module.exports =  {
  header: {
    title: '标签管理'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields:[
      {
        field: 'tagName',
        placeholder: '标签名称',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '标签名称', field: 'tagName' },
      // { title: '标签类型', field: 'tagType'},
      { title: '排序号', field: 'sortOrder'},
    ],
    operation: [
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      { field: 'tagName', type: 'input', intlPrefix: 'tags.',
        rules: [
          { required: true }
        ]
      },
      // { field: 'tagType', type: 'input', intlPrefix: 'tags.',
      //   rules: [
      //     { required: true }
      //   ]
      // },
      { field: 'sortOrder', type: 'number', intlPrefix: 'tags.' },
    ],
    colNumber: 2
  },
  details: {
    table: {},
    form: {},
  }
}