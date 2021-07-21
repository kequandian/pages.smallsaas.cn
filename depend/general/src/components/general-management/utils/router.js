import React from 'react';
import queryString from 'query-string';
import { routerRedux } from 'dva/router';
import { getConfig } from '../../../config';

/**
 * 抽出 router，用来避免页面重载。
 * 之后还可以整合 生命周期。
 * @param {object} initRouterMap 
 * @param {string} namespace 
 * @param {object} dataPool 
 * @param {object} dispatch
 */
export default function router(initRouterMap,namespace,dataPool,dispatch){
  const history = [];
  let index = -1;
  const pageCache = []; //缓存 default 页
  let pageCacheLog = {};
  let nowPageName = '';
  let NowPage = initRouterMap['default'];
  let { ...routeMap } = initRouterMap;

  function getReactElement(NowPage,{ key, style, ...restProps }){
    return React.isValidElement(NowPage)
    ? <div style={ style } key={ key }>
        { React.cloneElement(NowPage,{ ...restProps }) }
      </div>
    : <div style={ style } key={ key }>
        <NowPage { ...restProps } />
      </div>
  }

  return {
    ROUTER: namespace,
    register: (newMap) => {
      routeMap = { ...routeMap, ...newMap };
    },
    render: (props,location) => {
      const queryObj = queryString.parse(location.search.replace('?',''));
      const type = queryObj.type || 'default';
      delete queryObj.type;

      if( nowPageName !== type ){
        console.log('当前路由：',type,'路由表：',routeMap,'历史：',history);
        if(nowPageName === 'default' && getConfig('clearSearch')){
          dataPool.clearSearch();
        }
        if(type === 'default'){
          dataPool.clearForm();

          const defaultIndex = pageCacheLog['default'] === undefined ? -1 : pageCacheLog['default'];
          pageCache.splice( defaultIndex + 1 );
          delete pageCacheLog[nowPageName];
          pageCacheLog = {
            default: pageCacheLog['default'],
          };
          index = pageCacheLog['default'] || -1;
        }else{
          if(type === 'query' && pageCacheLog['query'] !== undefined){
            pageCache.splice(pageCacheLog['query'] + 1);
            delete pageCacheLog[nowPageName];
            index = pageCacheLog['query'];
          }else{
            if(index > -1){
              pageCache[index] = getReactElement(NowPage,{
               ...props,
               key: nowPageName,
               routerStatus: {
                 visible: false,
               },
               style: {
                 display: 'none',
               }
             })
            }
          }
        }

        nowPageName = type;
        history.unshift(type);
        history.splice(10,1);

        if(pageCacheLog[nowPageName] !== undefined){
          index = pageCacheLog[nowPageName];
          NowPage = pageCache[ index ].props.children;
        }else{
          NowPage = routeMap[type] || routeMap['default'];

          pageCache.push(getReactElement(NowPage,{ ...props, key: nowPageName }));
          index += 1;
          pageCacheLog[nowPageName] = index;
        }
      }

      dataPool.clearLocation();
      dataPool.addToLocation(queryObj);

      pageCache[index] = getReactElement(NowPage,{
        ...props,
        key: nowPageName,
        routerStatus: {
          visible: true,
        },
        style: {
          display: 'block',
        }
      })
      
      return pageCache;
    },
    getHistory: () => {
      return history;
    },
    goBack:() => {
      dispatch(routerRedux.goBack());
    }
  }
}