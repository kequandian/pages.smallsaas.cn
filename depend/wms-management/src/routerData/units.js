import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.UNITS,
    models: [
      { namespace: 'units', handle: require('../models/units').default }
    ],
    component: () => import('../routes/units')
  }
]
