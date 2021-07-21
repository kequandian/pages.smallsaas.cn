import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.APK,
    models: [
      { namespace: 'apk', handle: require('../models/apk').default }
    ],
    component: () => import('../routes/apk')
  }
]
