import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.REFUNDS,
    models: [
      { namespace: 'refunds', handle: require('../models/refunds').default }
    ],
    component: () => import('../routes/refunds')
  }
]
