import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STORES,
    models: [
      { namespace: 'stores', handle: require('../models/stores').default }
    ],
    component: () => import('../routes/stores')
  },
]
