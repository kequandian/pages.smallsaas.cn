import React from 'react';
import './style.css';

export default class Picker extends React.Component{
  state = {
    index: 0,
    step: 36,
  }
  position = 72;
  minPosition = 72;
  maxPosition = ( this.state.step * 2 ) - ( (this.props.data.length -1) * this.state.step);

  handleStart = (e) => {
    const action = e.touches ? e.touches[0] : e;
    this.oH = action.clientY;
    if(!e.touches){
      this.refs.pickerBox.addEventListener('mousemove',this.handleMove);
      this.refs.pickerBox.addEventListener('mouseup',this.handleEnd);
    }
  }
  handleMove = (e) => {
    const { index, step } = this.state;
    const action = e.touches ? e.touches[0] : e;
    this.oTop = -(action.clientY - this.oH);

    // if(this.oTop < 0){
    //   console.log('down',this.oTop);
    // }else{
    //   console.log('up',this.oTop);
    // }
    let position = ( step * 2 ) - (index * step) - this.oTop;
    if(position > this.minPosition){
      position = this.minPosition;
    }
    if(position < this.maxPosition){
      position = this.maxPosition;
    }
    this.position = position;
    this.refs.pickerBox.querySelector('.pickerItemBox').style.transform = `translate3d(0, ${position}px, 0)`;
  }
  handleEnd = () => {
    const { data } = this.props;
    const { index, step } = this.state;
    // console.log('END',this.oTop);
    let stepNumber = Math.ceil( this.oTop / this.state.step );
    // console.log(stepNumber);

    this.refs.pickerBox.removeEventListener('mousemove',this.handleMove);
    this.refs.pickerBox.removeEventListener('mouseup',this.handleEnd);

    // const position = ( step * 2 ) - (index * step);
    
    let nowIndex = 0;
    if(stepNumber + index >= data.length){
      nowIndex = data.length - 1;
    }else{
      nowIndex = this.state.index + stepNumber;
    }
    this.setState( prevState => ({
      index: nowIndex,
    }), () => {
      // 校正位置
      const position = ( this.state.step * 2 ) - (this.state.index * this.state.step);
      this.refs.pickerBox.querySelector('.pickerItemBox').style.transform = `translate3d(0, ${position}px, 0)`;
      this.position = position;
      this.props.onChange(this.state.index);
    });
  }

  render() {
    const { data } = this.props;
    const { index } = this.state;
    // console.log('index:',index,'position',this.position);

    return <div className="pickerBox" ref="pickerBox" onTouchMove={ this.handleMove } onTouchStart={ this.handleStart } onMouseDown={ this.handleStart }>
        <div className="select"></div>
        <div className="pickerItemBox" style={{transform: `translate3d(0, ${this.position}px, 0)`}}>
          { data.length > 0 ? data.map( (v,i) => {
            return <div key={i} className="pickerItem" style={{top: `${i * 36}px`}}>{ `${v.id} ${v.name}` }</div>
          } ) 
          : '暂无数据' }
        </div>
      </div>
  }
}