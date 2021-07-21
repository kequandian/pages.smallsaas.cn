/**
    * @author
    * @editor
    * @updated
    * @desc      imput表单输入组件
    * @eg
    <AjaxRuleInput>
      value = ''         //表单域的值
      API = ''           //传入api获取数据
      onChange = {(data) => {}}   //input获得焦点的时候触发
      placeholder = ''   //input框默认显示值
    </AjaxRuleInput>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

export default class AjaxRuleInput extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  blurHandle = (e) => {
    console.log('发起 Ajax 检测该值是否唯一',e.target.value);
    this.queryData(e.target.value);
  }
  queryData = (v) => {
    const { API } = this.props;
    let queryData = {};
    queryData[this.props.id] = v;

    create(API,queryData).then(({ code, data }) => {
      if( code === 200 ){
        this.setState({
          value: v
        });
        this.props.onChange(data);
      }else{
        message.error(`数值：${v} 不能与后台的数据重复！`,5);
        this.setState({
          value: undefined
        });
        this.props.onChange(undefined);
      }
    });
  }

  render() {
    const { value } = this.state;
    const { placeholder } = this.props;

    return (
      <Input
        defaultValue={ value }
        placeholder={ placeholder || '请输入' }
        onBlur={this.blurHandle}
       />
    )
  }
}
