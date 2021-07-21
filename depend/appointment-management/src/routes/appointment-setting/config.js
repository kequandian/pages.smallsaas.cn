module.exports = {
  header: {
    title: '预约类型'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields: [
      {
        field: 'type',
        placeholder: '预约类型',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '类型名称', field: 'type' },
      { title: '预约费用', field: 'fee', valueType: 'currency' },
      { title: '状态', field: 'status', render: (text) => { return text === 1 ? '启用' : '禁用' } },
    ],
    operation: [
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      {
        field: 'type', type: 'input', intlPrefix: 'appointmentSetting.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'fee', type: 'number', intlPrefix: 'appointmentSetting.',
        value: '0',
        props: { step: 0.01 },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'status',
        type: 'radio',
        intlPrefix: 'appointmentSetting.',
        value: 1,
        options: [
          {
            key: '启用',
            value: 1,
          },
          {
            key: '禁用',
            value: 0,
          }
        ]
      }
    ],
    colNumber: 2
  },
  details: {
    table: {},
    form: {},
  }
}