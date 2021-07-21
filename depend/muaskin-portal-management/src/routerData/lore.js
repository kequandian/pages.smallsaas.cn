import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.LORE,
    models: [],
    component: () => import('../routes/lore')
  },
  {
    path: routePath.LORE_LIST,
    models: [
      { namespace: 'lore', handle: require('../models/lore').default }
    ],
    component: () => import('../routes/lore/List')
  },
  {
    path: routePath.LOREFORM,
    models: [
       { namespace: 'lore', handle: require('../models/lore').default }
    ],
    component: () => import('../routes/lore/Form.js')
  },
//@thisEnd
]
