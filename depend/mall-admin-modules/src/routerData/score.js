import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.SCORE,
    models: [
      { namespace: 'scoreManagement', handle: require('../models/score').default }
    ],
    component: () => import('../routes/score')
  }
]
