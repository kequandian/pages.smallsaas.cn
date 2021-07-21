import 'antd/dist/antd.css';
import { addRoutePath, addMenu, addModule, framework, app } from 'kqd-framework';
import { locales } from './index';

const menu = [
  {
    path: 'ChartDemo',
    name: 'ChartDemo'
  },
  {
    path: 'TagBadgeDemo',
    name: 'TagBadgeDemo'
  },
  {
    path: 'ColumnTotalDemo',
    name: 'ColumnTotalDemo',
  },
  {
    path: 'BarDemo',
    name: 'BarDemo'
  },
  {
    path: 'LineDemo',
    name: 'LineDemo'
  },
  {
    path: 'PieDemo',
    name: 'PieDemo'
  },
  {
    path: 'columnChainDemo',
    name: 'columnChainDemo'
  },
  {
    path: 'StatisticDemo',
    name: 'StatisticDemo'
  },
  {
    path: 'GridDemo',
    name: 'GridDemo'
  },
  {
    path: 'NumberRowsDemo',
    name: 'NumberRowsDemo'
  },
  {
    path: 'RadarDemo',
    name: 'RadarDemo'
  },
  {
    path: 'ProgressRingDemo',
    name: 'ProgressRingDemo'
  },
  {
    path: 'InstrumentDemo',
    name: 'InstrumentDemo'
  },
  {
    path: 'TableStatisticDemo',
    name: 'TableStatisticDemo'
  },
  {
    path: 'NewProgressRingDemo',
    name: 'NewProgressRingDemo'
  }
];

const routerData = [
  {
    path: '/ChartDemo',
    models: [],
    component: () => import('./Demo/ChartDemo')
  },
  {
    path: '/TagBadgeDemo',
    models: [],
    component: () => import('./Demo/TagBadgeDemo')
  },
  {
    path: '/ColumnTotalDemo',
    models: [],
    component: () => import('./Demo/ColumnTotalDemo')
  },
  {
    path: '/BarDemo',
    models: [],
    component: () => import('./Demo/BarDemo')
  },
  {
    path: '/LineDemo',
    models: [],
    component: () => import('./Demo/LineDemo')
  },
  {
    path: '/PieDemo',
    models: [],
    component:() => import('./Demo/PieDemo')
  },
  {
    path: '/columnChainDemo',
    models: [],
    component:() => import('./Demo/ColumnChainDemo')
  },
  {
    path: '/StatisticDemo',
    models: [],
    component: () => import('./Demo/StatisticDemo')
  },
  {
    path: '/GridDemo',
    models: [],
    component: () => import('./Demo/GridDemo')
  },
  {
    path: '/NumberRowsDemo',
    models: [],
    component: () => import('./Demo/NumberRowsDemo')
  },
  {
    path: '/RadarDemo',
    models: [],
    component: () => import('./Demo/RadarDemo')
  },
  {
    path: '/ProgressRingDemo',
    models: [],
    component: () => import('./Demo/ProgressRingDemo')
  },
  {
    path: '/InstrumentDemo',
    models: [],
    component: () => import('./Demo/InstrumentDemo')
  },
  {
    path: '/TableStatisticDemo',
    models: [],
    component: () => import('./Demo/TableStatisticDemo')
  },
  {
    path: '/NewProgressRingDemo',
    models: [],
    component: () => import('./Demo/NewProgressRingDemo')
  }
];


addModule({ locales, routerData, menu });

framework();
app();
