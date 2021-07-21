import framework, { addModule } from './framework';
import app from './app';
import { addMenu, addHeaderMenu, getMenuData, getHeaderMenuData } from './config/menu';
import { addRouterData, setDefaultRoutePath, getDefaultRoutePath } from './config/router';
import { getRoutes } from './utils/utils';
import { initLocale, getLocale } from './config/locale';


module.exports = {
  framework,
  addModule,
  app,

  initLocale,
  getLocale,

  getRoutes,
  getMenuData,
  getHeaderMenuData,
  addMenu,
  addHeaderMenu,
  addRouterData,
  setDefaultRoutePath,
  getDefaultRoutePath
};
