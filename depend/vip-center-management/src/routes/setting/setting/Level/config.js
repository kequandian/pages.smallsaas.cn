export default {
  header: {
    title: '会员等级配置'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          path: '/vip-setting',
        }
      },
    ],
  },
  table: {
    columns: [
      { title: '等级级别', field: 'grade', align: 'center', width: 120 },
      { title: '等级名称', field: 'name', align: 'center', width: 120 },
      { title: '等级logo', field: 'logo', valueType: 'image', width: 120 },
      { title: '成长值门槛', field: 'thresholdOverPoint', align: 'right', width: 120 },
    ],
    operation: [
      {
        title: '编辑', action: 'edit', options: {
          path: '/vip-setting',
          // routerType: 'levelEdit',
        }
      },
      { title: '删除', action: 'delete' },
    ],
    scroll: {
      x: 1100,
    },
  },
  form: {
    fields: [
      {
        field: 'name', type: 'input', intlPrefix: 'level.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'grade', type: 'select', intlPrefix: 'level.',
        options: [
          { key: '等级 1', value: '1' },
          { key: '等级 2', value: '2' },
          { key: '等级 3', value: '3' },
          { key: '等级 4', value: '4' },
          { key: '等级 5', value: '5' },
          { key: '等级 6', value: '6' },
        ],
        rules: [
          { required: true }
        ]
      },
      {
        field: 'thresholdOverPoint', type: 'number', intlPrefix: 'level.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'logo', valueType: 'image', width: '80px', type: 'avatar-upload', intlPrefix: 'level.',
        props: {
          maxNumber: 1,
        }
      },
    ],
    colNumber: 2
  },
}