import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.CHECKS,
    models: [
      { namespace: 'checks', handle: require('../models/checks').default }
    ],
    component: () => import('../routes/checks')
  }
]
