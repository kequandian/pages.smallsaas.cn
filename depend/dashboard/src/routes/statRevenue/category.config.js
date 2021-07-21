module.exports =  {
  header: {
    title: '营收统计-产品类别'
  },
  operation: {
    fields:[
      {
        field: 'search',
        placeholder: '请输入产品名称/商品编码',
        type: 'input',
      },
    ]
  },
  table: {
    columns: [
      { title: '产品类型', field: 'categoryName' },
      // { title: '单位', field: 'unit' },
      { title: '成交单数', field: 'count', valueType: 'number', align: 'right' },
      { title: '销售金额', field: 'salesPrice', valueType: 'currency', align: 'right' },
      { title: '优惠金额', field: 'discountPrice', valueType: 'currency', align: 'right' },
      { title: '成交金额', field: 'price', valueType: 'currency', align: 'right' },
    ],
    operation: []
  },
}