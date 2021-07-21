import 'antd/dist/antd.css';
import { framework, addModule, app } from 'kqd-framework';
import { PageHeader } from 'kqd-page-header';
import term from './index';

import general from 'kqd-general';

general();

const inject = {
  //'PageHeader': PageHeader
}


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


addModule(term({
  menu,
  types: [ 'ABOUT_US', 'TERM', 'RULE' ],
  //API: '/api/term/config' 
}));
framework(inject);
app();
