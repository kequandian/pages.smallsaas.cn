import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.TRANSFERS,
    models: [
      { namespace: 'transfers', handle: require('../models/transfers').default }
    ],
    component: () => import('../routes/transfers')
  }
]
