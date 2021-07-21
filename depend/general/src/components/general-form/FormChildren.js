/**
    * @author
    * @editor
    * @updated
    * @desc    
    * @eg
    <FormChildren>
      intl = ''
      addText = ''
      removeText = ''
      bulkRemoveText = ''
      removeConfirmText = ''
      field = ''
      onChildrenSelected = null  //默认值为null
      onChildrenBulkRemoved = {() =>{}}
      API = ''               //传入api
      loading = false       //loading状态
      data = []             //表格数据源
      columns = []          //表头信息
      foreignKey = 'id'
      modalWidth = 600      //modal的宽度
    </FormChildren>
 */

import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import Modal from 'antd/lib/modal';

import { LRBLayout } from 'kqd-layout-flex';
import { StandardTable } from 'kqd-common';
import { getIntl } from '../../utils/utils';

import FormChildrenSelect from './FormChildrenSelect';

@injectIntl
export default class FormChildren extends PureComponent {

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      selectedRows: [],
      modalVisible: false,
      addText: this.props.addText || getIntl(intl, 'general.form.btn.add'),
      removeText: this.props.removeText || getIntl(intl, 'general.form.btn.remove'),
      bulkRemoveText: this.props.bulkRemoveText || getIntl(intl, 'general.form.btn.bulkRemove'),
      removeConfirmText: this.props.removeConfirmText || getIntl(intl, 'general.form.msg.removeConfirm'),
    }
  }

  toggleModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }

  handleCreateClick = () => {
    this.toggleModalVisible();
  }

  handleSelected = (selectedList) => {
    const { field, onChildrenSelected = null } = this.props;
    if (onChildrenSelected) {
      onChildrenSelected(field, selectedList);
    }
    this.toggleModalVisible();
  }

  handleBulkRemoveClick = () => {
    if (this.props.onChildrenBulkRemoved) {
      this.props.onChildrenBulkRemoved(this.props.field, this.state.selectedRows);
    }
    this.setState({
      selectedRows: []
    })
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows
    })
  }

  convertData = (data) => {
    return data.map(v => { return { ...v, key: v.id } });
  }

  getTitle = (intl, key, title) => {
    if (key) {
      return getIntl(intl, key);
    }
    return title;
  }

  getColumns = (columns) => {
    const { intl, field, onChildrenRemoved = () => {} } = this.props;
    return [ ...columns.map(item => {
      return {
        ...item,
        title: this.getTitle(intl, item.intl, item.title)
      }
    }), {
      title: 'Operation',
      render: (record) => (
        <a onClick={() => onChildrenRemoved(field, record)}>{this.state.removeText}</a>
      )
    }]
  }

  getOperation = () => {
    const { selectedRows, addText, bulkRemoveText, removeConfirmText } = this.state;
    return (
      <Fragment>
        <Button icon="plus" type="primary" onClick={this.handleCreateClick}>{addText}</Button>
        {
          selectedRows.length > 0 && (
            <Popconfirm title={removeConfirmText} onConfirm={this.handleBulkRemoveClick}>
              <Button>{bulkRemoveText}</Button>
            </Popconfirm>
          )
        }
      </Fragment>
    )
  }

  render() {
    const { API, loading = false, data = [], columns = [], foreignKey = 'id', modalWidth = 600 } = this.props;
    const {  modalVisible, selectedRows } = this.state;

    const modalProps = {
      width: modalWidth,
      visible: modalVisible,
      onCancel: this.toggleModalVisible,
      footer: null,
    };

    const formChildrenSelectProps = {
      API,
      columns,
      selectedRowKeys: data.map(item => item[foreignKey]),
      onOk: this.handleSelected,
      onCancel: this.toggleModalVisible,
    };

    return (
      <LRBLayout right={this.getOperation()}>
        <StandardTable
            loading={loading}
            showAlert={false}
            data={this.convertData(data)}
            columns={this.getColumns(columns)}
            selectedRowKeys={selectedRows.map(item => item.id)}
            onSelectRow={this.handleSelectRows}
          />
        {modalVisible ?
          <Modal {...modalProps}>
            <FormChildrenSelect {...formChildrenSelectProps} />
          </Modal> : ''}
      </LRBLayout>
    )
  }
}
