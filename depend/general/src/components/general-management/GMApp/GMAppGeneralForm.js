import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import moment from 'moment';

import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Modal } from 'antd';

import { BasicForm, WhiteSpace, FooterToolbar } from 'kqd-common';

import { convertFields } from '../../../utils/schema';
import { getIntl } from '../../../utils/utils';
import replaceKey from '../utils/replaceKey';

import ChildrenList from './ChildrenList';
import { getConfig } from '../../../config';

const confirm = Modal.confirm;

/**
 * 通用表单，从model里取数据填充表单
 * 每行一个表单项
 */
@injectIntl
export default class GMAppGeneralForm extends PureComponent {

  static childContextTypes = {
    modelStatus: PropTypes.object,
    queryData: PropTypes.object,
    dispatch: PropTypes.any,
    namespace: PropTypes.string,
    onSelectChange: PropTypes.any,
  }

  getChildContext() {
    const { namespace, dispatch, modelStatus, formProps = {} } = this.props;
    const { onSelectChange } = formProps;

    return {
      modelStatus,
      queryData: this.queryData,
      dispatch,
      namespace: namespace,
      onSelectChange,
    }
  }

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      type: 'create',
      basicInfoText: this.props.basicInfoText || getIntl(intl, 'general.form.title.basicInfoText'),
      relatedInfoText: this.props.relatedInfoText || getIntl(intl, 'general.form.title.relatedInfoText'),
      cancelText: this.props.cancelText || getIntl(intl, 'general.form.btn.cancel'),
      submitText: this.props.submitText || getIntl(intl, 'general.form.btn.submit'),
    };
    this.formItemFormat = {};

    // 引入 spanListCache 和 convertedFieldsCache 是为了避免由于 常规的 model 变化而引起 field 重新渲染
    this.isFieldsInitialized = false;
    this.spanListCache = [];
    this.convertedFieldsCache = undefined;
    this.FORMTYPE = props.FORMTYPE === undefined ?
      queryString.parse(props.location.search.replace('?', '')).id === undefined ? 'create' : 'update'
      : props.FORMTYPE; // 需要一个不引起 render 的，标明 是 edit 还是 add 的 flag
    this.ALWAYSRENDER = props.ALWAYSRENDER || false; // 无论 this.FORMTYPE 如何，总是第一时间渲染 fields
    this.getFormItemCount = 0;

    this.queryData = {}; // 目前 一对多中，弹出的模态框会依据这个添加查询条件。field 可以修改该项。

    this.basicForm = {};

    this.gotData = false; // 已从 API 拿到数据
  }

  componentDidMount() {
    const { dispatch, namespace, modelStatus, location: { search }, onFormComponentMount, requester, APIObject = {} } = this.props;
    const API = this.props.API || modelStatus.API;
    const id = queryString.parse(search.replace('?', '')).id;

    if (typeof (onFormComponentMount) === 'function') {
      const rst = onFormComponentMount();
      if (rst === false) return false;
    }

    if (this.FORMTYPE !== 'create' || id) {
      requester.fetchOne({
        API: APIObject.getAPI,
      });
    }
    else {
      requester.fetchOneClear();
    }
  }

  /**
   * 根据 model currentItem 是否有id判断是保存还是更新
   * 直接根据 location search type 来判断不可靠，无法确定自定义 type 的情况
   */
  componentWillReceiveProps(nextProps) {
    const modelStatus = nextProps.modelStatus;
    if (modelStatus) {
      const currentItem = modelStatus.currentItem;
      if (currentItem && currentItem.id) {
        if (this.FORMTYPE !== 'create') {
          this.setState({
            type: 'update'
          })
        }
      }
    }
  }
  componentWillUnmount() {
    const { dispatch, namespace } = this.props;
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem: {}
      }
    });
  }

  handleSubmitConfig = (err, values) => {
    if (!err) {
      const _this = this;
      if (getConfig('submitConfirm')) {
        confirm({
          title: '确定要提交这份数据吗？',
          content: '',
          onOk() {
            _this.handleSubmit(err, values);
          },
          onCancel() { },
        });
      } else {
        this.handleSubmit(err, values);
      }
    }
  }
  handleSubmit = (err, values) => {
    const { dispatch, namespace, modelStatus, REDIRECT = null } = this.props;
    const { currentItem } = modelStatus;
    const formType = this.FORMTYPE;
    let API = this.API;
    if (!err) {
      // 处理时间格式化
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

      // 一对多的 item 字段 重命名
      let children = {};
      this.getFields().filter(field => field.type === 'children').map(field => {
        children[field.mapItemFieldTo] = currentItem[field.field];
      });

      // 级联下拉框的取值
      this.getFields().filter(field => field.type === 'concatenate-select').map(field => {
        const obj = JSON.parse(values[field.field]);
        if (typeof (obj) === 'object') {
          // 对级联下拉框有做修改的话，取修改后的值
          values[field.field] = obj.value;
          values[field.options.childrenField] = obj.childrenValue;
        } else {
          // 否则直接拿 初始值
          values[field.field] = obj;
          values[field.options.childrenField] = field.childrenValue;
        }
      });

      const { dataPool, requester, APIObject = {} } = this.props;
      values = {
        ...dataPool.getToFormAll(),
        ...dataPool.getToTempAll(),
        ...values,
      };

      if (this.props.beforeSubmit) {
        const rst = this.props.beforeSubmit(values);
        if (typeof (rst) === 'object') {
          const { ERROR, ...rest } = rst;
          if (ERROR === true && this.basicForm.setFields) {
            Object.keys(rest).forEach(key => {
              this.basicForm.setFields({
                [key]: {
                  value: values[key],
                  errors: [new Error(rest[key])],
                },
              });
            });
            return false;

          } else {
            values = rst;
          }
        }

        if (typeof (rst) === false) {
          return false;
        }
      }

      const id = currentItem.id;
      // API = API.replace('{ID}',id);
      if (formType === 'create') {
        requester.createForm({
          REDIRECT,
          id,
          API: API || APIObject.createAPI,
          ...values,
          ...children,
        });
      } else {
        requester.updateForm({
          REDIRECT,
          id,
          API: API || APIObject.updateAPI,
          ...values,
          ...children,
        });
      }
      if (REDIRECT == null) {
        dispatch({
          type: `${namespace}/hideModal`
        });
        if (this.props.refreshList) {
          setTimeout(_ => {
            this.props.refreshList();
          }, 1000);
        }
      }
    }
  }

  handleCancel = () => {
    // 先清空旧数据
    const { dispatch, namespace, REDIRECT = null } = this.props;
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem: {}
      }
    });
    if (REDIRECT != null) {
      dispatch(routerRedux.goBack());
    }
    else {
      dispatch({ type: `${namespace}/hideModal` })
    }
  }

  /**
   * 处理 从弹出框选择子列表，更新到model的currentItem
   */
  handleChildrenSelected = (field, selectedList) => {
    const { dispatch, namespace, modelStatus } = this.props;
    let { currentItem } = modelStatus;
    currentItem[field] = currentItem[field] || [];
    currentItem[field] = currentItem[field].concat(selectedList);
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }


  handleChildrenBulkRemoved = (field, selectedList) => {
    const { dispatch, namespace, modelStatus } = this.props;
    let { currentItem } = modelStatus;
    currentItem[field] = currentItem[field] || [];
    currentItem[field] = currentItem[field].filter(item => selectedList.find(i => i.id === item.id) === undefined);
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }

  handleChildrenRemoved = (field, record) => {
    const { dispatch, namespace, modelStatus } = this.props;
    let { currentItem } = modelStatus;
    currentItem[field] = currentItem[field] || [];
    currentItem[field] = currentItem[field].filter(item => item.id !== record.id);
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }

  hasChildren = (fields) => {
    return fields.filter(field => field.type === 'children').length > 0;
  }

  generateFormItem = (fields) => {
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
    const { columnNum = 3 } = this.props;
    if (fields && Array.isArray(fields) && fields.length > 0) {
      const convertedFields = convertFields(fields.map(field => {
        let span = 24 / columnNum;
        // if (field.type === 'hidden') {
        //   return {
        //     ...field,
        //     layout: {
        //       labelCol: { xs: {span: 0}, sm: {span: 0} },
        //       wrapperCol: { xs: {span: 0}, sm: {span: 0} }
        //     },
        //   }
        // }
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
      // console.log('convertedFields = ', convertedFields);
      // 保存时间格式
      convertedFields.map(field => {
        this.formItemFormat[field.props.name] = field.props.format;
      });
      this.convertedFieldsCache = convertedFields;
      this.spanListCache = spanList;
      this.isFieldsInitialized = true;

      return convertedFields;
    }
    // 空数组的情况下，直接返回原数组
    return fields;
  }

  /**
   * 一对多情况
   */
  genFormChildren = (fields) => {
    const { relatedInfoText } = this.state;
    const { getConfig, location, namespace, dispatch, modelStatus,
      dataPool, requester, beforeChildrenComponent, formProps = {}
    } = this.props;
    const { currentItem } = modelStatus;
    const API = this.props.API || modelStatus.API;
    console.log("genFormChildren, currentItem: ", currentItem);
    return fields.filter(field => field.type === 'children').map(field => {
      // const value = currentItem[field.field] || [];
      let formChildrenProps = {
        getConfig,
        childrenObject: {
          API: field.API || API,
          childrenField: field.field,
          columns: field.columns,
          fieldMap: field.fieldMap,
          operation: field.operation,
          filterField: field.filterField || 'id',
        },
        // data: value,
        location,
        dispatch,
        onComponentMount: () => false,
        onChildrenSelected: formProps.onChildrenSelected,
        namespace: namespace,
        dataPool,
        requester,
        modelStatus,
      };
      // const title = relatedInfoText + ' - ' + field.field;

      return (
        <Fragment key={field.field}>
          <WhiteSpace size='xs' />
          {beforeChildrenComponent}
          <ChildrenList {...formChildrenProps} />
        </Fragment>
      )
    })
  }

  // Item 的值，优先使用从服务器取回来的 currentItem value，否则使用 fields value
  convertValue = (currentItem, fields) => {
    const { dataPool } = this.props;
    const replaceAPIKey = replaceKey(dataPool);
    if (fields && Array.isArray(fields) && fields.length > 0) {
      return fields.map(field => {
        const value = currentItem[field.field] || (currentItem[field.field] === 0 ? 0 : field.value);
        if (field.type === 'concatenate-select') {
          return {
            ...field,
            value,
            childrenValue: currentItem[field.options.childrenField],
          }
        }
        if (field.API !== undefined) {
          field.API = replaceAPIKey.format(field.API);
        }
        return {
          ...field,
          props: {
            ...field.props,
            isfirsttimeinit: `${!this.isFieldsInitialized}`, // 标明组件是否第一次初始化，全小写是为了防止 React 警告
            // dataPool,
          },
          value,
        }
      })
    }
    return [];
  }
  handleSubmitBefore = (method, API) => {
    const methodMap = {
      'post': 'create',
      'put': 'edit',
    };
    this.FORMTYPE = methodMap[method] || 'create';
    this.API = API;
  }

  renderSubmit = () => {
    const { cancelText, submitText } = this.state;
    const { submitting, layout = 'horizontal', submitForm = null, submitButton = [], submitLayout = null, isFooterSubmit = false } = this.props;

    if (submitButton.length > 0) {
      return submitButton.map(button => {
        const { type, title, color = 'primary', method, API } = button;
        if (type === 'return') {
          return <Button onClick={this.handleCancel}>{title}</Button>;
        }
        return <Button onClick={this.handleSubmitBefore.bind(this, method, API)} type={color} htmlType="submit">{title}</Button>
      })
    }

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
      layout={submitLayout || (layout === 'inline' ? {} : null)}
      extra={
        <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>{cancelText}</Button>
      }
    >{submitText}</BasicForm.Submit>
  }

  /**
   * 判断 是否已从后台取到需要渲染的 field 数据
   * @return <boolean>
   */
  isReady = () => {
    const { modelStatus } = this.props;
    const { currentItem } = modelStatus;
    const currentFields = currentItem.fields || modelStatus.fields || this.props.fields || [];
    console.log('check isReady', currentItem, currentFields);
    let rst = false;
    if (Object.keys(currentItem).length > 0) {
      rst = true;
    }
    if (currentFields.length > 0) {
      const index = currentFields.findIndex(field => {
        return field.type !== 'group' && field.type !== 'plain' && field.type !== 'serial-code';
      })
      if (index > -1) {
        // 找到第一个正常的 field，并检测 它 是否已从服务器里取到值
        const findField = currentFields[index].field;
        console.log('find field', findField, currentItem);
        if (currentItem[findField] !== undefined) {
          if ((this.ALWAYSRENDER && !this.gotData)) {
            this.convertedFieldsCache = null;
          }
          this.gotData = true;
          rst = true;
        }
        // rst = Object.keys(currentItem).some( key => {
        //   return currentFields[index].field === key && currentItem[key] !== undefined;
        // })
      }
    }
    return rst;
  }
  getFields = () => {
    const { modelStatus, additionalFields = [] } = this.props;
    const { currentItem } = modelStatus;
    const currentFields = currentItem.fields || modelStatus.fields || this.props.fields || [];
    return this.convertValue(currentItem, currentFields.concat(additionalFields));
  }
  getFormItem = () => {
    const { modelStatus } = this.props;
    const { currentItem } = modelStatus;
    let convertedFields = undefined;

    console.log('getFormItem', this.FORMTYPE, this.getFormItemCount);
    const ready = this.isReady();
    if (!this.ALWAYSRENDER && this.FORMTYPE !== 'create' && !ready) {
      // 如果需要渲染后台数据的话，那么在从后台取到数据到 model 之前都不渲染 fields
      convertedFields = [];
    } else {
      if (currentItem.fields || modelStatus.fields || !this.convertedFieldsCache) {
        const fields = this.getFields();
        convertedFields = this.generateFormItem(fields);
      } else {
        convertedFields = this.convertedFieldsCache;
      }
    }
    this.getFormItemCount += 1;

    return (
      <Row>
        {
          convertedFields.map((field, index) => {
            this.formItemFormat[field.props.name] = field.props.format;
            const span = this.spanListCache[index];
            if (field.props.hidden === true) {
              return (
                <div style={{ display: 'none' }} key={index}>
                  {field}
                </div>
              );
            }
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
  renderBeforeFieldComponent = () => {
    const { beforeFieldComponent, modelStatus } = this.props;
    return beforeFieldComponent && React.cloneElement(beforeFieldComponent, {
      modelStatus,
    });
  }

  render() {
    const { loading = false, layout = 'horizontal' } = this.props;
    const fields = this.getFields();

    // console.log('GeneralForm',this);

    return (
      <Spin spinning={loading}>
        {fields ?
          <BasicForm
            onSubmit={this.handleSubmitConfig}
            layout={layout}
            ref={el => this.basicForm = el}
            enterNotSubmit={true}
          >
            {/* {this.generateFormItem(fields)} */}
            {this.renderBeforeFieldComponent()}
            {this.getFormItem()}
            {this.genFormChildren(fields)}
            {this.renderSubmit()}
          </BasicForm>
          : 'loading'}
      </Spin>
    );
  }
}
