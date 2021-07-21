module.exports = {
  header: {
    title: '毛利统计-产品'
  },
  operation: {
    fields: [
      {
        field: 'search',
        placeholder: '请输入产品名称/商品编码',
        type: 'input',
      },
      {
        field: 'searchTime',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
        format: 'YYYY-MM-DD',
        props: {
          style: {
            width: '240px'
          }
        }
      },
    ]
  },
  table: {
    columns: [
      { title: '产品条码', field: 'barCode' },
      { title: '产品名称', field: 'productName', width: 200 },
      { title: '产品类型', field: 'category' },
      { title: '单位', field: 'unit' },
      // { title: '销售单数', field: 'count' },
      { title: '产品成本', field: 'costPrice', valueType: 'currency', align: 'right' },
      { title: '销售金额', field: 'sales', valueType: 'currency', align: 'right' },
      // { title: '实际折后金额', field: 'discountPrice', valueType: 'currency', align: 'right' },
      { title: '产品毛利', field: 'profit', valueType: 'currency', align: 'right' },
      { title: '产品毛利率', field: 'profitPercent', valueType: 'number', align: 'right' },
    ],
    operation: []
  },
}