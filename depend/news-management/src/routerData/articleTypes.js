import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.ARTICLETYPES,
    models: [
      { namespace: 'articleTypes', handle: require('../models/articleTypes').default }
    ],
    component: () => import('../routes/articleTypes')
  }
]
