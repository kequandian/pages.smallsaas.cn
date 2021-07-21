import 'antd/dist/antd.css';
import { addRoutePath, addMenu, addModule, framework, app } from 'kqd-framework';
import { locales } from './index';

const menu = [
  {
    name: 'TestMiniCard',
    path: 'mini-card'
  },
];

const routerData = [
  {
    path: '/mini-card',
    models: [ ],
    component: () => import('./demo/TestMiniCard')
  },
];


addModule({ locales, routerData, menu });

framework();
app();
