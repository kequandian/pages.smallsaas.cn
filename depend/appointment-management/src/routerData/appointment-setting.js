import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.APPOINTMENTSETTING,
    models: [
      { namespace: 'appointmentSetting', handle: require('../models/appointmentSetting').default }
    ],
    component: () => import('../routes/appointment-setting')
  }
]
