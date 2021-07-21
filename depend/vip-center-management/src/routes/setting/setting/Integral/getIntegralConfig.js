const generalForm = {
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
};

export const registered =  {
  header: {
    title: '注册会员获取积分'
  },
  operation: {
  },
  form: generalForm,
  children: {
    table: {
      columns: [
        { title: '等级级别', field: 'grade' },
        { title: '等级名称', field: 'name' },
        { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
        { title: '获取积分', field: 'registerWinCredit', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'registerCreditPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  switchField: 'registerCreditPlanEnabled',
}

export const consume =  {
  header: {
    title: '消费获取积分'
  },
  operation: {
  },
  form: generalForm,
  children: {
    table: {
      columns: [
        { title: '等级级别', field: 'grade' },
        { title: '等级名称', field: 'name' },
        { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
        { title: '每消费', field: 'consumeCreditPlan', valueType: 'editCurrency',
          options: {
            minValue: 0,
          }
        },
        { title: '获取积分', field: 'consumeWinCredit', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'consumeCreditPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  message: '成长值获取按照比例进行，如每消费10元获取10积分，当消费1元获得1积分。消费实际储值才可以获得积分、赠送的储值不参与积分计算。',
  switchField: 'consumeCreditPlanEnabled',
}

export const recharge =  {
  header: {
    title: '充值获取积分'
  },
  operation: {
  },
  form: generalForm,
  children: {
    table: {
      columns: [
        { title: '等级级别', field: 'grade' },
        { title: '等级名称', field: 'name' },
        { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
        { title: '每充值', field: 'depositCreditPlan', valueType: 'editCurrency',
          options: {
            minValue: 0,
          }
        },
        { title: '获取积分', field: 'depositWinCredit', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'depositCreditPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  switchField: 'depositCreditPlanEnabled',
}

export const post =  {
  header: {
    title: '论坛发帖获取积分'
  },
  operation: {
  },
  form: generalForm,
  children: {
    table: {
      columns: [
        { title: '等级级别', field: 'grade' },
        { title: '等级名称', field: 'name' },
        { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
        { title: '获取积分', field: 'publishWinCredit', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'publishCreditPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  message: '论坛发贴送积分，每日每人限一次。',
  switchField: 'publishCreditPlanEnabled',
}

export const share =  {
  header: {
    title: '分享获取积分'
  },
  operation: {
  },
  form: generalForm,
  children: {
    table: {
      columns: [
        { title: '等级级别', field: 'grade' },
        { title: '等级名称', field: 'name' },
        { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
        { title: '获取积分', field: 'shareWinCredit', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'shareCreditPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  message: '商品、活动、论坛帖子分享到微信朋友圈可得积分，每日每人限一次。',
  switchField: 'shareCreditPlanEnabled',
}

export const praise =  {
  header: {
    title: '购物发好评获取积分'
  },
  operation: {
  },
  form: generalForm,
  children: {
    table: {
      columns: [
        { title: '等级级别', field: 'grade' },
        { title: '等级名称', field: 'name' },
        { title: '等级logo', field: 'logo', valueType: 'image', width: '80px'   },
        { title: '获取积分', field: 'commentWinCredit', valueType: 'editQuantity',
          options: {
            minValue: 0,
          }
        },
        { title: '启用', field: 'commentCreditPlanEnabled', valueType: 'swtichButton',
          options: {
            format: 'number',
          }
        },
      ]
    }
  },
  message: '购买商品给好评（5星）可获得积分，不限制次数。',
  switchField: 'commentCreditPlanEnabled',
}