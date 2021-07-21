
export default {
  layout: 'Grid',
  title: false, // HTML管理 Form 
  items: [
    {
      span: 24,
      layout: 'DefaultForm',
      component: 'BaseForm',
      config: {
        API: {
          getAPI: '/api/gw/portal/html/[id]',
          updateAPI: '/api/gw/portal/html/[id]',
        },
        fields: [
          { field: 'name', label: '名称', type: 'plain' },
          {
            field: 'content', label: '内容', type: 'textArea', options: {
              autosize: {
                minRows: 32,
              }
            }
          },
        ],
      },
    },
  ],
}