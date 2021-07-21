
function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!');  // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  if(routes.length === 0) return [];
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(routePath =>
    routePath.indexOf(path) === 0 && routePath !== path);
  //console.log("getRoutes, routes=", routes);
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}

export function getIntl(intl, key) {
  if (intl && key) {
    return intl.formatMessage({id: `${key}`});
  }
  return key;
}

/**
 * 递归合并两个对象，相当于 Object.assign(target, ...sources) 的递归版
 * 返回一个新的对象
 * @param {Object} target 
 * @param {Object} sources 会把 sources 的属性拷贝到 target
 */
export function deepMerge(target, sources) {
  for(let key in sources) {
      target[key] = target[key] && target[key].toString() === "[object Object]" ?
      deepMerge(target[key], sources[key]) : target[key] = sources[key];
  }
  return { ...target };
}


export const LS = {
  isLocalStorage(){ return !!window.localStorage; },
  set(key, value){
    value = typeof(value) ==="object" ? JSON.stringify(value) : value;
    localStorage.setItem(key,value);
  },
  get(key){
    var value = localStorage.getItem(key) || '';
    if( (value === "") || ( value.indexOf("{") < 0 ) && ( value.indexOf("[" ) < 0) ){
      return value;
    }else{ 
      return JSON.parse(value);
    }
  },
	del(key){
		localStorage.removeItem(key);
	},
}