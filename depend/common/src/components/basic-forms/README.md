import { BasicForm } from 'kqd-common';

```
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
  Perms: {
    name: 'perms',
    label: '权限',
    component: Checkbox.Group
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
const defaultLocation = '广州';

const Items = BasicForm.generate(data);

```


```
<BasicForm onSubmit={action('submitted')}>
  <Items.Account name='account' />
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
  <BasicForm.Submit>提交</BasicForm.Submit>
</BasicForm>
```
