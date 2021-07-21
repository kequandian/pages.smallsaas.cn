import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.PRODUCTCATEGORIES,
    models: [
      { namespace: 'productCategories', handle: require('../models/productCategories').default }
    ],
    component: () => import('../routes/productCategories')
  }
]
