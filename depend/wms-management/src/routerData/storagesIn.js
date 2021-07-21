import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STORAGESIN,
    models: [
      { namespace: 'storagesIn', handle: require('../models/storagesIn').default }
    ],
    component: () => import('../routes/storagesIn')
  }
]
