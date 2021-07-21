import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.ORDERREPORT,
    models: [
      { namespace: 'orderReport', handle: require('../models/orderReport').default }
    ],
    component: () => import('../routes/orderReport')
  }
]
