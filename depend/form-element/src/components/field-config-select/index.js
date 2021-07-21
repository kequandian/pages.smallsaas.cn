/**
    * @author
    * @editor
    * @updated
    * @desc    从 API 中获取数据到下拉框
    * @eg
    <FieldConfigSelect>
      id = ''           //传入id，拼接成完整api
      isfirsttimeinit = 'true'
      options = {
        name:'',           //从 API 中读取的作为 label 的字段
        value: '',         //从 API 中读取的提交的字段
        queryData:{}      //添加到 查询条件
        saveToForm:(){}    //从 API 中读取的，最终会一起提交的 额外字段
      }
      onChange = {(data) => {}}    //下拉框值发生改变的时候触发回调函数
      placeholder = ''        //下拉框的默认值
      width = ''            //下拉框的宽度
    </FieldConfigSelect>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Select, message } from 'antd';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import fetch from './fetch';

function formatToString(value, defaultValue) {
  return value ? String(value) : defaultValue;
}
/**
 * 从 API 中获取数据到下拉框
 *
 * 可配置 options ：
 * - name 从 API 中读取的作为 label 的字段
 * - value 从 API 中读取的提交的字段
 * - queryData 添加到 查询条件
 * - saveToForm: [ sArray ] 从 API 中读取的，最终会一起提交的 额外字段
 */
class FieldConfigSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      apiUrl: this.props.id ? '/api/config/fields/' + this.props.id : '',
      value: undefined,
      originValue: null,
    }
    this.value = null;
  }

  static contextTypes = {
    queryData: PropTypes.object,
    dispatch: PropTypes.any,
    namespace: PropTypes.string,
    dataPool: PropTypes.object,
    onSelectChange: PropTypes.any,
  }

  componentDidMount() {
    if (this.props.isfirsttimeinit === 'true') {
      this.onFocus();
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.originValue) {
      return {
        originValue: nextProps.value ? nextProps.value : null,
      }
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    const { originValue } = this.state;
    const { dataPool } = this.context;
    const formData = dataPool && dataPool.getToFormAll() || {};
    const { id } = this.props;
    if (originValue !== prevState.originValue) {
      this.setState({
        // value: this.findIdToValue(formData[id]),
        value: this.findIdToValue(originValue),
      });
    }
  }

  handleChange = (valueId) => {
    const { options = {}, id } = this.props;
    const { dispatch, namespace, queryData, dataPool, onSelectChange } = this.context;
    const { list } = this.state;
    const { saveToForm } = options;

    if(onSelectChange){
      onSelectChange(valueId);
    }

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

    const findItem = list.find(item => String(item.id) === valueId);

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
    // this.props.onChange(findItem[options.value] || valueId);
  }
  onFocus = () => {
    if (this.state.list.length > 0) {
      return
    } else {
      const { API = this.state.apiUrl } = this.props;
      try {
        query(API, { pageSize: 999 }).then(this.saveQueryData.bind(this));
      } catch (err) {
        message.error(err);
      }
    }
  }
  findIdToValue = (value) => {
    const { options = {} } = this.props;
    const { list } = this.state;
    const findItem = list.find(item => String(item[options.value]) === String(value));
    return findItem && findItem[options.name] || value;
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
      });
    }
  }
  handleSearch = (value) => {
    const { API = this.state.apiUrl, options = {} } = this.props;
    const { name } = options;

    fetch(API, {
      [name]: value,
      pageSize: 999,
    }, this.saveQueryData.bind(this));
  }
  saveQueryData = ({ status_code, code, data }) => {
    if (code === 200 || status_code === 0) {
      const result = data.records || data.list || data;
      this.setState({
        list: result,
      }, () => {
        this.checkChange();
      });
    }
  }

  render() {

    const { list, value } = this.state;
    const { options = {}, placeholder, width } = this.props;

    return (
      <Select
        showSearch={true}
        style={{ width: `${width}px` }}
        onChange={this.handleChange}
        value={value}
        onFocus={this.onFocus}
        placeholder={placeholder || '请选择'}
        onSearch={this.handleSearch}
        optionFilterProp={ options.name || 'value' }
        // filterOption={false}
      >
        {
          list.length > 0 && list.map((item, index) => (
            <Select.Option key={index} value={formatToString(item.id, item[options.value])}>{item[options.name] || item.value}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default FieldConfigSelect;
