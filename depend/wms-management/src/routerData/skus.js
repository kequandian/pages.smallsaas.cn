import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.SKUS,
    models: [
      { namespace: 'skus', handle: require('../models/skus').default }
    ],
    component: () => import('../routes/skus')
  }
]
