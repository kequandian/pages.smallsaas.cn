// convert below object
// fields: [
//   {
//     field: 'account',
//      type: 'select',//, password, number, input,email ,phone, mobile,idcard, datetime,
//      value: 'xxx',
//      options: [
//        {
//          key: 'a',
//          value: 'A'
//        }
//      ],
//      disabled: true,
//      required: true,
//      rules: [
//
//      ]
//   },
//   {
//     name: 'password',
//     type: 'string',
//   }
// ]
//
// into
//{
//   Account: {
//     //component: Input,
//     name: 'account',
//     label: '登录名',
//     intl: 'account',
//     props: {
//       placeholder: '给用户起个唯一的登录名',
//     },
//     rules: [{
//       required: true, message: '请输入登录名!',
//     }],
//   }
import React, { Component } from 'react';
import moment from 'moment';

import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import Checkbox from 'antd/lib/checkbox';
import Rate from 'antd/lib/rate';
import Radio from 'antd/lib/radio';
import Switch from 'antd/lib/switch';
import Select from 'antd/lib/select';
import Cascader from 'antd/lib/cascader';
import Slider from 'antd/lib/slider';
import TreeSelect from 'antd/lib/tree-select';

import Plain from './components/Plain';
import Hidden from './components/Hidden';
import Tabs from './components/Hidden';
import DateRange from './components/DateRange';
import MRadio from './components/MRadio';

import { FormattedMessage } from 'react-intl';
import { BasicForm } from 'kqd-common';

const typeMapping = {
  input: Input,
  select: Select,
  number: class Number extends Component {
    componentDidMount() {
      const { value, onChange } = this.props;
      if(value === undefined && onChange) {
        onChange(0);
      }
    }
    render() {
      const { value = 0, onChange } = this.props;
      return <InputNumber defaultValue={value} onChange={onChange} />
    }
  },
  switch: Switch,
  password: Input,
  checkbox: Checkbox.Group,
  textarea: Input.TextArea,
  radio: Radio.Group,
  tabs: Tabs,
  email: Input,
  phone: Input,
  mobile: Input,
  date: DatePicker,
  datetime: DatePicker,
  month: DatePicker.MonthPicker,
  range: DatePicker.RangePicker,
  time: TimePicker,
  cascader: Cascader,
  rate: Rate,
  slider: Slider,
  tree: TreeSelect,
  plain: Plain,
  hidden: Hidden,
  'm-range': DateRange, // 移动版 date range
  'm-radio': MRadio,
}

let customerTypeMapping = {};
let customerExtenstions = {};

