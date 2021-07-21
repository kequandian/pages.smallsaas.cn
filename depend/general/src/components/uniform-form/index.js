/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <UniformForm>
      intl = ''
      cancelText = 'Cancel'    //取消按钮
      submitText = 'Submit'    //提交按钮
      ignoreFetch = ''
      modelName = ''      //modal容器名
      location = {}      //路由
      API = ''
      ignoreId = ''
      beforeSubmit = {(data) => {}}
      afterSubmit = {(data) => {}}
      onCancel = {() =>{}}    //取消事件
      columnNum = 3
      submitting = false     //loading状态
      layout = 'horizontal'
      submitForm = null
      submitLayout = null
      isFooterSubmit = false
      footerToolbar = {}
      additionalFields = []
    </UniformForm>
 */

import React, { PureComponent, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { injectIntl } from 'react-intl';
import moment from 'moment';

import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Card from 'antd/lib/card';
import Spin from 'antd/lib/spin';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import message from 'antd/lib/message';

import { BasicForm, FooterToolbar } from 'kqd-common';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

import { convertFields } from '../../utils/schema';
import { getIntl } from '../../utils/utils';

@injectIntl
export default class UniformForm extends PureComponent {

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      loading: false,
      currentItem: {},
      cancelText: this.props.cancelText || getIntl(intl, 'general.form.btn.cancel'),
      submitText: this.props.submitText || getIntl(intl, 'general.form.btn.submit'),
    };
    this.formItemFormat = {};
  }

  componentDidMount() {
    if (this.props.ignoreFetch) {
      return;
    }
	const { modelName, location = {} } = this.props;
    const API = this.props.API || this.props[modelName].API;
    let url = API;
	const id = queryString.parse(location.search).id;
    if (id) {
      url = `${API}/${id}`;
    }
    this.setState({
      loading: true,
    })
    get(`${url}`).then(({ code, message, data }) => {
      this.setState({
        currentItem: data,
        loading: false,
      });
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  onRef = (ref) => {
     this.child = ref
  }

  handleSubmit = (err, values) => {
    const { modelName } = this.props;
    const API = this.props.API || this.props[modelName].API;
    const { currentItem } = this.state;
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

      // 根据是否有id决定调哪个API, 如果知道了ignoreId属性则无视id
      let invoker = create;
      let url = API;
      if (!this.props.ignoreId && currentItem.id) {
        invoker = update;
        url = `${API}/${currentItem.id}`;
      }
      if (this.props.beforeSubmit) {
        this.props.beforeSubmit(values);
      }
      invoker(url, { ...values }).then((result) => {
        if (result.code === 200) {
          message.success(result.message);
        }
        else {
          message.error(result.message);
        }
        if (this.props.afterSubmit) {
          this.props.afterSubmit(result);
        }
      });

    }
  }

  handleCancel = () => {
    this.child.props.form.resetFields();
    this.setState({
      currentItem: {}
    });
    if (this.props.onCancel) {
      this.props.onCancel();
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
    const { submitting, layout = 'horizontal', submitForm = null, submitLayout = null, isFooterSubmit = false } = this.props;
    if (submitForm) {
      return submitForm;
    }
    if (isFooterSubmit) {
      return (
        <FooterToolbar { ...this.props.footerToolbar }>
          <Button onClick={this.handleCancel}>{cancelText}</Button>
          <Button type="primary" htmlType="submit">{submitText}</Button>
        </FooterToolbar>
      )
    }
    return <BasicForm.Submit
      loading={submitting}
      layout={submitLayout || (layout === 'inline' ? {} : null)}
      extra={
        <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>{cancelText}</Button>
      }
    >{submitText}</BasicForm.Submit>
  }

  render() {
    const { layout = 'horizontal', additionalFields = [] } = this.props;
    const { currentItem, loading } = this.state;
    const currentFields = currentItem.fields || this.props.fields || [];
    const fields = this.convertValue(currentItem, currentFields.concat(additionalFields));

    return (
      <Spin spinning={loading}>
      {fields ?
        <BasicForm onRef={this.onRef} onSubmit={this.handleSubmit} layout={layout}>
          {this.generateFormItem(fields)}
          {this.renderSubmit()}
        </BasicForm>
        : 'loading' }
      </Spin>
    );
  }
}
