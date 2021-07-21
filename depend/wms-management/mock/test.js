export default {
   'GET /api/wms/procurements': (req, res) => {
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
    'GET /api/wms/procurements/1': (req, res) => {
      res.send({
        code: 200,
        data: {
          current:1,
          total: 1,
          data: { id: 1, name: '张三', sex: 0, IDCard: '123456', money: 123 }
        }
      });
    },
    'GET /api/wms/transfers': (req, res) => {
      res.send({
        code: 200,
        data: {
          current:1,
          total: 3,
          records:[
            { id: 1, name: '张三', sex: 0, IDCard: '123456', money: 123 },
            { id: 2, name: '李四', sex: 0, IDCard: '123457', money: 321.02 },
            { id: 3, name: '王五', sex: 1, IDCard: '123458', money: 1234567 }
          ]
        }
      });
    },
    'GET /api/wms/transfers/1': (req, res) => {
      res.send({
        code: 200,
        data: {
          current:1,
          total: 1,
          data: { id: 1, name: '张三', sex: 0, IDCard: '123456', money: 123 }
        }
      });
    },
}

