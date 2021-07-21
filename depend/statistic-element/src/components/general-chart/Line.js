/**
    * @author LLH
    * @editor
    * @updated 2018年10月10日
    * @desc  展示折线图
    * @eg
    <Line>
      title = ''
      Axis = []      类目录
      series = []    值目录
      levelDisplay = false   //水平展示还是垂直展示，默认垂直
      echart = {}    其他配置
    </Line>
 */
import GeneralChartWrapped from './index';

export default GeneralChartWrapped(
  {
    CHART: 'line',
    tooltip: {},
    series: {
      markLine : {
        data : [
            {type : 'average', name: '平均值'}
        ]
      },
    },
  },
  (option) => {
    console.log('Line EChart option:',option);
    return option;
  },
);