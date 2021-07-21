import { baseModel, modelExtend, requestSet } from 'zero-element';
const { query, post, update, remove } = requestSet;
import { message } from 'antd';

export default modelExtend(baseModel, {
  namespace: 'content',
  state: {},
  reducers: {
  },
  effects: {
    *demo({ payload }, { call, put, select }) {
      console.log("demo");
      const { API, ...restPayload } = payload;
      const result = yield call(query, '/api/test', restPayload);
      if( result.code === 200 ){
        yield put({
          type: 'save',
          payload: {
            demo: {
              ...rest,
              data: result.data,
            },
          }
        })
      }
      return true;
    },
    *updateForm({ API, payload }, { call, put, select }) {
      const { identifier, ...restPayload } = payload;
      // 后端不处理 identifier，故前端统一不提交
      console.log("覆写了的 updateForm to :", API, restPayload);
      const result = yield call(update, API, restPayload);
      if (result && result.code === 200) {
        message.success('更新数据成功');
      }
      return result;
    },
  }
});

