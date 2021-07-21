const typeMap = {
  compositeScores: '综合得分',
  skinAge: '肌肤年龄',
};
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
      {
        field: 'title',
        label: '类型',
        type: 'select',
        options: [
          { key: '综合得分', value: 'compositeScores' },
          { key: '肌肤年龄', value: 'skinAge' },
        ],
      },
    ],
    simpleSearchCount: 3,
    columnNum: 3,
  },
  table: {
    columns: [
      {
        title: '类型', field: 'title', width: 80, render: (text) => {
          return typeMap[text] || text;
        }
      },
      { title: '最小分数', field: 'minScore', align: 'right', width: 128 },
      { title: '最大分数', field: 'maxScore', align: 'right', width: 128 },
      { title: '', field: 'test' },
      {
        title: '备注', field: 'note', render: (text) => {
          return text.length > 60 ? text.slice(0, 60) + '...' : text;
        }
      },
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
      {
        field: 'title', type: 'select', intlPrefix: 'score.', span: 2,
        options: [
          { key: '综合得分', value: 'compositeScores' },
          { key: '肌肤年龄', value: 'skinAge' },
        ],
        attrs: {
          width: '120px',
        },
      },
      { field: 'minScore', type: 'number', intlPrefix: 'score.' },
      { field: 'maxScore', type: 'number', intlPrefix: 'score.' },
      {
        field: 'note', type: 'textarea', intlPrefix: 'score.', span: 2,
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