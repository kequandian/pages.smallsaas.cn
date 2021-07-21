import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.SUPPLIERS,
    models: [
      { namespace: 'suppliers', handle: require('../models/suppliers').default }
    ],
    component: () => import('../routes/suppliers')
  }
]
