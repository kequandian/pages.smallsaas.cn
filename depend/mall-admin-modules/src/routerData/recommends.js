import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.RECOMMENDS,
    models: [
      { namespace: 'recommendsManagement', handle: require('../models/recommends').default }
    ],
    component: () => import('../routes/recommends')
  }
]
