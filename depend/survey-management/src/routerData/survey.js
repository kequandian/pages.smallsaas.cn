import { getRoutePath } from '../index';
const routePath = getRoutePath();

export default [
  {
    path: routePath.SURVEY,
    models: [],
    component: () => import('../routes/survey')
  },
  {
    path: routePath.SURVEY_LIST,
    models: [
      { namespace: 'survey', handle: require('../models/survey').default }
    ],
    component: () => import('../routes/survey/List')
  },
  {
    path: routePath.SURVEYFORM,
    models: [
       { namespace: 'survey', handle: require('../models/survey').default }
    ],
    component: () => import('../routes/survey/Form.js')
  },
//@thisEnd
]
