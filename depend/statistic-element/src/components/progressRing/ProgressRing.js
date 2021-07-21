/**
    * @author Yang,YN
    * @editor
    * @updated
    * @desc   进度图标组件
    * @eg
    <ProgressRing>
      percent = 0     //占的百分比
      title = ''    //名称等
      total = ''
      height = 140    //进度条高度，默认140px
      color = 'rgba(24, 144, 255, 0.85)'  //进度条的颜色值
    </ProgressRing>
 */

import React from 'react';
import { Pie } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';

class ProgressRing extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      percent: props.percent || 0,
      title: props.title || '',
      subTitle: props.subTitle || '',
      height: props.height || 140,
      color: props.color || 'rgba(24, 144, 255, 0.85)'
    }
  }

  render(){

    const { percent,title,subTitle,height,color } = this.state;

    return(
      <div>
         <Pie
          percent={percent}
          subTitle={title}
          total={subTitle}
          height={height}
          color={color}
          />
      </div>
    )
  }

}

export default ProgressRing;
