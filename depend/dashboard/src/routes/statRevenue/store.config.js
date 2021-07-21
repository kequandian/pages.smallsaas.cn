module.exports =  {
  header: {
    title: '营收统计-店铺'
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
      { title: '店铺编号', field: 'storeCode' },
      { title: '店铺名称', field: 'storeName', width: 200 },
      { title: '店长', field: 'storeDirector' },
      { title: '成交单数', field: 'count', valueType: 'number', align: 'right' },
      { title: '销售金额', field: 'salesPrice', valueType: 'currency', align: 'right' },
      { title: '优惠金额', field: 'discountPrice', valueType: 'currency', align: 'right' },
      { title: '成交金额', field: 'price', valueType: 'currency', align: 'right' },
    ],
    operation: []
  },
}