/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <GridForm>
      intl = ''
      cancelText = 'Cancel'
      submitText = 'Submit'
      dispatch
      modelName
      location: { search }
      API = ''
      REDIRECT = null
      columnNum = 3
      submitting
      submitForm = null
      submitLayout = null
      isFooterSubmit = false
      fields
    </GridForm>
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

import { BasicForm, FooterToolbar } from 'kqd-common';

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
export default class GridForm extends PureComponent {

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      type: 'create',
      cancelText: this.props.cancelText || getIntl(intl, 'general.form.btn.cancel'),
      submitText: this.props.submitText || getIntl(intl, 'general.form.btn.submit'),
    };
    this.formItemFormat = {};
  }

  componentDidMount() {
    const { dispatch, modelName, location: { search } } = this.props;
    const API = this.props.API || this.props[modelName].API;
    const id = queryString.parse(search).id;
    if (id) {
      dispatch({
        type: `${modelName}/fetchOne`,
        payload: {
          id,
          API
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const modelName = nextProps.modelName;
    if (modelName) {
      const currentItem = nextProps[modelName].currentItem;
      if (currentItem && currentItem.id) {
        this.setState({
          type: 'update'
        })
      }
    }
  }

  handleSubmit = (err, values) => {
    const { dispatch, modelName, REDIRECT = null } = this.props;
    const { currentItem } = this.props[modelName];
    const API = this.props.API || this.props[modelName].API;
    if (!err) {
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

      const id = currentItem.id;
      dispatch({
        type: `${modelName}/${this.state.type}Form`,
        payload: {
          API,
          REDIRECT,
          id,
          ...values,
        }
      });
      if (REDIRECT == null) {
        dispatch({
          type: `${modelName}/hideModal`
        })
      }
    }
  }


  handleCancel = () => {
    // 先清空旧数据
    const { dispatch, modelName, REDIRECT = null } = this.props;
    dispatch({
      type: `${modelName}/fetchSuccess`,
      payload: {
        currentItem: {}
      }
    });
    if (REDIRECT != null) {
      dispatch(routerRedux.goBack());
    }
    else {
      dispatch({ type: `${modelName}/hideModal` })
    }
  }

  generateFormItem = (fields) => {
    const { columnNum = 3 } = this.props;
    if (fields) {
      const defaultLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };
      const spanLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      }
      const spanList = [];
      const convertedFields = convertFields(fields.map(field => {
        let span = 24 / columnNum;
        if (field.span) {
          const count = field.span > columnNum ? columnNum : field.span;
          span = span * count;
          spanList.push(span);
          return {
            ...field,
            layout: spanLayout,
          }
        }
        spanList.push(span);
        return {
          ...field,
          layout: defaultLayout,
        }
      }));

      return (
        <Row>
        {
          convertedFields.map((field, index) => {
            this.formItemFormat[field.props.name] = field.props.format;
            const span = spanList[index];
            return (
              <Col md={span} sm={24} key={index}>
                {field}
              </Col>
            )
          })
        }
        </Row>
      )
    }
  }

  // 初始值，如果提供value则用value，否则用currentItem里的值
  convertValue = (currentItem, fields) => {
    if (fields && Array.isArray(fields) && fields.length > 0) {
      return fields.map(field => {
        return {
          ...field,
          value: field.value || currentItem[field.field]
        }
      })
    }
    return [];
  }

  renderSubmit = () => {
    const { cancelText, submitText } = this.state;
    const { submitting, submitForm = null, submitLayout = null, isFooterSubmit = false } = this.props;
    if (submitForm) {
      return submitForm;
    }

    if (isFooterSubmit) {
      return (
        <FooterToolbar>
          <Button onClick={this.handleCancel}>{cancelText}</Button>
          <Button type="primary" htmlType="submit">{submitText}</Button>
        </FooterToolbar>
      )
    }

    return <BasicForm.Submit
      loading={submitting}
      layout={submitLayout || null}
      extra={
        <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>{cancelText}</Button>
      }
    >{submitText}</BasicForm.Submit>
  }

  render() {
    const { loading = false, modelName, additionalFields = [] } = this.props;
    const { currentItem } = this.props[modelName];
    const currentFields = currentItem.fields || this.props[modelName].fields || this.props.fields || [];
    const fields = this.convertValue(currentItem, currentFields.concat(additionalFields));
    return (
      <Spin spinning={loading}>
        {fields ? <BasicForm onSubmit={this.handleSubmit}>
          {this.generateFormItem(fields)}
          {this.renderSubmit()}
        </BasicForm> : 'loading'}
      </Spin>
    );
  }
}
