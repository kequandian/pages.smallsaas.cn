import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.PROCUREMENTS,
    models: [
      { namespace: 'procurements', handle: require('../models/procurements').default }
    ],
    component: () => import('../routes/procurements')
  }
]
