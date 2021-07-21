import React, { Component } from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;


export default class CheckTag extends Component{
  constructor(props){
    super(props);
    this.state = {
      checked: props.checked,
    };
  }
  handleChange = (checked) => {
    this.setState({ checked });
    this.props.onChange(checked,this.props.data);
  }
  
  render(){
    const { checked } = this.state;
    const { data } = this.props;
    return <CheckableTag checked={ checked } onChange={this.handleChange}>{ data.tagName }</CheckableTag>
  }
}