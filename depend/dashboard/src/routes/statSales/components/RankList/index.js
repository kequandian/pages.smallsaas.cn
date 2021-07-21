import React, { Component } from 'react';
import { GMApp } from 'kqd-general';
import { Radio, Select } from 'antd';
import './index.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

export default class RankList extends Component {
  handleTabChange = (e) => {
    const value = e.target.value;
    const { modelStatus, APIObject, dataSourceMap } = this.props;
    const { listAction } = modelStatus[dataSourceMap];
    listAction.refreshList(`${APIObject.listAPI}?rank=${value}`);
  }
  handleTimeChange = (value) => {
    const { modelStatus, APIObject, dataSourceMap } = this.props;
    const { listAction } = modelStatus[dataSourceMap];
    listAction.refreshList(`${APIObject.listAPI}?period=${value}`);
  }

  render() {
    const { title, style, ...rest } = this.props;
    return <div style={style} className="dashboard-RankList">
      <div className="dashboard-RankList-header">
        <div className="dashboard-RankList-title">{title}</div>
        <div className="dashboard-RankList-tabsButton">
          <RadioGroup onChange={this.handleTabChange} defaultValue="top">
            <RadioButton value="top">热销前10</RadioButton>
            <RadioButton value="bottom">滞销前10</RadioButton>
          </RadioGroup>
          <Select defaultValue="本季度" style={{ width: 120 }} onChange={this.handleTimeChange}>
            <Option value="CW">本周</Option>
            <Option value="CM">本月</Option>
            <Option value="CQ">本季度</Option>
            <Option value="CY">本年</Option>
          </Select>
        </div>
      </div>
      <div className="dashboard-RankList-content">
        <GMApp {...rest} />
      </div>
    </div>
  }
}