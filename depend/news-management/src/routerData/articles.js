import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.ARTICLES,
    models: [
      { namespace: 'articles', handle: require('../models/articles').default }
    ],
    component: () => import('../routes/articles')
  }
]
