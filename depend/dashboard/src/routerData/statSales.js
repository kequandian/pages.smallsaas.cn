import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STATSALES,
    models: [
      { namespace: 'statSales', handle: require('../models/statSales').default }
    ],
    component: () => import('../routes/statSales')
  }
]
