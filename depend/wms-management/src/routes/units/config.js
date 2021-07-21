module.exports =  {
  header: {
    title: '单位管理'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields:[
      {
        field: 'unitName',
        placeholder: '单位名称',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '单位名称', field: 'unitName'},
    ],
    operation: [
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      { field: 'unitName', type: 'input', intlPrefix: 'units.',
        rules: [
          { required: true }
        ]
      },
    ],
    colNumber: 2
  },
  details: {
    table: {},
    form: {},
  }
}