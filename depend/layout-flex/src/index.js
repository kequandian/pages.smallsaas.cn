import GridLayout from './components/grid-layout';
import LRBLayout from './components/lrb-layout';
import ListLayout from './components/list-layout';
import LMRLayout from './components/LMRLayout';
import LRLayout from './components/LRLayout';
import UDLayout from './components/UDLayout';
import WrapLayout from './components/wrapLayout/WrapLayout';
import FlexLayout from './components/flex-layout';

import HighlightText from './components/HighlightText';
import InlineScrollLayout from './components/InlineScrollLayout/InlineScrollLayout';
import InlineScrollItem from './components/InlineScrollLayout/InlineScrollItem';

const locales = [
  { zh: require('./locales/zh').default },
  { en: require('./locales/en').default }
];

export {
  locales,
  LRBLayout,
  ListLayout,
  GridLayout,
  LMRLayout,
  LRLayout,
  UDLayout,
  HighlightText,
  InlineScrollLayout,
  InlineScrollItem,
  WrapLayout,
  FlexLayout,
};
