/**
    * @author Yang,YN  2018-9-7
    * @editor
    * @updated
    * @desc
    * @eg
    <Pie>
      title = ''
      series = []    值目录
      echart = {}    其他配置
    </Pie>
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';

class Pie extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    const { title,series,echart } = this.props;

    let newLegend = [];
    if(series && series.length > 0) {
      if(series[0].data && series[0].data.length > 0){
        series[0].data.map((item,index) => {
          newLegend.push(item.name)
        })
      }
    }

    series && series.length > 0 && series.map((item,index) => {
      series[index] = {
        name:item.name || '',
        type:'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data: item.data || []
      }
      //获取legend
    })


    console.log('kkkk newLegend = ',newLegend);

    var getOption = () => {
      return {
            title : {
                text: title || '',
                // subtext: '纯属虚构',
                x:'center'
             },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data:newLegend
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
            calculable : true,
            series : series
      }
    }

    return (
      <div>
        <ReactEcharts option={getOption()}/>
      </div>
    )
  }
}

export default Pie;
