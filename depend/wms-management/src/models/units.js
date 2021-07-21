import { baseModel, modelExtend } from 'kqd-general';
import { query, get, update, remove, patch, createRaw } from 'kqd-utils/lib/services';

export default modelExtend(baseModel, {
  namespace: 'units',
  state: {
    API: '/api/wms/sku/units',
    config: {}
  },
  reducers: {
    save(state, { payload } ){
      return { ...state, ...payload };
    }
  },
  effects: {
    *demoQuery({ payload }, { call, put }) {
      console.log("demoQuery");
      const { API } = payload;
      delete payload.API;
      const result = yield call(query, API, { ...payload });
    },
    *getConfig({ payload: { API } }, { call, put, select }) {
      const rst = yield call(query, `${API}/config`);
      yield put({
        type: 'save',
        payload: {
          config: rst.data._config
        }
      })
    }
  }
});

