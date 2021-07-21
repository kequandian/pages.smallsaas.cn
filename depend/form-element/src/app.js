import 'antd/dist/antd.css';
import { setEndpoint } from 'kqd-utils/lib/endpoint';
import { framework, addModule, app } from 'kqd-framework';
import general, { locales as generalLocales } from 'kqd-general';
import element, { locales } from './index';

//setEndpoint('http://www.abc.com');
general(element);

const routerData = [
  {
    path: '/dashboard',
    models: [],
    component: () => import('./demo/Demo')
  },
];


addModule({ locales: generalLocales });
addModule({ locales, routerData });

framework();
app();
