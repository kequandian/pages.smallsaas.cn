import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STATSTORE,
    models: [
      { namespace: 'statStore', handle: require('../models/statStore').default }
    ],
    component: () => import('../routes/statStore')
  }
]
