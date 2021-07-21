module.exports =  {
  header: {
    title: '收银终端配置文件'
  },
  operation: {
    action: [
      // { title: '添加', action: 'add', options: {
      //   routerType: 'cashiersAdd',
      //   queryData: {
      //     id: '{QueryId}'
      //   }
      // } },
    ],
    fields:[
      {
        field: 'code',
        placeholder: '终端 UUID',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '终端 ID', field: 'id'},
      { title: '终端 UUID', field: 'code'},
      { title: '终端类型', field: 'model'},
      { title: '绑定时间', field: 'createTime' },
    ],
    operation: [
      { title: '编辑', action: 'edit',
        options: {
          routerType: 'cashiersEdit',
          queryData: {
            storeId: '{QueryId}',
          }
        }
      },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      { field: 'code', type: 'input', intlPrefix: 'cashiers.',
        rules: [
          { required: true }
        ]
      },
      { field: 'model', type: 'input', intlPrefix: 'cashiers.',
        rules: [
          { required: true }
        ]
      },
      { field: 'printerList', type: 'children', intlPrefix: 'cashiers.',
        API: '/api/printer',
        mapItemFieldTo: 'printerList',
        fieldMap: [],
        columns: [
          { title: '打印机 Code', field: 'machineCode' },
          { title: '机器 Key', field: 'machineKey' },
          { title: 'partner', field: 'partner' },
          { title: '终端 ID', field: 'terminalId' },
        ],
        operation: {
          fields: [
            {
              field: 'machineCode',
              placeholder: '打印机 Code',
              type: 'input',
            },
          ],
        }
      },
    ],
    colNumber: 2,
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
        { title: '删除', action: 'deleteItem', options:{ name: 'machineCode' } },
      ],
      columns: [
        { title: '打印机 Code', field: 'machineCode' },
        { title: '机器 Key', field: 'machineKey' },
        { title: 'partner', field: 'partner' },
        { title: '终端 ID', field: 'terminalId' },
      ],
    }
  },
}