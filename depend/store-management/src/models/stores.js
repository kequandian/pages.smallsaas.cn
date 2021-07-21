import { baseModel, modelExtend } from 'kqd-general';
import { query, get, update, remove, patch, createRaw } from 'kqd-utils/lib/services';

export default modelExtend(baseModel, {
  namespace: 'stores',
  state: {
    API: '/api/store/stores',
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
    },
    *getBaseUrl({ payload }, { call, put, select }) {
      const rst = yield call(query, '/rest/wx/host_prefix');
      if( rst.status_code === 0 ){
        yield put({
          type: 'save',
          payload: {
            BaseUrl: rst.data,
          }
        })
      }
      
    },
  }
});

