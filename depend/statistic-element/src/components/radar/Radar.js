/**
    * @author Yang,YN
    * @editor
    * @updated
    * @desc    雷达图组件
    * @eg
    <Radar>
      indicator:[]     // 雷达图的指示器，用来指定雷达图中的多个变量（维度）,跟data中 value 对应
      areaBackgroundColor = []     //指每个圈的背景颜色
      dataList =  [], //数据值
      aroundBackColor =  '#fadebb'    //包围区域的颜色
    </Radar>
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';

class Radar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      backgroundColor: props.backgroundColor || '',  //设置背景
      splitNumber: props.splitNumber || 3,     //默认雷达图的圈数为3
      indicator: props.indicator || [],
      areaBackgroundColor: props.areaBackgroundColor || ['#f5c8b4', '#e2ae97','#cd937a'],
      dataList: props.dataList || [],
      aroundBackColor: props.aroundBackColor || '#fadebb',
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      backgroundColor: nextProps.backgroundColor || '',  //设置背景
      splitNumber: nextProps.splitNumber || 3,     //默认雷达图的圈数为3
      indicator: nextProps.indicator || [],
      areaBackgroundColor: nextProps.areaBackgroundColor || ['#f5c8b4', '#e2ae97','#cd937a'],
      dataList: nextProps.dataList || [],
      aroundBackColor: nextProps.aroundBackColor || '#fadebb',
    })
  }

  render(){

    const { backgroundColor,splitNumber,indicator,areaBackgroundColor,dataList,aroundBackColor } = this.state;

    var getOption = () => {
        return {
          backgroundColor: backgroundColor,  //设置背景色
          title: {
              // text: title
          },
          legend: {
            show: true,
            orient : 'vertical', // 图例列表的布局朝向,'horizontal'为横向,''为纵向.
            top : '40%',                    // 图例距离顶部边距
	          left : '15%',
            data:['预防护理','持续护理','集中护理']
          },
          radar: {
              // shape: 'circle',
              splitNumber: splitNumber, // 雷达图圈数设置
              name: {
                  textStyle: {
                      color: '#000',
                      fontSize: '13px',
                      borderRadius: 3,
                      padding: [3, 5],
                      ...this.props.textStyle
                 }
              },
              axisLine: {
                lineStyle: {
                    color: '#fdecd5',     // 设置雷达图中间射线的颜色
                }
              },
              indicator: indicator,
              splitArea : {
                 show : true,
                 areaStyle : { color: areaBackgroundColor } //设置圈的背景颜色
             },
            splitLine : {
              show : false,
              lineStyle : {
                  width : 1,
                  color : 'blue', // 设置网格的颜色
              }
          }
      },
          series: [{
              // name: '预算 vs 开销（Budget vs spending）',
              type: 'radar',
              data : [
                  {
                      value : dataList,
                  },
              ],
              itemStyle: {
                    normal: {
                        color: 'rgba(255,225,0,.3)',
                        backgroundColor: 'blue',
                        lineStyle: {
                            color: 'rgba(255,225,0,.3)',    //线条的颜色
                        },
                    },
                },
                areaStyle: {
                 normal: {
                     color: aroundBackColor     //包围区域的颜色
                 }
             }
          }]
      };
    }

    return (
      <div>
        <ReactEcharts option={getOption()}/>
      </div>
    )
  }
}

export default Radar;
