export default {
    'GET /api/AppointmentManagement': (req, res) => {
      res.send({
        code: 200,
        data: {
          total: 4,
          current: 1,
          records: [
                        {
                                'id': '1',
                                'state': '已预约',
                                'code': '1',
                                'factory': '1',
                                'model': '1',
                                'createTime': '1',
                            },
                        {
                                'id': '2',
                                'state': '未到店',
                                'code': '1',
                                'factory': '1',
                                'model': '1',
                                'createTime': '1',
                            },
                        {
                                'id': '3',
                                'state': '已到店',
                                'code': '1',
                                'factory': '1',
                                'model': '1',
                                'createTime': '1',
                            },
                        {
                                'id': '4',
                                'state': '待付款',
                                'code': '1',
                                'factory': '1',
                                'model': '1',
                                'createTime': '1',
                            },
                      ]
        }
      });
    },

    'GET /api/CashierClient/*': (req, res) => {
      res.send({
        code: 200,
        data: {
                        'id': '1',
                        'storeId': '1',
                        'code': '1',
                        'factory': '1',
                        'model': '1',
                        'createTime': '1',
                    }
      });
    },

    'POST /api/CashierClient': (req, res) => {
      res.send({
        code: 200,
        message: 'success'
      });
    },

    'PUT /api/CashierClient/*': (req, res) => {
      res.send({
        code: 200,
        message: 'success'
      });
    },

    'DELETE /api/CashierClient/*': (req, res) => {
      res.send({
        code: 200,
        message: 'success'
      });
    },
}

