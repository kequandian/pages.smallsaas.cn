import Statistic from '../components/statistic';

const StatisticDemo = ({

}) => {

  const data1 = {
    layout: 'MS_right',
    group: '',
    items: [
      {
        "chart": "Num",
        "field": "total:curmon:count@stat:order:count",
        "identifier": "1号店$1000",
        "name": "本月订单总数",
        "pattern": "Rate",
        "rates": [
          {
            "id": "1号店$1000",
            "name": "本月订单总数比值",
            "seq": 0,
            "value": "-91"
          },
          {
            "id": "1号店$1000",
            "name": "本月订单总数",
            "seq": 0,
            "value": "7"
          }
        ],
        "span": 1,
        "title": "本月订单总数"
      },
      {
        "chart": "Num",
        "field": "total:curweek:count@stat:order:count",
        "identifier": "1号店$1000",
        "name": "本周订单总数",
        "pattern": "Rate",
        "rates": [
          {
            "id": "1号店$1000",
            "name": "本周订单总数",
            "seq": 0,
            "value": "6"
          },
          {
            "id": "1号店$1000",
            "name": "本周订单总数比值",
            "seq": 0,
            "value": "500"
          }
        ],
        "span": 1,
        "title": "本周订单总数"
      },
      {
        "chart": "Line",
        "field": "total:graph:count@stat:order:count",
        "identifier": "1号店$1000",
        "name": "订单统计",
        "pattern": "RateTimeline",
        "span": 18,
        "timeline": [
          {
            "chart": "",
            "field": "",
            "identifier": "",
            "name": "本月",
            "pattern": "",
            "rates": [
              {
                "id": "1号店$1000",
                "name": "10-01周一",
                "seq": 1,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-02周二",
                "seq": 2,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-03周三",
                "seq": 3,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-04周四",
                "seq": 4,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-05周五",
                "seq": 5,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-06周六",
                "seq": 6,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-07周日",
                "seq": 7,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-08周一",
                "seq": 8,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-09周二",
                "seq": 9,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-10周三",
                "seq": 10,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-11周四",
                "seq": 11,
                "value": "1"
              },
              {
                "id": "1号店$1000",
                "name": "10-12周五",
                "seq": 12,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-13周六",
                "seq": 13,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-14周日",
                "seq": 14,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-15周一",
                "seq": 15,
                "value": "3"
              },
              {
                "id": "1号店$1000",
                "name": "10-16周二",
                "seq": 16,
                "value": "1"
              },
              {
                "id": "1号店$1000",
                "name": "10-17周三",
                "seq": 17,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-18周四",
                "seq": 18,
                "value": "2"
              },
              {
                "id": "1号店$1000",
                "name": "10-19周五",
                "seq": 19,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-20周六",
                "seq": 20,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-21周日",
                "seq": 21,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-22周一",
                "seq": 22,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-23周二",
                "seq": 23,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-24周三",
                "seq": 24,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-25周四",
                "seq": 25,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-26周五",
                "seq": 26,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-27周六",
                "seq": 27,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-28周日",
                "seq": 28,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-29周一",
                "seq": 29,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-30周二",
                "seq": 30,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-31周三",
                "seq": 31,
                "value": "0"
              }
            ],
            "span": 0,
            "title": ""
          },
          {
            "chart": "",
            "field": "",
            "identifier": "",
            "name": "本周",
            "pattern": "",
            "rates": [
              {
                "id": "1号店$1000",
                "name": "10-15周一",
                "seq": 1,
                "value": "3"
              },
              {
                "id": "1号店$1000",
                "name": "10-16周二",
                "seq": 2,
                "value": "1"
              },
              {
                "id": "1号店$1000",
                "name": "10-17周三",
                "seq": 3,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-18周四",
                "seq": 4,
                "value": "2"
              },
              {
                "id": "1号店$1000",
                "name": "10-19周五",
                "seq": 5,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-20周六",
                "seq": 6,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10-21周日",
                "seq": 7,
                "value": "0"
              }
            ],
            "span": 0,
            "title": ""
          },
          {
            "chart": "",
            "field": "",
            "identifier": "",
            "name": "今日",
            "pattern": "",
            "rates": [
              {
                "id": "1号店$1000",
                "name": "0",
                "seq": 1,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "1",
                "seq": 2,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "2",
                "seq": 3,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "3",
                "seq": 4,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "4",
                "seq": 5,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "5",
                "seq": 6,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "6",
                "seq": 7,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "7",
                "seq": 8,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "8",
                "seq": 9,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "9",
                "seq": 10,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "10",
                "seq": 11,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "11",
                "seq": 12,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "12",
                "seq": 13,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "13",
                "seq": 14,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "14",
                "seq": 15,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "15",
                "seq": 16,
                "value": "1"
              },
              {
                "id": "1号店$1000",
                "name": "16",
                "seq": 17,
                "value": "2"
              },
              {
                "id": "1号店$1000",
                "name": "17",
                "seq": 18,
                "value": "4"
              },
              {
                "id": "1号店$1000",
                "name": "18",
                "seq": 19,
                "value": "2"
              },
              {
                "id": "1号店$1000",
                "name": "19",
                "seq": 20,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "20",
                "seq": 21,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "21",
                "seq": 22,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "22",
                "seq": 23,
                "value": "0"
              },
              {
                "id": "1号店$1000",
                "name": "23",
                "seq": 24,
                "value": "0"
              }
            ],
            "span": 0,
            "title": ""
          }
        ],
        "title": ""
      }
    ]
  }


  const data2 = {
    layout: 'Grid_2',
    group: '',
    items: [
      {
        span: 1,
        chart: 'ColumnChain',
        title: '',
        rates: [
          { name: '今日销售额', value: '18000' },
          { name: '昨日销售额', value: '18800' },
          { name: '同比下降', value: '3' },
          { name: 'down', value: '%' },
        ],
      },
      {
        span: 1,
        chart: 'Num',
        title: '',
        rates: [
          { name: '本月订单总数', value: '3213' },
          { name: '同比上周', value: '-72' },
        ],
      },
    ]
  }

  const data3 = {
    layout: 'Grid_1',
    group: '',
    items: [
      {
        span: 1,
        chart: 'Line',// Line Bar
        rates: [
          {
            "id": "1号店$1000",
            "name": "10-01周一",
            "seq": 1,
            "value": "12"
          },
          {
            "id": "1号店$1000",
            "name": "10-02周二",
            "seq": 2,
            "value": "22"
          },
          {
            "id": "1号店$1000",
            "name": "10-03周三",
            "seq": 3,
            "value": "13"
          },
        ],
      },
    ]
  };

  const data4 = {
    layout: 'Grid_1',
    group: '',
    items: [
      {
        span: 1,
        chart: 'Table',
        rates: [
          {
            "name": "10-01周一",
            "value": "12"
          },
          {
            "name": "10-02周二",
            "value": "22"
          },
          {
            "name": "10-03周三",
            "value": "13"
          },
        ],
      },
    ]
  };

  const data5 = {
    layout: 'Grid_1',
    group: '',
    items: [
      {
        span: 1,
        name: '销售额|数量',
        chart: 'BarGroup_2',
        rates: [
          {
            "id": "1号店$1000",
            "name": "10-01周一",
            "seq": 1,
            "value": "12"
          },
          {
            "id": "1号店$1000",
            "name": "10-01周一",
            "seq": 1,
            "value": "16"
          },
          {
            "id": "1号店$1000",
            "name": "10-02周二",
            "seq": 2,
            "value": "22"
          },
          {
            "id": "1号店$1000",
            "name": "10-02周二",
            "seq": 2,
            "value": "11"
          },
          {
            "id": "1号店$1000",
            "name": "10-03周三",
            "seq": 3,
            "value": "13"
          },
          {
            "id": "1号店$1000",
            "name": "10-03周三",
            "seq": 3,
            "value": "20"
          },
        ]
      },
      {
        span: 1,
        name: '标题',
        chart: 'LineTimeline',// Line Bar
        timeline: [
          {
            name: '本月',
            rates: [
              {
                "id": "1号店$1000",
                "name": "10-01周一",
                "seq": 1,
                "value": "22"
              },
              {
                "id": "1号店$1000",
                "name": "10-02周二",
                "seq": 2,
                "value": "12"
              },
              {
                "id": "1号店$1000",
                "name": "10-03周三",
                "seq": 3,
                "value": "23"
              },
            ],
          },
          {
            name: '本周',
            rates: [
              {
                "id": "1号店$1000",
                "name": "10-01周一",
                "seq": 1,
                "value": "26"
              },
              {
                "id": "1号店$1000",
                "name": "10-02周二",
                "seq": 2,
                "value": "11"
              },
              {
                "id": "1号店$1000",
                "name": "10-03周三",
                "seq": 3,
                "value": "20"
              },
            ],
          }
        ]
      },
    ]
  };

  const statisticProps = {
    // ...data1,
    // ...data2,
    // ...data3,
    // ...data4,
    ...data5,
  }

  const props2 = {
    ...data2
  }

  const columnStatisticProps1 = {
    title: '今日销售额',
    subTitle: '昨日：*19000',
    value: '*18000',
    note: '下降 2%',
    iconType: 'down',
  }

  const columnStatisticProps2 = {
    title: '今日销售额',
    subTitle: '昨日：*19000',
    value: '*18000',
    note: '下降 2%',
    iconType: 'down',
  }


  const barProps = {
    span: 3,
    levelDisplay: false,
    title: '本度月季报表',
    Axis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    series: [
      {
        name: '蒸发量',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      },
      {
        name: '降水量',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      }
    ]
  }


  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Statistic {...statisticProps} />
      {/* <LineGrid>
        <NumberRows span={3}>
          <Bar {...barProps}/>
        </NumberRows>
        <NumberRows span={1} height={300}>
          <ColumnStatistic {...columnStatisticProps1}/>
          <ColumnStatistic {...columnStatisticProps2}/>
        </NumberRows>
      </LineGrid> */}
    </div>
  )
}

export default StatisticDemo;
