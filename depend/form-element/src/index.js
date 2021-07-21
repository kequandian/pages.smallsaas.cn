import RoleSelect from './components/role-select';
import DepartmentSelect from './components/department-select';
import GroupCheckbox from './components/group-checkbox';
import PcdSelect from './components/pcd-select';
import PcdGeoSelect from './components/pcdgeo-select';
import AddressInput from './components/address-input';
import FieldConfigSelect from './components/field-config-select';
import AvatarUpload from './components/avatar-upload';
import FileUpload from './components/file-upload';
import ConcatenateSelect from './components/concatenate-select';
import SerialCode from './components/serial-code';
import CardSelect from './components/card-select';
import SearchSelect from './components/search-select';

import AjaxRuleInput from './components/ajax-rule-input';
import AjaxSelect from './components/ajax-select';

import JSONSelect from './components/json-select';
import TagsCheckbox from './components/tags-checkbox';
import Specification from './components/specification';
import ClickPicker from './components/click-picker';
import RichText from './components/rich-text';

import ProductSpecification from './components/product-specification';
import ProductRefunds from './components/product-refunds';
import ProductPrice from './components/product-price';

import GetAccount from './components/get-account';

import UnitsAelect from './components/units-select';

import Group from './components/group';
import TransparentInput from './components/transparent-input';

const locales = [
  { zh: require('./locales/zh').default },
  { en: require('./locales/en').default }
];

export {
  locales,
  RoleSelect,
  DepartmentSelect,
  GroupCheckbox,
  PcdSelect,
  PcdGeoSelect,
  AddressInput,
  FieldConfigSelect,
  AvatarUpload,
  FileUpload,
  Group,
  ConcatenateSelect,
  SerialCode,
  CardSelect,
  SearchSelect,

  AjaxRuleInput,
  AjaxSelect,

  JSONSelect,
  TagsCheckbox,
  Specification,
  ClickPicker,
  RichText,

  ProductSpecification,
  ProductRefunds,
  ProductPrice,

  UnitsAelect,

  GetAccount,
  TransparentInput,
};

export default function init(registerCustomerComponent) {
  //console.log("registerCustomerComponent: ", registerCustomerComponent);
  if (registerCustomerComponent) {
    registerCustomerComponent('role-select', RoleSelect);
    registerCustomerComponent('department-select', DepartmentSelect);
    registerCustomerComponent('group-checkbox', GroupCheckbox);
    registerCustomerComponent('pcd-select', PcdSelect);
    registerCustomerComponent('pcdgeo-select', PcdGeoSelect);
    registerCustomerComponent('address-input', AddressInput);
    registerCustomerComponent('field-config-select', FieldConfigSelect);
    registerCustomerComponent('avatar-upload',
      AvatarUpload,
      {
        valuePropName: AvatarUpload.valuePropName,
        getValueFromEvent: AvatarUpload.getValueFromEvent
      }
    );
    registerCustomerComponent('file-upload', FileUpload);
    registerCustomerComponent('group', Group, {
      layout: { wrapperCol: {xs: 24,sm: 24,md: 24} }
    });
    registerCustomerComponent('concatenate-select', ConcatenateSelect);
    registerCustomerComponent('serial-code', SerialCode);
    registerCustomerComponent('card-select', CardSelect);
    registerCustomerComponent('search-select', SearchSelect);

    registerCustomerComponent('ajax-rule-input', AjaxRuleInput);
    registerCustomerComponent('ajax-select', AjaxSelect);

    registerCustomerComponent('json-select', JSONSelect);
    registerCustomerComponent('tags-checkbox', TagsCheckbox);
    registerCustomerComponent('specification', Specification, {
      layout: { wrapperCol: {xs: 24,sm: 24,md: 24} }
    });
    registerCustomerComponent('click-picker', ClickPicker);
    registerCustomerComponent('rich-text', RichText, {
      layout: { wrapperCol: {xs: 24,sm: 24,md: 24} }
    });

    registerCustomerComponent('product-specification', ProductSpecification, {
      layout: { wrapperCol: {xs: 24,sm: 24,md: 24} }
    });
    registerCustomerComponent('product-refunds', ProductRefunds, {
      layout: { wrapperCol: {xs: 24,sm: 24,md: 24} }
    });
    registerCustomerComponent('product-price', ProductPrice, {
      layout: { wrapperCol: {xs: 24,sm: 24,md: 24} }
    });

    registerCustomerComponent('get-account', GetAccount);

    registerCustomerComponent('units-select', UnitsAelect);
    registerCustomerComponent('transparent-input', TransparentInput);
  }
}
