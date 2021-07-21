/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <SearchForm>
      intl = ''
      inlineCount = ''
      simpleSearchCount = ''
      cancelText = 'Reset'
      submitText = 'Search'
      expandText = 'Expand'
      collapseText = 'Collapse'
      dispatch
      modelName          //model容器名
      onFetchList
      API = ''           //传入api
      columnNum = 3         //占据的列数
      submitting = false     //loading状态
      fields = null
      orderBy = null
    </SearchForm>
 */


import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import moment from 'moment';

import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Card from 'antd/lib/card';
import Spin from 'antd/lib/spin';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

import { BasicForm } from 'kqd-common';

import { convertFields } from '../../utils/schema';
import { getIntl } from '../../utils/utils';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

@injectIntl
export default class SearchForm extends PureComponent {

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      inlineCount: props.inlineCount || 3,
      simpleSearchCount: props.simpleSearchCount || 6,
      expand: false,
      cancelText: this.props.cancelText || getIntl(intl, 'search.form.btn.cancel'),
      submitText: this.props.submitText || getIntl(intl, 'search.form.btn.submit'),
      expandText: this.props.expandText || getIntl(intl, 'search.form.btn.expand'),
      collapseText: this.props.collapseText || getIntl(intl, 'search.form.btn.collapse'),
    }
    this.formItemFormat = {};
    this.fieldsCache = undefined; // 缓存 field
  }

  handleSubmit = (err, values) => {
    const { dispatch, modelName, onFetchList } = this.props;
    const API = this.props.API || this.props[modelName].API;
    if(!err){
      Object.keys(values).map(key => {
        if (values[key] instanceof moment) {
          values[key] = values[key].format(this.formItemFormat[key]);
        }
        if (Array.isArray(values[key])) {
          const valueArray = [];
          values[key].map(val => {
            if (val instanceof moment) {
              valueArray.push(val.format(this.formItemFormat[key]));
            }
          });
          values[key] = valueArray && valueArray.length > 0 ? valueArray : values[key];
        }
      });

      if(dispatch){
        dispatch({
          type: `${modelName}/fetchList`,
          payload: {
            API,
            ...values,
          }
        });
      }else{
        if(onFetchList){
          onFetchList(values);
        }
        return false;
      }
    }


  }

  onRef = (ref) => {
     this.child = ref
  }

  handleCancel = () => {
    this.child.props.form.resetFields();
  }

  toggleExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    })
  }


  formatLayout = (convertedFields) => {
    const { expand, simpleSearchCount } = this.state;
    const { columnNum = 3 } = this.props;
    const span = 24 / columnNum;
    if (this.getFormLayout() === 'inline') {
      return convertedFields;
    }
    const fields = expand ? convertedFields : convertedFields.slice(0, simpleSearchCount);
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        {fields.map((field, index) => {
          return (
            <Col md={span} sm={24} key={index} style={{height: '40px'}}>
              {field}
            </Col>
          )
        })}
      </Row>
    )
  }

  getLayout = (field) => {
    if (field.layout) {
      return field.layout;
    }
    return this.getFormLayout() === 'inline' ? {} : formItemLayout;
  }

  generateFormItem = (fields) => {
    if (fields) {
      if( this.fieldsCache ){
        return this.fieldsCache;
      }else{
        this.fieldsCache = this.formatLayout(convertFields(fields.map(item => {
          this.formItemFormat[item.field] = item.format;
          return {
            ...item,
            layout: this.getLayout(item),
            attrs: this.getFormLayout() === 'inline' && item.type.indexOf('select') >= 0 ? { ...item.attrs } : item.attrs,
          }
        })));
      }
      return this.fieldsCache;
    }
  }

  getSubmitExtra = (fields) => {
    const { collapseText, expandText, cancelText, expand, simpleSearchCount } = this.state;
    const extra = [ <Button key='cancel-btn' style={{marginLeft: 8}} onClick={this.handleCancel}>{cancelText}</Button> ];
    if (fields && fields.length > simpleSearchCount) {
      expand && extra.push(<a key='expand-btn' style={{marginLeft: 8}}
          onClick={this.toggleExpand}>{collapseText} <Icon type="up" /></a>)
      !expand && extra.push(<a key='collapse-btn' style={{marginLeft: 8}}
          onClick={this.toggleExpand}>{expandText} <Icon type="down" /></a>)
    }
    return extra;
  }

  getFormLayout = () => {
    const { inlineCount } = this.state;
    const { fields = null } = this.props;
    if (fields && fields.length <= inlineCount) {
      return 'inline'
    }
    return 'horizontal'
  }

  renderSubmit = () => {
    const { submitText } = this.state;
    const { intl, submitting, fields = null, orderBy = null } = this.props;
    let preFields = [];
    let orderByItems = [];
    if (orderBy && Array.isArray(orderBy)) {
      preFields.push({
        field: 'orderBy',
        type: 'select',
        props: { placeholder: getIntl(intl, 'search.form.orderBy') },
        label: null, // don't display label
        layout: {},
        options: orderBy,
        attrs: this.getFormLayout() === 'inline' ? { width: 120 } : null,
      });
      preFields.push({
        field: 'sorted',
        type: 'select',
        value: 'asc',
        label: null, // don't display label
        layout: {},
        options: [
          { key: getIntl(intl, 'search.form.orderBy.asc'), value: 'asc' },
          { key: getIntl(intl, 'search.form.orderBy.desc'), value: 'desc' },
        ]
      });
      orderByItems = convertFields(preFields);
    }

    if (this.getFormLayout() === 'inline') {
      return (
        [
          ...orderByItems,
            <BasicForm.Submit
            key='search-submit'
            layout={{}}
            loading={submitting}
            extra={this.getSubmitExtra(fields)}
          >{submitText}</BasicForm.Submit>
       ]
      )
    }

    return (
      <Row type="flex" justify="end" gutter={4}>
        {orderByItems.map((item, index) => {
          return <Col key={index} span={preFields[index].field === 'sorted' ? 3 : 6} style={{height: '40px'}}>
            {item}
          </Col>
        })}
        <Col key='submit' style={{height: '40px'}}>
          <BasicForm.Submit
            layout={{}}
            loading={submitting}
            extra={this.getSubmitExtra(fields)}
          >{submitText}</BasicForm.Submit>
          </Col>
      </Row>
    )
  }

  render() {
    const { fields = null } = this.props;

    return (
      <div>
        {fields.length > 0 ?
          <BasicForm onRef={this.onRef}
            onSubmit={this.handleSubmit}
            layout={this.getFormLayout()}
          >
          {this.generateFormItem(fields)}
          {this.renderSubmit()}
        </BasicForm> : ''}
      </div>
    );
  }
}
