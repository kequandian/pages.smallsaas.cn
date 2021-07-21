/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <WrapLayout>
      justifyContent = '',   //flex布局，默认居左显示
      children     //传入子元素
      style = {}    //修改样式
    </WrapLayout>
 */


import React from 'react';

class WrapLayout  extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      justifyContent: props.justifyContent || 'flex-start',
    }
  }

  render(){

    const { justifyContent } = this.state;

    const style = {
      display: 'flex',
      justifyContent: justifyContent,
      ...this.props.style,
    }

    return(
      <div style={style}>
        {this.props.children}
      </div>
    )
  }

}

export default WrapLayout;
