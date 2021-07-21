export default {
  header: {
    title: '默认配置'
  },
  operation: {
    action: [
      { title: '新建', action: 'add' }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: 'ID', field: 'id' },
      { title: '姓名', field: 'name' },
    ],
    operation: [
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      { field: 'id', type: 'input' },
      { field: 'name', type: 'input' },
    ],
    colNumber: 2
  }
}