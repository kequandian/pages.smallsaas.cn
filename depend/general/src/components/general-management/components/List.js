import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import { TitledHeader } from 'kqd-page-header';
import SearchForm from '../../search-form';
import OperationButton from './OperationButton';
// import DataTable from './DataTable';
import GeneralTable from './GeneralTable';
import TableAction from './wrapped/TableAction';
let GeneralTableWrapped = TableAction(GeneralTable);

import EventProxy from './EventProxy';

export default class List extends PureComponent {
  renderListSet = () => {
    let { API, getConfig, namespace, modelState, dispatch, onListComponentMount, rowSelection } = this.props;
    let searchProps = {
        API,
        dispatch,
        modelName: namespace
    }
    searchProps[namespace] = modelState;
    const EventProxyProps = {
        ...this.props,
        namespace,
        modelState,
        dispatch
    };
    return (
      <EventProxy { ...EventProxyProps }>
          <SearchForm
            eventType=""
            fields={ getConfig('search.fields') }
            columnNum={ getConfig('search.columnNum', 3) }
            simpleSearchCount={ getConfig('search.simpleSearchCount', 4)  }
            { ...searchProps }
          />
          <OperationButton
            eventType="operation"
            action={ getConfig('operation.action') }
            fields={ getConfig('operation.fields') }
            columnNum={ getConfig('operation.columnNum', 4) }
            searchProps={ searchProps }
          />
          <GeneralTableWrapped
            eventType={ ['baseTable', 'tableAction'] }
            modelState={ modelState }
            columns= { getConfig('table.columns') }
            operation={ getConfig('table.operation') }
            operationWidth={ getConfig('table.operationWidth') }
            rowSelection={ rowSelection }
            onComponentMount={ onListComponentMount }
          />
        </EventProxy>
    );
  }
  render() {
    let {  title = true, listTitle, namespace, listHeaderComponent } = this.props;

    if(listTitle !== undefined){
      title = listTitle;
    }

    return (
      <Fragment>
        { title ? (
            <TitledHeader title={ typeof(title) === 'string' ? title : <FormattedMessage id={`${namespace}.list.title`}/>}>
              { listHeaderComponent }
                { this.renderListSet() }
           </TitledHeader>
        ) : this.renderListSet()
        }
      </Fragment>
    );
  }
}

