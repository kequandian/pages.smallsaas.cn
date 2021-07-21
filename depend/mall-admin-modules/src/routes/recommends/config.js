module.exports = {
  header: {
    title: '默认配置文件'
  },
  operation: {
    action: [
      // { title: '设置', action: 'router', options: { icon: 'setting', path: '/recommends', queryData: { type: 'setting' } } },
      { title: '添加', action: 'add' },
    ],
  },
  search: {
    fields: [
      // {
      //   field: 'search',
      //   label: '搜索会员',
      //   props: {
      //     placeholder: '会员姓名/手机号',
      //   },
      //   type: 'input',
      // },
    ],
    simpleSearchCount: 3,
    columnNum: 3,
  },
  table: {
    columns: [
      { title: '皮肤特征', field: 'skinField100', align: 'right' },
      { title: '敏感', field: 'skinField101', align: 'right' },
      { title: '斑点', field: 'skinField102', align: 'right' },
      { title: '痘痘', field: 'skinField103', align: 'right' },
      { title: '皱纹', field: 'skinField104', align: 'right' },
      // { title: '区间6', field: 'skinField105', align: 'right' },
      // { title: '区间7', field: 'skinField106', align: 'right' },
      // { title: '区间8', field: 'skinField107', align: 'right' },
      // { title: '区间9', field: 'skinField108', align: 'right' },
      // { title: '区间10', field: 'skinField109', align: 'right' },
    ],
    operation: [
      { title: '编辑', action: 'edit' },
      // { title: '详情', action: 'query' },
      { title: '删除', action: 'delete' },
    ],
    scroll: {
      // x: 1200,
    },
  },
  form: {
    fields: [
      { field: 'skinField100', type: 'number', intlPrefix: 'recommends.', value: '0' },
      { field: 'skinField101', type: 'number', intlPrefix: 'recommends.', value: '0' },
      { field: 'skinField102', type: 'number', intlPrefix: 'recommends.', value: '0' },
      { field: 'skinField103', type: 'number', intlPrefix: 'recommends.', value: '0' },
      { field: 'skinField104', type: 'number', intlPrefix: 'recommends.', value: '0' },
      // { field: 'skinField105', type: 'number', intlPrefix: 'recommends.', value: '0' },
      // { field: 'skinField106', type: 'number', intlPrefix: 'recommends.' },
      // { field: 'skinField107', type: 'number', intlPrefix: 'recommends.' },
      // { field: 'skinField108', type: 'number', intlPrefix: 'recommends.' },
      // { field: 'skinField109', type: 'number', intlPrefix: 'recommends.' },
      {
        field: 'recommendResult', type: 'textarea', intlPrefix: 'recommends.',
        span: 2,
        options: [
          { key: 'rows', value: 4 }
        ],
      },
    ],
    colNumber: 2
  },
  details: {
    table: {},
    form: {},
  }
}