const formItemMapping = {
  input: ({ Item, name, key, label, defaultValue, disabled }) => {
    return <Item name={name} label={label} key={key} defaultValue={defaultValue} disabled={disabled} />
  },
  select: ({ Item, name, key, label, defaultValue, options, attrs }) => {
    let style = {};
    if (attrs.width) {
      style.width = attrs.width;
    }
    return (<Item name={name} label={label} key={key} defaultValue={defaultValue} style={{ ...style }}>
      {options.map((option, index) => <Select.Option key={option.value}>{option.key}</Select.Option>)}
    </Item>)
  },
  password: ({ Item, name, key, label, disabled }) => {
    return <Item name={name} label={label} key={key} defaultValue='' disabled={disabled} />
  },
  number: ({ Item, name, key, label, defaultValue, disabled }) => {
    return <Item name={name} label={label} key={key} defaultValue={Number(defaultValue)} disabled={disabled} />
  },
  checkbox: ({ Item, name, key, label, defaultValue, options }) => {
    const wrappedOptions = options.map(option => {
      return {
        label: option.key,
        value: option.value,
      }
    });
    return <Item name={name} label={label} key={key} options={wrappedOptions} defaultValue={defaultValue} />
  },
  switch: ({ Item, name, key, label, defaultValue }) => {
    let checked = false;
    if (defaultValue && typeof (defaultValue) === 'boolean') {
      checked = defaultValue;
    }
    if (defaultValue && typeof (defaultValue) === 'number') {
      checked = defaultValue === 1;
    }
    return <Item name={name} label={label} key={key} defaultValue={checked} valuePropName='checked' />
  },
  textarea: ({ Item, name, key, label, defaultValue, options }) => {
    let opts = {};
    let autosize;
    options.map(opt => {
      opts[opt.key] = opt.value;
      if (opt.key === 'minRows' || opt.key === 'maxRows') {
        if (!autosize) autosize = {};
        autosize[opt.key] = opt.value;
      }
    });
    delete opts.minRows;
    delete opts.maxRows;
    opts = { ...opts, autosize };
    return <Item name={name} label={label} key={key} defaultValue={defaultValue} {...opts} />
  },
  radio: ({ Item, name, key, label, defaultValue, options }) => {
    const wrappedOptions = options.map(option => {
      return {
        label: option.key,
        value: option.value,
      }
    });
    return <Item name={name} label={label} key={key} options={wrappedOptions} defaultValue={defaultValue} />
  },
  date: ({ Item, name, key, label, defaultValue, options }) => {
    let format = 'YYYY-MM-DD';
    options.map(opt => {
      if (opt.key === 'format') {
        format = opt.value;
      }
    });
    return <Item name={name} label={label} key={key} defaultValue={moment(defaultValue || new Date(), format)} format={format} />
  },
  month: ({ Item, name, key, label, defaultValue, options }) => {
    let format = 'YYYY-MM';
    options.map(opt => {
      if (opt.key === 'format') {
        format = opt.value;
      }
    });
    return <Item name={name} label={label} key={key} defaultValue={moment(defaultValue || new Date(), format)} format={format} />
  },
  range: ({ Item, name, key, label, defaultValue, options }) => {
    let format;
    let opts = {};
    options.map(opt => {
      opts[opt.key] = opt.value;
      if (opt.key === 'format') {
        format = opt.value;
      }
      if (!format && opt.key === 'showTime') {
        format = 'YYYY-MM-DD HH:mm:ss';
      }
    });
    if (!format) {
      format = 'YYYY-MM-DD';
    }
    let data;
    if (Array.isArray(defaultValue) && defaultValue.length === 2) {
      data = [moment(defaultValue[0], format), moment(defaultValue[1], format)];
    }
    return <Item name={name} label={label} key={key} defaultValue={data} {...opts} format={format} />
  },
  datetime: ({ Item, name, key, label, defaultValue, options }) => {
    let format = 'YYYY-MM-DD HH:mm:ss';
    options.map(opt => {
      if (opt.key === 'format') {
        format = opt.value;
      }
    });
    return <Item name={name} showTime={true} label={label} key={key} defaultValue={moment(defaultValue || new Date(), format)} format={format} />
  },
  time: ({ Item, name, key, label, defaultValue, options }) => {
    let format = 'HH:mm:ss';
    options.map(opt => {
      if (opt.key === 'format') {
        format = opt.value;
      }
    });
    return <Item name={name} label={label} key={key} defaultValue={moment(defaultValue, format)} format={format} />
  },
  cascader: ({ Item, name, key, label, defaultValue, options }) => {
    const wrappedOptions = [];
    const convert = (opts) => {
      return opts.map(opt => {
        let res = { value: opt.value, label: opt.key };
        if (opt.children) {
          res.children = convert(opt.children);
        }
        return res;
      })
    }
    return <Item name={name} label={label} key={key} options={convert(options)} defaultValue={defaultValue} />
  },
  rate: ({ Item, name, key, label, defaultValue, options }) => {
    let opts = {};
    options.map(opt => {
      opts[opt.key] = opt.value;
    });
    return <Item name={name} label={label} key={key} defaultValue={defaultValue} {...opts} />
  },
  slider: ({ Item, name, key, label, defaultValue, options }) => {
    let opts = {};
    options.map(opt => {
      opts[opt.key] = opt.value;
    });
    return <Item name={name} label={label} key={key} defaultValue={defaultValue} {...opts} />
  },
  tree: ({ Item, name, key, label, defaultValue, options }) => {
    const convert = (opts) => {
      return opts.map((opt, index) => {
        let res = {
          key: opt.key + index,
          label: opt.key,
          value: opt.value,
        };
        if (opt.children) {
          res.children = convert(opt.children);
        }
        return res;
      })
    }
    //console.log(convert(options));
    return <Item name={name} label={label} key={key} defaultValue={defaultValue} treeData={convert(options)} />
  },
  tabs: ({ Item, name, key, label, defaultValue, options, attrs }) => {
    const wrappedOptions = options.map(option => {
      return {
        label: option.key,
        value: option.value,
      }
    });
    return <Item name={name} label={label} key={key} options={wrappedOptions} defaultValue={defaultValue} {...attrs} />
  },
  _customer: ({ Item, name, key, label, defaultValue, options, attrs }) => {
    return <Item name={name} label={label} key={key} defaultValue={defaultValue} options={options} {...attrs} />
  },
}

