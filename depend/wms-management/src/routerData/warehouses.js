import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.WAREHOUSES,
    models: [
      { namespace: 'warehouses', handle: require('../models/warehouses').default }
    ],
    component: () => import('../routes/warehouses')
  }
]
