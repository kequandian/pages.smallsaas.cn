/**
    * @author
    * @editor
    * @updated
    * @desc   提供 类 model 的 state 管理
    * @eg
    <UniformList>
      intl = ''
      editText = ''            //改变编辑按钮文本
      createText = ''         //改变新建按钮文本
      deleteText = ''         //改变删除按钮文本
      bulkDeleteText = ''    //改变批量按钮文本
      operationText = ''      //改变操作按钮文本
      deleteConfirmText = ''   //改变删除提示
      API = ''                //传入api
      onCreate = {() => {}}     //点击新建
      onEdit = {(data) => {}}   //点击编辑
      showOperator = true
      loading = false
      dataColumns = []
      operationColumn = []
    </UniformList>
 */


import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import Divider from 'antd/lib/divider';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import { LRBLayout } from 'kqd-layout-flex';
import { StandardTable } from 'kqd-common';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import { getIntl } from '../../utils/utils';

import './index.css';

@injectIntl
export default class UniformList extends PureComponent {

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      list: [], current: 1, total: 0,
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
    const { API } = this.props;
    const param = {
      current: pagination.current,
      size: pagination.pageSize,
    };
    query(API, { ...param }).then(({ code, message, data }) => {
      let list = data.records ? data.records : data;
      list = list.map(record => ({ ...record, key: record.id }));
      this.setState({
        list,
        current: data.current,
        total: data.total,
      })
    });
  }

  handleDeleteClick = (id) => {
    const { API } = this.props;
    remove(`${API}/${id}`).then(({ code, message, data }) => {
      const list = this.state.list.filter(item => item.id !== id);
      this.setState({
        list,
      })
    });
  }

  handleBulkDeleteClick = () => {
    const { API } = this.props;
    const selectedRows = this.state.selectedRows;
    if (selectedRows.length > 0) {
      const ids = selectedRows.map(row => row.id);
      const result = remove(API, { ids }).then(({ code, message, data }) => {
        if (code === 200) {
          const list = new Set(this.state.list);
          const idList = new Set(ids);
          const result = Array.from(new Set([...list].filter(x => !idList.has(x.id))));
          this.setState({
            list: result,
            selectedRows: [],
          });
        }
      });
    }
  }

  handleCreateClick = () => {
    if (this.props.onCreate) {
      this.props.onCreate();
    }
  }

  handleEditClick = (id) => {
    if (this.props.onEdit) {
      this.props.onEdit(id);
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
      }
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

  render() {
    const { loading, dataColumns, showOperator = true } = this.props;
    const { list, current, total } = this.state;
    const pagination = { current, total };
    const { selectedRows, createText, deleteConfirmText, bulkDeleteText } = this.state;

    return (
      <LRBLayout right={this.getOperation()}>
        <StandardTable
          loading={loading}
          data={list}
          pagination={pagination}
          columns={this.getColumns(dataColumns, this.props.operationColumn)}
          selectedRowKeys={selectedRows.map(item => item.id)}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
          onRefresh={this.handleRefresh}
        />
      </LRBLayout>
    );
  }
}
