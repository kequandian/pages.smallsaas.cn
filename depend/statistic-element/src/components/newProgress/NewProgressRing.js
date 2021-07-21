/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <NewProgressRing
      value = 0
      >
    </NewProgressRing>
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';

class NewProgressRing extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: props.value || 0,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value && nextProps.value != this.state.value){
      this.setState({
        value: nextProps.value
      })
    }
  }

  getOption = () => {
    const { value } = this.state;
    let x = value.toString().length < 2 ? 0 + '' + value : value.toString();
    let numberIndex = 0;
    let numberLast = 0;
    let dataList = [];
    if(value != 100){
       numberIndex = x.charAt(0);
       numberLast = x.charAt(1);
        dataList = [
           {value:numberIndex != 0 ? 10 : numberLast,maxValue:'10', name:'1',itemStyle:{color: value > 0 ? '#e9cb8e' : '#f6ebca'}},
           {value:numberIndex != 1 ? 10 : numberLast,maxValue:'10', name:'2',itemStyle:{color: value > 10 ? '#e7c887' : '#f6ebca'}},
           {value:numberIndex != 2 ? 10 : numberLast,maxValue:'10', name:'3',itemStyle:{color: value > 20 ? '#ebc980' : '#f6ebca'}},
           {value:numberIndex != 3 ? 10 : numberLast,maxValue:'10', name:'4',itemStyle:{color: value > 30 ? '#e7c271' : '#f6ebca'}},
           {value:numberIndex != 4 ? 10 : numberLast,maxValue:'10', name:'5',itemStyle:{color: value > 40 ? '#e3bb63' : '#f6ebca'}},
           {value:numberIndex != 5 ? 10 : numberLast,maxValue:'10', name:'6',itemStyle:{color: value > 50 ? '#e3b858' : '#f6ebca'}},
           {value:numberIndex != 6 ? 10 : numberLast,maxValue:'10', name:'7',itemStyle:{color: value > 60 ? '#dfb14b' : '#f6ebca'}},
           {value:numberIndex != 7 ? 10 : numberLast,maxValue:'10', name:'8',itemStyle:{color: value > 70 ? '#dfb14b' : '#f6ebca'}},
           {value:numberIndex != 8 ? 10 : numberLast, maxValue:'10',name:'9',itemStyle:{color: value > 80 ? '#dda62d' : '#f6ebca'}},
           {value:value > 90 && value != 100 ? numberLast : 10,maxValue:'10', name:'10',itemStyle:{color:value > 90 ? '#dfa014' : '#f6ebca'}}
       ];
       if(numberIndex == 9 && numberLast != 0){
         const data = {value:10-numberLast, name:'11',itemStyle:{color: '#f6ebca'}}
         dataList.push(data)
       }
       if(numberLast == 0 && numberIndex != 9){
         const data = {value:10, name:'11',itemStyle:{color: '#f6ebca'}}
         dataList.push(data)
       }
    } else {
      dataList = [
          {value: 10 , name:'1',itemStyle:{color:value == 0 ? '#f6ebca' : '#e9cb8e'}},
          {value: 10 , name:'2',itemStyle:{color:value == 0 ? '#f6ebca' : '#e7c887'}},
          {value: 10 , name:'3',itemStyle:{color:value == 0 ? '#f6ebca' : '#ebc980'}},
          {value: 10 , name:'4',itemStyle:{color:value == 0 ? '#f6ebca' : '#e7c271'}},
          {value: 10 , name:'5',itemStyle:{color:value == 0 ? '#f6ebca' : '#e3bb63'}},
          {value: 10 , name:'6',itemStyle:{color:value == 0 ? '#f6ebca' : '#e3b858'}},
          {value: 10 , name:'7',itemStyle:{color:value == 0 ? '#f6ebca' : '#dfb14b'}},
          {value: 10 , name:'8',itemStyle:{color:value == 0 ? '#f6ebca' : '#dfb14b'}},
          {value: 10 , name:'9',itemStyle:{color:value == 0 ? '#f6ebca' : '#dda62d'}},
          {value: 10 , name:'10',itemStyle:{color:value == 0 ? '#f6ebca' : '#dfa014'}}
      ]
    }




    return {
        title: {
            // text: title,
            // subtext: '模拟数据',
            // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'center',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'top',
            // itemGap设置主副标题纵向间隔，单位px，默认为10，
            itemGap: 30,
            backgroundColor: '#EEE',
            // 主标题文本样式设置
            textStyle: {
              fontSize: 26,
              fontWeight: 'bolder',
              color: '#000080'
            },
            // 副标题文本样式设置
            subtextStyle: {
              fontSize: 18,
              color: '#8B2323'
            }
         },
         toolbox: {
               show : false,
               feature : {
                   mark : {show: false},
                   dataView : {show: true, readOnly: true},
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
               }
           },

          // color:['#e5f1fa', '#e5f1fa','#e5f1fa','#e5f1fa','#e5f1fa', '#e5f1fa','#e5f1fa','red','blue','yellow'],
           legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: 'vertical',
            // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'left',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'center',
            itemWidth: 24,   // 设置图例图形的宽
            itemHeight: 18,  // 设置图例图形的高
            textStyle: {
              color: '#666'  // 图例文字颜色
            },
            // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
            itemGap: 30,
            backgroundColor: '#eee',  // 设置整个图例区域背景颜色
            // data: ['1','2','3','4','5','6','7','8','9','10'],
            data:[]
          },
          series: [
            {
              name: '生源地',
              type: 'pie',
              // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
              radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['50%', '50%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
              data:dataList,

              // itemStyle 设置饼状图扇形区域样式
              itemStyle: {
                // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                normal: {
                   borderColor: "#fff", borderWidth: 1,
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(30, 144, 255，0.5)'
                }
              },
              // 设置值域的那指向线
              labelLine: {
                normal: {
                  show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                }
              },
              // 设置值域的标签
              label: {
                normal: {
                  // position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                  // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                  // {a}指series.name  {b}指series.data的name
                  // {c}指series.data的value  {d}%指这一部分占总数的百分比
                  formatter: '{c}',
                  show:false
                }
              }
            }
        ],
    }
  }

  render(){

    const { value } = this.state;

    const numberStyle = {
        position: 'absolute',
        top: 'calc(50% - 13px)',
        left: value.toString().length == 3 ? 'calc(50% - 15px)' : value.toString().length == 2 ? 'calc(50% - 10px)' : 'calc(50% - 5px)',
        fontSize: '18px',
        fontWeight: 'bold',
        ...this.props.style
    }

    return (
      <div style={{ position: 'relative'}}>
        <ReactEcharts option={this.getOption()}/>
        <div style={numberStyle}>{ this.state.value }</div>
      </div>
    )
  }
}

export default NewProgressRing;
