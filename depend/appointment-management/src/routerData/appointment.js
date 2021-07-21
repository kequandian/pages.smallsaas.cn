import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.APPOINTMENT,
    models: [
      { namespace: 'appointment', handle: require('../models/appointment').default }
    ],
    component: () => import('../routes/appointment')
  }
]
