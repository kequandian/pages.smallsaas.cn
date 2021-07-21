import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.TAGS,
    models: [
      { namespace: 'tags', handle: require('../models/tags').default }
    ],
    component: () => import('../routes/tags')
  }
]
