module.exports =  {
  header: {
    title: '资讯管理'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields:[
      {
        field: 'title',
        placeholder: '资讯标题',
        type: 'input',
      },
      {
        field: 'status', placeholder: '选择状态',
        type:'select',
        options: [
          { key: '草稿', value: 'Draft' },
          { key: '已发布', value: 'PublishArticle' },
          { key: '已下架',value: 'Deprecated'}
        ]
      },
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: '标题', field: 'title' },
      // { title: '作者', field: 'author' },
      { title: '创建时间', field: 'createdTime' },
      { title: '发布时间',field: 'updateTime' },
      { title: '排序号', field: 'sticky', sorter: (a, b) => new Date(a.transactionTime) - new Date(b.transactionTime) },
      { title: '状态', field: 'status',valueType: 'status' }
    ],
    operation: [
      { title: '发布', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'primary',
          expectedField: 'status',
          expectedValue: 'Draft',
          title: '确定要发布这篇资讯吗？',
          API: '/api/cms/articles/(id)/action/publish',
          requestMethod:'POST'
        }
      },
      { title: '重新发布', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'primary',
          expectedField: 'status',
          expectedValue: 'Deprecated',
          title: '确定要重新发布这篇资讯吗？',
          API: '/api/cms/articles/(id)/action/publish',
        }
      },
      { title: '下架', action: 'confirm',
        options: {
          type: 'defaults',
          color: 'danger',
          expectedField: 'status',
          expectedValue: 'PublishArticle',
          title: '确定要下架这篇资讯吗？',
          API: '/api/cms/articles/(id)/action/deprecate',
        }
      },
      { title: '详情', action:'query'},
      { title: '编辑', action: 'edit',
        options: {
          expectedField: 'status',
          expectedValue: 'Draft',
        }
      },
      { title: '编辑', action: 'edit',
        options: {
          expectedField: 'status',
          expectedValue: 'Deprecated',
        }
      },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      { field: 'title', type: 'input', intlPrefix: 'articles.', span: 2,
        rules: [
          { required: true }
        ]
      },
      { field: 'subTitle', type: 'input', intlPrefix: 'articles.',
        rules: [
          { required: true }
        ]
     },
      // { field: 'author', type: 'input', intlPrefix: 'articles.' },
      { field: 'sticky', type: 'number', intlPrefix: 'articles.',value: 1 },
      { field: 'cover',type: 'avatar-upload',intlPrefix: 'articles.',span: 2,
        props:{
          maxNumber:1,
        },
        rules: [
          { required: true }
        ]
      },
      { field: 'content', type: 'rich-text', intlPrefix: 'articles.', span: 2  },
      { field: 'productRelations', type: 'card-select', intlPrefix: 'articles.', span: 2 },
    ],
    colNumber: 2
  },
}
