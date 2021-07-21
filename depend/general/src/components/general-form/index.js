/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <GeneralForm>
      modelName = ''     //模块框的名称
      dispatch
      intl = ''
      basicInfoText = ''    //默认显示  基本信息
      relatedInfoText = ''  //默认显示管理信息
      cancelText = ''      //取消按钮文本
      submitText = ''     //提交按钮的文本
      REDIRECT = ''
      columnNum = 3     //占据多少列
      dataPool
      location: { search }
      onFormComponentMount = {() =>{}}
      beforeSubmit = {(data) =>{}}
    </GeneralForm>
 */


import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
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

import { BasicForm, WhiteSpace, FooterToolbar } from 'kqd-common';
import { TitledHeader } from 'kqd-page-header';

import { convertFields } from '../../utils/schema';
import { getIntl } from '../../utils/utils';

// import FormChildren from './FormChildren';

// import OperationButton from '../general-management/components/OperationButton';
// import EventProxy from '../general-management/components/wrapped/EventProxy';
// import DataTable from '../general-management/components/DataTable';

// let OperationButtonWrapped = EventProxy(OperationButton);

import ChildrenList from '../general-management/components/ChildrenList';

/**
 * 通用表单，从model里取数据填充表单
 * 每行一个表单项
 */
@injectIntl
export default class GeneralForm extends PureComponent {

  static childContextTypes = {
    modelState: PropTypes.object,
    queryData: PropTypes.object,
    dispatch: PropTypes.any,
    namespace: PropTypes.string,
  }

  getChildContext () {
    const { modelName, dispatch } = this.props;

    return {
      modelState: this.props[modelName],
      queryData: this.queryData,
      dispatch,
      namespace: modelName,
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
    this.type = queryString.parse(props.location.search).type; // 需要一个不引起 render 的，标明 是 edit 还是 add 的 flag
    this.getFormItemCount = 0;

    this.queryData = {}; // 目前 一对多中，弹出的模态框会依据这个添加查询条件。field 可以修改该项。

  }

  componentDidMount() {
    const { dispatch, modelName, location: { search }, onFormComponentMount } = this.props;
    const API = this.props.API || this.props[modelName].API;
    const id = queryString.parse(search).id;

    if(typeof(onFormComponentMount) === 'function'){
      const rst = onFormComponentMount();
      if(rst === false) return false;
    }

    if (id) {
      dispatch({
        type: `${modelName}/fetchOne`,
        payload: {
          id,
          API
        }
      });
    }
    else {
      dispatch({
        type: `${modelName}/resetCurrentItem`,
        payload: { }
      });
    }
  }

  /**
   * 根据 model currentItem 是否有id判断是保存还是更新
   */
  componentWillReceiveProps(nextProps) {
    const modelName = nextProps.modelName;
    if (modelName) {
      const currentItem = nextProps[modelName].currentItem;
      if (currentItem && currentItem.id) {
        if(this.type !== 'add'){
          this.setState({
            type: 'update'
          })
        }
      }
    }
  }

  handleSubmit = (err, values) => {
    console.log('======== value = ',values);
    const { dispatch, modelName, REDIRECT = null } = this.props;
    const { currentItem } = this.props[modelName];
    let API = this.props[`${this.state.type}API`] || this.props[modelName][`${this.state.type}API`] || this.props.API ||this.props[modelName].API;
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
        if(typeof(obj) === 'object'){
          // 对级联下拉框有做修改的话，取修改后的值
          values[field.field] = obj.value;
          values[field.options.childrenField] =  obj.childrenValue;
        }else{
          // 否则直接拿 初始值
          values[field.field] = obj;
          values[field.options.childrenField] =  field.childrenValue;
        }
      });

      if (this.props.beforeSubmit) {
        const rst = this.props.beforeSubmit(values);
        if( typeof(rst) === 'object' ){
          values = rst;
        }
      }

