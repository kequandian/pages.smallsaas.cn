
export default {
  layout: 'Grid',
  title: false, // 图片资源管理 
  items: [
    {
      span: 24,
      // layout: 'DefaultList',
      // component: 'BaseList',
      layout: 'ImagesTile',
      component: 'EmptyList',
      config: {
        API: {
          listAPI: '/api/gw/portal/images',
          deleteAPI: '/api/gw/portal/images/(id)',
        },
        pagination: {
          pageSize: 60,
        },
        fields: [
          { field: 'name', label: '位置' },
          {
            field: 'url', label: '图片',
            valueType: 'images'
          },
        ],
        operation: [
          // {
          //   title: '编辑', action: 'modal',
          //   options: {
          //     outside: true,
          //     permission: 'portal.carousel.edit',
          //     localtion: true,
          //     modalTitle: '编辑图片',
          //     ACTIONTYPE: 'edit',
          //     items: [
          //       {
          //         layout: 'DefaultForm',
          //         component: 'BaseForm',
          //         config: {
          //           API: {
          //             getAPI: '/api/gw/portal/images/(id)',
          //             updateAPI: '/api/gw/portal/images/(id)',
          //           },
          //           ...formConfig,
          //         },
          //       }
          //     ],
          //   },
          // },
          // {
          //   title: '删除', action: 'delete',
          //   options: {
          //     permission: 'portal.carousel.delete',
          //     localtion: true,
          //   }
          // },
        ],
      },
    },
  ],
}