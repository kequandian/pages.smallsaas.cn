import 'antd/dist/antd.css';
import { addRoutePath, addMenu, addModule, framework, app } from 'kqd-framework';
import { locales } from './index';

const menu = [
  {
    name: 'TitledHeader',
    path: 'titled-header'
  },
  {
    name: 'PageHeader',
    path: 'page-header'
  },
  {
    name: 'ShowRichText',
    path: 'ShowRichText'
  }
];

const routerData = [
  {
    path: '/titled-header',
    models: [ ],
    component: () => import('./demo/TestTitledHeader')
  },
  {
    path: '/page-header',
    models: [ ],
    component: () => import('./demo/TestPageHeader')
  },
  {
    path: '/ShowRichText',
    models:[],
    component: () => import('./demo/TestShowRichText')
  }
];


addModule({ locales, routerData, menu });

framework();
app();