      let id = currentItem.skus && currentItem.skus[0] && currentItem.skus[0].id;
      if(id){
        dispatch({
          type: `${modelName}/${this.state.type}SkuForm`,
          payload: {
            API,
            REDIRECT,
            id,
            ...values,
            ...children,
          }
        });
      }else{
        const { dataPool } = this.props;
        /**/
        let getFormAllData = {};
        if(dataPool && dataPool.getToFormAll){
          getFormAllData = dataPool.getToFormAll()
        }
        /**/
        console.log('-====== dataPool = ',this.props);
        id = currentItem.id;
        // API = API.replace('{ID}',id);
        dispatch({
          type: `${modelName}/${this.state.type}Form`,
          payload: {
            API,
            REDIRECT,
            id,
            // ...dataPool.getToFormAll(),
            ...getFormAllData,
            ...values,
            ...children,
          }
        });
      }
      if (REDIRECT == null) {
        dispatch({
          type: `${modelName}/hideModal`
        });
        if(this.props.retrieveDataList){
          setTimeout( _=> {
            this.props.retrieveDataList({ pagination: { current: 1 }});
          }, 1000);
        }
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

  /**
   * 处理 从弹出框选择子列表，更新到model的currentItem
   */
  handleChildrenSelected = (field, selectedList) => {
    const { dispatch, modelName } = this.props;
    let { currentItem } = this.props[modelName];
    currentItem[field] = currentItem[field] || [];
    currentItem[field] = currentItem[field].concat(selectedList);
    dispatch({
      type: `${modelName}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }


  handleChildrenBulkRemoved = (field, selectedList) => {
    const { dispatch, modelName } = this.props;
    let { currentItem } = this.props[modelName];
    currentItem[field] = currentItem[field] || [];
    currentItem[field] = currentItem[field].filter(item => selectedList.find(i => i.id === item.id) === undefined);
    dispatch({
      type: `${modelName}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }

  handleChildrenRemoved = (field, record) => {
    const { dispatch, modelName } = this.props;
    let { currentItem } = this.props[modelName];
    currentItem[field] = currentItem[field] || [];
    currentItem[field] = currentItem[field].filter(item => item.id !== record.id);
    dispatch({
      type: `${modelName}/fetchSuccess`,
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
      //console.log('convertedFields = ', convertedFields);
      // 保存时间格式
      convertedFields.map(field => {
        this.formItemFormat[field.props.name] = field.props.format;
      });
      const { showBasicInfoWrapper = true } = this.props;
    /*
      if (this.hasChildren(fields) && showBasicInfoWrapper) {
        const { basicInfoText } = this.state;
        //直接用 TitledLayout，表单无法输入。原因未知。
        return (
          <div className="k-titled-layout">
            <div className="k-titled-layout-head">
              <div className="k-titled-layout-head-wrapper">
                <div className="k-titled-layout-head-title">{this.state.basicInfoText}</div>
              </div>
            </div>
            <div className='k-titled-layout-body'>
              {convertedFields}
            </div>
          </div>
        )
      }
    */
      this.convertedFieldsCache = convertedFields;
      this.spanListCache = spanList;
      this.isFieldsInitialized = true;

      return convertedFields;

      // return (
      //   <Row>
      //   {
      //     convertedFields.map((field, index) => {
      //       this.formItemFormat[field.props.name] = field.props.format;
      //       const span = this.spanListCache[index];
      //       return (
      //         <Col md={span} sm={24} key={index}>
      //           {field}
      //         </Col>
      //       )
      //     })
      //   }
      //   </Row>
      // )
    }
    // 空数组的情况下，直接返回原数组
    return fields;
  }

  /**
   * 一对多情况
   */
  genFormChildren = (fields) => {
    const { relatedInfoText } = this.state;
    const { getConfig, location, modelName, dispatch, dataPool } = this.props;
    const { currentItem } = this.props[modelName];
    const API = this.props.API || this.props[modelName].API;
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
        namespace: modelName,
        dataPool,
      };
      // const title = relatedInfoText + ' - ' + field.field;
      let modelState = { ...this.props[modelName] };

      return (
        <Fragment key={field.field}>
          <WhiteSpace size='xs' />
          { /* <TitledHeader title={title} showCollapse={true}>
            <FormChildren {...formChildrenProps} />
          </TitledHeader>
      */ }
          {/* <OperationButtonWrapped
            action={ modelState.config.children.operation.action }
            fields={ modelState.config.children.operation.fields }
            searchProps={ searchProps }
            modelState = { modelState }
            { ...formChildrenProps }
          />
          <DataTable
            operation={ modelState.config.children.table.operation }
            modelState={ modelState }
            { ...formChildrenProps }
          /> */}

          <ChildrenList { ...formChildrenProps } modelState = { modelState } />
        </Fragment>
      )
    })
  }

  // Item 的值，优先使用从服务器取回来的 currentItem value，否则使用 fields value
  convertValue = (currentItem, fields) => {
    if (fields && Array.isArray(fields) && fields.length > 0) {
      return fields.map(field => {
        if( field.type === 'concatenate-select' ) {
          return {
            ...field,
            value: currentItem[field.field] || field.value,
            childrenValue: currentItem[field.options.childrenField],
          }
        }
        return {
          ...field,
          props: {
            ...field.props,
            isfirsttimeinit: `${!this.isFieldsInitialized}`, // 标明组件是否第一次初始化，全小写是为了防止 React 警告
          },
          value: currentItem[field.field] || field.value
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
    const { modelName } = this.props;
    const { currentItem } = this.props[modelName];
    const currentFields = currentItem.fields || this.props[modelName].fields || this.props.fields || [];

    let rst = false;
    if( Object.keys(currentItem).length === 0 ){
      rst = true;
    }
    if( currentFields.length > 0 ){
      const index = currentFields.findIndex( field => {
        return field.type === 'input'|| field.type === 'plain' || field.type === 'serial-code';
      })
      rst = index >= 0 &&Object.keys(currentItem).some( key => {
        return currentFields[index].field === key && currentItem[key] !== undefined;
      })
    }
    return rst;
  }
  getFields = () => {
    const { modelName, additionalFields = [] } = this.props;
    const { currentItem } = this.props[modelName];
    const currentFields = currentItem.fields || this.props[modelName].fields || this.props.fields || [];
    return this.convertValue(currentItem, currentFields.concat(additionalFields));
  }
  getFormItem = () => {
    const { modelName } = this.props;
    const { currentItem } = this.props[modelName];
    let convertedFields = undefined;

    console.log('getFormItem',this.type,this.getFormItemCount);

    if( (this.type === 'edit' || this.type === 'query') && !this.isReady() ){
      // 如果需要渲染后台数据的话，那么在从后台取到数据到 model 之前都不渲染 fields
      convertedFields = [];
    }else{
      if(currentItem.fields || this.props[modelName].fields || !this.convertedFieldsCache){
        const fields = this.getFields();
        convertedFields = this.generateFormItem(fields);
      }else{
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
          if (field.props.hidden === true){
            return (
              <div style={{display: 'none'}} key={index}>
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

  render() {
    const { loading = false, layout = 'horizontal' } = this.props;
    const fields = this.getFields();

    // console.log('GeneralForm',this);

    return (
      <Spin spinning={loading}>
      {fields ?
        <BasicForm onSubmit={this.handleSubmit} layout={layout}>
          {/* {this.generateFormItem(fields)} */}
          {this.getFormItem()}
          {this.genFormChildren(fields)}
          {this.renderSubmit()}
        </BasicForm>
        : 'loading' }
      </Spin>
    );
  }
}
