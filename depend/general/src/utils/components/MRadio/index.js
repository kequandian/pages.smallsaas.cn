import React, { Component } from 'react';
import './index.css';

export default class MRadio extends Component {
  handleChange = (value) => {
    this.props.onChange(value);
  }
  render() {
    const { id, value, children } = this.props;

    return <div className="kqd-MRadio">
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          name: id,
          onChange: this.handleChange,
          checkedValue: value,
        });
      })}
    </div>
  }
}