import { baseModel, modelExtend } from 'kqd-general';
import { query } from 'kqd-utils/lib/services';

export default modelExtend(baseModel, {
  namespace: 'module1',
  state: {
    API: '/api/adm/users'
  },
  effects: {
    *demoQuery({ payload }, { call, put }) {
      console.log("demoQuery", payload, query);
      const { API } = payload;
      delete payload.API;
      const result = yield call(query, API, { ...payload });

    },
  }
});
