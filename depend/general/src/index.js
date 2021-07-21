import formElement from 'kqd-form-element';
import modelExtend from './models/model-extend';
import baseModel from './models/baseModel';
import { getRoutes } from './utils/utils';
import { registerCustomerComponent } from './utils/schema';

import UniformList from './components/uniform-list';
import UniformForm from './components/uniform-form';
import GeneralList from './components/general-list';
import GeneralForm from './components/general-form';
import ModalForm from './components/modal-form';
import SearchForm from './components/search-form';
import GridForm from './components/grid-form';

// import GeneralManagement from './components/general-management';
// import getConfigUtils from './components/general-management/utils/getConfig';
// import GMList from './components/general-management/components/List';
// import GMForm from './components/general-management/components/Form';
import GMGeneralTable from './components/general-management/components/GeneralTable';
import GMTableAction from './components/general-management/components/wrapped/TableAction';

import GMApp from './components/general-management/GMApp';
// import GMAppList from './components/general-management/GMApp/List';
// import GMAppForm from './components/general-management/GMApp/Form';
import EventProxy from './components/general-management/GMApp/EventProxy';

import UniformlManagement from './components/uniform-management/index';
import UMWrapped from './components/uniform-management/wrapped';
import UMForm from './components/uniform-management/components/Form';
import TitleBar from './components/titleBar/TitleBar';

const locales = [
  { zh: require('./locales/zh').default },
  { en: require('./locales/en').default }
];

const EmptyList = 'EmptyList 将不对外暴露，有使用这个组件的请尽快替换。';

export {
  getRoutes,
  locales,

  modelExtend,
  baseModel,

  UniformList,
  UniformForm,
  GeneralList,
  GeneralForm,
  ModalForm,
  SearchForm,
  GridForm,

  EmptyList,

  // GeneralManagement,
  // getConfigUtils,
  // GMList,
  // GMForm,
  GMGeneralTable,
  GMTableAction,
  GMApp,
  // GMAppList,
  // GMAppForm,
  EventProxy,
  UniformlManagement,
  UMWrapped,
  UMForm,
  TitleBar,
};

/**
 * @param _formElement form-element 模块测试用
 */
export default function init(_formElement) {
  if (_formElement) {
    _formElement(registerCustomerComponent);
  }
  else {
    formElement(registerCustomerComponent);
  }
}
