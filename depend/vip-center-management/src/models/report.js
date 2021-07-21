import { baseModel, modelExtend } from 'kqd-general';
import queryString from 'querystring';
import { get } from 'kqd-utils/lib/services';

export default modelExtend(baseModel, {
  namespace: 'report',
  state: {
    skinReport: {},
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getData({ payload }, { call, put, select }) {
      const { saveKey, API, ...restPayload } = payload;
      const { data } = yield call(get, API, { ...restPayload });
      if (data) {
        const rst = {};
        rst[saveKey] = data;
        yield put({ type: 'save', payload: rst });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/report') {
          dispatch({ type: 'save', payload: { skinReport: {} } });

          dispatch({
            type: 'getData',
            payload: {
              saveKey: 'skinReport',
              API: `/api/meice/reports/${queryString.parse(search.replace('?','')).id}`,
            },
          });
        }
      });
    },
  },
});
