import React, { Component } from 'react';
import Switch from 'antd/lib/switch';

export default class SwitchButton extends Component {
  handleChange = (checked) => {
    if( this.props.format === 'number' ){
      checked = Number(checked);
    }
    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  }
  formatValue = (v) => {
    return Boolean(v);
  }

  render() {
    const { props } = this;
    return <div>
      <Switch
        checked={ this.formatValue(props.value) }
        onChange={ this.handleChange }
      />
    </div>;
  }
}