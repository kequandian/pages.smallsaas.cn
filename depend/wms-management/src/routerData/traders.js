import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.TRADERS,
    models: [
      { namespace: 'traders', handle: require('../models/traders').default }
    ],
    component: () => import('../routes/traders')
  }
]
