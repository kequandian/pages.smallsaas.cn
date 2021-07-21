import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { TitledHeader } from 'kqd-page-header';
import GeneralForm from '../../general-form';


export default class GMForm extends PureComponent {
  static contextTypes = {
    dataPool: PropTypes.object,
  }

  render() {
    let { getConfig, API, title = true, formTitle, namespace, modelState, dispatch, loading, location, dataPool, formProps } = this.props;
    if(!namespace){
      namespace = modelState.API.substring(modelState.API.lastIndexOf('/')).slice(1);
    }
    let props = {
      ...this.props,
      ...formProps,
      getConfig,
      API,
      columnNum: getConfig('form.colNumber'),
      fields: getConfig('form.fields', this.context.dataPool),
      dispatch: dispatch,
      loading: loading,
      location: location,
      modelName: namespace,
      // onFormComponentMount,
      // submitForm,
      // beforeSubmit,
      dataPool,
      REDIRECT: `/${namespace}`
    };
    props[namespace] = modelState;

    if(formTitle !== undefined){
      title = formTitle;
    }
    
    return (
      <Fragment>
        { title ?
          <TitledHeader title={ typeof(title) === 'string' ? title : <FormattedMessage id={`${namespace}.form.title`}/>}>
            <GeneralForm
              { ...props }
            />
          </TitledHeader>
        : <GeneralForm
            { ...props }
          />
        }
      </Fragment>
    );
  }
}

