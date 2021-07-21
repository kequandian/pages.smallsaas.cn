import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.REPORT,
    models: [
      { namespace: 'report', handle: require('../models/report').default }
    ],
    component: () => import('../routes/report')
  }
]
