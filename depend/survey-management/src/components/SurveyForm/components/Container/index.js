import React, { Component } from 'react';
import { Button } from 'antd';
import EditTopic from '../SurveyTopic/EditTopic';
import { FlexLayout } from 'kqd-layout-flex';
const { FlexItem } = FlexLayout;

export default class SurveyFormContainer extends Component {
  state = {
    first: true,
    index: -1,
    close: true,
    infoData: {},
    data: [],
  }
  static getDerivedStateFromProps(nextProps, prevState){
    const { surveyItems, ...restData } = nextProps.modelStatus.formData;
    if(surveyItems && prevState.first){
      if(restData.title){
        nextProps.onChangePageTitle(restData.title);
      }
      return {
        infoData: restData,
        data: surveyItems,
        first: false,
      }
    }
    return null;
  }

  addRadio = () => {
    this.setState({
      data: [...this.state.data, {
        type: 'RADIO',
        // title: '标题……',
        content: '标题……',
        itemOptions: [
          { content: '选项 1', optionNum: 0 },
          { content: '选项 2', optionNum: 1 },
          { content: '选项 3', optionNum: 2 },
        ],
      }]
    })
  }
  addCheckBox = () => {
    this.setState({
      data: [...this.state.data, {
        type: 'MULTI',
        // title: '标题……',
        content: '标题……',
        itemOptions: [
          { content: '选项 1', optionNum: 0 },
          { content: '选项 2', optionNum: 1 },
          { content: '选项 3', optionNum: 2 },
        ],
      }]
    })
  }
  handleClick = (index) => {
    if(this.state.close || this.state.index !== index)
    this.setState({
      index,
      close: false,
    });
  }
  handleClose = () => {
    this.setState({
      index: -1,
      close: true,
    });
    return false;
  }
  handleEdit = (index, data) => {
    const newData = [...this.state.data];
    newData[index] = data;

    this.setState({
      data: newData,
    })
  }
  handleRemoveTopic = (index) => {
    const newData = [...this.state.data];
    newData.splice(index, 1);

    this.setState({
      data: newData,
    })
  }

  render() {
    const { index, data = [] } = this.state;

    return <div>
      <FlexLayout>
        <FlexItem flex={1}>
          <Button type="primary" icon="plus" onClick={this.addRadio}>单选题</Button>
          <Button type="primary" icon="plus" onClick={this.addCheckBox}>多选题</Button>
        </FlexItem>
        <FlexItem>
          <Button type="primary" icon="save">保存</Button>
        </FlexItem>
      </FlexLayout>
      <br />
      <EditTopic
        data={data}
        index={index}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onEdit={this.handleEdit}
        onRemoveTopic={this.handleRemoveTopic}
      />
    </div>
  }
};