module.exports =  {
  header: {
    title: '存销比统计'
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
      { title: '排名', field: 'rank' },
      { title: '商品编码', field: 'barCode' },
      { title: '商品名称', field: 'name', width: 200 },
      { title: '商品类型', field: 'category' },
      { title: '单位', field: 'unit' },
      { title: '成交商品数', field: 'tradingVolume', valueType: 'number', align: 'right' },
      { title: '库存商品数', field: 'inventory', valueType: 'number', align: 'right' },
      { title: '存销比', field: 'inventoryPercent', valueType: 'number', align: 'right' },
    ],
    operation: []
  },
}