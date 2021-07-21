import 'antd/dist/antd.css';
import { framework, addModule, app } from 'kqd-framework';
import general, { locales } from './index';

const menu = [
  {
    name: '新页面模式',
    path: 'list'
  },
  {
    name: '新页面模式-inline search',
    path: 'list2'
  },
  {
    name: '模态框模式',
    path: 'modal'
  },
  {
    name: '多列表单',
    path: 'grid-form?id=1'
  },
  {
    name: 'ModelLessList',
    path: 'uniform-list'
  },
  {
    name: 'General Management',
    path: '/users'
  }
];

const routerData = [
  {
    path: '/list',
    models: [
      { namespace: 'users', handle: require('./demo/users').default }
    ],
    component: () => import('./demo/TestGeneralList')
  },
  {
    path: '/list2',
    models: [
      { namespace: 'users', handle: require('./demo/users').default }
    ],
    component: () => import('./demo/TestGeneralListInlineSearch')
  },
  {
    path: '/general-form',
    models: [
      { namespace: 'users', handle: require('./demo/users').default }
    ],
    component: () => import('./demo/TestGeneralForm')
  },

  {
    path: '/modal',
    models: [
      { namespace: 'users', handle: require('./demo/users').default }
    ],
    component: () => import('./demo/TestModalForm')
  },

  {
    path: '/grid-form',
    models: [
      { namespace: 'users', handle: require('./demo/users').default }
    ],
    component: () => import('./demo/TestGridForm')
  },

  {
    path: '/uniform-list',
    models: [],
    component: () => import('./demo/TestUniformList')
  },
  
  {
    path: '/users',
    models: [
      { namespace: 'users', handle: require('./demo/users').default }
    ],
    component: () => import('./demo/TestGeneralManagement')
  },
];

general();
addModule({ locales, routerData, menu });
framework();
app();
