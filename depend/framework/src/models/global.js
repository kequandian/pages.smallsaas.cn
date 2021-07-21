import { routerRedux } from 'dva/router';
import { query } from 'kqd-utils/lib/services';
import { getAvatar, getAccount, saveToken } from 'kqd-utils/lib/token';
import { setEndpoint } from 'kqd-utils/lib/endpoint';
import { getQueryString } from 'kqd-utils/lib/url';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    currentUser: { }
  },

  effects: {

  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    updateCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: { ...payload }
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        const jwt = getQueryString('jwt');
        console.log(jwt, window.location);
        if (jwt) {
          saveToken({ token: jwt, perms: [] });
          //window.location.href = window.location.origin + window.location.pathname;
        }
        const apiHost = getQueryString("host");
        if (apiHost) {
          console.log(apiHost);
          setEndpoint(apiHost);
        }

        dispatch({
          type: 'updateCurrentUser',
          payload: {
            name: getAccount(),
            avatar: getAvatar()
          }
        })

      });
    },
  },
};
