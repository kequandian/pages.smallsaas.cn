import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STATCHARGE,
    models: [
      { namespace: 'statCharge', handle: require('../models/statCharge').default }
    ],
    component: () => import('../routes/statCharge')
  }
]
