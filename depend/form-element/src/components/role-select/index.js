/**
    * @author
    * @editor
    * @updated
    * @desc   Select选择器
    * @eg
    <RoleSelect>
      width = ''    //下拉选择器的宽度
      value = ''    //值
      onChange = {(data) => {}}   //下拉选择器的值发生变化的时候触发回调
    </RoleSelect>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import Select from 'antd/lib/select';
import Icon from 'antd/lib/icon';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

export default class RoleSelect extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      API: '/api/adm/roles',
      options: [],
      dataLoaded: false,
      dataLoading: false,
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleFocus = () => {
    const { dataLoaded, API } = this.state;
    if (!dataLoaded) {
      this.setState({
        dataLoading: true,
      });
      query(API).then(({ code, data, message }) => {
        this.setState({
          dataLoaded: true,
          dataLoading: false,
          options: data.map(role => {
            return { key: role.name, value: role.id  }
          })
        })
      })
    }
  }

  render() {
    const { options, dataLoading } = this.state;
    let style = { minWidth: 160 };
    if (this.props.width) {
      style.width = this.props.width;
    }
    return (
      <Select
        style={style}
        defaultValue={this.props.value}
        onFocus={this.handleFocus}
        onChange={this.props.onChange}
        placeholder={<FormattedMessage id='role.select.placeholder' />}>
        {dataLoading ? <Select.Option key='loading'><Icon type="loading" style={{marginRight: 8}}/>Loading</Select.Option> : ''}
        {options.map((option,index) => <Select.Option key={option.value}>{option.key}</Select.Option>)}
      </Select>
    )
  }
}
