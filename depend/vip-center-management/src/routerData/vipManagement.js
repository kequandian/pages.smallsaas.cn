import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.VIPMANAGEMENT,
    models: [
      { namespace: 'vipManagement', handle: require('../models/vipManagement').default }
    ],
    component: () => import('../routes/vipManagement')
  }
]
