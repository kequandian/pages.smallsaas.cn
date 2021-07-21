import React, { Component } from 'react';

/**
 * @author LLH
 * @editor LLH
 * @updated 2018年9月11日
 * @desc 指定行数，然后展示一段文字。超过行数的字将会被 … 截断。非等宽字体下，截取的长度有所误差。
 * @eg
      <TextEllipsis data={{
          title: 'a long text',
          row: 2,
      }} />
 */
export default class TextEllipsis extends Component{
  state = {
    title: this.props.data && this.props.data.title || '',
  }
  componentDidMount() {
    this.format();
  }
  componentDidUpdate(prevProps, prevState){    
    if(prevProps.data.title !== this.props.data.title){
      this.setState({ title: prevProps.data.title }, () => this.format() );
    }
  }
  format = () => {
    let { title = '', row = 1 } = this.props.data;
    if(this.titleElement){
      const fontSize = parseInt( getComputedStyle(this.titleElement,undefined).fontSize, 10 );
      const titleWidth = this.titleElement.offsetWidth;
      const maxLength = Math.floor( titleWidth / fontSize ) * row - 1;
      
      if(title.length > maxLength ){
        title = title.slice(0, maxLength) + '…';
      }
    }
    this.setState({
      title,
    });
  }
  render(){
    const { title } = this.state;
    return(
      <div ref={ el => this.titleElement = el } className={ this.props.className }>{ title }</div>
    );
  }
}