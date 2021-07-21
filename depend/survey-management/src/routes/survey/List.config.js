export default {
  layout: 'Grid',
  title: '测试问卷管理',
  items: [
    {
      span: 24,
      layout: 'DefaultSearch',
      component: 'BaseSearch',
      config: {
        fields: [
          { field: 'title', label: '测试问卷名称', type: 'input' }
        ],
        actions: [
          {
            title: '新增问卷', type: 'modal',
            options: {
              span: 24,
              layout: 'DefaultForm',
              component: 'BaseForm',
              modalTitle: '新增问卷',
              permission: 'survey.manage.add',
              localtion: true,
              items: [
                {
                  span: 24,
                  layout: 'DefaultForm',
                  component: 'BaseForm',
                  config: {
                    ACTIONTYPE: 'create',
                    API: {
                      getAPI: '/api/survey/surveys/[id]',
                      createAPI: '/api/survey/surveys',
                    },
                    fields: [
                      { field: 'title', label: '测试问卷名称', type: 'input' },
                    ],
                    REDIRECT: '/survey/form?id={id}&type=edit',
                  },
                }
              ],
            },
          }
        ],
      },
    },
    {
      span: 24,
      layout: 'DefaultList',
      component: 'BaseList',
      rowSelection: null, // 禁用 多选
      config: {
        API: {
          listAPI: '/api/survey/surveys',
          deleteAPI: '/api/survey/surveys/(id)',
          // deleteBatchAPI: '/api/survey/surveys/bulk/delete',
        },
        fields: [
          { field: 'title', label: '测试文件名称' },
          {
            field: 'type', label: '问卷类型', valueType: 'status',
            options: {
              statusMap: {
                'CTest': 'C 端',
                'PadTest': 'Pad 端',
              }
            }
          },
          // {
          //   field: 'enabled', label: '状态', valueType: 'status',
          //   options: {
          //     statusMap: {
          //       '0': '关闭',
          //       '1': '开启',
          //     }
          //   }
          // },
          { field: 'finishedCount', label: '已测试人数' },
        ],
        operation: [
          // {
          //   title: '排序', action: 'sort',
          //   options: {}
          // },
          {
            title: '切换启用', action: 'switch',
            options: {
              API: '/api/survey/surveys/(id)/enabled',
              permission: 'survey.manage.edit',
              localtion: true,
            }
          },
          {
            title: '编辑', action: 'path',
            options: {
              outside: true,
              path: '/survey/form',
              icon: 'form',
              permission: 'survey.manage.edit',
              localtion: true,
            }
          },
          {
            title: '删除', action: 'delete',
            options: {
              permission: 'survey.manage.delete',
              localtion: true,
            }
          },
        ],
      },
    },
  ],
}