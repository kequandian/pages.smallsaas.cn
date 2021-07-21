import { baseModel, modelExtend } from 'kqd-general';
import { query, get, update, remove, patch, createRaw } from 'kqd-utils/lib/services';

export default modelExtend(baseModel, {
  namespace: 'vipManagement',
  state: {
    API: '/api/vip/accounts',
    config: {}
  },
  reducers: {
    save(state, { payload }) {
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
    *getUserData({ payload: { API } }, { call, put, select }) {
      const rst = yield call(query, `${API}/config`);
      yield put({
        type: 'save',
        payload: {
          config: rst.data._config
        }
      })
    },
    *getApi({ payload: { API } }, { call, put, select }) {
      const rst = yield call(query, `${API}/config`);
      yield put({
        type: 'save',
        payload: {
          config: rst.data._config
        }
      })
    },
    *setTags({ payload }, { call, put, select }) {
      const { id, tags, account } = payload;
      const rst = yield call(update, `/api/vip/accounts/${id}`, { tags, account });
      if (rst.code === 200) {
        const userData = yield call(get, `/api/vip/accounts/${id}`);
        yield put({
          type: 'save',
          payload: {
            userData: userData.data,
          }
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        window.dispatch = dispatch;
        // if(search.id && search.type === 'query') {
        //   console.log(111111111);
        // }
      });
    },
  },
});

