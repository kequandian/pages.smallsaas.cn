import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.PRINTER,
    models: [
      { namespace: 'printer', handle: require('../models/printer').default }
    ],
    component: () => import('../routes/printer')
  }
]
