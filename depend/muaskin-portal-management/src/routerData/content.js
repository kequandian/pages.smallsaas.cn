import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.CONTENT,
    models: [],
    component: () => import('../routes/content')
  },
  {
    path: routePath.CONTENT_PAGE,
    models: [
      { namespace: 'content', handle: require('../models/content').default }
    ],
    component: () => import('../routes/content/Page')
  },
]
