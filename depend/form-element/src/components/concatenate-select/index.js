/**
    * @author
    * @editor
    * @updated
    * @desc    级联下拉框，用来处理两个有联系的 field
    * @eg
    <ConcatenateSelect>
      value = ''
      childrenValue = ''   //select框所选的值
      API = ''             //父 select 请求数据的 API
      placeholder = ''     //select框默认显示的值
      options = {        //包括 子 select 在内的更细致的配置
        childrenLabel: '储位',
        childrenField: 'slotId',
        childrenAPI: '/api/wms/warehouses/{ID}',
        childrenName: 'slotName',
        childrenValue: 'id',
        childrenPlaceholder: '请选择储位',
        name: 'warehouseName',
        value: 'id',
     },


    </ConcatenateSelect>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Select, Row, Col } from 'antd';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import { vendor } from 'postcss';

/**
 * 级联下拉框，用来处理两个有联系的 field
 * 使用方式示例：
 * {
      field: 'warehouseId', type: 'concatenate-select', intlPrefix: 'storagesIn.', span: 2,
        API: '/api/wms/warehouses',
        options: {
          childrenLabel: '储位',
          childrenField: 'slotId',
          childrenAPI: '/api/wms/warehouses/{ID}',
          childrenName: 'slotName',
          childrenValue: 'id',
          childrenPlaceholder: '请选择储位',
          name: 'warehouseName',
          value: 'id',
        }
    }

 * - API <String> 父 select 请求数据的 API
 * - span <Number> 这个通常是必须的，如果你不想组件的布局一团糟的话
 * - options <Object> 包括 子 select 在内的更细致的配置
 *        name <String> API 返回的 父 select 的 下拉框 options 的 name
 *        value <String> API 返回的 父 select 的 下拉框 options 的 value
 *        [childrenLabel] <String> 子select 的 label ，可选。
 *        childrenField <String> 子 select 的 field Name
 *        childrenAPI <String> 子 select 请求数据的 API
 *        childrenName <String> API 返回的 子 select 的 下拉框 options 的 name
 *        childrenValue <String> API 返回的 子 select 的 下拉框 options 的 value
 *        [childrenPlaceholder] <String> 子 select 的 Placeholder。可选。默认值： '请选择'
 *        [type] <String> 可选 competition (一方选中的 value，另一方不可再选择)
 */
export default class ConcatenateSelect extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      childrenList: [],
      value: props.value ? props.value.toString() : undefined,
      childrenValue: props.childrenValue ? props.childrenValue.toString() : undefined,
    };
    this.concatData = {
      value: props.value,
      childrenValue: props.childrenValue,
    }
    this.onQuery('list', props.API);
    this.onQuery('childrenList', props.options.childrenAPI);
  }

  static contextTypes = {
    queryData: PropTypes.object,
    onSelectChange: PropTypes.any,
  }

  onQuery = (type, API) => {
    const { options = {} } = this.props;
    if (options.type === 'competition') {
      if (type === 'list' && this.state.list.length > 0) return false;
      if (type === 'childrenList' && this.state.childrenList.length > 0) return false;
    } else {
      if (type === 'childrenList' && !this.state.value) return false;
      if (type === 'list' && this.state.list.length > 0) return false;
    }

    API = API.replace(/{ID}/g, this.state.value);
    query(API).then(({ code, data }) => {   //查询api，获取下拉框数据
      data = data.records || data.items || data;
      let rst = {};
      rst[type] = data;
      this.setState({
        ...rst,
      });
    })
  }

  changeHandle = (type, v) => {
    const { options = {} } = this.props;

    let rst = {};
    rst[type] = v;
    this.setState({
      ...rst,
    });
    this.concatData[type] = v;

    if (type === 'value' && options.queryData) {
      const { queryData, onSelectChange } = this.context;
      if(onSelectChange){
        onSelectChange(v);
      }
      Object.keys(options.queryData).forEach(key => {
        queryData[key] = v;
      });
    }

    if (options.type === 'competition') {
      // const listName = type === 'value' ? 'childrenList' : 'list';
      const valueName = type === 'value' ? 'childrenValue' : 'value';

      // const { list, childrenList } = this.state;
      // list.forEach( item => item.disabled = false );
      // childrenList.forEach( item => item.disabled = false );

      // const disabledList = this.state[listName];
      // disabledList.forEach( item => {
      //   if( item[ options[type] ].toString() === v ){
      //     item.disabled = true;
      //   }
      // } );

      if (this.state[valueName] === v) {
        this.setState({
          [valueName]: undefined,
        });
        this.concatData[valueName] = undefined;
      }

      // this.setState({
      //   list,
      //   childrenList,
      //   [listName]: disabledList,
      // });

    }
    // general 里面需要对这个 JSON 字符串做处理
    this.props.onChange(JSON.stringify(this.concatData));
  }

  render() {
    const { list, childrenList, value, childrenValue } = this.state;
    const { API, options = {}, placeholder } = this.props;
    const colonStyle = {
      margin: '0 8px 0 2px',
      position: 'relative',
      top: '-0.5px',
    }

    // console.log('级联下拉框',this);
    return (
      <Row>
        <Col sm={8} xs={24} style={{ width: '35%' }}>
          <Select
            onChange={this.changeHandle.bind(null, 'value')}
            value={value}
            onFocus={this.onQuery.bind(null, 'list', API)}
            placeholder={placeholder || '请选择'}>
            {
              list.length > 0 && list.map((item, index) => (
                <Select.Option key={index} disabled={item.disabled} value={item[options.value].toString() || item.value.toString()}>{item[options.name] || item.value}</Select.Option>
              ))
            }
          </Select>
        </Col>
        <Col sm={8} xs={24} style={{ textAlign: 'right', width: '25%' }}>
          <label htmlFor={options.childrenField}><span>{options.childrenLabel}<span style={colonStyle}>:</span></span></label>
        </Col>
        <Col sm={8} xs={24} style={{ width: '35%' }}>
          <Select
            onChange={this.changeHandle.bind(null, 'childrenValue')}
            disabled={options.type === 'competition' ? false :
              value ? false : true}
            value={childrenValue}
            onFocus={this.onQuery.bind(null, 'childrenList', options.childrenAPI)}
            placeholder={options.childrenPlaceholder || '请选择'}>
            {
              childrenList.length > 0 && childrenList.map((item, index) => {
                return (<Select.Option key={index} disabled={item.disabled} value={item[options.childrenValue].toString() || item.value.toString()}>{item[options.childrenName] || item.value}</Select.Option>)
              })
            }
          </Select>
        </Col>
      </Row>
    )
  }
}
