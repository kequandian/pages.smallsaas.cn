import React, { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withReadme, withDocs } from 'storybook-readme';

import { Button, Row, Col, Input, InputNumber, DatePicker, Checkbox, Rate, Radio, Switch, Select } from 'antd';

import BasicForm from '../src/components/basic-forms';
import BasicFormReadme from '../src/components/basic-forms/README.md';

const data = {
  Account: {
    //component: Input,
    name: 'account',
    label: '登录名',
    props: {
      placeholder: '给用户起个唯一的登录名',
    },
    rules: [{
      required: true, message: '请输入登录名!',
    }],
  },
  Name: {
    name: 'name',
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
    },
    rules: [{
      required: true, message: '请输入用户名!',
    }],
  },
  Password: {
    name: 'password',
    //layout: formItemLayout,
    label: '密码',
    props: {
      type: 'password',
      placeholder: ''
    },
    rules: [{
      required: true, message: '请输入密码！',
    }],
  },
  Count: {
    name: 'count',
    label: '数量',
    component: InputNumber,
  },
  Description: {
    name: 'description',
    label: '描述',
    component: Input.TextArea,
  },
  Birthday: {
    name: 'birthday',
    label: '生日',
    component: DatePicker,
  },
  WorkStartTime: {
    name: 'workStartTime',
    label: '参加工作时间',
    component: DatePicker.MonthPicker,
  },
  English: {
    name: 'english',
    label: '英语水平',
    component: Rate
  },
  WorkLocation: {
    name: 'workLocation',
    label: '工作地点',
    component: Radio.Group
  },
  Assigned: {
    name: 'assigned',
    label: '服从分配',
    component: Switch
  },
  Role: {
    name: 'role',
    label: '角色',
    component: Select,
  },
  Perms: {
    name: 'perms',
    label: '权限',
    component: Checkbox.Group
  },
  Plain: {
    name: 'plain',
    label: 'Plain Text',

  }
};

const perms = [
  { label: '权限1', value: '1' },
  { label: '权限2', value: '2' },
  { label: '权限3', value: '3' },
];
const defaultPerms = ['1', '3'];

const workLocations = [
  { label: '广州', value: '广州' },
  { label: '北京', value: '北京' },
  { label: '上海', value: '上海' },
  { label: '深圳', value: '深圳' },
];
const defaultLocation = '北京';

const Items = BasicForm.generate(data);

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

let data2 = { };
Object.keys(data).map(d => {
  data2[d] = {
    ...data[d],
    layout,
  }
});
const Items2 = BasicForm.generate(data2);

storiesOf('BasicForm', module)
  .addDecorator(withReadme(BasicFormReadme))
  .add('Default',
    withNotes('基本表单')(() => (
      <BasicForm onSubmit={action('submitted')}>
        <Items.Account name='account' disabled='true' />
        <Items.Name name='name' />
        <Items.Password name='password' />
        <Items.Count name='count' />
        <Items.Description name='description' />
        <Items.Birthday name='birthday' />
        <Items.WorkStartTime name='workStartTime' />
        <Items.WorkLocation name='workLocation' options={workLocations} defaultValue={defaultLocation} />
        <Items.Assigned name='assigned' defaultChecked={true} />
        <Items.English name='english' allowHalf defaultValue={2.5} />
        <Items.Perms name='perms' options={perms} defaultValue={defaultPerms} />
        <Items.Role name='role' defaultValue='user'>
          <Select.Option value='admin'>Admin</Select.Option>
          <Select.Option value='user'>User</Select.Option>
        </Items.Role>
        <Items.Plain isPlain={true} defaultValue='China' />
        <BasicForm.Submit>提交</BasicForm.Submit>
      </BasicForm>
  )))
  .add('分列',
    withNotes('基本表单')(() => (
      <BasicForm onSubmit={action('submitted')}>
        <Row gutter={24}>
          <Col span={8}><Items2.Account name='account' /></Col>
          <Col span={8}><Items2.Name name='name' /></Col>
          <Col span={8}><Items2.Password name='password' /></Col>
        </Row>
        <BasicForm.Submit extra={[<Button style={{marginLeft: 8}}>取消</Button>,<Button style={{marginLeft: 8}}>取消2</Button>]}>提交</BasicForm.Submit>
      </BasicForm>
  )))
  .add('布局',
    withNotes('基本表单')(() => (
      <BasicForm onSubmit={action('submitted')} layout='inline'>
        <Items2.Account name='account' />
        <Items2.Name name='name' />
        <Items2.Password name='password' />
        <BasicForm.Submit layout={{}}
          pre={[<Button style={{marginRight: 8}}>前置</Button>]}
          extra={[<Button style={{marginLeft: 8}}>取消</Button>]}>提交</BasicForm.Submit>
      </BasicForm>
  )))
