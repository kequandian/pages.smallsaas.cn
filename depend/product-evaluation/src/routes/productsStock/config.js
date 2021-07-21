module.exports =  {
  header: {
    title: '产品评价管理'
  },
  search: {},
  operation: {
    action: [],
    fields: [
      {
        field: 'search',
        placeholder: '商品名称',
        type: 'input',
      },
      // {
      //   field: 'categoryName',
      //   placeholder: '商品类别',
      //   type: 'field-config-select',
      //   API: '/api/product/categories',
      //   options: { name: 'categoryName', value: 'categoryName' }
      // },
    ]
  },
  table: {
    columns: [
      { title: '订单编号', field: 'order_number' },
      { title: '下单时间', field: 'pay_date' },
      { title: '评价商品', field: 'product_name' },
      { title: '评价等级', field: 'comment_star' },
      { title: '评价内容', field: 'comment_content' },
      { title: '评价时间', field: 'comment_time' },
      { title: '回复时间', field: 'reply_time' },
      { title: '置顶', field: 'isStick', render: (text) => { 
        return text === 1 ? '是' : '否';
       } },
      { title: '屏蔽', field: 'isDisplay', render: (text) => { 
        return text === 0 ? '是' : '否';
       } },
    ],
    operation: [
      { title: '回复', action: 'modal' },
      { title: '屏蔽', action: 'confirm',
        options: {
          expectedField: 'isDisplay',
          expectedValue: 1,
          title: '您确定要 屏蔽 这条评价吗？',
          API: '/api/cms/evaluations/(evaluationId)/action/forbidden',
        }
      },
      { title: '取消屏蔽', action: 'confirm',
        options: {
          expectedField: 'isDisplay',
          expectedValue: 0,
          title: '您确定要 取消屏蔽 这条评价吗？',
          API: '/api/cms/evaluations/(evaluationId)/action/forbidden',
        }
      },
      { title: '置顶', action: 'confirm',
        options: {
          expectedField: 'isStick',
          expectedValue: 0,
          title: '您确定要 置顶 这条评价吗？',
          API: '/api/cms/evaluations/(evaluationId)/action/stick',
        }
      },
      { title: '取消置顶', action: 'confirm',
        options: {
          expectedField: 'isStick',
          expectedValue: 1,
          title: '您确定要 取消置顶 这条评价吗？',
          API: '/api/cms/evaluations/(evaluationId)/action/stick',
        }
      },
      { title: '详情', action: 'query',
        options: {
          queryData: {
            stockId: '{stockId}',
            orderNumber: '{order_number}',
          },
        }
      },
    ]
  },
  form: {
    title: '直接回复用户评价',
    formProps: {
      beforeSubmit: (values) => {
        return {
          stockId: values.evaluationId,
          stockType: 'Evaluation',
          originId: values.stockId,
          originType: values.stockType,
          content: values.content,
          tradeNumber: values['order_number'],
        }
      }
    },
    fields: [
      // { field: 'title', type: 'input', intlPrefix: 'productsStock.', span: 2 },
      // { field: 'subTitle', type: 'input', intlPrefix: 'productsStock.' },
      // { field: 'sticky', type: 'number', intlPrefix: 'productsStock.' },
      { field: 'content', type: 'textarea', intlPrefix: 'productsStock.', span: 2 },
    ],
    colNumber: 2,
  },
  details: {
    form: {
      fields: [
        { field: 'code', type: 'plain', intlPrefix: 'productsStock.' },
        { field: 'status', type: 'plain', intlPrefix: 'productsStock.' },
      ]
    },
    colNumber: 2,
  }
}