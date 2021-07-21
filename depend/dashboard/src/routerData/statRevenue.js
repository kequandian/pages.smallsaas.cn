import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STATREVENUE,
    models: [
      { namespace: 'statRevenue', handle: require('../models/statRevenue').default }
    ],
    component: () => import('../routes/statRevenue')
  }
]
