import React, { Component } from 'react';
import { FlexLayout } from 'kqd-layout-flex';
import { Input, Icon, Button } from 'antd';
import './index.css';

const { TextArea } = Input;
const { FlexItem } = FlexLayout;

export default class EditTopicPanel extends Component {
  handleSaveChange = (data) => {
    this.props.onEdit(this.props.index, data);
  }
  handleTitleChange = (e) => {
    const title = e.target && e.target.value;
    if (title) {
      this.handleSaveChange({
        ...this.props.data,
        title,
      })
    }
  }
  handleContentChange = (e) => {
    const content = e.target && e.target.value;
    if (content) {
      this.handleSaveChange({
        ...this.props.data,
        content,
      })
    }
  }
  handleItemChange = (i, e) => {
    const content = e.target && e.target.value;
    const newItems = [...this.props.data.itemOptions];
    newItems[i].content = content;

    this.handleSaveChange({
      ...this.props.data,
      itemOptions: newItems,
    })
  }
  handleItemRemove = (i) => {
    const newItems = [...this.props.data.itemOptions];
    newItems.splice(i, 1)

    this.handleSaveChange({
      ...this.props.data,
      itemOptions: newItems,
    })
  }
  handleItemAdd = (i) => {
    const newItems = [...this.props.data.itemOptions];
    newItems.push({
      content: `选项 ${newItems.length + 1}`,
      value: newItems.length,
    })

    this.handleSaveChange({
      ...this.props.data,
      itemOptions: newItems,
    })
  }

  render() {
    const { data } = this.props;
    return <div className="kqd-Survey-EditTopicPanel" onClick={this.handleChange}>
      <FlexLayout>
        <FlexItem>标题：</FlexItem>
        <FlexItem flex={1}><Input value={data.title} onChange={this.handleTitleChange} /></FlexItem>
      </FlexLayout>
      <br />
      <FlexLayout align="flex-start">
        <FlexItem>描述：</FlexItem>
        <FlexItem flex={1}><TextArea rows={3} value={data.content} onChange={this.handleContentChange} /></FlexItem>
      </FlexLayout>
      <br />
      {data.itemOptions.map((item, i) => {
        return <FlexLayout key={i} className="kqd-Survey-EditTopicPanel-item">
          <FlexItem><Input value={item.content} onChange={this.handleItemChange.bind(this, i)} /></FlexItem>
          <FlexItem flex={1} className="kqd-Survey-EditTopicPanel-removeItem">
            <Icon type="delete" theme="outlined" onClick={this.handleItemRemove.bind(this, i)} />
          </FlexItem>
        </FlexLayout>
      })}
      <Button icon="plus" style={{width: '174px'}} onClick={ this.handleItemAdd }></Button>
    </div>
  }
}