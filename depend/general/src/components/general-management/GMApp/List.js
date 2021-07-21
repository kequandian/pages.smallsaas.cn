import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import { TitledHeader } from 'kqd-page-header';

import getConfigUtils from '../utils/getConfig';

import SearchForm from './SearchForm';
import OperationButton from './/OperationButton';

import GeneralTable from '../components/GeneralTable';
import TableAction from '../components/wrapped/TableAction';
let GeneralTableWrapped = TableAction(GeneralTable);

import EventProxy from './EventProxy';
import EmptyList from '../components/empty-list';

export default class GMAppList extends PureComponent {
  renderListSet = () => {
    let { getConfig, modelStatus, REDIRECT,
      listProps = {},
      config,
    } = this.props;

    if( !getConfig || config ){
      if(config){
        getConfig = getConfigUtils(config);
      }else{
        console.error('请于 props 中给 GMAppList 传入 config 或 经过 getConfigUtils 包装后的 getConfig');
        return false;
      }
    }

    const { onListComponentMount, rowSelection, ItemComponent, formatListData, pagination } = listProps;
    const EventProxyProps = {
      ...this.props,
      getConfig,
      REDIRECT,
      listQueryData: listProps.listQueryData,
      onComponentMount: onListComponentMount,
      pagination,
    };
    // 预注册 listAction ，真正的注册会在 EventProxy 里面进行。
    if(!modelStatus.listAction){
      modelStatus.listAction = {};
    }
    return (
      <EventProxy { ...EventProxyProps }>
        <SearchForm
          eventType="search"
          fields={ getConfig('search.fields') }
          columnNum={ getConfig('search.columnNum', 3) }
          simpleSearchCount={ getConfig('search.simpleSearchCount', 3)  }
        />
        <OperationButton
          eventType="operation"
          action={ getConfig('operation.action') }
          fields={ getConfig('operation.fields') }
          columnNum={ getConfig('operation.columnNum', 4) }
        />
        { ItemComponent ? 
        ( <EmptyList
            eventType={ ['baseTable', 'tableAction'] }
            modelStatus={ modelStatus }
            columns= { getConfig('table.columns') }
            operation={ getConfig('table.operation') }
            rowSelection={ rowSelection }
            formatListData={ formatListData }
          >
            <ItemComponent />
          </EmptyList>)
        : (
            <GeneralTableWrapped
            eventType={ ['baseTable', 'tableAction'] }
            modelStatus={ modelStatus }
            columns= { getConfig('table.columns') }
            operation={ getConfig('table.operation') }
            operationWidth={ getConfig('table.operationWidth') }
            scroll={ getConfig('table.scroll') instanceof Array ? {} : getConfig('table.scroll') }
            rowSelection={ rowSelection }
            formatListData={ formatListData }
          />
        )
        }
      </EventProxy>
    );
  }
  render() {
    let { namespace, listProps = {} } = this.props;

    const { title = true, listHeaderComponent } = listProps;

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

