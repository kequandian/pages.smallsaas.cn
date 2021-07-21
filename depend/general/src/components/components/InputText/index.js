/**
    * @author
    * @editor
    * @updated
    * @desc    提供一层封装，以便于无须通过 form 就可以直接使用 onChange 监听。
    * @eg
    <InputText>
			type = ''    //输入框类型，默认 input ，可选 number
      value = ''   //表单域的值
      placeholder = ''    //默认显示的值
      disabled = ''      //是否禁用
      step = 1   //当 type 为 number 时，通过 step 来指定步长
      onChange = { (data) => {}}
    </InputText>
 */


import React, { Component } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';

import './style.css';
/**
 * 提供一层封装，以便于无须通过 form 就可以直接使用 onChange 监听
 * 这个是 无 states 版
 *
 * @param [type] <String> 输入框类型，默认 input ，可选 number
 * @param [step] <Number> 当 type 为 number 时，通过 step 来指定步长
 */
class InputText extends Component {

  handleChange = (e) => {
    let value = e.target.value;
    console.log('InputText',value);

    if( this.props.type === 'number' ){
      value = Number(value);
      if( isNaN(value) ){
        // 如果是 非数 ，撤销这次输入
        return false;
      }
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const { props } = this;
    if( props.type === 'number' ){
      return <div className="inline">
        <InputNumber
          value={ props.value }
          disabled={ props.disabled }
          placeholder={ props.placeholder }
          onBlur={ this.handleChange }
          step={ props.step || 1 }
        />
      </div>;
    }
    return <div className="inline">
      <Input
        value={ props.value }
        disabled={ props.disabled }
        placeholder={ props.placeholder }
        onBlur={ this.handleChange }
      />
    </div>;
  }
}

export default Form.create({})(InputText);
