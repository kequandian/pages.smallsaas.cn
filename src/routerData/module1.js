import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.MODULE1,
    models: [
      { namespace: 'module1', handle: require('../models/module1').default }
    ],
    component: () => import('../routes/Demo')
  },
]
