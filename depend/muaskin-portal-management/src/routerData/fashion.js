import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.FASHION,
    models: [],
    component: () => import('../routes/fashion')
  },
  {
    path: routePath.FASHION_LIST,
    models: [
      { namespace: 'fashion', handle: require('../models/fashion').default }
    ],
    component: () => import('../routes/fashion/List')
  },
  {
    path: routePath.FASHIONFORM,
    models: [
       { namespace: 'fashion', handle: require('../models/fashion').default }
    ],
    component: () => import('../routes/fashion/Form.js')
  },
//@thisEnd
]
