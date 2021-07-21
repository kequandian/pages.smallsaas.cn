import React, { Component } from 'react';

export default class Hidden extends Component {
  componentDidMount() {
    this.props.onChange(this.props.value);
  }
  render() {
    return '';
  }
}