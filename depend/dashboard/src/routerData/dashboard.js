import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.DASHBOARD,
    models: [
      { namespace: 'dashboard', handle: require('../models/dashboard').default }
    ],
    component: () => import('../routes/dashboard')
  }
]
