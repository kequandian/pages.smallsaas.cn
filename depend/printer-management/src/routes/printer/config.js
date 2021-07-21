module.exports =  {
  header: {
    title: '打印机管理配置文件'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields:[
      {
        field: 'search',
        placeholder: '请输入内容……',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '打印机 Code', field: 'machineCode'},
      { title: '备注', field: 'note' },
    ],
    operation: [
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      // { field: 'terminalId', type: 'input', intlPrefix: 'printer.',
      //   rules: [
      //     { required: true }
      //   ]
      // },
      { field: 'partner', type: 'input', intlPrefix: 'printer.',
        rules: [
          { required: true }
        ]
      },
      // { field: 'appId', type: 'input', intlPrefix: 'printer.',
      //   rules: [
      //     { required: true }
      //   ]
      // },
      { field: 'machineCode', type: 'input', intlPrefix: 'printer.',
        rules: [
          { required: true }
        ]
      },
      { field: 'machineKey', type: 'input', intlPrefix: 'printer.',
        rules: [
          { required: true }
        ]
      },
      { field: 'apiKey', type: 'input', intlPrefix: 'printer.',
        rules: [
          { required: true }
        ]
      },
      { field: 'note', type: 'input', intlPrefix: 'printer.' },
    ],
    colNumber: 2
  },
  details: {
    table: {},
    form: {},
  }
}