import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.ARTICLECATEGORIES,
    models: [
      { namespace: 'articleCategories', handle: require('../models/articleCategories').default }
    ],
    component: () => import('../routes/articleCategories')
  }
]
