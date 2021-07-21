import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.ASSISTANTS,
    models: [
      { namespace: 'assistants', handle: require('../models/assistants').default }
    ],
    component: () => import('../routes/assistants')
  }
]
