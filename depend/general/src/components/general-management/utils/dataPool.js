export default function dataPool(namespace, modelStatus, dataSourceMap, dispatch){
  let pool = {
    form: {}, // 位于这里的 key value，将会覆盖 field 的默认值，并最终会伴随着表单一起提交
    temp: {},
    location: {}, // location.search 剔除掉用于路由的 type key 之后的副本对象。
    record: {}, // 当前所选的 列表 行 的数据副本
    redirect: {}, //重定向的 key，由 requester 提供，一般由 setFieldValue 使用
    search: {},
  };

  return {
    DATAPOOL: namespace,
    dataSourceMap,
    register: (newModelStatus) => {
      modelStatus = newModelStatus;
    },

    addToForm(obj,isStatus = false){
      if(isStatus){
        dispatch({
          type: `${namespace}/fetchSuccess`,
          payload: {
            currentItem: {
              ...modelStatus.currentItem,
              ...obj,
            },
          },
        });
      }else{
        pool.form = { ...pool.form, ...obj };
      }
    },
    getToForm(key){
      return modelStatus && modelStatus.currentItem && modelStatus.currentItem[key] || pool.form[key];
    },
    getToFormAll(){
      return modelStatus && { ...modelStatus.currentItem, ...pool.form };
    },
    delToForm(key){
      modelStatus && modelStatus.currentItem && delete modelStatus.currentItem[key];
      return delete pool.form[key];
    },
    clearForm(){
      dispatch({
        type: `${namespace}/fetchSuccess`,
        payload: {
          currentItem: {},
        },
      });
      pool.form = {};
    },

    addToTemp(obj,isStatus = false){
      if(isStatus){
        modelStatus.temp = { ...modelStatus.temp, ...obj };
      }else{
        pool.temp = { ...pool.temp, ...obj };
      }
    },
    getToTemp(key){
      return modelStatus.temp && modelStatus.temp[key] || pool.temp[key];
    },
    getToTempAll(){
      return pool.temp;
    },

    addToLocation(obj,isStatus = false){
      if(isStatus){
        modelStatus.location = { ...modelStatus.location, ...obj };
      }else{
        pool.location = { ...pool.location, ...obj };
      }
    },
    getToLocation(key){
      return modelStatus.location && modelStatus.location[key] || pool.location[key];
    },
    clearLocation(){
      delete modelStatus.location;
      delete pool.location;
    },

    addToRecord(obj){
      pool.record = obj;
    },
    getToRecord(key){
      return pool.record[key];
    },
    getToRecordAll(){
      return pool.record;
    },
    clearRecord(){
      pool.record = {}
    },

    addToRedirect(obj){
      pool.redirect = { ...pool.redirect, ...obj };
    },
    getToRedirect(key){
      return pool.redirect[key];
    },

    getResponse(key){
      return modelStatus.requestData && modelStatus.requestData[key];
    },

    // search
    addToSearch(obj){
      // 这里用 fetchSuccess 是因为它本身就能保存任意数据，不用另起炉灶
      dispatch({
        type: `${namespace}/fetchSuccess`,
        payload: {
          search: {
            ...modelStatus.search,
            ...obj,
          },
        },
      });
    },
    getToSearch(key){
      return modelStatus.search && modelStatus.search[key];
    },
    getToSearchAll(){
      return modelStatus.search && modelStatus.search || {};
    },
    clearSearch(){
      dispatch({
        type: `${namespace}/fetchSuccess`,
        payload: {
          search: {},
        },
      });
    },

    getAll(){
      return { modelStatus, pool };
    },
  }
}