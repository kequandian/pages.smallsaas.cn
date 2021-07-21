import { routerRedux } from 'dva/router';
import { deepMerge } from '../utils/utils';
import { notificationSuccess, notificationError } from './notification';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

export default {

  namespace: 'base',

  state: {
    list: [],
    current: 0,
    pageSize: 0,
    total: 0,
    currentItem: {},
    modalVisible: false,
    requestData: {}, //自定义请求存放的 response 数据
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const { API, current, size = 10, REDIRECT = 'list', dataSourceMap, ...rest } = payload;

      // /rest 分页使用  pageNum
      rest.pageNum = current;
      // /api 分页使用  pageNumber
      rest.pageNumber = current;

      rest.pageSize = size;

      const result = yield call(query, API, { ...rest });
      if (result.code === 200 || result.status_code === 0) {
        let list = result.data.records || result.data.list || result.data || [];
        list = list.map(record => ({ ...record, key: record.id }));
        if (dataSourceMap) {
          yield put({
            type: 'fetchSuccess_direct',
            dataSourceMap,
            payload: {
              [REDIRECT]: list,
              current: result.data.current || result.data.pageNumber,
              total: result.data.total || result.data.totalRow,
              pageSize: result.data.size || result.data.pageSize,
              // currentItem: { }
            }
          })
        } else {
          yield put({
            type: 'fetchSuccess',
            payload: {
              [REDIRECT]: list,
              current: result.data.current || result.data.pageNumber,
              total: result.data.total || result.data.totalRow,
              pageSize: result.data.size || result.data.pageSize,
              // currentItem: { }
            }
          })
        }
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },

    *fetchOne({ payload }, { call, put }) {
      let { API } = payload;
      delete payload.API;
      if (API.indexOf('{') >= 0) {
        API = API.replace('{ID}', payload.id);
      } else {
        API = `${API}/${payload.id}`;
      }
      const result = yield call(get, API);
      if (result.code === 200 || result.status_code === 0) {
        yield put({
          type: 'fetchSuccess',
          payload: {
            currentItem: result.data,
          }
        })
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },
    *fetchOne_direct({ payload }, { call, put }) {
      const { API, REDIRECT = 'currentItem', dataSourceMap } = payload;
      delete payload.REDIRECT;
      delete payload.dataSourceMap;

      const result = yield call(query, API);
      if (result.code === 200 || result.status_code === 0) {
        if (dataSourceMap) {
          yield put({
            type: 'fetchSuccess_direct',
            dataSourceMap,
            payload: {
              [REDIRECT]: result.data,
            }
          })
        } else {
          yield put({
            type: 'fetchSuccess',
            payload: {
              [REDIRECT]: result.data,
            }
          });
        }
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },

    *fetchOneItems({ payload }, { call, put }) {
      let { API, itemsField = 'records', itemsFieldMap = itemsField } = payload;
      delete payload.API;
      if (API.indexOf('{') >= 0) {
        API = API.replace('{ID}', payload.id);
      } else {
        API = `${API}/${payload.id}`;
      }
      const result = yield call(get, API);
      if (result.code === 200 || result.status_code === 0) {
        yield put({
          type: 'fetchItemsSuccess',
          payload: {
            [itemsFieldMap]: result.data[itemsField],
          }
        })
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },

    *createForm({ payload }, { call, put }) {
      let { API, REDIRECT } = payload;
      delete payload.API;
      delete payload.REDIRECT;

      const result = yield call(create, API, { ...payload });
      if (result.code === 200 || result.status_code === 0) {
        yield put({
          type: 'createFormSuccess',
          payload: {
            ...payload,
            ...result.data
          }
        });

        notificationSuccess({ description: '添加成功!' });

        if (REDIRECT) {
          yield put(routerRedux.push(`${REDIRECT}`));
        }
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },

    *updateForm({ payload }, { call, put }) {
      let { API, REDIRECT } = payload;
      delete payload.API;
      delete payload.REDIRECT;

      if (API.indexOf('{') >= 0) {
        API = API.replace('{ID}', payload.id);
      } else {
        API = `${API}/${payload.id}`;
      }

      const result = yield call(update, API, { ...payload });
      if (result.code === 200 || result.status_code === 0) {
        yield put({
          type: 'updateFormSuccess',
          payload: {
            ...payload,
            ...result.data
          }
        });

        notificationSuccess({ description: '更新成功！' });
        if (REDIRECT) {
          yield put(routerRedux.push(`${REDIRECT}`));
        }
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },
    *updateForm_direct({ payload }, { call, put }) {
      let { API, REDIRECT } = payload;
      delete payload.API;
      delete payload.REDIRECT;

      const result = yield call(update, API, { ...payload });
      if (result.code === 200 || result.status_code === 0) {
        yield put({
          type: 'updateFormSuccess',
          payload: {
            ...payload,
            ...result.data
          }
        });

        notificationSuccess({ description: '更新成功!' });
        if (REDIRECT) {
          yield put(routerRedux.push(`${REDIRECT}`));
        }
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },
    *deleteOne({ payload }, { call, put }) {
      const { API, id } = payload;
      delete payload.API;
      const result = yield call(remove, `${API}/${id}`);
      if (result.code === 200 || result.status_code === 0) {
        notificationSuccess({ description: '删除成功!' });
        yield put({
          type: 'deleteSuccess',
          payload: {
            id
          }
        })
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },
    *deleteOne_direct({ payload }, { call, put }) {
      const { API, id, dataSourceMap } = payload;
      delete payload.API;

      const result = yield call(remove, API);
      if (result.code === 200 || result.status_code === 0) {
        notificationSuccess({ description: '删除成功！' });
        if (dataSourceMap) {
          yield put({
            type: 'deleteSuccess_direct',
            dataSourceMap,
            payload: {
              id
            }
          });
        } else {
          yield put({
            type: 'deleteSuccess',
            payload: {
              id
            }
          });
        }
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },

    *bulkDelete({ payload }, { call, put }) {
      const { API, ids } = payload;
      delete payload.API;
      const result = yield call(remove, API, { ids });
      if (result.code === 200 || result.status_code === 0) {
        notificationSuccess({ description: '删除成功！' });
        yield put({
          type: 'bulkDeleteSuccess',
          payload: {
            ids
          }
        })
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },

    /**
     * 一般由 requester 调用，用于发出各种自定义请求。
     */
    *request({ payload }, { call, put }) {
      const { requestConfig, API, ...restPayload } = payload;
      const { method, key = 'default' } = requestConfig;
      const methodMap = {
        get: query,
        post: create,
        put: update,
        delete: remove,
      };
      let payloadData = {};
      if (restPayload.payload) {
        payloadData = { ...restPayload.payload };
      } else {
        payloadData = restPayload;
      }

      const result = yield call(methodMap[method.toLowerCase()], API, payloadData);
      if (result.code === 200 || result.status_code === 0) {
        if (result.data) {
          yield put({
            type: 'requestSuccess',
            payload: {
              [key]: result.data,
            }
          });
        }
        return result.data;
      } else {
        if (result.message) {
          notificationError({ description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
    },

  },


  reducers: {
    resetCurrentItem(state, { payload }) {
      return {
        ...state,
        currentItem: {}
      }
    },
    fetchOneClear(state, { payload }) {
      const { fetchOneKey = 'currentItem' } = payload;
      return {
        ...state,
        [fetchOneKey]: {},
      }
    },
    fetchSuccess(state, { payload }) {
      console.log('fetchSuccess', payload, state);
      // return deepMerge(state,payload);
      return { ...state, ...payload }
    },
    fetchSuccess_direct(state, { dataSourceMap, payload }) {
      const tempObj = {};
      tempObj[dataSourceMap] = {
        ...state[dataSourceMap],
        ...payload,
      };
      return {
        ...state,
        ...tempObj,
      }
    },
    fetchItemsSuccess(state, { payload }) {
      return {
        ...state,
        currentItem: {
          ...state.currentItem,
          ...payload,
        }
      };
    },
    createFormSuccess(state, { payload }) {
      const list = state.list;
      list.push({ ...payload });
      return {
        ...state,
        list,
        currentItem: {}
      }
    },
    updateFormSuccess(state, { payload }) {
      const { id } = payload;
      const list = state.list.map(item => {
        if (id === item.id) {
          return {
            ...item,
            ...payload,
          }
        }
        return item;
      });
      return {
        ...state,
        list,
        currentItem: {}
      }
    },
    deleteSuccess(state, { payload }) {
      const list = state.list.filter(item => item.id !== payload.id);
      return {
        ...state,
        list,
      }
    },
    deleteSuccess_direct(state, { dataSourceMap, payload }) {
      const tempObj = {};
      tempObj[dataSourceMap] = { ...state[dataSourceMap] };
      tempObj[dataSourceMap].list = state[dataSourceMap].list.filter(item => item.id !== payload.id);
      return {
        ...state,
        ...tempObj,
      }
    },
    bulkDeleteSuccess(state, { payload }) {
      const list = new Set(state.list);
      const ids = new Set(payload.ids);
      const result = Array.from(new Set([...list].filter(x => !ids.has(x.id))));
      return {
        ...state,
        list: result
      }
    },
    showModal(state, { payload }) {
      return {
        ...state,
        modalVisible: true,
        currentItem: {}
      }
    },
    hideModal(state, { payload }) {
      return {
        ...state,
        modalVisible: false,
        currentItem: {}
      }
    },
    /**
     * 自定义请求的成功处理 reducer
     */
    requestSuccess(state, { payload }) {
      return {
        ...state,
        requestData: {
          ...state.requestData,
          ...payload,
        },
      }
    },
  }
}
