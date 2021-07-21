export default {
    'GET /api/wms/skus/*': (req, res) => {
      res.send({
        code: 200,
        data: {
          "barCode":"",
          "costPrice":"",
          "createTime":"2018-07-26 14:03:43",
          "description":"",
          "field1":"",
          "field2":"",
          "field3":"",
          "id":"1",
          "productId":"9",
          "readjustCostPrice":"",
          "searchKeyWord":"",
          "skuCode":"17c4fa2147d645e18960012b302ad335",
          "skuName":"商品名称",
          "skuPrice":"",
          "sortValue":"",
          "status":"",
          "stockCost":"",
          "suggestedPrice":"",
          "updateTime":""
        }
      });
    },
    'GET /api/cms/evaluations': (req, res) => {
      res.send({
        code: 200,
        data: {
          current: 1,
          total: 1,
          records: [
            {
              id: 1,
              name: '张三',
              createTime: '2018年7月23日 10点29分',
              content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容'
            },
            {
              id: 2,
              name: '张三',
              createTime: '2018年7月23日 10点29分',
              content: '评论内容评论内容评论内容评论'
            },
            {
              id: 3,
              name: '张三',
              createTime: '2018年7月23日 10点29分',
              content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论'
            }
          ]
        }
      });
    },
    'GET /api/cms/evaluations/*': (req, res) => {
      res.send({
        code: 200,
        data: {
          code: '18052314194206011060',
          "barCode":"",
          "costPrice":"",
          "createTime":"2018-07-26 14:03:43",
          "description":"",
          "field1":"",
          "field2":"",
          "field3":"",
          "id":"1",
          "productId":"9",
          "readjustCostPrice":"",
          "searchKeyWord":"",
          "skuCode":"17c4fa2147d645e18960012b302ad335",
          "skuName":"商品名称",
          "skuPrice":"",
          "sortValue":"",
          "status":"",
          "stockCost":"",
          "suggestedPrice":"",
          "updateTime":""
        }
      });
    },
    'GET /api/test/*': (req, res) => {
      res.send({
        code: 200,
        data: {
          code: '18052314194206011060',
          "barCode":"",
          "costPrice":"",
          "createTime":"2018-07-26 14:03:43",
          "description":"",
          "field1":"",
          "field2":"",
          "field3":"",
          "id":"1",
          "productId":"9",
          "readjustCostPrice":"",
          "searchKeyWord":"",
          "skuCode":"17c4fa2147d645e18960012b302ad335",
          "skuName":"商品名称",
          "skuPrice":"",
          "sortValue":"",
          "status":"",
          "stockCost":"",
          "suggestedPrice":"",
          "updateTime":""
        }
      });
    },
}

