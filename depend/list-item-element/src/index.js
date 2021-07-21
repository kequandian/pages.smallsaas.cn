import ListItem from './components/ListItem';

import MiniCard from './components/MiniCard';
import CouponItem from './components/CouponItem';

const locales = [
  { zh: require('./locales/zh').default },
  { en: require('./locales/en').default }
];

export {
  locales,

  ListItem,

  MiniCard,
  CouponItem,
};