function typeConvert(type) {
  if (type && type === 'email') return 'input';
  if (type && type === 'phone') return 'input';
  if (type && type === 'mobile') return 'input';
  if (type) return type;
  return 'input';
}

function rulesMapping(type, rules) {
  const result = [];
  type === 'email' && result.push({ type: 'email' });
  //type === 'phone' && result.push({ })
  rules && rules.map(rule => result.push(rule));
  return result;
}

function getLabel(data) {
  if (data.intl) return <FormattedMessage id={data.intl} />;
  if (data.intlPrefix) return <FormattedMessage id={data.intlPrefix + data.name} />;
  return data.label;
}

function getTypeMapping(type) {
  //console.log("getTypeMapping:", type, typeMapping, customerTypeMapping);
  if (typeMapping[type]) return typeMapping[type];
  if (customerTypeMapping[type]) return customerTypeMapping[type];
  if (!type) return Input;
  return null;
}
const rulesMap = {
  'email': { type: 'email', message: '错误的邮箱格式。正确示例: abc@.def.com' },
  'phone': { pattern: /[0-9-()（）]{7,18}/, message: '错误的电话号码格式。应该由 7 到 18 位数字组成' },
  'mobile': { pattern: /0?(13|14|15|17|18)[0-9]{9}/, message: '错误的手机号码格式。' }
}
export function convertFields(fields) {
  let data = {};
  fields.map(field => {
    const component = getTypeMapping(field.type);
    const props = field.props || {};
    if (component !== null) {
      let item = {
        name: field.field,
        label: field.label !== undefined ? field.label : field.field,
        value: field.value,
        component,
        props: {
          // 这里的 props 会原封不动地传给最终的组件
          type: field.type,
          ...props,
        },
        rules: rulesMapping(field.type, field.rules),
        type: typeConvert(field.type),
        options: field.options || [],
        disabled: field.disabled || false,
        attrs: field.attrs || {}
      };
      if (field.type === 'email' || field.type === 'phone' || field.type === 'mobile') {
        item.rules = [rulesMap[field.type]];
      }
      if (field.layout) {
        item.layout = field.layout;
      }
      if (field.intlPrefix) {
        item.intlPrefix = field.intlPrefix;
      }
      if (field.intl) {
        item.intl = field.intl;
      }
      if (field.API) {
        item.props.API = field.API;
        item.props.options = field.options;
      }
      if (field.type === 'concatenate-select') {
        item.props.childrenValue = field.childrenValue;
      }

      data[field.field] = item;
    }
  })
  console.log("convertFields: data = ", data);

  const Items = BasicForm.generate(data);
  console.log("Items = ", Items);
  return Object.keys(Items).map(item => {
    const Item = Items[item];
    const index = Object.keys(data).find(d => d === item);
    const name = data[index].name;
    const label = getLabel(data[index]);
    const defaultValue = data[index].value;
    const options = data[index].options;
    const type = data[index].type;
    const disabled = data[index].disabled;
    let attrs = data[index].attrs;
    let createItem = formItemMapping[type];
    if (!createItem) {
      createItem = formItemMapping['_customer'];
      const extensions = customerExtenstions[type];
      if (extensions) {
        attrs = { ...attrs, ...extensions };
      }
    }
    return createItem({ Item, name, label, key: name, defaultValue, options, disabled, attrs });

  })
}

export function registerCustomerComponent(type, component, extensions) {
  customerTypeMapping[type] = component;
  customerExtenstions[type] = extensions;
  //console.log('customerTypeMapping:', customerTypeMapping);
  //console.log('typeMapping:', typeMapping);
}
