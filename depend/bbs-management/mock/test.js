export default {
   'GET /api/test': (req, res) => {
      res.send({
        code: 200,
        data: {
          current:1,
          total: 1,
          records:[
            { id: 1, name: '张三', sex: 0, IDCard: '123456', money: 123 },
            { id: 2, name: '李四', sex: 0, IDCard: '123457', money: 321.02 },
            { id: 3, name: '王五', sex: 1, IDCard: '123458', money: 1234567 }
          ]
        }
      });
    },
    'GET /api/test/config': (req, res) => {
      res.send({
        code: 200,
        data: {
          _config: {
            header: {
              title: '测试'
            },
            operation: {
              action: [
                { title: '添加', action: 'add' }
              ]
            },
            search: {
              fields: [
                {
                   field: 'account',
                   placeholder: '账号',
                   type: 'select',
                   options: [
                     { key: 'A', value: 'a' }, { key: 'B', value: 'b' }, { key: 'C', value: 'c' }
                   ],
                },
                {
                  field: 'count',
                  placeholder: '输入一个数字',
                  type: 'input',
                },
                {
                  field: 'count2',
                  placeholder: '输入一个数字2',
                  type: 'input',
                },
                {
                  field: 'count3',
                  placeholder: '输入一个数字3',
                  type: 'input',
                },
                {
                  field: 'count4',
                  placeholder: '输入一个数字4',
                  type: 'input',
                }
              ]
            },
            table: {
              columns: [
                { title: '姓名', field: 'name' },
                { title: '性别', field: 'sex', valueType: 'sex'},
                { title: '会员卡号', field: 'IDCard', valueType: 'number' },
                { title: '余额', field: 'money', valueType: 'currency' },
              ],
              operation: [
                { title: '详情', action: 'query' },
                { title: '编辑', action: 'edit' },
                { title: '删除', action: 'delete' },
              ]
            },
            form: {
              fields: [
                { field: 'name', type: 'input' },
                { field: 'name2', type: 'input' },
                { field: 'name3', type: 'input' },
                { field: 'name4', type: 'input' },
                { field: 'name5', type: 'input' }
              ],
              colNumber: 2
            }
          }
        }
      });
    },
    'GET /api/test/*': (req, res) => {
      res.send({
        code: 200,
        data: {
            'id': '1',
            'name': '张三',
            'sex': '1',
            'IDCard': '123456',
            'money': '123',
        }
      });
    },
    'POST /api/test': (req, res) => {
      res.send({
        code: 200,
        message: 'success'
      });
    },
    'PUT /api/test/*': (req, res) => {
      res.send({
        code: 200,
        message: 'success'
      });
    },

    'DELETE /api/test/*': (req, res) => {
      res.send({
        code: 200,
        message: 'success'
      });
    },
}

