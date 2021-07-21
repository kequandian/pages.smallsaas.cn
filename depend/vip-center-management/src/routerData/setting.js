import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.SETTING,
    models: [
      { namespace: 'setting', handle: require('../models/setting').default }
    ],
    component: () => import('../routes/setting')
  }
]
