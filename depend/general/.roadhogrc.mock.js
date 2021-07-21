import Mock from 'mockjs';
import qs from 'qs';
// import { getRule, postRule } from './mock/rule';
// import { getActivities, getNotice, getFakeList } from './mock/api';
// import { getFakeChartData } from './mock/chart';
// import { imgMap } from './mock/utils';
// import { getProfileBasicData } from './mock/profile';
// import { getProfileAdvancedData } from './mock/profile';
// import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {

  'POST /api/oauth/login': (req, res) => {
    res.send({
      code: 200,
      data: {
        account: 'admin',
        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0ZW5hbnRJZCI6Ijg3NjcwODA4MjQzNzE5NzgyNCIsInVzZXJJZCI6Ijg3NjcwODA4MjQzNzE5NzgyNyIsImFjY291bnQiOiJhZG1pbiIsImlhdCI6MTUyMTUyNzM2MywianRpIjoiODc2NzA4MDgyNDM3MTk3ODI3Iiwic3ViIjoiYWRtaW4iLCJleHAiOjE1MjE3ODY1NjN9.CkGoMyEMg9T1DTVDot5YV-eghaPXVHsnfS2bLVBzs3ziJJDxzltWZab7kyvUlXREzV6B0jldldIg3LZ5Hkd4dQ'
      }
    });
  },

  'GET /api/adm/users/*': (req, res) => {
    res.send({
      code: 200,
      data: {
        id: 1,
        account: 'xxx',
        password: 'xxxx',
        fields: [
          {
            field: 'group 1',
            label: '',
            type: 'group',
            span: 3,
          },
          {
             field: 'account',
             type: 'select',//, password, number, input,email ,phone, mobile,idcard, datetime,
             value: 'b',
             options: [
               { key: 'A', value: 'a' }, { key: 'B', value: 'b' }, { key: 'C', value: 'c' }
             ],
             rules: [
               { required: true }
             ]
          },
          {
            field: 'password',
            type: 'password',
            rules: [
              { required: true }
            ]
          },
          {
            field: 'count',
            type: 'number',
            disabled: true,
            value: 5,
          },
          {
            field: 'perms',
            type: 'checkbox',
            value: [ 'edit' ],
            options: [
              {
                key: 'ADD',
                value: 'add'
              },
              {
                key: 'EDIT',
                value: 'edit'
              }
            ]
          },
          {
            field: 'group 2',
            label: '',
            type: 'group',
            span: 3,
          },
          {
            field: 'count2',
            type: 'number',
            value: 4,
          },
          {
            field: 'assigned',
            type: 'switch',
            value: true,
          },
          {
            field: 'email',
            type: 'email'
          },
          {
            field: 'phone',
            type: 'phone'
          },
          {
            field: 'mobile',
            type: 'mobile'
          },
          {
            field: 'birthday',
            type: 'date',
            value: '1990-12-13'
          },
          {
            field: 'entryTime',
            type: 'month',
            value: '2005-12'
          },
          {
            field: 'educationTime',
            type: 'range',
            value: ['2012-12', '2016-08'],
            options: [
              { key: 'format', value: 'YYYY/MM/DD' }, { key: 'showTime', value: true }
            ]
          },
          {
            field: 'signTime',
            type: 'time',
            value: '09:12:22'
          },
          {
            field: 'registerTime',
            type: 'datetime',
            value: '2018-04-23 23:01:43'
          },
          {
            field: 'description',
            type: 'textarea',
            value: 'This is a test textarea.',
            span: 3,
            options: [
              //{ key: 'rows', value: 9 },
              //{ key: 'minRows', value: 3 }, { key: 'maxRows', value: 5 }
            ]
          },
          {
            field: 'workLocation',
            type: 'radio',
            value: 'bj',
            options: [
              { key: '广州', value: 'gz' }, { key: '北京', value: 'bj' }, { key: '上海', value: 'sh' }
            ]
          },
          {
            field: 'englishLevel',
            type: 'rate',
            value: 2.5,
            options: [
              { key: 'allowHalf', value: true }
            ]
          },
          {
            field: 'range',
            type: 'slider',
            value: [20, 30],
            options: [
              { key: 'min', value: 10 }, { key: 'max', value: 50 }, { key: 'range', value: true }
            ]
          },
          {
            field: 'group 3',
            label: '',
            type: 'group',
            span: 3,
          },
          {
            field: 'city',
            type: 'cascader',
            value: ['gd', 'fs', 'cc'],
            options: [
              { key: '广东', value: 'gd', children: [
                { key: '广州', value: 'gz', children: [
                  { key: '荔湾', value: 'lw' }, { key: '越秀', value: 'yx' }, { key: '天河', value: 'th' }
                ]},
                { key: '佛山', value: 'fs', children: [
                  { key: '南海', value: 'nh' }, { key: '禅城', value: 'cc' }
                ]}
              ]}
            ]
          },
          {
            field: 'department',
            type: 'tree',
            value: '11',
            options: [
              { key: '萝岗办公室', value: '1', children:[
                { key: '研发部', value: '11' }, { key: '测试部', value: '12' }
              ] },
              { key: '荔湾办公室', value: '2', children: [
                { key: '研发部', value: '21' }, { key: '测试部', value: '22' }
              ]}
            ]
          }
        ]
      }
    });
  },

  'GET /api/adm/users': (req, res) => {
    const page = qs.parse(req.query);
    const current = parseInt(page.current || 1);
    const data = Mock.mock({
      'code': 200,
      'message': 'Success',
      data: {
        'total': 30,
        'current': current,
        "records|10": [
          {
            'id|+1': current * 10,
            'account': 'account',
            'name': 'name'
          }
        ]
      }
    });
    res.send(data);
  },

  'PUT /api/adm/users/1': (req, res) => {
    res.send({
      code: 200,
      message: 'Success',
      data: {
        id: 1
      }
    });
  },

  'DELETE /api/adm/users/1': (req, res) => {
    res.send({
      code: 200,
      message: 'Success',
    });
  },

  'DELETE /api/adm/users': (req, res) => {
    res.send({
      code: 200,
      message: 'Success',
    });
  },

  'POST /api/adm/users': (req, res) => {
    res.send({
      code: 200,
      message: 'Success',
      data: {
        id: 123,
      }
    });
  },


  'GET /api/adm/roles': (req, res) => {
    res.send({
      code: 200,
      message: 'success',
      data: [
        {
          id: 1,
          name: 'Admin'
        },
        {
          id: 2,
          name: 'User'
        }
      ]
    })
  }

};

export default noProxy ? {} : delay(proxy, 1000);
