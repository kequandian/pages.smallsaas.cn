export default {
   'GET /api/wms/sku/units': (req, res) => {
      res.send({
        code: 200,
        data: {
          current:1,
          total: 3,
          records:[
            { id: 1, name: '张三', sex: 0, IDCard: '123456', money: 123 },
            { id: 2, name: '李四', sex: 0, IDCard: '123457', money: 321.02 },
            { id: 3, name: '王五', sex: 1, IDCard: '123458', money: 1234567 },
            { id: 4, name: '以上皆为 mock 数据', sex: 1, IDCard: '10086', money: 10086 },
          ]
        }
      });
    },
    'GET /api/wms/sku/units/*': (req, res) => {
      res.send({
        code: 200,
        data: { id: 10086, name: 'mock数据', sex: 0, IDCard: '123456', money: 123 }
      });
    },
    'POST /api/wms/sku/units/*': (req, res) => {
      res.send({
        code: 200,
      });
    },
    'PUT /api/wms/sku/units/*': (req, res) => {
      res.send({
        code: 200,
      });
    },
    'DELETE /api/wms/sku/units/*': (req, res) => {
      res.send({
        code: 200,
      });
    },
}

