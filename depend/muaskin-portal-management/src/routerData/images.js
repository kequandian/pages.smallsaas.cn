import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.IMAGES,
    models: [],
    component: () => import('../routes/images')
  },
  {
    path: routePath.IMAGES_PAGE,
    models: [
      { namespace: 'images', handle: require('../models/images').default }
    ],
    component: () => import('../routes/images/Page')
  },
  {
    path: routePath.IMAGES_FORM,
    models: [
      { namespace: 'images', handle: require('../models/images').default }
    ],
    component: () => import('../routes/images/Form')
  },
//@thisEnd
]
