import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import { TitledHeader } from 'kqd-page-header';
import GeneralForm from '../../general-form';
// import SearchForm from '../../search-form';
// import OperationButton from './OperationButton';
// import DataTable from './DataTable';

// import EventProxy from './wrapped/EventProxy';

// let OperationButtonWrapped = EventProxy(OperationButton);
import SearchForm from '../../search-form';
import OperationButton from './OperationButton';
import GeneralTable from './GeneralTable';
import TableAction from './wrapped/TableAction';
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
    let { getConfig, namespace, modelState, dispatch, loading, location, title = false, queryProps } = this.props;
    const { queryTitle } = queryProps;
    if(!namespace){
      namespace = modelState.API.substring(modelState.API.lastIndexOf('/')).slice(1);
    }
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
    props[namespace] = modelState;
    let searchProps = {
      dispatch,
      modelName: namespace
    }
    searchProps[namespace] = modelState;
    const EventProxyProps = {
      ...this.props,
      API: getConfig('details.table.API', 'default_Query_Components_not_find_API_config'),
      queryMap: getConfig('details.table.queryMap'),
      namespace,
      modelState,
      dispatch
    };

    if(queryTitle !== undefined){
      title = queryTitle;
    }
    
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
            modelState = { modelState }
            dispatch = { dispatch }
          />
          <GeneralTableWrapped
            eventType={ ['baseTable', 'tableAction'] }
            // API= { getConfig('details.table.API') }
            modelState={ modelState }
            data= { typeof(getConfig('details.table.dataField')) === 'string' ? 
                      this.getFieldData(modelState,getConfig('details.table.dataField')) : undefined }
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

