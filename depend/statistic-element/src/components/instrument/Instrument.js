/**
    * @author Yang,YN
    * @editor
    * @updated
    * @desc   仪表图组件
    * @eg
    <Instrument>
      name = '',  name代表标题，
      value = 0 , value表示值
      titleType = ''  值后面的单位
    </Instrument>
 */


import React from 'react';
import ReactEcharts from 'echarts-for-react';

class Instrument extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: props.name || '',
      value: props.value || 0,
      titleType: props.titleType || ''
    }
  }

  render(){

    const { name,value,titleType } = this.state;

    const series = [
      {
        name: name,
        type:'gauge',
        detail: {formatter:"{value}" + `${titleType}`},
        data: [{
          value: value,
          name: name
        }]
      }
    ]


    var getOption = () => {
      return {
          // tooltip : {
          //     formatter: "{a} <br/>{b} : {c}%"
          // },
          toolbox: {
              show : true,
              feature : {
                  mark : {show: true},
                  restore : {show: false},
              }
          },
          series: series,
      };
    }

    return(
      <div>
        <ReactEcharts option={getOption()}/>
      </div>
    )
  }

}

export default Instrument;
