import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.TERM_CONFIG,
    models: [
      { namespace: 'termConfig', handle: require('../models/termConfig').default },
    ],
    component: () => import('../routes/TermConfig')
  },
  
]
