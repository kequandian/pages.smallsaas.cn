/**
    * @author
    * @editor
    * @updated
    * @desc     提供一层封装，以便于无须通过 form 就可以直接使用 onChange 监听
    * @eg
    <InputText>
      defaultValue = ''    //传入表单域的默认值
      value = ''           //表单域的值
      onChange = {(data) => {}}     //表单的值发生变化的时候触发的回调函数
      type = ''          //type为number时为数字输入框，否则为普通输入框
      label = ''         //表单前面的名称
      placeholder = ''    //表单默认显示的值
      step = ''   //当 type 为 number 时，通过 step 来指定步长
    </InputText>
 */

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
      return <div className="kqd-InputText-inline">
        { props.label }
        <InputNumber
          defaultValue={ state.value || 0 }
          placeholder={ props.placeholder }
          onBlur={ this.handleChange }
          step={ props.step || 1 }
        />
      </div>;
    }
    return <div className="kqd-InputText-inline">
      { props.label }
      <Input
        style={ props.style }
        defaultValue={ state.value }
        placeholder={ props.placeholder }
        onBlur={ this.handleChange }
      />
    </div>;
  }
}
