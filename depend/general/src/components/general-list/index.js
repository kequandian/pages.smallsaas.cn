/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <GeneralList>
      intl = ''
      editText = ''      //编辑文本，有默认值
      createText = ''    //添加文本，有默认值
      deleteText = ''    //删除文本，有默认值
      bulkDeleteText = ''   //批量删除文本，有默认值
      deleteConfirmText = ''    //点击批量删除提示文本
      operationText = ''     //操作文本
      API = ''            //传入api
      dispatch
      modelName = ''     //Modal模块框的名称
      ADD = ''
      EDIT = ''
      extractOperationColumn = []
      showOperator = true
      fields = []
    </GeneralList>
 */


import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';

import Divider from 'antd/lib/divider';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import { LRBLayout } from 'kqd-layout-flex';
import { StandardTable } from 'kqd-common';
import { getIntl } from '../../utils/utils';
import SearchForm from '../search-form';


import './index.css';

@injectIntl
export default class GeneralList extends PureComponent {

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      inlineCount: 3,
      selectedRows: [],
      editText: this.props.editText || getIntl(intl, 'general.list.btn.edit'),
      createText: this.props.createText || getIntl(intl, 'general.list.btn.create'),
      deleteText: this.props.deleteText || getIntl(intl, 'general.list.btn.delete'),
      bulkDeleteText: this.props.bulkDeleteText || getIntl(intl, 'general.list.btn.bulkDelete'),
      deleteConfirmText: this.props.deleteConfirmText || getIntl(intl, 'general.list.msg.deleteConfirm'),
      operationText: this.props.operationText || getIntl(intl, 'general.list.btn.operation')
    }
  }

  componentDidMount() {
    this.retrieveDataList({ pagination: { current: 1 }});
  }

  retrieveDataList = ({ pagination }) => {
    const { dispatch, modelName } = this.props;
    const API = this.props.API || this.props[modelName].API;
    dispatch({
      type: `${modelName}/fetchList`,
      payload: {
        API,
        current: pagination.current,
        size: pagination.pageSize,
      }
    })
  }

  handleDeleteClick = (id) => {
    const { dispatch, modelName } = this.props;
    const API = this.props.API || this.props[modelName].API;
    dispatch({
      type: `${modelName}/deleteOne`,
      payload: {
        id,
        API
      }
    })
  }

  handleBulkDeleteClick = () => {
    const { dispatch, modelName } = this.props;
    const API = this.props.API || this.props[modelName].API;
    const selectedRows = this.state.selectedRows;
    selectedRows.length > 0 && dispatch({
      type: `${modelName}/bulkDelete`,
      payload: {
        ids: selectedRows.map(row => row.id),
        API
      }
    });
    this.setState({
      selectedRows: [],
    });
  }

  handleCreateClick = () => {
    const { dispatch, modelName } = this.props;
    const API = this.props.API || this.props[modelName].API;
    if (this.props.ADD) {
      dispatch(routerRedux.push(`${this.props.ADD}`))
    }
    else {
      //modal
      dispatch({
        type: `${modelName}/showModal`,
      })
    }
  }

  handleEditClick = (id) => {
    const { dispatch, modelName } = this.props;
    const API = this.props.API || this.props[modelName].API;
    if (this.props.EDIT) {
      dispatch(routerRedux.push({pathname: `${this.props.EDIT}`, search: `?id=${id}&type=edit` }))
    }
    else {
      //modal
      dispatch({
        type: `${modelName}/showModal`,
      });
      dispatch({
        type: `${modelName}/fetchOne`,
        payload: {
          id,
          API,
        }
      });
    }
  }

  handleStandardTableChange = (pagination, filters, sorter) => {
    this.retrieveDataList({ pagination });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleRefresh = () => {
    this.retrieveDataList({ pagination: { current: 1 }});
  }

  getTitle = (intl, key, title) => {
    if (key) {
      return getIntl(intl, key);
    }
    return title;
  }

  getColumns = (dataColumns, operationColumn) => {
    const { extractOperationColumn = [] } = this.props;
    const { editText, deleteText, deleteConfirmText, operationText } = this.state;
    const intl = this.props.intl;
    const newDataColumns = dataColumns.map(item => {
      return {
        ...item,
        title: this.getTitle(intl, item.intl, item.title)
      }
    });
    if (operationColumn) {
      return [
        ...newDataColumns,
        operationColumn
      ];
    }
    return [
      ...newDataColumns,
      {
        title: <span>{operationText}</span>,
        render: (record) => (
          <Fragment>
            <a onClick={() => this.handleEditClick(record.id)}>{editText}</a>
            <Divider type="vertical" />
            <Popconfirm title={deleteConfirmText} onConfirm={() => this.handleDeleteClick(record.id)}>
                <a>{deleteText}</a>
            </Popconfirm>
          </Fragment>
        ),
      },
      ...extractOperationColumn,
    ]
  }

  getOperation = () => {
    const { showOperator = true } = this.props;
    const { selectedRows, createText, deleteConfirmText, bulkDeleteText } = this.state;
    if (showOperator) {
      return (
        <Fragment>
          {
            selectedRows.length > 0 && (
              <Popconfirm title={deleteConfirmText} onConfirm={this.handleBulkDeleteClick}>
                <Button style={{marginRight: 8}}>{bulkDeleteText}</Button>
              </Popconfirm>
            )
          }
          <Button icon="plus" type="primary" onClick={this.handleCreateClick}>{createText}</Button>
        </Fragment>
      )
    }
  }

  getSearch = () => {
    const { inlineCount } = this.state;
    if (this.props.fields && this.props.fields.length > 0) {
      let fields = this.props.fields;
      if (this.props.fields.length <= inlineCount) {
        fields = this.props.fields.map(field => {
          return { ...field, label: null, props: { placeholder: field.placeholder } }
        });
      }
      return (
        <SearchForm {...this.props} fields={fields} inlineCount={inlineCount} />
      )
    }
  }

  render() {
    const { loading, modelName, dataColumns, rowSelection = true } = this.props;
    const { list, current, total } = this.props[modelName];
    const pagination = { current, total };
    const { selectedRows } = this.state;

    return (
      <LRBLayout
        left={this.getSearch()}
        right={this.getOperation()}
      >
        <StandardTable
          loading={loading}
          data={list}
          pagination={pagination}
          columns={this.getColumns(dataColumns, this.props.operationColumn)}
          selectedRowKeys={selectedRows.map(item => item.id)}
          rowSelection={rowSelection}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
          onRefresh={this.handleRefresh}
        />
      </LRBLayout>
    );
  }
}
