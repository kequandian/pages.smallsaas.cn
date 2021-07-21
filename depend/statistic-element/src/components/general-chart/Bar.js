/**
    * @author LLH
    * @editor
    * @updated 2018年10月10日
    * @desc  展示柱形图
    * @eg
    <Bar>
      title = ''
      Axis = []      类目录
      series = []    值目录
      levelDisplay = false   //水平展示还是垂直展示，默认垂直
      echart = {}    其他配置
    </Bar>
 */
import GeneralChartWrapped from './index';

export default GeneralChartWrapped(
  {
    CHART: 'bar',
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {     //展示保存为图片
        feature: {
            saveAsImage: {}
        }
    },
    series: {
      barMaxWidth: '60',
    //   markPoint : {
    //       data : [
    //           {type : 'max', name: '最大值'},
    //           {type : 'min', name: '最小值'}
    //       ]
    //   },
      markLine : {
          data : [
              {type : 'average', name: '平均值'}
          ]
      },
      label: {
        normal: {
            show: true,
            position: 'top',
            formatter: (data) => {
                if(Number(data.value) === 0){
                    return '';
                }
                return data.value;
            }
        }
    },
    },
    Calulable:false,
  },
  (option) => {
    console.log('Bar EChart option:',option);
    return option;
  },
);