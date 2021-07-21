import React, { Component, Fragment  } from 'react'
import PropTypes from 'prop-types';

import OperationButton from '../OperationButton';

import GeneralTable from '../GeneralTable';
import TableAction from '../wrapped/TableAction';

let GeneralTableWrapped = TableAction(GeneralTable);

import EventProxy from '../EventProxy';

import './style.css';

import FooterPrice from './FooterPrice';
import FooterAddPrice from './FooterAddPrice';
import FooterShowPrice from './FooterShowPrice';

/**
 * 负责一对多相关实现
 */
export default class ChildrenList extends Component {

    footerMap = {
      'price': (data) => <FooterPrice data={data} dataPool={ this.props.dataPool } config={ this.footerConfig } modelState={ this.props.modelState } />,
      'addPrice': (data) => <FooterAddPrice data={data} dataPool={ this.props.dataPool } config={ this.footerConfig } modelState={ this.props.modelState } />,
      'showPrice': (data) => <FooterShowPrice data={data} dataPool={ this.props.dataPool } config={ this.footerConfig } modelState={ this.props.modelState } />,
    }

    renderFooter = () => {
      const { getConfig } = this.props;
      const footerConfig = getConfig('children.table.footer');
      if(footerConfig.type){
        this.footerConfig = footerConfig;
        return this.footerMap[footerConfig.type] ? this.footerMap[footerConfig.type] : undefined;
      }else{
        return undefined;
      }
    }
    
    render () {
      console.log('ChildrenList props :', this.props );
      const { props } = this;
      const { getConfig, dispatch, namespace, location, loading, modelState } = props;
      const { childrenField } = this.props.childrenObject || {};

      const childrenList = modelState.currentItem[childrenField] || [];

      const searchProps = {
        dispatch,
        modelName: namespace,
      };

      const dataTableProps = {
        columns: getConfig('children.table.columns'),
        operation: getConfig('children.table.operation'),
        footer: this.renderFooter(),
      };
      
      const EventProxyProps = {
        ...this.props,
        tableData: childrenList,
        namespace,
        modelState,
        dispatch,
        pagination: null,
        rowSelection: false,
      };

      return <EventProxy { ...EventProxyProps } >
          <OperationButton
            eventType="operation"
            action={ getConfig('children.operation.action') }
            fields={ getConfig('children.operation.fields') }
            searchProps={ searchProps }
          />
          <GeneralTableWrapped
            eventType={ ['baseTable', 'tableAction'] }
            { ...dataTableProps }
          />
        </EventProxy>
    }
}