/**
    * @author LLH
    * @editor
    * @updated 2018年10月10日
    * @desc  展示饼图
    * @eg
    <Pie>
      title = ''
      series = []    值目录
      echart = {}    其他配置
    </Pie>
 */
import GeneralChartWrapped from './index';

export default GeneralChartWrapped(
  {
    CHART: 'pie',
    title: {
        x: 'center',
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series: {
        radius : '55%',
        center: ['50%', '60%'],
    },
    calculable : true,
  },
  (option) => {
    const { xAxis, yAxis, ...restOption } = option;
    return {
        ...restOption,
        legend: {
            ...restOption.legend,
            data: restOption.series[0].data.map( item => item.name ),
        },
    };
  },
);