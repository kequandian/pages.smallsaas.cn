module.exports =  {
  header: {
    title: '商品销量'
  },
  table: {
    columns: [
      { title: '排名', field: 'rank' },
      { title: '商品编码', field: 'barCode' },
      { title: '商品名称', field: 'name', width: 200 },
      { title: '商品类型', field: 'category' },
      { title: '单位', field: 'unit' },
      { title: '成交商品数', field: 'quantity', valueType: 'number', align: 'right' },
      { title: '成交金额', field: 'price', valueType: 'currency', align: 'right' },
    ],
    operation: []
  },
}