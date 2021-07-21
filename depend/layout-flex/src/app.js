import 'antd/dist/antd.css';
import { addRoutePath, addMenu, addModule, framework, app } from 'kqd-framework';
import { locales } from './index';

const menu = [
  {
    name: 'LRBLayout',
    path: 'lrb-layout'
  },
  {
    name: 'ListLayout',
    path: 'list-layout'
  },
  {
    name: 'GridLayout',
    path: 'grid-layout'
  },
  {
    name: 'LRLayout',
    path: 'lr-layout'
  },
  {
    name: 'LMRLayout',
    path: 'lmr-layout'
  },
  {
    name: 'UDLayout',
    path: 'ud-layout'
  },
  {
    name: 'wrap-layout',
    path: 'wrap-layout',
  },
  {
    name: 'FlexLayout',
    path: 'flex-layout'
  },
];

const routerData = [
  {
    path: '/lrb-layout',
    models: [ ],
    component: () => import('./demo/TestLRBLayout')
  },
  {
    path: '/list-layout',
    models: [ ],
    component: () => import('./demo/TestListLayout')
  },
  {
    path:'/grid-layout',
    medels:[],
    component:() => import('./demo/TestGridLayout')
  },
  {
    path: '/lr-layout',
    models: [ ],
    component: () => import('./demo/TestLRLayout')
  },
  {
    path: '/lmr-layout',
    models: [ ],
    component: () => import('./demo/TestLMRLayout')
  },
  {
    path:'/ud-layout',
    medels:[],
    component:() => import('./demo/TestUDLayout')
  },
  {
    path: '/wrap-layout',
    models: [],
    component:() => import('./demo/TestWrapLayout')
  },
  {
    path: '/flex-layout',
    models: [],
    component:() => import('./demo/TestFlexLayout')
  }
];


addModule({ locales, routerData, menu });

framework();
app();
