import 'antd/dist/antd.css';
import './app.css';
import { addRoutePath, addMenu, addModule, framework, app, setDefaultRoutePath } from 'kqd-framework';
import { endpointSet } from 'zero-element';
import { saveToken } from 'zero-element/lib/utils/request/token';
import { getEndpoint } from 'kqd-utils/lib/endpoint';
import { getToken } from 'kqd-utils/lib/token';
import module1, { getRoutePath } from './index';

const { set: setEndpoint } = endpointSet;
const endpoint = getEndpoint() || window.MC && window.MC.HOST || '';
const token = getToken() ||  window.MC && window.MC.ACCESS_TOKEN || '';
console.log('当前使用的 endpoint: ', endpoint);
console.log('当前使用的 token: ', token);
setEndpoint(endpoint);
// setEndpoint('http://192.168.2.116:8088');
// saveToken({
//   token: '',
// });
saveToken({
  token,
});

const menu = [];
require.context('./routePath/', true, /\.js$/).keys().forEach(file => {
  const res = require(`./routePath/${file.slice(2)}`).default;
  const m = Object.keys(res)[0];
  menu.push({
    name: m,
    intl: m,
    path: res[m].slice(1)
  });
});

addModule(module1({
  menu
}));

setDefaultRoutePath(getRoutePath().SURVEY);

const inject = {
  'Copyright': '索芙特',
  'Company': '后台管理系统',
  'Logo': 'none'
}
framework(inject);
app();
