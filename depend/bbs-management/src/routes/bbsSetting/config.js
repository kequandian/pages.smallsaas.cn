module.exports =  {
  header: {
    title: '论坛设置配置文件'
  },
  operation: {
    action: [
      { title: '添加', action: 'add' },
    ],
    fields:[
      {
        field: 'search',
        placeholder: '请输入内容……',
        type: 'input',
      }
    ]
  },
  search: {
  },
  table: {
    columns: [
      { title: 'ID', field: 'id' },
      { title: '名称', field: 'name'},
    ],
    operation: [
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      {
        field: 'DIARY_SHOW_WAY',
        type: 'radio',
        intlPrefix: 'bbsSetting.',
        value: 'PublishTime',
        options: [
          {
            key: '按发布时间',
            value: 'PublishTime',
          },
          {
            key: '按评论数',
            value: 'EvaluationCount',
          },
          {
            key: '按点赞数',
            value: 'FlowerCount',
          },
        ],
        rules: [
          { required: true }
        ]
      },
      {
        field: 'DIARY_AUDIT_TYPE',
        type: 'radio',
        intlPrefix: 'bbsSetting.',
        value: 'AUTO_AUDIT',
        options: [
          {
            key: '直接发布',
            value: 'AUTO_AUDIT',
          },
          {
            key: '需要审核',
            value: 'ARTIFICIAL_AUDIT',
          },
        ],
        rules: [
          { required: true }
        ]
      },
    ],
    // colNumber: 2
  },
  details: {
    table: {},
    form: {},
  }
}