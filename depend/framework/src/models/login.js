import { routerRedux } from 'dva/router';

import { query, create } from 'kqd-utils/lib/services';
import { saveToken, removeToken } from 'kqd-utils/lib/token';

import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

import { getRoutePath } from '../framework';
const { LOGIN } = getRoutePath();
import { get as getInject } from '../config/inject';


export default {
  namespace: 'login',

  state: {
  },

  effects: {
    *login({ payload }, { call, put }) {
      removeToken();
      console.log('????????? loginApi =',getInject('loginApi'));
      const API = getInject('loginApi') || '/api/oauth/login';
      const { code, data } = yield call(create, API, payload);
      // Login successfully
      if (code === 200) {
        saveToken({
          account: payload.account,
          token: data.accessToken,
          avatar: data.avatar,
          perms: data.perms || [],
          permissions: data.permissions || [],
          remember: payload.autoLogin
        });
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        //urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        removeToken();
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push(`${LOGIN}`));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload
      };
    },
  },
};
