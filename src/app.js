import 'antd/dist/antd.css';
import { addModule, framework, app } from 'kqd-framework';
import appointment from 'kqd-appointment-management';
import vip from 'kqd-vip-center-management';
import productEvaluation from 'kqd-product-evaluation';
import news from 'kqd-news';
import notice from 'kqd-notice';
import store from 'kqd-store';
import bbs from 'kqd-bbs';
import term from 'kqd-term-config';
import printer from 'kqd-printer-management';
import wms from 'kqd-wms';
import dashboard from 'kqd-dashboard';
import appMgmt from 'kqd-app-management';
import surveyMgmt from 'kqd-survey-management';
import mallAdminModules from 'kqd-mall-admin-modules';
import web from 'kqd-web-management';

import { endpointSet } from 'zero-element';
import { saveToken } from 'zero-element/lib/utils/request/token';
import { getEndpoint } from 'kqd-utils/lib/endpoint';
import { getToken, getPermissions } from 'kqd-utils/lib/token';

import main from './index';

import general from 'kqd-general';
import { setConfig } from 'kqd-general/lib/config';

general();
setConfig('clearSearch', false);

addModule(productEvaluation({ }));
addModule(bbs({ }));
addModule(news({ }));
addModule(notice({ }));
addModule(appointment({ }));
addModule(store({ }));
addModule(vip({ }));
addModule(term({ types: [ 'VIP_RULES', 'CREDIT_RULES', 'BRAND', 'PRIVACY_POLICY' ] }));
addModule(printer({ }));
addModule(wms({ }));
addModule(dashboard({ }));
addModule(appMgmt({ }));
addModule(surveyMgmt({ }));
addModule(mallAdminModules({ }));
addModule(web({ }));

addModule(main({ }));
framework();

addModule({
  routerData: [
    {
      path: '/',
      models: [],
      component: () => import('./layout.js')
    },
    {
      path: '/oauth',
      models: [],
      component: () => import('./layout.js')
    },
    {
      path: '/oauth/login',
      models: [],
      component: () => import('./error.js')
    },
  ]
});


const { set: setEndpoint } = endpointSet;
const endpoint = getEndpoint();
console.log('set endpoint for zero-element lib ', endpoint);
setEndpoint(endpoint);
saveToken({
  token: getToken() || '',
  permissions: getPermissions() || '',
  remember: true,
});


app();
