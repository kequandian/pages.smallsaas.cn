# Standard Table

```
<StandardTable
      size='default'
      scroll={scroll}
      loading={loading}
      data={data}
      pagination={pagination}
      columns={columns}
      onRefresh={() => { console.log("refreshing") }}
      onChange={(pagination, filters, sorter) => { console.log(pagination, filters, sorter) }}
    />
```

```
const columns = [
  {
    title: '规则编号',
    dataIndex: 'no',
    filters: [
      { text: '12345', value: '12345' }, { text: '12346', value: '12346' }
    ],
    onFilter: (value, record) => record.no.indexOf(value) === 0,
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: (a, b) => a.callNo - b.callNo,  //排序
    onFilter: (value, record) => record.callNo.indexOf(value) === 0,
    align: 'right', // 对齐方式
    render: val => `${val} 万`,
    needTotal: true, // 统计总数到表格上方的 alter 里面
    bottomTotal: true, // 统计总数到表格底部
  }
];
```

[antd列属性说明](https://ant.design/components/table-cn/#components-table-demo-reset-filter)  
