import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.MEMU,
    models: [],
    component: () => import('../routes/menu')
  },
  {
    path: routePath.MEMU_LIST,
    models: [
      { namespace: 'menu', handle: require('../models/menu').default }
    ],
    component: () => import('../routes/menu/List')
  },
  {
    path: routePath.MEMUFORM,
    models: [
       { namespace: 'menu', handle: require('../models/menu').default }
    ],
    component: () => import('../routes/menu/Form.js')
  },
//@thisEnd
]
