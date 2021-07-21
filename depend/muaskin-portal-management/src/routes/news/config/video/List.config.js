import formConfig from './Form.config';

export default {
  layout: 'Grid',
  title: false, // 美丽课堂视频轮播
  items: [
    {
      span: 24,
      layout: 'DefaultSearch',
      component: 'BaseSearch',
      config: {
        fields: [
          // { field: 'name', label: '文章名称', type: 'input' },
        ],
        actions: [
          {
            title: '新增视频', type: 'path',
            options: {
              path: '/website-video/form',
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
          listAPI: '/api/stock/images/owner?ownerId=1&ownerType=website',
          deleteAPI: '/api/stock/images/(id)',
        },
        fields: [
          {
            field: 'url', label: '视频文件名', render(text = '') {
              if (text !== '') {
                try {
                  const data = JSON.parse(text);
                  return data[0].name;
                } catch (error) {
                  return '返回数据异常';
                }
              }
              return
            }
          },
          {
            field: 'url', key: 'test', label: '视频 url', render(text = '') {
              if (text !== '') {
                try {
                  const data = JSON.parse(text);
                  return data[0].url;
                } catch (error) {
                  return '返回数据异常';
                }
              }
              return
            }
          },
        ],
        operation: [
          {
            title: '编辑', action: 'path',
            options: {
              outside: true,
              // permission: 'portal.base.edit',
              // localtion: true,
              path: '/website-video/form',
            },
          },
          {
            title: '删除', action: 'delete',
            options: {
              permission: 'portal.base.delete',
              localtion: true,
            }
          },
        ],
      },
    },
  ],
}