import React, { Component, Fragment } from 'react'
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import queryString from 'query-string';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import replaceString from '../../utils/replaceString';

import GeneralForm from '../../../general-form';
// import OperationButton from '../OperationButton';
import SearchInput from '../../../components/SearchInput';

import GeneralTable from '../GeneralTable';
// import TableAction from '../wrapped/TableAction';
import NotModelEventProxy from '../../../uniform-management/components/wrapped/EventProxy';
// import ModelWrapped from '../../../uniform-management/wrapped';

// let GeneralTableWeapped = NotModelEventProxy(GeneralTable);
// GeneralTableWeapped = TableAction(GeneralTableWeapped);
// GeneralTableWeapped = ModelWrapped(GeneralTableWeapped);

const confirm = Modal.confirm;

/**
 * 负责标准事件的实现
 */
export default class EventProxy extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      selectedRows: [],
      filterList: [], // 一对多中，弹出的模态框内会被过滤的项的列表
    };
  }
  static childContextTypes = {
    tableData: PropTypes.array,
    location: PropTypes.any,
    modelState: PropTypes.any,
  }
  getChildContext () {
    const { list } = this.props.modelState;
    const { location, modelState, tableData } = this.props;

    return {
      tableData: tableData || list,
      location,
      modelState,
    }
  }
  static contextTypes = {
    dataPool: PropTypes.object,
  }

  componentDidMount() {
    const { modelState, dispatch, namespace, location, onComponentMount } = this.props;
    if( typeof(onComponentMount) === 'function' ){
      const rst = onComponentMount();
      if(!rst){
        console.log('通过 onComponentMount 阻止了 EventProxy 自动获取数据');
        return false;
      }
    }
    this.retrieveDataList({ pagination: { current: 1 } });
  }

  retrieveDataList = ({ pagination, query = {} }) => {
    const { modelState, dispatch, namespace, location, queryMap, dataSourceMap } = this.props;
    console.log('列表查询的数据 queryMap',queryMap);
    query = { ...modelState.queryData }
    if(queryMap){
      queryMap.forEach( v => {
        query[v.to] = queryString.parse(location.search)[v.from];
      });
    }
    const replaceMapString = replaceString(location);
    query = replaceMapString.format(query);

    // props.API 通常是一对多里面， children 中的 API 传过来
    let API = this.props.API || this.props.modelState.API;
    if( API && API.indexOf('{ID}') >= 0 && queryString.parse(location.search).id !== undefined ){
      API = API.replace( '{ID}',queryString.parse(location.search).id );
    }
    dispatch({
      type: `${namespace}/fetchList`,
      payload: {
        API,
        current: pagination.current,
        size: pagination.pageSize,
        dataSourceMap,
        ...query,
      }
    });
    // clear currentItem
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem: {},
      }
    });
  }

  handleAddClick = (options = {}) => {
    const { dispatch, namespace, location } = this.props;
    const API = this.props.API || this.props.modelState.API;
    // dispatch(routerRedux.push({pathname: `/${ options.path || namespace }`, search: `?type=add` }));
    dispatch(routerRedux.push({
      pathname: `/${ options.path || namespace }`,
      search: queryString.stringify({
        type: options.type || 'add',
      })
    }));
  }
  handleDeleteClick = ({ id },options = {}) => {
    const { dispatch, namespace, location } = this.props;
    let API = options.API || this.props.API || this.props.modelState.API;
    let { values } = options;
    if( typeof(values) === 'object' ){
      // const queryId = queryString.parse(location.search).id;
      // Object.keys(values).forEach( key => values[key] = values[key].replace('{QueryId}',queryId) );
      const replaceMapString = replaceString(location);
      values = replaceMapString.format(values);
      API = replaceMapString.format(API);
      create(API,values);
      return false;
    }

    dispatch({
      type: `${namespace}/deleteOne`,
      payload: {
        id,
        API
      }
    })
  }
  handleQueryClick = (record,options = {}) => {
    const { dispatch, namespace } = this.props;
    // const API = this.props.modelState.queryAPI || this.props.API || this.props.modelState.API;
    const { id } = record;
    const replaceMapString = replaceString(location,record);
    const queryData = replaceMapString.format(options.queryData);
    // dispatch(routerRedux.push({pathname: `/${ options.path || namespace }`, search: `?type=query&id=${id}` }));
    // if(options.API){
    //   update(options.API.replace('{id}',id));
    // }
    dispatch(routerRedux.push({
      pathname: `/${ options.path || namespace }`,
      search: queryString.stringify({
        type: 'query',
        id,
        ...queryData,
      })
    }));
    // if(API){
    //   dispatch({
    //     type: `${namespace}/fetchOne`,
    //     payload: {
    //       id,
    //       API,
    //     }
    //   });
    // }else{
    //   console.warn('handleQueryClick 未能获取到 API，请确认该情况是否预期。 namespace：',namespace);
    // }
    
  }
  handleEditClick = (record,options = {}) => {
    const { dispatch, namespace, location } = this.props;
    const { id } = record;
    const API = this.props.API || this.props.modelState.API;
    dispatch(routerRedux.push({pathname: `/${ options.path || namespace }`, search: `?type=edit&id=${id}` }));
  }
  handleModalEditClick = (record) => {
    const { dispatch, namespace } = this.props;
    const { id } = record;
    const API = this.props.API || this.props.modelState.API;

    dispatch({
      type: `${namespace}/showModal`
    })

    // dispatch(routerRedux.push({ search: `?type=edit&id=${id}` }));
    // this.toggleModalVisible('form');
    // dispatch({
    //   type: `${namespace}/fetchOne`,
    //   payload: {
    //     id,
    //     API,
    //   }
    // });
  }
  handleConfirmClick = (record,options = {}) => {
    // 不跳转页面，直接设置 某个预定字段为预定值
    // 通常这种情况下，后台应该提供一个独立的 API。如 单独的切换 文章状态 的 API
    const { location } = this.props;
    const { id } = record;
    let { title, content, values = [], API } = options;
    const { retrieveDataList } = this;

    if( id === undefined ){
      throw new Error('未能获取到该行数据所对应的 ID，请检查后端放回字段里面是否含有 "id" ');
    }
    API = API || this.props.API || this.props.modelState.API;

    // const queryId = queryString.parse(location.search).id;
    // let map = {
    //   'ID': id,
    //   'QueryId': queryId,
    // };

    // if( API.indexOf('{') >= 0 ){
    //   let keyword = API.match(/{(\w+)}/g);
    //     keyword.forEach( (v,i) => {
    //       keyword[i] = v.slice(1,-1);
    //     })
    //     keyword.forEach( v => {
    //       map[v] = record[v];
    //     })
    // }
    // const replaceMapString = replaceString(map);
    const replaceMapString = replaceString(location,record);

    if( API ){
      confirm({
        title,
        content,
        onOk() {
          create( replaceMapString.format(API), replaceMapString.format(values) );
          // if(values && Object.keys(values).length > 0){
          //   create( replaceMapString(API), replaceMapString(values) );
          // }else{
          //   update( replaceMapString(API) );
          // }
          setTimeout( _=> {
            retrieveDataList({ pagination: { current: 1 }});
          }, 1000);
        },
        onCancel() {},
      });
    }
  }
  handleOperationConfirmClick = (options = {}) => {
    const { location } = this.props;
    let { title, content, values = [], API } = options;
    API = API || this.props.API || this.props.modelState.API;
    const { retrieveDataList } = this;
    const replaceMapString = replaceString(location);
    
    if( API ){
      confirm({
        title,
        content,
        onOk() {
          update( replaceMapString.format(API), replaceMapString.format(values) );
          setTimeout( _=> {
            retrieveDataList({ pagination: { current: 1 }});
          }, 1000);
        },
        onCancel() {},
      });
    }
  }

  handleBulkDeleteClick = () => {
    const { dispatch, namespace } = this.props;
    const API = this.props.API || this.props.modelState.API;
    const selectedRows = this.state.selectedRows;
    selectedRows.length > 0 && dispatch({
      type: `${namespace}/bulkDelete`,
      payload: {
        ids: selectedRows.map(row => row.id),
        API
      }
    });
    this.setState({
      selectedRows: [],
    });
  }

  handleModalClick = () => {
    const { dispatch, namespace } = this.props;

    dispatch({
      type: `${namespace}/showModal`
    })
  }
  handleImportClick = (...v) => {
    console.log('handleImportClick',v);
  }
  handleExportClick = (...v) => {
    console.log('handleExportClick',v);
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleStandardTableChange = (pagination, filters, sorter) => {
    this.retrieveDataList({ pagination });
  }
  handleRefresh = () => {
    this.retrieveDataList({ pagination: { current: 1 }});
  }

  onChangeColValue = (index,field,record,value) => {
    const { dispatch, namespace, modelState } = this.props;
    const { childrenField } = this.props.childrenObject;
    let { currentItem } = modelState;
    currentItem[childrenField] = currentItem[childrenField] || [];

    currentItem[childrenField][index][ field ] = value;

    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }

  toggleModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  handleModalHide = () => {
    // model 模态框隐藏
    const { dispatch, namespace } = this.props;

    dispatch({
      type: `${namespace}/hideModal`
    })
  }
  handleSelected = (selectedList) => {
    // 模态框确认回调
    const { childrenField } = this.props.childrenObject || {};
    if (childrenField) {
      this.handleChildrenSelected(childrenField, selectedList);
    }
    this.toggleModalVisible();
  }
  handleChildrenSelected = (field, selectedList) => {
    // 一对多确认回调
    console.log('一对多确认回调',field,selectedList);
    const { dispatch, namespace, modelState } = this.props;
    const { fieldMap = [] } = this.props.childrenObject;
    let rst = [];
    selectedList.forEach( row => {
      let { ...newRow } = row;
      fieldMap.forEach( v => {
        if(v.from !== 'id'){
          delete newRow[v.from];
        }
        newRow[v.to] = row[v.from] || v.value;
      });
      rst.push(newRow);
    });
    let { currentItem } = modelState;
    currentItem[field] = currentItem[field] || [];
    // currentItem[field] = currentItem[field].concat(selectedList);
    currentItem[field] = currentItem[field].concat(rst);

    this.setState({
      filterList: currentItem[field],
    });
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }

  handleAddItemClick = (options = {}) => {
    if(options.disable){
      const { dataPool } = this.context;
      if( !dataPool.getToTemp('disableItemsSelect') ){
        message.info(options.message || '该操作暂时不可用');
        return false;
      }
    }
    this.toggleModalVisible();
  }
  handleDeleteItemClick = (record) => {
    // 一对多删除
    console.log('一对多删除',record);
    const { dispatch, namespace, modelState } = this.props;
    const { childrenField } = this.props.childrenObject;
    let { currentItem } = modelState;
    currentItem[childrenField] = currentItem[childrenField] || [];
    currentItem[childrenField] = currentItem[childrenField].filter(item => item.id !== record.id);
    
    this.setState({
      filterList: currentItem[childrenField],
    });
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }
  handleBulkDeleteItemClick = (field, selectedList) => {
    // 一对多 批量删除
    const { dispatch, namespace, modelState } = this.props;
    const { childrenField } = this.props.childrenObject;
    const { selectedRows } = this.state;
    let { currentItem } = modelState;
    currentItem[childrenField] = currentItem[childrenField] || [];
    currentItem[childrenField] = currentItem[childrenField].filter(item => selectedRows.find(i => i.id === item.id) === undefined);
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }

  render () {
    console.log('EventProxy props :', this.props );
    const { state, props } = this;
    const { list, current, total } = props.modelState;
    const { getConfig, location, loading, modelState, tableData, pagination, rowSelection } = props;
    const { modalVisible, selectedRows, filterList } = state;
    const { listProps, formProps, queryProps, } = props;

    const eventMap = {
      'state': {
        ...state,
      },
      'props': {
        ...props,
      },
      'pagination': {
        current,
        total,
        onChange: this.handleStandardTableChange,
        onShowSizeChange: this.handleStandardTableChange,
      },
      'baseTable': {
        // 数据表格基础事件
        ...state,
        ...listProps,
        location,
        modelState,
        // ...props,
        loading,
        data: tableData || list,
        selectedRowKeys: selectedRows,
        rowSelection,
        pagination: pagination === undefined ? { current, total: tableData ? tableData.length : total } : pagination,

        onChangeColValue: this.onChangeColValue,
        onSelectRow: this.handleSelectRows,
        onTableChange: this.handleStandardTableChange,
        onRefresh: this.handleRefresh,
      },
      'tableAction': {
        // 数据表格 action 
        onDelete: this.handleDeleteClick,
        onDeleteItem: this.handleDeleteItemClick,
        onQuery: this.handleQueryClick,
        onEdit: this.handleEditClick,
        onModal: this.handleModalEditClick,
        onConfirm: this.handleConfirmClick,
      },
      'operation': {
        ...props,
        selectedRows,

        onAdd: this.handleAddClick,
        onAddItem: this.handleAddItemClick,
        onModal: this.handleModalClick,
        onImport: this.handleImportClick,
        onExport: this.handleExportClick,
        onBatchDelete: this.handleBulkDeleteClick,
        onBulkDeleteItem: this.handleBulkDeleteItemClick,
        onConfirm: this.handleOperationConfirmClick,
        onComponentMount: () => false,
      },
      'modal': {
        // 模态框
        width: typeof( getConfig('form.width') ) === 'object' ? 800 : getConfig('form.width'),
        visible: modalVisible,
        footer: props.footer,
        onCancel: this.toggleModalVisible,
        onOk: this.handleSelected,
      },
      'modelModal': {
        width: typeof( getConfig('form.width') ) === 'object' ? 800 : getConfig('form.width'),
        visible: modelState.modalVisible,
        onCancel: this.handleModalHide,
      }
    };

    // 一对多
    const { childrenField, API, columns, foreignKey = 'id', operation = {} } = this.props.childrenObject || {};
    const childrenList = modelState.currentItem[childrenField] || [];
    const { dispatch, namespace } = this.props;

    const NotModelEventProxyProps = {
      API,
      childrenObject: this.props.childrenObject,
      filterList: [ ...childrenList, ...filterList ],
    }
    const OperationButtonProps = {
      searchProps: {
        API,
        modelName: namespace,
      }  
    }
    const formChildrenSelectProps = {
      API,
      columns, // 使用 children 的列
      operation: [],
      location,
      selectedRowKeys: childrenList.map(item => item[foreignKey]),
      onOk: this.handleSelected,
      onCancel: this.toggleModalVisible,
      isFooter: true,
    };

    const childrenWithProps = React.Children.map(this.props.children, child => {
        let childProps = {};
        const eventType = child.props.eventType;
        const eventTypeList = typeof(eventType) === 'string' ? [ eventType ] : [ ...eventType ];

        eventTypeList.forEach( (type) => {
          const temObj = eventMap[type];
          childProps = {
            ...childProps,
            ...temObj,
          }
        });

        return React.cloneElement( child, childProps )
    });

    let modalFormProps = {
      getConfig,
      API: this.props.API,
      columnNum: getConfig('form.colNumber'),
      fields: getConfig('form.fields'),
      dispatch,
      loading,
      location,
      modelName: namespace,
      REDIRECT: null,
      retrieveDataList: this.retrieveDataList,
      submitForm: (
        <div style={{textAlign: 'right',marginTop: '1em'}}>
          <Button onClick={this.handleModalHide}>取消</Button>
          <Button type="primary" htmlType="submit" >确定</Button>
        </div>
      ),
    };
    modalFormProps[namespace] = modelState;

    return <Fragment>
        { childrenWithProps }
        <Modal { ...eventMap['modelModal'] } footer={ null }>
          <GeneralForm { ...modalFormProps } />
        </Modal>
        { modalVisible ? 
            <Modal { ...eventMap['modal'] } footer={ null }>
              <NotModelEventProxy { ...NotModelEventProxyProps }>
                <SearchInput
                  eventType="operation"
                  fields={ operation.fields }
                  { ...OperationButtonProps }
                />
                <GeneralTable {...formChildrenSelectProps} eventType={ ['baseTable'] } />
              </NotModelEventProxy>
            </Modal>
          : '' }
      </Fragment>
  }
}