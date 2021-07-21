/**
    * @author
    * @editor
    * @updated
    * @desc   富文本组件
    * @eg
    <RichText>
      value = ''     //编辑器的值
      defaultValue = ''     //编辑器的默认值
      onChange = {(data) = > {}}   //编辑器获得焦点时按下 ctrl+s 也会执行此方法
    </RichText>
 */

import React, { Component } from 'react';
// 引入编辑器以及EditorState子模块
import BraftEditor, { EditorState } from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

import uploadFile from './uploadFile';

export default class RichText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
    }
  }

  componentDidMount() {
    // 获取html格式的编辑器内容
    const htmlContent = this.props.value || this.props.defaultValue;
    // 使用EditorState.createFrom将html字符串转换为编辑器需要的editorState数据
    this.setState({
      editorState: EditorState.createFrom(htmlContent),
    })
  }

  submitContent() {
    // 把内容转为 HTML，然后提交给 Form
    // 在编辑器获得焦点时按下 ctrl+s 也会执行此方法
    const htmlContent = this.state.editorState.toHTML();
    const { delay = false } = this.props.options;
    if (this.props.onChange) {
      if (delay) { // 用于解决直接渲染 form 页面时候会出错的 bug
        setTimeout(_ => {
          this.props.onChange(htmlContent);
        }, 200);
      } else {
        this.props.onChange(htmlContent);
      }
    }

  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
    this.submitContent();
  }

  render() {
    const { editorState } = this.state;
    const media = {
      image: true,
      video: false,
      audio: false,
      uploadFn: uploadFile,
      onInsert: _ => this.submitContent()
    };
    return (
      <div style={{ border: '1px solid #ccc' }}>
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          // onBlur={this.submitContent.bind(this)}
          onSave={this.submitContent.bind(this)}
          media={media}
          ref={el => this.test = el}
        />
      </div>
    )

  }

}
