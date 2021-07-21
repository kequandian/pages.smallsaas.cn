import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.STOCK,
    models: [
      { namespace: 'stock', handle: require('../models/stock').default }
    ],
    component: () => import('../routes/stock')
  },
  
]
