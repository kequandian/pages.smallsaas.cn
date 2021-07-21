import 'antd/dist/antd.css';
import './app.css';
import { addRoutePath, addMenu, addModule, framework, app, setDefaultRoutePath } from 'kqd-framework';
import general from 'kqd-general';

general();
import module1, { getRoutePath } from './index';

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

setDefaultRoutePath(getRoutePath().RECOMMENDS);

const inject = {
  'Copyright': '索芙特',
  'Company': '推荐结果管理',
  'Logo': 'none'
}
framework(inject);
app();
