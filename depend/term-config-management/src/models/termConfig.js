import { baseModel, modelExtend } from 'kqd-general';
import message from 'antd/lib/message';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import { getApi } from '../index';
const API = getApi();

export default modelExtend(baseModel, {
  namespace: 'termConfig',
  state: {
    config: { }  // type: { id: xxx, content: xxx, title: xxx, type: xxx }
  },

  effects: {
    *fetchConfig({ payload }, { select, call, put }) {
      const config = yield select(({ termConfig }) => termConfig.config);
      //console.log(payload);
      const { code, data, message } = yield query(`${API}?type=${payload.type}`);
      if (code === 200) {
        config[payload.type] = { ...data };
        yield put({
          type: 'fetchSuccess',
          payload: {
            config
          }
        })
      }
    },

    *createConfig({ payload }, { call, put }) {
      yield create(API, { ...payload });
      yield put({
        type: 'fetchConfig',
        payload
      })
    },

    *updateConfig({ payload }, { select, call, put }) {
      //console.log(payload);
      if (payload.id) {
        const result = yield update(`${API}/${payload.id}`, { ...payload });
        message.info(result.message);
        yield put({
          type: 'fetchConfig',
          payload: {
            type: payload.type,
          }
        })
      }
      else {
        yield put({
          type: 'createConfig',
          payload: {
            ...payload, title: '',
          }
        })
      }
    }
  },

  reducers: {

  }
});
