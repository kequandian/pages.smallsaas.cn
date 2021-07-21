import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.NEWS,
    models: [],
    component: () => import('../routes/news')
  },
  {
    path: routePath.NEWS_PAGE,
    models: [
      { namespace: 'news', handle: require('../models/news').default }
    ],
    component: () => import('../routes/news/Page')
  },
//@thisEnd
]
