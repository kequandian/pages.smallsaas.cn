import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { LRLayout } from 'kqd-layout-flex';
import { Radio, DatePicker } from 'antd';
import './index.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

export default class TimeList extends Component {
  handleTabChange = (e) => {
    const value = e.target.value;
    const { modelStatus, APIObject, dataSourceMap } = this.props;
    const { listAction } = modelStatus[dataSourceMap];
    listAction.refreshList(`${APIObject.listAPI}?period=${value}`);
  }
  handleTimeChange = (data) => {
    const formatData = [];
    data.forEach( date => {
      formatData.push(date.format('YYYY-MM-DD'));
    } );
    const { modelStatus, APIObject, dataSourceMap } = this.props;
    const { listAction } = modelStatus[dataSourceMap];
    listAction.refreshList(`${APIObject.listAPI}?createTime=${formatData.join('createTime=')}`);
  }

  render() {
    const { title, style, ...rest } = this.props;
    return <div style={style} className="dashboard-TimeList">
      <div className="dashboard-TimeList-header">
        <div className="dashboard-TimeList-title">{title}</div>
        <LRLayout align="middle" justify="center" style={{height: '60px'}}>
          <RadioGroup onChange={ this.handleTabChange } defaultValue="TD">
            <RadioButton value="TD">今日</RadioButton>
            <RadioButton value="LD7">本周</RadioButton>
            <RadioButton value="CM">本月</RadioButton>
          </RadioGroup>
          <RangePicker onChange={this.handleTimeChange} />
        </LRLayout>
      </div>
      <div className="dashboard-TimeList-content">
        <GMApp {...rest} />
      </div>
    </div>
  }
}