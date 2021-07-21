/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <UMForm>
      modelState = ''
      API               //api获取数据
      id                 //传入id
      namespace          //model容器名
      loading           //加载状态
      location         //监听路由
      config = {}     //相关配置数据
    </UMForm>
 */

import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import { TitledHeader } from 'kqd-page-header';
import { BasicForm, FooterToolbar } from 'kqd-common';
import moment from 'moment';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { convertFields } from '../../../utils/schema';
import queryString from 'query-string';

import ModelWrappen from '../wrapped';
import NotModelEventProxy from './wrapped/EventProxy';

// let BasicFormWrappen = NotModelEventProxy(BasicForm,'form');
// BasicFormWrappen = ModelWrappen(BasicFormWrappen);

export default class UMForm extends PureComponent {
  constructor(props) {
    super(props);
    this.formItemFormat = {};
  }

  // componentDidMount() {
  //   if (this.props.ignoreFetch) {
  //     return;
  //   }
  //   const { modelName, location = {}, onSaveState } = this.props;
  //     const API = this.props.API || this.props[modelName].API;
  //     let url = API;
  //   const id = queryString.parse(location.search).id;
  //     if (id) {
  //       url = `${API}/${id}`;
  //     }
  //     const { onSaveState } = BasicFormWrappen.props;
  //     onSaveState({
  //       loading: true,
  //     })
  //     get(`${url}`).then(({ code, message, data }) => {
  //       onSaveState({
  //         currentItem: data,
  //         loading: false,
  //       });
  //     });
  // }

  // handleSubmit = (err, values) => {
  //   const { modelState } = this.props;
  //   const API = this.props.API || modelState.API;
  //   const { currentItem } = modelState;
  //   if (!err) {
  //     Object.keys(values).map(key => {
  //       if (values[key] instanceof moment) {
  //         values[key] = values[key].format(this.formItemFormat[key]);
  //       }
  //       if (Array.isArray(values[key])) {
  //         const valueArray = [];
  //         values[key].map(val => {
  //           if (val instanceof moment) {
  //             valueArray.push(val.format(this.formItemFormat[key]));
  //           }
  //         });
  //         values[key] = valueArray && valueArray.length > 0 ? valueArray : values[key];
  //       }
  //     });

  //     // 根据是否有id决定调哪个API, 如果知道了ignoreId属性则无视id
  //     let invoker = create;
  //     let url = API;
  //     if (!this.props.ignoreId && currentItem.id) {
  //       invoker = update;
  //       url = `${API}/${currentItem.id}`;
  //     }
  //     if (this.props.beforeSubmit) {
  //       this.props.beforeSubmit(values);
  //     }
  //     invoker(url, { ...values }).then((result) => {
  //       if (result.code === 200) {
  //         message.success(result.message);
  //       }
  //       else {
  //         message.error(result.message);
  //       }
  //       if (this.props.afterSubmit) {
  //         this.props.afterSubmit(result);
  //       }
  //     });

  //   }
  // }

  generateFormItem = (fields) => {
    const { modelState } = this.props;
    const columnNum = modelState.config.form.colNumber || 3;
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

  render() {
    let { API, id, modelState, namespace, loading, location, config } = this.props;
    let props = {
      ...this.props,
      API,
      id,
      // fields: modelState.config.form.fields,
      // columnNum: modelState.config.form.colNumber,
      submitForm: modelState.config.form.disabledSubmit,
      loading: loading,
      location: location,
      modelState,
      onSubmit: this.handleSubmit,
      layout: 'horizontal',
    };

    console.log('UM Form:',props);

    return (
      <Fragment>
        {/* <TitledHeader title={<FormattedMessage id={`${namespace}.form.title`}/>}>
          <BasicFormWrappen
            { ...props }
          >
            {this.generateFormItem(config.form.fields)}
          </BasicFormWrappen>
        </TitledHeader> */}
        <br />TODO……
      </Fragment>
    );
  }
}
