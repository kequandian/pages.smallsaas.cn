import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.INVENTORIES,
    models: [
      { namespace: 'inventories', handle: require('../models/inventories').default }
    ],
    component: () => import('../routes/inventories')
  }
]
