/**
    * @author Yang,YN  2018-9-11
    * @editor
    * @updated
    * @desc  简单实现了子组件占据本组件的高度，组件默认高度为400，子组件传入的数量决定了每个子组件的高度
    * @eg
    <NumberRows>
      children
    </NumberRows>
 */


import React from 'react';

class NumberRows extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      height: props.style && props.style.height ? props.style.height : 400
    }
  }

  showStyle = (value) => {
    return {
      marginBottom:'1em',
      ...this.props.style,
      height: this.state.height/value,
    }
  }

  createList = (children) => children.length >= 0 && children && children.map((item,index) => {
    return (
      <div key={index} style={{height: `${this.state.height/children.length}px`,marginBottom:'1em',...this.props.style}}>{item}</div>
    )
  });

  render(){

    const { children } = this.props;

    const style = {
      height:400,
      ...this.props.style,
    }

    return(
      <div style={style}>
        {this.createList(children)}
        {
          children != undefined && Array.isArray(children) == false ?
          <div style={style}>{children}</div>
          : null
        }
      </div>
    )
  }

}

export default NumberRows;
