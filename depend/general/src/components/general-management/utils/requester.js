import replaceKey from './replaceKey';

function initAPI(APIObject = {},propsAPI){
  if(!APIObject.API){
    if(!propsAPI){
      console.error('requester 未能注册初始 API 集合。请确保输入了基本的 API key！');
      return false;
    }else{
      APIObject.API = propsAPI;
    }
  }
  const aimsAPI = {
    API: '{API}', // 基础 API
    listAPI: '{API}', // 获取列表的 API
    createAPI: '{API}', // 创建表单的 API
    getAPI: '{API}/[id]', // 获取表单详情的 API
    updateAPI: '{API}/[id]', // 修改表单数据的 API
    deleteAPI: '{API}/(id)', // 删除 API
    bulkDeleteAPI: '{API}', // 批量删除 API
  };
  const rst = {};
  Object.keys(aimsAPI).forEach( key => {
    rst[key] = APIObject[key] === undefined ? aimsAPI[key].replace('{API}',APIObject.API) : APIObject[key];
  } );
  // 初始的 列表API，在重置了搜索过滤项之后会用到
  rst['initListAPI'] = rst.listAPI;
  console.log('初始化后 API set：',rst);
  return rst;
}
export default function requester(
      { namespace, dispatch, dataPool, dataSourceMap },
      APIObject,propsAPI,
      { listProps = {} },
    )
  {
  const APIObjectSet = {
    ...initAPI(APIObject,propsAPI),
  }
  const APIKeyMap = {
    'fetchList': 'listAPI',
    'fetchOne_direct': 'getAPI',
    'createForm': 'createAPI',
    'updateForm_direct': 'updateAPI',
    'deleteOne_direct': 'deleteAPI',
    'bulkDelete': 'bulkDeleteAPI',
  };
  const replaceAPIKey = replaceKey(dataPool);

  /**
   * 检查输入的 payload，然后调用 requestProxy
   * @param {string} type 
   * @param {object} oldPayload 
   * @param {string} redirect 重定向。把请求的结果存储到其它地方。
   */
  function check(type,oldPayload,redirect){
    const { ...payload } = oldPayload;

    // console.warn(payload);
    if( payload.API === undefined ){
      payload.API = APIObjectSet[ APIKeyMap[type] ];
    }
    if( payload.API === null ){
      console.log(`制止了 ${type} 的数据请求`);
      return false;
    }
    if( redirect ){
      console.log(`把 ${payload.API} 的请求结果重定向到 ${redirect}`);
      payload.REDIRECT = redirect;
    }
    if( dataSourceMap ){
      console.log(`更改 model 的数据源为 ${dataSourceMap}`);
      payload.dataSourceMap = dataSourceMap;
    }

    requestProxy(type,payload);
  }

  function requestProxy(type,payload){
    payload.API = replaceAPIKey.format(payload.API || payload.requestConfig && payload.requestConfig.API);
    const { callback } = payload.requestConfig || {};
    if(callback){
      delete payload.requestConfig.callback;
    }

    dispatch({
      type: `${namespace}/${type}`,
      payload,
    }).then((data) => {
      if( typeof callback === 'function' ) callback(data,payload);
    });
  }
  function requestProxy_direct(type,payload){
    payload.API = replaceAPIKey.format(payload.API);

    dispatch({
      type: `${namespace}/${type}`,
      payload,
    });
  }
  return {
    getAPISet(){
      return APIObjectSet;
    },
    updateAPISet(APIType,API){
      APIObjectSet[APIType] = API;
      return APIObjectSet;
    },
    fetchList(payload = {}, redirect){
      payload = {
        ...dataPool.getToSearchAll(),
        ...payload,
        requestConfig: {
          callback: listProps.getListAfter,
        }
      };
      check('fetchList',payload, redirect);
    },
    fetchOne(payload = {}, redirect){
      if(payload.id === undefined ){
        payload.id = dataPool.getToLocation('id');
      }
      if(redirect){
        console.log(`fetchOne 请求结果被重定向到 ${redirect}`);
        dataPool.addToRedirect({ fetchOne: redirect });
      }
      check('fetchOne_direct', payload, redirect);
    },
    fetchOneClear(){
      const fetchOneKey = dataPool.getToRedirect('fetchOne');
      requestProxy_direct('fetchOneClear', { fetchOneKey });
    },
    createForm(payload = {}){
      check('createForm',payload);
    },
    updateForm(payload = {}){
      if(payload.id === undefined ){
        payload.id = dataPool.getToLocation('id');
      }
      check('updateForm_direct',payload);
    },
    deleteOne(payload){
      check('deleteOne_direct',payload);
    },
    bulkDelete(payload){
      check('bulkDelete',payload);
    },
    /**
     * 发出自定义请求
     * @param {object} requestConfig 请求的配置对象
     * - method 请求方式。支持 get post put delete 四种
     * - API 请求 API
     * - key 请求结果存放的 key
     * - callback 请求成功后的回调函数
     * @param {*} payload 请求时发送的数据
     */
    request(requestConfig,payload){
      requestProxy('request',{
        requestConfig,
        payload,
      });;
    },

    /**
     * 直接保存数据到当前的 modal
     */
    save(payload){
      let tempObj = {};
      console.log(dataSourceMap,payload)
      if( dataSourceMap ){
        tempObj[ dataSourceMap ] = {
          ...payload,
        };
      }else{
        tempObj = payload;
      }

      dispatch({
        type: `${namespace}/fetchSuccess`,
        payload: {
          ...tempObj,
        }
      });
    },
  };
}