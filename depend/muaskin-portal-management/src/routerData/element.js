import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.ELEMENT,
    models: [],
    component: () => import('../routes/element')
  },
  {
    path: routePath.ELEMENT_LIST,
    models: [
      { namespace: 'element', handle: require('../models/element').default }
    ],
    component: () => import('../routes/element/List')
  },
  {
    path: routePath.ELEMENTFORM,
    models: [
       { namespace: 'element', handle: require('../models/element').default }
    ],
    component: () => import('../routes/element/Form.js')
  },
//@thisEnd
]
