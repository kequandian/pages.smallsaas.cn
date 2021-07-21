import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.PRODUCTSSTOCK,
    models: [
      { namespace: 'productsStock', handle: require('../models/productsStock').default }
    ],
    component: () => import('../routes/productsStock')
  }
]
