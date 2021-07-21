module.exports =  {
  header: {
    title: '毛利统计'
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
      { title: '商品编码', field: 'barCode' },
      { title: '商品名称', field: 'productName', width: 200 },
      { title: '商品类型', field: 'category' },
      { title: '单位', field: 'unit' },
      // { title: '销售单数', field: 'quantity' },
      { title: '产品成本', field: 'costPrice', valueType: 'currency', align: 'right' },
      { title: '销售金额', field: 'sales', valueType: 'currency', align: 'right' },
      // { title: '实际折后金额', field: 'a', valueType: 'currency', align: 'right' },
      { title: '产品毛利', field: 'profit', valueType: 'currency', align: 'right' },
      { title: '产品毛利率', field: 'profitPercent', valueType: 'number', align: 'right' },
    ],
    operation: []
  },
}