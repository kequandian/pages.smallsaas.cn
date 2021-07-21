import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import { routerRedux } from 'dva/router';
import message from 'antd/lib/message';

import createHashHistory from 'history/createHashHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import FastClick from 'fastclick';
import queryString from 'query-string';
import { getLocale } from './config/locale';

import './index.css';

function determineLang() {
  const search = window.location.search;
  let lang = queryString.parse(search).lang;
  lang = lang ? lang : localStorage.lang;
  lang = lang && ['zh', 'en'].includes(lang) ? lang : 'zh';
  localStorage.lang = lang;
  return lang;
}

export default function start(browser) {

  window.appLocale = getLocale(determineLang());

  // 1. Initialize
  const app = dva({
    history: browser ? createBrowserHistory() : createHashHistory(),
    onError(e, dispatch) {
      e.preventDefault();
      if (e instanceof TypeError && e.response === undefined) {
        dispatch(routerRedux.push('/error'));
      }

      if (e.response.status === 401) {
        dispatch(routerRedux.push('/oauth/login'));
      }

      e.response.json().then((res) => {
        if (res) {
          const msg = [];
          msg.push(res.message);
          if (res.errors && res.errors.length > 0) {
            msg.push(JSON.stringify(res.errors[0]));
          }
          message.error(msg.join(", "));
        }
      });
    }

  });

  // 2. Plugins
  app.use(createLoading());

  // 3. Register global model
  app.model(require('./models/global').default);

  // 4. Router
  app.router(require('./router').default);

  // 5. Start
  app.start('#root');

  FastClick.attach(document.body);
}

//export default app._store;  // eslint-disable-line
