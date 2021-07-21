module.exports = {
  header: {
    title: '通知管理'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields: [
      {
        field: 'title',
        placeholder: '通知标题',
        type: 'input',
      },
      {
        field: 'status', placeholder: '选择状态',
        type: 'select',
        options: [
          { key: '草稿', value: 'Draft' },
          { key: '已发布', value: 'Publish' },
          { key: '已下架', value: 'Deprecated' }
        ]
      },
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '标题', field: 'title' },
      { title: '作者', field: 'author' },
      { title: '创建时间', field: 'createTime' },
      { title: '发布时间', field: 'updateTime' },
      { title: '排序', field: 'orderNum' },
      // { title: '排序号', field: 'orderNum', sorter: (a, b) => new Date(a.transactionTime) - new Date(b.transactionTime) },
      { title: '状态', field: 'status', valueType: 'status' },
    ],
    operation: [
      {
        title: '发布', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'primary',
          expectedField: 'status',
          expectedValue: 'Draft',
          title: '确定要发布这篇通知吗？',
          API: '/api/cms/notice/notices/(id)/action/publish',
        }
      },
      {
        title: '重新发布', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'danger',
          expectedField: 'status',
          expectedValue: 'Deprecated',
          title: '确定要再次发布这篇通知吗？',
          API: '/api/cms/notice/notices/(id)/action/publish',
        }
      },
      {
        title: '下架', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'danger',
          expectedField: 'status',
          expectedValue: 'Publish',
          title: '确定要下架这篇通知吗？',
          API: '/api/cms/notice/notices/(id)/action/deprecate',
        }
      },
      {
        title: '编辑', action: 'edit',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
        }
      },
      {
        title: '编辑', action: 'edit',
        options: {
          expectedField: 'status',
          expectedValue: 'Deprecated',
        }
      },
      { title: '查看', action: 'query' },
      {
        title: '删除', action: 'delete',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
        }
      },
      {
        title: '删除', action: 'delete',
        options: {
          expectedField: 'status',
          expectedValue: 'Deprecated',
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'title', type: 'input', intlPrefix: 'notices.', span: 2,
        rules: [
          { required: true }
        ]
      },
      {
        field: 'author', type: 'input', intlPrefix: 'notices.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'type', type: 'radio', intlPrefix: 'notices.',
        value: 'System',
        options: [
          {
            key: 'C端用户及门店',
            value: 'System',
          },
          {
            key: '门店员工',
            value: 'Internal'
          },
          {
            key: 'C端用户',
            value: 'External'
          }
        ]
      },

      { field: 'orderNum', type: 'number', intlPrefix: 'notices.', value: 1 },
      {
        field: 'content', type: 'rich-text', intlPrefix: 'notices.', span: 2,
        rules: [
          { required: true }
        ]
      },
    ],
    colNumber: 2
  },
}
