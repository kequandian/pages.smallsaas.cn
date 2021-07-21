import formConfig from './Form.config';

export default {
  layout: 'Grid',
  title: '美丽知识',
  items: [
    {
      span: 24,
      layout: 'DefaultSearch',
      component: 'BaseSearch',
      config: {
        fields: [
          { field: 'name', label: '文章名称', type: 'input' },
        ],
        actions: [
          {
            title: '新增文章', type: 'path',
            options: {
              path: '/website-lore/form',
              queryData: {
                type: 'create',
              },
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
          listAPI: '/api/cms/articles?type=LORE',
          deleteAPI: '/api/cms/articles/(id)',
        },
        fields: [
          { field: 'title', label: '文章名称' },
          { field: 'sticky', label: '排序', valueType: 'number' },
          { field: 'createdTime', label: '创建时间' },
        ],
        operation: [
          {
            title: '编辑', action: 'path',
            options: {
              outside: true,
              permission: 'portal.base.edit',
              localtion: true,
              path: '/website-lore/form',
            },
          },
          {
            title: '删除', action: 'delete',
            options: {
              permission: 'portal.base.delete',
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