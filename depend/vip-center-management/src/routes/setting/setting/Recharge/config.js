export default {
  header: {
    title: '储值满赠'
  },
  operation: {
    action: [
      { title: '添加', action: 'add',
        options:{
          path: '/vip-setting',
          routerType: 'depositForm',
        }
      },
    ],
  },
  table: {
    columns: [
      { title: '套餐名称', field: 'name', align: 'center' },
      { title: '是否启用', field: 'depositBonusPlanEnabled', align: 'center', render: (text) => text === 0 ? '否' : '是' },
      { title: '每储值', field: 'depositBonusPlan', valueType: 'currency', align: 'right' },
      { title: '赠送', field: 'depositWinBonus', valueType: 'currency', align: 'right' },
      { title: '套餐描述', field: 'note' },
    ],
    operation: [
      { title: '编辑', action: 'edit',
        options:{
          path: '/vip-setting',
          routerType: 'depositForm',
        }
      },
      { title: '删除', action: 'delete' },
    ],
  },
  form: {
    fields: [
      // { field: 'isRecharge', type: 'switch', intlPrefix: 'point.', span: 2 },
      { field: 'name', type: 'input', intlPrefix: 'point.' },
      { field: 'depositBonusPlanEnabled', type: 'radio', intlPrefix: 'point.',
        value: 1,
        options: [
          {
            key: '是',
            value: 1,
          },
          {
            key: '否',
            value: 0,
          }
        ]
      },
      { field: 'depositBonusPlan', type: 'input', intlPrefix: 'point.' },
      { field: 'depositWinBonus', type: 'input', intlPrefix: 'point.' },
      { field: 'note', type: 'input', intlPrefix: 'point.' },
    ],
    colNumber: 2
  },
  children: {
    table: {
      // operation: [
      //   { title: '禁用', action: 'deleteItem' },
      // ],
      columns: [
        { title: '等级级别', field: 'grade' },
        { title: '等级名称', field: 'name' },
        { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
        { title: '每储值', field: 'depositBonusPlan', valueType: 'editCurrency',
          options: {
            minValue: 0,
          }
        },
        { title: '赠送', field: 'depositWinBonus', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'depositBonusPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  message: '扣款时先使用用户实际储值部分,后使用商家赠送部分。',
  switchField: 'depositBonusPlanEnabled',
}