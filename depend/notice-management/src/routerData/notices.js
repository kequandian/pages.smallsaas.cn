import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.NOTICES,
    models: [
      { namespace: 'notices', handle: require('../models/notices').default }
    ],
    component: () => import('../routes/notices')
  }
]
