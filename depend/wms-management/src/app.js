import 'antd/dist/antd.css';
import { addRoutePath, addMenu, addModule, framework, app, setDefaultRoutePath } from 'kqd-framework';
import general from 'kqd-general';
import './app.css';

general();
import module1, { getRoutePath } from './index';
import { setConfig } from 'kqd-general/lib/config';

setConfig('submitConfirm', true);

const menu = [];
const menuSort = require.context('./routePath/', true, /\.js$/).keys().sort( (a,b) => {
  const aN = a.replace(/[^0-9]/ig,'');
  const bN = b.replace(/[^0-9]/ig,'');
  return aN - bN;
})
menuSort.forEach(file => {
   const res = require(`./routePath/${file.slice(2)}`).default;
   const m = Object.keys(res)[0];
   if( m !== 'UNITS' )
   menu.push({
    name: m,
    intl: m,
    path: res[m].slice(1)
   });
});

addModule(module1({
  menu
}));

setDefaultRoutePath(getRoutePath().WAREHOUSES);

const inject = {
  'Copyright': '索芙特',
  'Company': '仓库管理系统',
  'Logo': 'none'
}
framework(inject);
app();
