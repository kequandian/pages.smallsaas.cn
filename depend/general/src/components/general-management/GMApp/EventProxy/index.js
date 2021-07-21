import React, { Component, Fragment } from 'react'
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import queryString from 'query-string';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import replaceString from '../../utils/replaceString';

import GMAppGeneralForm from '../GMAppGeneralForm';
import SearchInput from '../../../components/SearchInput';

import GeneralTable from '../../components/GeneralTable';
import NotModelEventProxy from '../../../uniform-management/components/wrapped/EventProxy';

const confirm = Modal.confirm;

/**
 * 负责标准事件的实现
 */
export default class EventProxy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedRows: [],
      filterList: [], // 一对多中，弹出的模态框内会被过滤的项的列表
    };
    this.visible = true;
  }
  static childContextTypes = {
    tableData: PropTypes.array,
    location: PropTypes.any,
    modelStatus: PropTypes.any,
  }
  getChildContext() {
    const { list } = this.props.modelStatus;
    const { location, modelStatus, tableData } = this.props;

    return {
      tableData: tableData || list,
      location,
      modelStatus,
    }
  }
  static contextTypes = {
    dataPool: PropTypes.object,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.routerStatus && nextProps.routerStatus.visible !== this.visible) {
      this.visible = nextProps.routerStatus.visible;
      this.refreshList();
    }
  }

  componentDidMount() {
    const { modelStatus, dispatch, namespace, location, onComponentMount } = this.props;
    if (typeof (onComponentMount) === 'function') {
      const rst = onComponentMount();
      if (!rst) {
        console.log('通过 onComponentMount 阻止了 EventProxy 自动获取数据');
        return false;
      }
    }
    this.retrieveDataList({ pagination: { current: 1 } });
  }

  retrieveDataList = ({ pagination, query = {}, API }) => {
    const { requester, listQueryData = {}, APIObject = {}, tableAPI, modelStatus } = this.props;
    const { queryData = {} } = modelStatus;
    console.log('retrieveDataList', pagination, query);
    requester.fetchList({
      current: pagination.current,
      size: pagination.pageSize,
      ...listQueryData,
      ...query,
      ...queryData,
      API: API || tableAPI || APIObject.listAPI,
    });
    // clear currentItem
    // dispatch({
    //   type: `${namespace}/fetchSuccess`,
    //   payload: {
    //     currentItem: {},
    //   }
    // });
  }
  refreshList = (API) => {
    const { current, pageSize } = this.props.modelStatus;
    this.retrieveDataList({ pagination: { current, pageSize }, API });
  }

  handleAddClick = (options = {}) => {
    const { dispatch, namespace, REDIRECT, location } = this.props;
    const replaceMapString = replaceString(location, {});
    const queryData = replaceMapString.format(options.queryData);
    dispatch(routerRedux.push({
      pathname: options.path || REDIRECT || `/${namespace}`,
      search: queryString.stringify({
        type: options.routerType || 'add',
        ...queryData,
      })
    }));
  }
  handleDeleteClick = (record, options = {}) => {
    const { requester, dataPool } = this.props;
    let { API } = options;

    dataPool.clearRecord();
    dataPool.addToRecord(record);
    requester.deleteOne({
      id: record.id,
      API,
    });
  }
  handleQueryClick = (record, options = {}) => {
    const { dispatch, namespace, dataPool, REDIRECT } = this.props;
    const { id } = record;

    dataPool.clearRecord();
    dataPool.addToRecord(record);
    const replaceMapString = replaceString(location, record);
    const queryData = replaceMapString.format(options.queryData);
    dispatch(routerRedux.push({
      pathname: options.path || REDIRECT || `/${namespace}`,
      search: queryString.stringify({
        type: options.routerType || 'query',
        id,
        ...queryData,
      })
    }));
  }
  handleEditClick = (record, options = {}) => {
    const { dispatch, namespace, dataPool, REDIRECT, location } = this.props;
    const { id } = record;
    const replaceMapString = replaceString(location, record);
    const queryData = replaceMapString.format(options.queryData);

    dataPool.clearRecord();
    dataPool.addToRecord(record);
    dispatch(routerRedux.push({
      pathname: options.path || REDIRECT || `/${namespace}`,
      search: queryString.stringify({
        type: options.routerType || 'edit',
        id,
        ...queryData,
      })
    }));
  }
  handleModalEditClick = (record) => {
    const { dispatch, namespace, dataPool } = this.props;

    dataPool.clearRecord();
    dataPool.addToRecord(record);
    dispatch({
      type: `${namespace}/showModal`
    })
  }
  handleConfirmClick = (record, options = {}) => {
    // 不跳转页面，直接设置 某个预定字段为预定值
    // 通常这种情况下，后台应该提供一个独立的 API。如 单独的切换 文章状态 的 API
    const { location, dataPool, requester } = this.props;
    // const { id } = record;
    let { title, content, values = {}, API, method, callback } = options;
    const { handleCustomizeClick, refreshList } = this;

    dataPool.clearRecord();
    dataPool.addToRecord(record);

    // if( id === undefined ){
    //   throw new Error('未能获取到该行数据所对应的 ID，请检查后端放回字段里面是否含有 "id" ');
    // }
    API = API || this.props.API || this.props.modelStatus.API;

    // const replaceMapString = replaceString(location,record);

    if (API) {
      confirm({
        title,
        content,
        onOk() {
          // create( replaceMapString.format(API), replaceMapString.format(values) );
          requester.request({
            method: method || 'post',
            API,
            key: 'CONFIRM_DATA',
            callback() {
              if (callback) {
                if (typeof callback === 'function') {
                  callback(record);
                } else {
                  handleCustomizeClick(record, { action: callback });
                }
              }
              refreshList();
            },
          }, {
              ...dataPool.getToFormAll(),
              ...values,
            });
        },
        onCancel() { },
      });
    }
  }
  handleCustomizeClick = (record, options = {}) => {
    const { listProps = {} } = this.props;
    if (listProps.customizeAction) {
      if (listProps.customizeAction[options.action]) {
        if (typeof listProps.customizeAction[options.action] === 'function') {
          listProps.customizeAction[options.action](record);
        } else {
          console.warn(`传入的 listProps customizeAction ${options.action} 不是 function 类型`);
        }
      } else {
        console.warn(`未能在 listProps customizeAction 中找到 ${options.action} 的定义`);
      }
    } else {
      console.warn('未能在 listProps 中找到 customizeAction 的定义');
    }
  }
  handleOrperationCustomizeClick = (options = {}) => {
    const { listProps = {} } = this.props;
    console.log(22222, options, listProps);
    if (listProps.customizeAction) {
      if (listProps.customizeAction[options.action]) {
        if (typeof listProps.customizeAction[options.action] === 'function') {
          listProps.customizeAction[options.action]();
        } else {
          console.warn(`传入的 listProps customizeAction ${options.action} 不是 function 类型`);
        }
      } else {
        console.warn(`未能在 listProps customizeAction 中找到 ${options.action} 的定义`);
      }
    } else {
      console.warn('未能在 listProps 中找到 customizeAction 的定义');
    }
  }
  handleOperationConfirmClick = (options = {}) => {
    const { location } = this.props;
    let { title, content, values = [], API } = options;
    API = API || this.props.API || this.props.modelStatus.API;
    const { retrieveDataList } = this;
    const replaceMapString = replaceString(location);

    if (API) {
      confirm({
        title,
        content,
        onOk() {
          update(replaceMapString.format(API), replaceMapString.format(values)).then(() => {
            retrieveDataList({ pagination: { current: 1 } });
          })
        },
        onCancel() { },
      });
    }
  }

  handleBulkDeleteClick = () => {
    const { dispatch, namespace } = this.props;
    const API = this.props.API || this.props.modelStatus.API;
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
    console.log('handleImportClick', v);
  }
  handleExportClick = (...v) => {
    console.log('handleExportClick', v);
  }
  handleRouterClick = (options = {}) => {
    const { dispatch } = this.props;
    const { path, queryData } = options;
    if (path) {
      dispatch(routerRedux.push({
        pathname: `${path}`,
        search: queryString.stringify({
          ...queryData,
        })
      }));
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleStandardTableChange = (pagination) => {
    if (typeof pagination === 'number') {
      pagination = {
        current: pagination,
      }
    }
    this.retrieveDataList({ pagination });
  }
  handleRefresh = () => {
    this.retrieveDataList({ pagination: { current: 1 } });
  }

  onChangeColValue = (index, field, record, value) => {
    const { dispatch, namespace, modelStatus } = this.props;
    const { childrenField } = this.props.childrenObject;
    let { currentItem } = modelStatus;
    currentItem[childrenField] = currentItem[childrenField] || [];

    currentItem[childrenField][index][field] = value;

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
    console.log('一对多确认回调', field, selectedList);
    const { onChildrenSelected, modelStatus, requester } = this.props;
    const { fieldMap = [] } = this.props.childrenObject;
    let rst = [];
    selectedList.forEach(row => {
      let { ...newRow } = row;
      fieldMap.forEach(v => {
        if (v.from !== 'id') {
          delete newRow[v.from];
        }
        newRow[v.to] = row[v.from] || v.value;
      });
      rst.push(newRow);
    });
    let { currentItem } = modelStatus;
    currentItem[field] = currentItem[field] || [];
    // currentItem[field] = currentItem[field].concat(selectedList);
    currentItem[field] = currentItem[field].concat(rst);

    this.setState({
      filterList: currentItem[field],
    });
    requester.save({ currentItem });
    if (onChildrenSelected) {
      onChildrenSelected(field, currentItem[field]);
    }
  }

  handleAddItemClick = (options = {}) => {
    if (options.disable) {
      const { dataPool } = this.context;
      if (!dataPool.getToTemp('disableItemsSelect')) {
        message.info(options.message || '该操作暂时不可用');
        return false;
      }
    }
    this.toggleModalVisible();
  }
  handleDeleteItemClick = (record) => {
    // 一对多删除
    console.log('一对多删除', record);
    const { dispatch, namespace, modelStatus } = this.props;
    const { childrenField } = this.props.childrenObject;
    let { currentItem } = modelStatus;
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
    const { dispatch, namespace, modelStatus } = this.props;
    const { childrenField } = this.props.childrenObject;
    const { selectedRows } = this.state;
    let { currentItem } = modelStatus;
    currentItem[childrenField] = currentItem[childrenField] || [];
    currentItem[childrenField] = currentItem[childrenField].filter(item => selectedRows.find(i => i.id === item.id) === undefined);
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem,
      }
    });
  }

  render() {
    console.log('GMApp EventProxy props :', this.props);
    const { state, props } = this;
    const { list = [], current, pageSize, total } = props.modelStatus;
    const { getConfig, location, loading = false, modelStatus, tableData, pagination } = props;
    const { modalVisible, selectedRows, filterList } = state;
    const { listProps = {} } = props;
    const { requester, dataPool, router } = this.props;

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
        data: tableData || list,
        pagination: pagination === undefined ?
          {
            current,
            total: tableData ? tableData.length : total,
            pageSize
          }
          :
          pagination,
        onChange: this.handleStandardTableChange,
        onShowSizeChange: this.handleStandardTableChange,
      },
      'baseTable': {
        // 数据表格基础事件
        ...state,
        ...listProps,
        location,
        modelStatus,
        // ...props,
        loading,
        data: tableData || list,
        selectedRowKeys: selectedRows,
        rowSelection: listProps.rowSelection || props.rowSelection || false,
        pagination: pagination === undefined ? { current, total: tableData ? tableData.length : total } : pagination,

        onChangeColValue: this.onChangeColValue,
        onSelectRow: this.handleSelectRows,
        onTableChange: props.onTableChange || this.handleStandardTableChange,
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
        onCustomize: this.handleCustomizeClick,
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
        onRouter: this.handleRouterClick,
        onComponentMount: () => false,
        onCustomize: this.handleOrperationCustomizeClick,
      },
      'listAction': {
        refreshList: this.refreshList,
        onAdd: this.handleAddClick,
        onEdit: this.handleEditClick,
        onQuery: this.handleQueryClick,
        onModal: this.handleModalClick,
        onImport: this.handleImportClick,
        onExport: this.handleExportClick,
        onBatchDelete: this.handleBulkDeleteClick,

        getSelectedRows: this.state.selectedRows,
      },
      'search': {
        requester,
        dataPool,
        namespace,
        location,
        modelStatus,
      },
      'modal': {
        // 一对多模态框
        width: typeof (getConfig('form.width')) === 'object' ? 800 : getConfig('form.width'),
        visible: modalVisible,
        footer: props.footer,
        onCancel: this.toggleModalVisible,
        onOk: this.handleSelected,
      },
      'modelModal': {
        // table action 激活弹出的 模态框，里面是一个 form
        width: typeof (getConfig('form.width')) === 'object' ? 800 : getConfig('form.width'),
        title: getConfig('form.title', undefined),
        destroyOnClose: true,
        visible: modelStatus.modalVisible,
        onCancel: this.handleModalHide,
      }
    };

    // 一对多
    const { childrenField, API, columns, foreignKey = 'id', operation = {} } = this.props.childrenObject || {};
    const childrenList = modelStatus.currentItem[childrenField] || [];
    const { dispatch, namespace } = this.props;

    const NotModelEventProxyProps = {
      API,
      childrenObject: this.props.childrenObject,
      filterList: [...childrenList, ...filterList],
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
      const eventType = child.props && child.props.eventType;
      if (!eventType) {
        return child;
      }
      const eventTypeList = typeof (eventType) === 'string' ? [eventType] : [...eventType];

      eventTypeList.forEach((type) => {
        const temObj = eventMap[type];
        childProps = {
          ...childProps,
          ...temObj,
        }
      });

      return React.cloneElement(child, childProps)
    });

    const formProps = getConfig('form.formProps', {});
    const modalFormProps = {
      getConfig,
      API: this.props.API,
      columnNum: getConfig('form.colNumber'),
      fields: getConfig('form.fields'),
      requester,
      dataPool,
      router,
      dispatch,
      loading,
      location,
      namespace,
      modelStatus,
      REDIRECT: null,
      retrieveDataList: this.retrieveDataList,
      refreshList: this.refreshList,
      ...formProps,
      submitForm: (
        <div style={{ textAlign: 'right', marginTop: '1em' }}>
          <Button onClick={this.handleModalHide}>取消</Button>
          <Button type="primary" htmlType="submit" >确定</Button>
        </div>
      ),
    };

    // 注册 listAction 到 model
    modelStatus.listAction = eventMap.listAction;

    return <Fragment>
      {childrenWithProps}
      <Modal {...eventMap['modelModal']} footer={null}>
        <GMAppGeneralForm {...modalFormProps} />
      </Modal>
      {modalVisible ?
        <Modal {...eventMap['modal']} footer={null}>
          <NotModelEventProxy {...NotModelEventProxyProps}>
            <SearchInput
              eventType="operation"
              fields={operation.fields}
              {...OperationButtonProps}
            />
            <GeneralTable {...formChildrenSelectProps} eventType={['baseTable']} />
          </NotModelEventProxy>
        </Modal>
        : ''}
    </Fragment>
  }
}