import formConfig from './Form.config';

export default {
  layout: 'Grid',
  title: '菜单列表',
  items: [
    {
      span: 24,
      layout: 'DefaultSearch',
      component: 'BaseSearch',
      config: {
        fields: [
          { field: 'name', label: '名称', type: 'input' },
        ],
        actions: [],
      },
    },
    {
      span: 24,
      component: 'TreeList',
      config: {
        API: {
          listAPI: '/api/ow/menus',
          deleteAPI: '/api/ow/menus/(id)',
        },
        fields: [
          { field: 'name', label: '菜单名称' },
          { field: 'seq', label: '排序', type: 'number' },
        ],
        operation: [
          {
            title: '编辑', action: 'modal',
            options: {
              outside: true,
              permission: 'portal.menu.edit',
              localtion: true,
              modalTitle: '编辑菜单',
              modalHeight: 350,
              expectedField: 'constant',
              expectedValue: '/^(?!1$)/',
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
          {
            title: '新建子菜单', action: 'modal',
            options: {
              permission: 'portal.menu.add',
              localtion: true,
              modalTitle: '新建子菜单',
              // ACTIONTYPE: 'create',
              expectedField: 'lowest',
              expectedValue: '/^(?!1$)/', // lowest 不等于 1 的情况下才可以新建子菜单
              saveToForm: {
                id: 'pid',
              },
              items: [
                {
                  layout: 'DefaultForm',
                  component: 'BaseForm',
                  config: {
                    ACTIONTYPE: 'create',
                    API: {
                      createAPI: '/api/ow/menus',
                    },
                    ...formConfig
                  },
                }
              ],
            },
          },
          {
            title: '删除', action: 'delete',
            options: {
              permission: 'portal.menu.delete',
              localtion: true,
              expectedField: 'constant',
              expectedValue: '/^(?!1$)/',
            }
          },
        ],
      },
    },
  ],
}