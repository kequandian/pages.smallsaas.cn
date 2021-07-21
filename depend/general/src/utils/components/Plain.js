import React, { Component } from 'react';

export default class Plain extends Component {
  componentDidMount() {
    this.props.onChange(this.props.value);
  }
  render() {
    let { value, style, options } = this.props;
    if (value === undefined) {
      value = '-';
      style = { color: 'transparent' };
    }
    if (options && options.valueMap) {
      if(options.valueMap[value]) {
        value = options.valueMap[value];
        style = {};
      }
    }
    return <span style={style}>{value}</span>
  }
}