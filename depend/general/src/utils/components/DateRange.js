import React, { Component } from 'react';
import DatePicker from 'react-mobile-datepicker';
import { Button } from 'antd';
import moment from 'moment';
import './index.css';
const MIX = new Date('1950');

export default class DateRange extends Component {
  constructor(props) {
    super(props);
    const { options = {} } = props;
    const { theme = 'ios', format = 'YYYY-MM-DD' } = options;
    this.state = {
      theme,
      format,
      visible: false,
      value: null,
      // valueList: [getOneMonthOld(), new Date()],
      valueList: [],
      index: 0,
    };
  }

  // componentDidMount() {
  //   this.handleSave();
  // }
  static getDerivedStateFromProps(pervProps, prevState) {
    if(pervProps.value !== prevState.value){
      if(pervProps.value === undefined) {
        return {
          valueList: [],
          value: pervProps.value,
        }
      }
      return {
        value: pervProps.value,
      }
    }
    return null;
  }
  handleSwitchVisible = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }
  handleCancel = () => {
    this.handleSwitchVisible();
  }
  handleSelect = (data) => {
    const { index, valueList } = this.state;
    const newValueList = [...valueList];
    newValueList[index] = data;
    this.setState({
      valueList: newValueList,
    }, () => {
      this.handleSave();
    });
    this.handleSwitchVisible();
  }
  handleClick = (index) => {
    this.setState({
      index,
    });
    this.handleSwitchVisible();
  }
  handleSave = () => {
    const { valueList } = this.state;
    this.props.onChange(valueList.map(data => {
      return moment(data);
    }));
  }

  render() {
    const {
      theme, format,
      visible, valueList, index,
    } = this.state;

    return <div>
      <Button onClick={this.handleClick.bind(this, 0)} className="kqd-DateRange-button">
        {valueList[0] ? convertDate(valueList[0], format) : '未选择'}
      </Button>
      <span> 至 </span>
      <Button onClick={this.handleClick.bind(this, 1)} className="kqd-DateRange-button">
        {valueList[1] ? convertDate(valueList[1], format) : '未选择'}
      </Button>
      <DatePicker
        theme={theme}
        headerFormat={format}
        value={valueList[index]}
        isOpen={visible}
        onSelect={this.handleSelect}
        onCancel={this.handleCancel}
        min={MIX}
      />
    </div>
  }
}

function getOneMonthOld() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  return date;
}
function convertDate(date, formate) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return formate
    .replace(/Y+/, year)
    .replace(/M+/, month)
    .replace(/D+/, day)
    .replace(/h+/, hour)
    .replace(/m+/, minute)
    .replace(/s+/, second);
}