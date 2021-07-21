export default {
  header: {
    title: '积分抵现规则'
  },
  operation: {
  },
  form: {
    fields: [
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
      columns: [
        { title: '等级级别', field: 'grade' },
        { title: '等级名称', field: 'name' },
        { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
        { title: '每使用积分', field: 'creditCashPlan', valueType: 'editCurrency',
          options: {
            minValue: 0,
          }
        },
        { title: '抵现(元)', field: 'creditWinCash', valueType: 'editCurrency',
          options: {
            minValue: 0,
          }
        },
        { title: '单次最多可抵现(为零则不限制)', field: 'creditCashMaxAmount', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'creditCashPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  message: '抵现获取按照比例进行，如每100积分元抵现10元，当使用10积分可抵现1元。',
  switchField: 'creditCashPlanEnabled',
}