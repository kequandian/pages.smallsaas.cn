import formConfig from './formConfig';

export default {
  layout: 'Flex',
  title: false,
  config: {
    align: 'flex-start',
  },
  items: [
    {
      span: 1,
      component: 'BaseForm',
      ACTIONTYPE: 'edit',
      config: {
        ...formConfig,
        permission: 'portal.footer.edit',
        localtion: true,
        API: {
          getAPI: '/api/pub/ow/pages/one/footer',
          updateAPI: '/api/ow/pages/one/footer',
        },
        REDIRECT: false,
      },
    },
  ],
}