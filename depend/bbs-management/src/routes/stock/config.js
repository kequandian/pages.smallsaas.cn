module.exports =  {
  header: {
    title: '日志评论管理'
  },
  operation: {
    fields:[
      {
        field: 'author',
        placeholder: '作者',
        type: 'input',
      },
      {
        field: 'content',
        placeholder: '日志内容',
        type: 'input',
      },
      { field: 'status', type: 'select',
        placeholder: '日志状态',
        options: [
          { key: '全部', value: ' ' },{ key: '待审核', value: 'Wait_Audit' }, { key: '通过', value: 'PublishArticle' }, { key: '未通过', value: 'Audit_Rejected' }
        ],
      },
    ]
  },
  search: {
  },
  table: {
    scroll: {
      x: 1200,
    },
    columns: [
      // { title: '标题', field: 'title' },
      { title: '作者', field: 'author', width: 120, fixed: 'left' },
      { title: '内容摘要', field: 'content', render: (text = '') => {
        return text.slice(0,120);
      } },
      { title: '状态', field: 'status', valueType: 'status' },
      { title: '创建时间', field: 'createdTime' },
      { title: '评论数', field: 'evaluationCount' },
      { title: '点赞数', field: 'likeCount' },
      { title: '置顶', field: 'sticky', render: (text) => { 
        return text === 1 ? '是' : '否';
       } },
      { title: '屏蔽', field: 'display', render: (text) => { 
        return text === 0 ? '是' : '否';
       } },
    ],
    operation: [
      { title: '审核通过', action: 'confirm',
        options: {
          expectedField: 'status',
          expectedValue: 'Wait_Audit',
          title: '您确定要把这篇日志标记 通过审核 吗？',
          API: '/api/cms/articles/(id)/action/publish',
        }
      },
      { title: '审核拒绝', action: 'confirm',
        options: {
          expectedField: 'status',
          expectedValue: 'Wait_Audit',
          title: '您确定要把这篇日志标记 审核拒绝 吗？',
          API: '/api/cms/articles/(id)/action/rejected',
        }
      },
      { title: '审核通过', action: 'confirm',
        options: {
          expectedField: 'status',
          expectedValue: 'Audit_Rejected',
          title: '您确定要把这篇日志标记 通过审核 吗？',
          API: '/api/cms/articles/(id)/action/publish',
        }
      },
      { title: '屏蔽', action: 'confirm',
        options: {
          expectedField: 'display',
          expectedValue: 1,
          title: '您确定要 屏蔽 这篇日志吗？',
          API: '/api/cms/article/(id)/action/forbidden',
        }
      },
      { title: '取消屏蔽', action: 'confirm',
        options: {
          expectedField: 'display',
          expectedValue: 0,
          title: '您确定要 取消屏蔽 这篇日志吗？',
          API: '/api/cms/article/(id)/action/forbidden',
        }
      },
      { title: '置顶', action: 'confirm',
        options: {
          expectedField: 'sticky',
          expectedValue: 0,
          title: '您确定要 置顶 这篇日志吗？',
          API: '/api/cms/article/(id)/action/stick',
        }
      },
      { title: '取消置顶', action: 'confirm',
        options: {
          expectedField: 'sticky',
          expectedValue: 1,
          title: '您确定要 取消置顶 这篇日志吗？',
          API: '/api/cms/article/(id)/action/stick',
        }
      },
      { title: '详情', action: 'query' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      { field: 'title', type: 'input', intlPrefix: 'articles.', span: 2 },
      { field: 'subTitle', type: 'input', intlPrefix: 'articles.' },
      { field: 'sticky', type: 'number', intlPrefix: 'articles.' },
      { field: 'contents', type: 'rich-text', intlPrefix: 'articles.', span: 2 },
    ],
    colNumber: 2
  },
}
