import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.SALES,
    models: [
      { namespace: 'sales', handle: require('../models/sales').default }
    ],
    component: () => import('../routes/sales')
  }
]
