import { locales as generalLocales } from 'kqd-general';

let routePath = { };

const routerData = [ ];

const locales = [
  { zh: {} },
  { en: {} }
];

function getRouterData() {
  return routerData;
}

function getLocales() {
  return locales;
}

const defaultMenu = [];

function getMenu() {
  return defaultMenu;
}

export function setRoutePath(data) {
  routePath = { ...routePath, ...data };
}

export function getRoutePath() {
  return routePath;
}

function combineLocales(res, name) {
  let currentLang;
  let locale = locales.find(item => {
    const result = Object.keys(item).filter(key => {
      return name.indexOf(key) > -1;
    });
    if (result.length > 0) {
      currentLang = result[0];
      return true;
    }
    return false;
  });
  if (locale) {
    locale[currentLang] = { ...locale[currentLang], ...res };
  }
}

/**
 * account 模块的初始化入口
 * @param routePath: Object
 * @param menu: Array
 * @param headerMenu: Array
 * @return Object
 */
export default function init({
  routePath, menu, headerMenu
}) {
  console.log(".init:", routePath, menu, headerMenu);

  let routePathData = { };
  require.context('./routePath/', true, /\.js$/).keys().forEach(file => {
     const res = require(`./routePath/${file.slice(2)}`).default;
     routePathData = { ...routePathData, ...res };
  });
  setRoutePath(routePathData);

  routePath && setRoutePath(routePath);

  /**
   * 绑定 model
   */
  require.context('./routerData/', true, /\.js$/).keys().forEach(file => {
     const res = require(`./routerData/${file.slice(2)}`).default;
     routerData.push(...res);
  });

  require.context('./locales/', true, /\.js$/).keys().forEach(file => {
     const fileName = file.slice(2);//去掉./
     const res = require(`./locales/${fileName}`).default;
     combineLocales(res, fileName);
  });
   generalLocales.map(item => {
     Object.keys(item).map(key => {
       combineLocales(item[key], key);
     })
   });

  const res = {
    locales: getLocales(),
    routerData: getRouterData(),
    menu: menu ? menu : getMenu(),
    headerMenu: headerMenu ? headerMenu : []
  }
  console.log(" res = ", res);
  return res;
}
