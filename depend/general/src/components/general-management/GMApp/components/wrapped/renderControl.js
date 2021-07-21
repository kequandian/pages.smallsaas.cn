import React, { Component } from 'react';

export default (ContentComponent) => {
  class RenderControl extends Component{
    render(){
      const { visible = true, ...restProps } = this.props;
      return visible ? <ContentComponent { ...restProps } /> : '';
    }
  }
  return RenderControl;
}