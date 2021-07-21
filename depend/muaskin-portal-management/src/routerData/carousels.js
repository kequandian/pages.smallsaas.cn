import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.CAROUSELS,
    models: [],
    component: () => import('../routes/carousels')
  },
  {
    path: routePath.CAROUSELS_PAGE,
    models: [
      { namespace: 'carousels', handle: require('../models/carousels').default }
    ],
    component: () => import('../routes/carousels/Page')
  },
//@thisEnd
]
