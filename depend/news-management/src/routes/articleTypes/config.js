module.exports =  {
  header: {
    title: '资讯分类管理'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields:[
      {
        field: 'search',
        placeholder: '类别名称',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '类别名称', field: 'name' },
    ],
    operation: [
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      // { field: 'id', type: 'input', intlPrefix: 'articleTypes.' },
      { field: 'name', type: 'input', intlPrefix: 'articleTypes.' },
      { field: 'identifier', type: 'input', intlPrefix: 'articleTypes.' },
    ],
    colNumber: 2
  },
}