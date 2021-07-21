import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STORAGESOUT,
    models: [
      { namespace: 'storagesOut', handle: require('../models/storagesOut').default }
    ],
    component: () => import('../routes/storagesOut')
  }
]
