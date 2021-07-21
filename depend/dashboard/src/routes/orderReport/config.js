module.exports = {
  header: {
    title: '订单统计'
  },
  operation: {

  },
  search: {
    fields: [
      {
        field: 'createdTime',
        label: '订单日期',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
        format: 'YYYY-MM-DD',
        props: {
          style: {
            width: '240px'
          }
        }
      },
      {
        field: 'productCategory',
        label: '商品系列',
        type: 'input',
      },
      {
        field: 'inviter',
        label: '意见领袖',
        props: {
          placeholder: '意见领袖编号/姓名',
        },
        type: 'input',
      },
      {
        field: 'search',
        label: '搜索',
        props: {
          placeholder: '商品名称/客户名称/客户编号',
        },
        type: 'input',
      },
    ],
    columnNum: 4,
    simpleSearchCount: 4,
  },
  table: {
    columns: [
      { title: '序号', field: 'orderNumber' },
      { title: '订单日期', field: 'createdDate' },
      { title: '客户名称', field: 'contactUser' },
      { title: '商品名称', field: 'productName' },
      { title: '规格', field: 'unit' },
      { title: '商品系列', field: 'productCategory', align: 'right' },
      { title: '数量', field: 'quantity', align: 'right' },
      { title: '单价', field: 'price', valueType: 'currency', align: 'right' },
      { title: '总金额', field: 'originPrice', valueType: 'currency', align: 'right' },
      { title: '实收金额', field: 'totalPrice', valueType: 'currency', align: 'right' },
      { title: '提成比例', field: 'commissionProportion' },
      { title: '实收账面额', field: 'totalPriceExclTax' },
      { title: '意见领袖提成', field: 'inviterCommission' },
      { title: '意见领袖', field: 'inviterNo' },
      { title: '意见领袖姓名', field: 'inviterName' },
      { title: '意见领袖收款银行账号(附开户行)', field: 'inviterBankAccount' },
      { title: '返利时间(周反)', field: 'rebateDate' },
      { title: '收款地址', field: 'address' },
      { title: '备注', field: 'note' },

    ],
    operation: []
  },
}