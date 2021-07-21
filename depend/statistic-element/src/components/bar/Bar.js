/**
    * @author Yang,YN  2018-9-7
    * @editor
    * @updated
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

import React from 'react';
import ReactEcharts from 'echarts-for-react';

class Bar extends React.Component {

  constructor(props){
    super(props);
      this.state = {
        levelDisplay: props.levelDisplay || false
      }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps===", nextProps);
    this.setState({
      levelDisplay: nextProps.levelDisplay || false,
    })
  }

  render(){

    const { title,Axis,series,echart } = this.props;

    const { levelDisplay } = this.state;

    let newLegend = [];

    series && series.length > 0 && series.map((item,index) => {
      series[index] = {
        name:item.name || '',
        type:'bar',
        data:item.data,
        // barWidth: 30,
        barMaxWidth: '60',
        markPoint : {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
        },
        markLine : {
            data : [
                {type : 'average', name: '平均值'}
            ]
        }
      }
      //获取legend
      newLegend.push(item.name)
    })

    //决定水平展示还是垂直展示
    const newXAxis = !levelDisplay ?
    [
        {
            type : 'category',
            data : Axis,
        }
    ] : [
        {
            type : 'value'
        }
    ]

    const newxYxis = !levelDisplay ?
    [
        {
            type : 'value'
        }
    ] : [
        {
            type : 'category',
            data : Axis,
        }
    ]

    const getOption = () => {
      return {
        // barMinHeight: 500,
        title: {
            text: title,
            // left: 'center'  //标题居中
        },

        legend: {
            data: newLegend,
        },
        grid:{
          top: '25%',
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {     //展示保存为图片
            feature: {
                saveAsImage: {}
            }
        },
        Calulable:false,
        xAxis: newXAxis,
        yAxis: newxYxis,
        series: series
      }
    }

    return (
      <div>
        <ReactEcharts option={getOption()}/>
      </div>
    )
  }
}

export default Bar;
