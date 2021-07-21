import appLocaleDataZh from 'react-intl/locale-data/zh';
import appLocaleDataEn from 'react-intl/locale-data/en';

import antdCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import antdEn from 'antd/lib/locale-provider/en_US';

const locales = {
  zh: {},
  en: {}
}

const appLocale = {
  zh: {
    messages: {},
    antd: antdCN,
    locale: 'zh',
    data: appLocaleDataZh,
    label: '中文',
  },
  en: {
    messages: {},
    antd: antdEn,
    locale: 'en',
    data: appLocaleDataEn,
    label: 'English',
  }
}

export function initLocale({ zh, en }) {
  console.log("initLocale: ", zh, en);
  locales.zh = { ...locales.zh, ...zh };
  locales.en = { ...locales.en, ...en };
  console.log("locales: ", locales);
}

export function getLocale(lang) {
  const locale = locales[lang];
  let res = appLocale[lang];
  res = { ...res, messages: { ...locale } };
  console.log("getlocale:", res);
  return res;
}
