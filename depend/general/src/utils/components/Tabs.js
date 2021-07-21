import React, { Component } from 'react';
import Radio from 'antd/lib/radio';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Tabs extends Component {
  render() {
    const options = this.props.options || [];
    return <RadioGroup defaultValue={this.props.value} onChange={this.props.onChange}>
      {options.map((v, i) => {
        return <RadioButton value={v.value} key={i}>{v.label}</RadioButton>
      })}
    </RadioGroup>
  }
}