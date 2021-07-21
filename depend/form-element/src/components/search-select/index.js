import React, { Component } from 'react';
import { Select, Button } from 'antd';
import { query } from 'kqd-utils/lib/services';
import PropTypes from 'prop-types';
import './index.css';

const Option = Select.Option;

function formatToString(value, defaultValue) {
  return value ? String(value) : defaultValue;
}

export default class SearchSelect extends Component {
  state = {
    data: [],
    value: undefined,
    placeholder: '',
    open: false,
  }
  static contextTypes = {
    queryData: PropTypes.object,
    dispatch: PropTypes.any,
    namespace: PropTypes.string,
    dataPool: PropTypes.object,
  }

  componentDidMount() {
    // this.handleSearch();
    this.checkChange();
  }
  handleInputChange = (value) => {
    this.setState({
      placeholder: value,
    });
  }
  handleSearch = () => {
    const { options = {}, id } = this.props;
    const { API, searchField = 'search' } = options;
    const { placeholder } = this.state;
    query(API, {
      [searchField]: placeholder,
    }).then(({ code, status_code, data }) => {
      if (code === 200 || status_code === 0) {
        const result = data.records || data.list || data;
        this.setState({
          data: result,
          open: true,
        });
      }
    });
  }
  handleSelect = (valueId) => {
    const { options = {}, id } = this.props;
    const { dispatch, namespace, queryData, dataPool } = this.context;
    const { data } = this.state;
    const { saveToForm } = options;

    if (options.queryData) {
      dataPool.addToTemp({
        disableItemsSelect: true,
      });
      Object.keys(options.queryData).forEach(key => {
        queryData[key] = valueId;
      });
      dispatch({
        type: `${namespace}/resetCurrentItem`,
      });
    }

    const findItem = data.find(item => String(item.id) === valueId);

    if (options.API) {
      const { API, itemsField, itemsFieldMap } = options;
      dispatch({
        type: `${namespace}/fetchOneItems`, // 用于 wms 退货时关联采购单的 items
        payload: {
          id: valueId,
          API,
          itemsField,
          itemsFieldMap,
        }
      });
    }

    const tempObj = {};
    tempObj[id] = findItem[options.value] || valueId;
    if (saveToForm) {
      if (Array.isArray(saveToForm)) {
        console.warn('saveToForm 现在需要改为 对象');
      } else {
        Object.keys(saveToForm).forEach(field => {
          tempObj[saveToForm[field]] = findItem[field];
        });
      }
    }
    if (dataPool) {
      dataPool.addToForm(tempObj, true);
    }
    this.checkChange(tempObj);
  }
  findIdToValue = (value) => {
    const { options = {} } = this.props;
    const { data } = this.state;
    const { dataPool } = this.context;
    const findItem = data.find(item => String(item[options.value]) === String(value));
    const formData = dataPool && dataPool.getToFormAll();

    return findItem && findItem[options.name] || formData[options.name] || value;
  }
  checkChange = (tempObj) => {
    const { onChange } = this.props;
    const { dataPool } = this.context;
    const formData = tempObj || dataPool && dataPool.getToFormAll();
    const { id } = this.props;
    const value = formData[id];

    if (value !== this.value) {
      this.value = value;
      onChange(value);
      this.setState({
        value: this.findIdToValue(value),
        open: false,
      });
    }
  }

  render() {
    const { data, value, placeholder, open } = this.state;
    const { options = {}, width } = this.props;

    return <div className="kqd-SearchSelect">
      <Select
        showSearch={true}
        onSearch={this.handleInputChange}
        placeholder={placeholder}
        onSelect={this.handleSelect}
        value={value}
        open={open}
        onBlur={_ => this.setState({
          open: false,
        })}
      >
        {data && data.map((item, i) => {
          return <Option key={i} value={formatToString(item.id, item[options.value])}>{item[options.name] || item.value}</Option>;
        })}
      </Select>
      <span>
        <Button onClick={this.handleSearch} icon="search" shape="circle"></Button>
      </span>
    </div>
  }
}