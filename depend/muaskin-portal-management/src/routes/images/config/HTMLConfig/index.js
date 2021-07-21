
export default {
  layout: 'Grid',
  title: false, // HTML管理 
  items: [
    {
      span: 24,
      layout: 'DefaultList',
      component: 'BaseList',
      config: {
        API: {
          listAPI: '/api/gw/portal/html',
        },
        fields: [
          { field: 'name', label: '名称' },
        ],
        operation: [
          {
            title: '编辑', action: 'path',
            options: {
              outside: true,
              path: '/website-template/form',
              // /api/gw/portal/html/(id)
            },
          },
          // { title: '删除', action: 'delete' },
        ],
      },
    },
  ],
}