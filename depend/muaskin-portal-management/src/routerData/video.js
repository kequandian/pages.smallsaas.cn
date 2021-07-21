import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.VIDEO,
    models: [],
    component: () => import('../routes/video')
  },
  {
    path: routePath.VIDEO_LIST,
    models: [
      { namespace: 'video', handle: require('../models/video').default }
    ],
    component: () => import('../routes/video/List')
  },
  {
    path: routePath.VIDEOFORM,
    models: [
       { namespace: 'video', handle: require('../models/video').default }
    ],
    component: () => import('../routes/video/Form.js')
  },
//@thisEnd
]
