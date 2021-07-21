import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STATPROFIT,
    models: [
      { namespace: 'statProfit', handle: require('../models/statProfit').default }
    ],
    component: () => import('../routes/statProfit')
  }
]
