export default {
  header: {
    title: '消费/充值获取积分'
  },
  operation: {
  },
  form: {
    fields: [
      // { field: 'isRecharge', type: 'switch', intlPrefix: 'point.', span: 2 },
      { field: 'items', type: 'children', intlPrefix: 'point.',
        API: '/api/vip/account/grades',
        mapItemFieldTo: 'items',
        fieldMap: [],
        columns: [
          { title: '等级级别', field: 'grade' },
          { title: '等级名称', field: 'name' },
          { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
          { title: '成长值门槛', field: 'thresholdOverPoint' },
        ]
      },
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
        { title: '每消费/每充值', field: 'consumePointPlan', valueType: 'editCurrency',
          options: {
            minValue: 0,
          }
        },
        { title: '获取成长值', field: 'consumeWinPoint', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'consumePointPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  message: '成长值获取按照比例进行，如每消费10元获取10积分，当消费1元获得1积分。消费实际储值才可以获得成长值、赠送的储值不参与成长值计算。',
  switchField: 'consumePointPlanEnabled',
}