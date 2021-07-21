import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.PAGENAME_UPPERCASE,
    models: [
      { namespace: 'PAGENAME', handle: require('../models/PAGENAME').default }
    ],
    component: () => import('../routes/PAGENAME')
  }
]
