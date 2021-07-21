import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import { TitledHeader } from 'kqd-page-header';
import SearchForm from '../../search-form';
import OperationButton from '../components/OperationButton';
import GeneralTable from '../components/GeneralTable';
import TableAction from '../components/wrapped/TableAction';
let GeneralTableWrapped = TableAction(GeneralTable);

import EventProxy from './EventProxy';

export default class DefaultQuery extends PureComponent {
  componentDidMount(){
    console.warn(' 使用了默认的 Query 组件 ');
  }

  getFieldData = (configSource,configTrace) => {
    let configItem = configSource;
    configTrace = configTrace.split('.') || [];

    const rst = configTrace.some( (key) => {
      if( !configItem[key] ){
        return true;
      }else{
        configItem = configItem[key];
        return false;
      }
    } );

    return rst ? [] : configItem;
  }

  render() {
    let { getConfig, namespace, modelStatus, dispatch, loading, location, queryProps = {} } = this.props;
    if(!namespace){
      namespace = modelStatus.API.substring(modelStatus.API.lastIndexOf('/')).slice(1);
    }
    const { title = true } = queryProps;
    let props = {
      columnNum: getConfig('details.form.colNumber'),
      fields: getConfig('details.form.fields'),
      dispatch: dispatch,
      loading: loading,
      location: location,
      modelName: namespace,
      REDIRECT: `/${namespace}`,
      submitForm: true,
    };
    props[namespace] = modelStatus;
    let searchProps = {
      dispatch,
      modelName: namespace
    }
    searchProps[namespace] = modelStatus;
    const EventProxyProps = {
      ...this.props,
      API: getConfig('details.table.API', 'default_Query_Components_not_find_API_config'),
      queryMap: getConfig('details.table.queryMap'),
      namespace,
      modelStatus,
      dispatch
    };
    
    return (
      <TitledHeader  title={ typeof(title) === 'string' ? title : <FormattedMessage id={`${namespace}.form.title`}/>}>
        <EventProxy { ...EventProxyProps }>
          <SearchForm
            eventType=""
            fields={ getConfig('details.search.fields') }
            columnNum={3}
            { ...searchProps }
          />
          <OperationButton
            eventType="operation"
            action={ getConfig('details.operation.action') }
            fields={ getConfig('details.operation.fields') }
            namespace={ namespace }
            searchProps={ searchProps }
            modelStatus = { modelStatus }
            dispatch = { dispatch }
          />
          <GeneralTableWrapped
            eventType={ ['baseTable', 'tableAction'] }
            // API= { getConfig('details.table.API') }
            modelStatus={ modelStatus }
            data= { typeof(getConfig('details.table.dataField')) === 'string' ? 
                      this.getFieldData(modelStatus,getConfig('details.table.dataField')) : undefined }
            columns= { getConfig('details.table.columns') }
            operation={ getConfig('details.table.operation') }
            dispatch={ dispatch }
            loading={ loading }
            namespace={ namespace }
          />
        </EventProxy>
      </TitledHeader>
    );
  }
}

