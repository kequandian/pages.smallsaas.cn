import TitledHeader from './components/titled-header';
import PageHeader from './components/page-header';
import ShowRichText from './components/show-richText/ShowRichText'

const locales = [
  { zh: require('./locales/zh').default },
  { en: require('./locales/en').default }
];

export {
  locales,
  PageHeader,
  TitledHeader,
  ShowRichText
};
