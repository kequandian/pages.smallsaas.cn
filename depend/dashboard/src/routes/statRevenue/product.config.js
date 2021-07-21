module.exports = {
  header: {
    title: '营收统计-产品'
  },
  operation: {
    fields: [
      {
        field: 'search',
        placeholder: '请输入产品名称/商品编码',
        type: 'input',
      },
      // {
      //   field: 'createTime',
      //   placeholder: ['开始时间', '结束时间'],
      //   type: 'range',
      //   format: 'YYYY-MM-DD',
      //   props: {
      //     style: {
      //       width: '240px'
      //     }
      //   }
      // },
      // {
      //   field: 'inviter',
      //   placeholder: '邀请人',
      //   type: 'input',
      // },
    ]
  },
  table: {
    columns: [
      { title: '产品条码', field: 'barCode' },
      { title: '产品名称', field: 'productName', width: 200 },
      { title: '产品类型', field: 'categoryName' },
      { title: '单位', field: 'unit' },
      // { title: '邀请人', field: 'inviter' },
      // { title: '消费会员', field: 'account' },
      // {
      //   title: '收货地址', field: 'address',
      //   valueType: 'omit'
      // },
      { title: '成交单数', field: 'count', valueType: 'number', align: 'right' },
      { title: '销售金额', field: 'salesPrice', valueType: 'currency', align: 'right' },
      { title: '优惠金额', field: 'discountPrice', valueType: 'currency', align: 'right' },
      { title: '成交金额', field: 'price', valueType: 'currency', align: 'right' },
    ],
    operation: []
  },
}