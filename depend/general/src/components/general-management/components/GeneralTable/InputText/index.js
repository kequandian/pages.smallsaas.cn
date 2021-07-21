import React, { Component } from 'react';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';

import './style.css';
/**
 * 提供一层封装，以便于无须通过 form 就可以直接使用 onChange 监听
 * 
 * @param [type] <String> 输入框类型，默认 input ，可选 number
 * @param [step] <Number> 当 type 为 number 时，通过 step 来指定步长
 */
export default class InputText extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.defaultValue || props.value,
    }
  }

  handleChange = (e) => {
    let value = e.target.value;

    if( this.props.type === 'number' ){
      value = Number(value);
      if( isNaN(value) ){
        // 如果是 非数 ，撤销这次输入
        value = this.state.value;
      }
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({
      value,
    });
  }

  render() {
    const { props, state } = this;
    if( props.type === 'number' ){
      return <div className="inline">
        <InputNumber
          defaultValue={ state.value || 0 }
          disabled={ props.disabled }
          placeholder={ props.placeholder }
          onBlur={ this.handleChange }
          step={ props.step || 1 }
          max={ props.max }
          min={ props.min }
        />
      </div>;
    }
    return <div className="inline">
      <Input
        defaultValue={ state.value }
        disabled={ props.disabled }
        placeholder={ props.placeholder }
        onBlur={ this.handleChange }
      />
    </div>;
  }
}