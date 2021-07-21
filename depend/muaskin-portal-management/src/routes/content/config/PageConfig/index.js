import formConfig from './formConfig';

export default {
  layout: 'Flex',
  title: false,
  config: {
    align: 'flex-start',
  },
  preventRender: {
    '1': {
      // permission: 'portal.extra.edit',
      // localtion: true,
      expectedField: 'formData',
      expectedValue: 'IS_NOT_NULL',
    }
  },
  items: [
    {
      span: '300px',
      component: 'MenuEdit',
      config: {
        permission: 'portal.extra.edit',
        localtion: true,
        API: {
          listAPI: '/api/pub/ow/pages?type=rtf',
          createAPI: '/api/ow/pages',
          deleteAPI: '/api/ow/pages/(id)',
  
          getAPI: '/api/pub/ow/pages/(id)',
          updateAPI: '/api/ow/pages/(id)',
        },
      }
    },
    {
      span: 1,
      component: 'BaseForm',
      ACTIONTYPE: 'edit',
      config: {
        ...formConfig,
        REDIRECT: false,
      },
    },
  ],
}