import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.BBSSETTING,
    models: [
      { namespace: 'bbsSetting', handle: require('../models/bbsSetting').default }
    ],
    component: () => import('../routes/bbsSetting')
  }
]
