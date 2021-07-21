import { routerRedux } from 'dva/router';

import { addMenu, addHeaderMenu } from './config/menu';
import { addRouterData } from './config/router';
import { initLocale } from './config/locale';
import { arrayToObject } from './utils/utils';
import { inject as injectService } from './config/inject';

// 配合menu进行路由
let routePath = {
  ROOT: '/',
  OAUTH: '/oauth',
  LOGIN: '/oauth/login',
  LOGOUT: '/oauth/logout',
  ERROR: '/error',
};

// 菜单默认定义
const menu = [];

// fraemwork的默认路由
const routerData = [
  {
    path: routePath.ROOT,
    models: [],
    component: () => import('./layouts/BasicLayout')
  },
  {
    path: routePath.OAUTH,
    models: [],
    component: () => import('./layouts/OAuthLayout')
  },
  {
    path: routePath.LOGIN,
    models: [
      { namespace: 'login', handle: require('./models/login').default }
    ],
    component: () => import('./routes/Account/Login')
  },
  {
    path: routePath.LOGOUT,
    models: [
      { namespace: 'login', handle: require('./models/login').default }
    ],
    component: () => import('./routes/Account/Logout')
  },

  {
    path: routePath.ERROR,
    models: [],
    component: () => import('./components/Exception/500')
  },
];

const headerMenu = [
  {
    intl: 'header.logout',
    icon: 'logout',
    key: 'oauth-logout',
    onClick: (dispatch) => {
      console.log("logout menu click.");
      dispatch(routerRedux.push(`${routePath.LOGOUT}`));
    }
  }
];

const locales = [
  { zh: require('./locales/zh').default },
  { en: require('./locales/en').default }
];

function getLocales() {
  return locales;
}

function getMenu() {
  return menu;
}

function getHeaderMenu() {
  return headerMenu;
}

function getRouterData() {
  return routerData;
}

export function getRoutePath() {
  return routePath;
}

export function addModule({
  locales, routerData, menu, headerMenu
}) {
  console.log("framework.addMoudle:", locales, routerData, menu, headerMenu);
  locales && initLocale(arrayToObject(locales));
  routerData && addRouterData(...routerData);
  menu && addMenu(...menu);
  headerMenu && addHeaderMenu(...headerMenu);
}

export default function init(inject) {
  if (inject) {
    inject.PageHeader && injectService('PageHeader', inject.PageHeader);
    inject.Copyright && injectService('Copyright', inject.Copyright);
    inject.Company && injectService('Company', inject.Company);
    inject.Logo && injectService('Logo', inject.Logo);
    inject.loginApi && injectService('loginApi',inject.loginApi);
  }
  initLocale(arrayToObject(getLocales()));
  addMenu(...getMenu());
  addHeaderMenu(...getHeaderMenu());
  addRouterData(...getRouterData());
  console.log("fraemwork inited.");
}
