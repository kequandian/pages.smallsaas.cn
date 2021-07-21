import React, { Component } from 'react';
import { Avatar, Input } from 'antd';
import { LRLayout } from 'kqd-layout-flex';

const { TextArea } = Input;

export default class DirectComment extends Component {
  render(){
    return <LRLayout span={[2,22]} className="kc-comment-box" leftClassName="kc-comment-textConter">
      {/* <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
      <div></div>
      <TextArea rows={ 2 } placeholder="请输入评论……" value={ this.props.value } onChange={ this.props.onChange } />
    </LRLayout>
  }
}