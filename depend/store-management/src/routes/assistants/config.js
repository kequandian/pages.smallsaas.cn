module.exports =  {
  header: {
    title: '店员管理'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields:[
      {
        field: 'code',
        placeholder: '员工工号',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '姓名', field: 'name' },
      { title: '员工工号', field: 'code', valueType: 'number'},
      { title: 'qq', field: 'qq', valueType: 'number' },
      { title: '角色', field: 'directorId' },
    ],
    operation: [
      { title: '详情', action: 'query' },
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      { field: ' ', type: 'group', label: null },
      { field: 'avatar', type: 'avatar-upload', intlPrefix: 'assistants.', props: { maxNumber: 1 } },
      { field: 'code', type: 'input', intlPrefix: 'assistants.',
        rules: [
          { required: true }
        ]
      },
      { field: 'name', type: 'input', intlPrefix: 'assistants.',
        rules: [
          { required: true }
        ]
      },
      { field: 'position', type: 'role-select', intlPrefix: 'assistants.' },
      { field: 'telephone', type: 'mobile', intlPrefix: 'assistants.' },
      { field: 'wechat', type: 'input', intlPrefix: 'assistants.' },
      { field: 'qq', type: 'input', intlPrefix: 'assistants.' },
      { field: 'status', type: 'input', intlPrefix: 'assistants.' },
      { field: 'name', type: 'input', intlPrefix: 'assistants.',
        rules: [
          { required: true }
        ]
      },
      { field: 'storeId', type: 'plain', intlPrefix: 'assistants.' },
    ],
    colNumber: 2
  }
}