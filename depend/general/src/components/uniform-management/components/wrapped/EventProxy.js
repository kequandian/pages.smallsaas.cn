/**
    * @author
    * @editor
    * @updated
    * @desc   没有 dva model时，负责标准事件的实现
    * @eg
    <EventProxy>
      modelState
      dispatch
      namespace = ''                          //model容器名
      location = {}                             //路由监听
      onComponentMount = {() => {}}              //通过 onComponentMount 阻止了 EventProxy 自动获取数据
      onSaveState = {() => {}}                            //更新状态
      filterList = []
      childrenObject = {}
      onChangeComponent = {() => {}}
      onQueryComponent = {() => {}}
      onFormComponent = {() => {}}
      childrenField
      loading
      tableData
      pagination          //分页处理
      footer
      children          //子元素
    </EventProxy>
 */

import React, { Component, Fragment  } from 'react'
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import PropTypes from 'prop-types';

import Modal from 'antd/lib/modal';

// import FormChildrenSelect from '../../../general-form/FormChildrenSelect';
// import UniformList from '../../../uniform-list/index';

import Wrapped from '../../wrapped';

/**
 * 负责没有 dva model 的标准事件的实现
 */
class EventProxy extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      selectedRows: [],
      queryData: {},
    };
  }
  static contextTypes = {
    queryData: PropTypes.object
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

  handleSearch = ({ pagination, queryData = {} }) => {
    this.setState({
      queryData,
    });
    this.retrieveDataList({ pagination, queryData });
  }

  retrieveDataList = ({ pagination, queryData }) => {
    const { modelState, onSaveState, filterList, childrenObject } = this.props;
    queryData = { ...queryData, ...this.context.queryData, ...this.state.queryData };
    const API =  modelState.API;
    const param = {
      pageNum: pagination.current,
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    };

    console.log('uniform-management EventProxy retrieveDataList queryData',queryData);

    query( API, { ...param, ...queryData } ).then(({ code, message, data }) => {
      let list = data.records ? data.records : data;
      if(filterList.length > 0){
        filterList.forEach( filterItem => {
          list = list.filter( item => item[childrenObject.filterField] !== filterItem[childrenObject.filterField] );
        } )
      }
      onSaveState({
        list,
        current: data.current,
        total: data.total,
      });
      // list = list.map(record => ({ ...record, key: record.id }));
      // if(type === 'form'){
      //   onSaveState({
      //     currentItem: list[0],
      //     current: data.current,
      //     total: data.total,
      //   });
      // }else{
      //   onSaveState({
      //     list,
      //     current: data.current,
      //     total: data.total,
      //   });
      // }
    });

    return false;
  }

  handleAddClick = () => {
    const { onFormComponent, onChangeComponent } = this.props;
    if(onFormComponent){
      onChangeComponent('form');
    }
  }
  handleDeleteClick = ({ id }) => {
    const { modelState } = this.props;
    const API =  modelState.API;

    remove(`${API}/${id}`).then(({ code, message, data }) => {
      const list = this.state.list.filter(item => item.id !== id);
      this.setState({
        list,
      })
    });
  }
  handleQueryClick = (data) => {
    const { onQueryComponent, onChangeComponent } = this.props;
    if(onQueryComponent){
      onChangeComponent('query',data);
    }
  }
  handleEditClick = ({ id }) => {
    const { onFormComponent, onChangeComponent } = this.props;
    if(onFormComponent){
      onChangeComponent('form',data);
    }
  }

  handleBulkDeleteClick = () => {
    const { modelState, onSaveState } = this.props;
    const API =  modelState.API;

    const selectedRows = this.state.selectedRows;
    if (selectedRows.length > 0) {
      const ids = selectedRows.map(row => row.id);
      const result = remove(API, { ids }).then(({ code, message, data }) => {
        if (code === 200) {
          const list = new Set(this.state.list);
          const idList = new Set(ids);
          const result = Array.from(new Set([...list].filter(x => !idList.has(x.id))));
          this.setState({
            selectedRows: [],
          });
          onSaveState({
            list: result,
          });
        }
      });
    }
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

  onChangeColValue = (...v) => {
    console.log(v);
  }

  toggleModalVisible = () => {
    const { onSaveState } = this.props;
    onSaveState({
      modalVisible: !this.state.modalVisible,
    });
  }
  handleSelected = (selectedList) => {
    // 模态框确认回调
    console.log('模态框确认回调',selectedList);
    const { childrenField } = this.props;
    if (childrenField) {
      this.handleChildrenSelected(childrenField, selectedList);
    }
    this.toggleModalVisible();
  }
  handleChildrenSelected = (field, selectedList) => {
    // 一对多确认回调
    console.log('一对多确认回调');
    const { modelState, onSaveState } = this.props;
    let { currentItem } = modelState;
    currentItem[field] = currentItem[field] || [];
    currentItem[field] = currentItem[field].concat(selectedList);
    onSaveState({
      currentItem,
    });
  }

  handleAddItemClick = () => {
    this.toggleModalVisible();
  }
  handleDeleteItemClick = (record) => {
    // 一对多删除
    const { modelState, childrenField, onSaveState } = this.props;
    let { currentItem } = modelState;
    currentItem[childrenField] = currentItem[childrenField] || [];
    currentItem[childrenField] = currentItem[childrenField].filter(item => item.id !== record.id);
    onSaveState({
      currentItem,
    });
  }
  handleBulkDeleteItemClick = (field, selectedList) => {
    // 一对多 批量删除 未整合
    const { modelState, onSaveState } = this.props;
    let { currentItem } = modelState;
    currentItem[field] = currentItem[field] || [];
    currentItem[field] = currentItem[field].filter(item => selectedList.find(i => i.id === item.id) === undefined);
    onSaveState({
      currentItem,
    });
  }

  render () {
    console.log('not Model EventProxy props :', this.props );
    const { state, props } = this;
    const { list, current, total } = props.modelState;
    const { location, loading, modelState, tableData, pagination } = props;
    const { modalVisible, selectedRows } = state;

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
        location,
        modelState,
        // ...props,
        loading,
        data: tableData || list,
        selectedRowKeys: selectedRows,
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
        onSearch: this.handleSearch,
        onComponentMount: () => false,
      },
      'modal': {
        // 模态框
        visible: modalVisible,
        footer: props.footer,
        onCancel: this.toggleModalVisible,
        onOk: this.handleSelected,
      },
      'modelModal': {
        visible: modelState.modalVisible,
        onCancel: this.handleModalHide,
      }
    };

    const childrenWithProps = React.Children.map(this.props.children, child => {
      let childProps = {};
      const eventType = child.props.eventType;
      if( !eventType ){
        console.log('未能找到 eventType 属性！');
        return undefined;
      }
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

    return <Fragment>
        { childrenWithProps }
        {modalVisible ?
          <Modal {...modalProps}>
            {/* <UniformList {...formChildrenSelectProps} /> */}
          </Modal> : ''}
      </Fragment>
  }
}

export default Wrapped(EventProxy);
