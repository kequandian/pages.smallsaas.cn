import formConfig from './Form.config';

export default {
  layout: 'Grid',
  title: '成分党管理列表',
  items: [
    {
      span: 24,
      layout: 'DefaultSearch',
      component: 'BaseSearch',
      config: {
        fields: [
          { field: 'name', label: '名称', type: 'input' }
        ],
        actions: [
          {
            title: '新增', type: 'modal',
            options: {
              items: [
                {
                  layout: 'DefaultForm',
                  component: 'BaseForm',
                  permission: 'portal.menu.add',
                  localtion: true,
                  config: {
                    ACTIONTYPE: 'create',
                    API: {
                      createAPI: '/api/ow/menus/element',
                    },
                    ...formConfig,
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
      config: {
        API: {
          listAPI: '/api/pub/ow/elements',
          deleteAPI: '/api/ow/menus/(id)',
        },
        fields: [
          { field: 'name', label: '名称' },
          { field: 'seq', label: '排序' },
          { field: 'note', label: '备注' },
        ],
        operation: [
          {
            title: '编辑', action: 'modal',
            options: {
              outside: true,
              modalTitle: '编辑成分党',
              ACTIONTYPE: 'edit',
              items: [
                {
                  layout: 'DefaultForm',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI: '/api/pub/ow/menus/(id)',
                      updateAPI: '/api/ow/menus/(id)',
                    },
                    ...formConfig,
                  },
                }
              ],
            },
          },
          { title: '删除', action: 'delete' },
        ],
      },
    },
  ],
}