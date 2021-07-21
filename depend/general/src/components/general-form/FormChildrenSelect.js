/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <FormChildrenSelect>
      intl = ''
      selectedRowKeys = []     //选中表格的某些项时
      cancelText = ''         //取消按钮文本
      submitText = ''        //提交按钮文本
      API = ''              //api获取数据
      columns = []          //表头信息
      onOk = {() =>{}}      //点击确定时调用
      onCancel = {() =>{}}   //点击取消时调用
    </FormChildrenSelect>
 */

import React, { PureComponent } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

// import { StandardTable } from 'kqd-common';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import { getIntl } from '../../utils/utils';
import GeneralTable from '../general-management/components/GeneralTable';

@injectIntl
export default class FormChildrenSelect extends PureComponent {

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      selectedRows: [],
      selectedRowKeys: props.selectedRowKeys || [],
      loading: false,
      list: [],
      current: 1,
      total: 0,
      cancelText: this.props.cancelText || getIntl(intl, 'general.form.btn.cancel'),
      submitText: this.props.submitText || getIntl(intl, 'general.form.btn.submit'),
    }
  }

  componentDidMount() {
    this.retrieveDataList({ pagination: { current: 1 }});
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading,
    })
  }

  handleStandardTableChange = (pagination, filters, sorter) => {
    this.retrieveDataList({ pagination });
  }

  handleOk = () => {
    if (this.props.onOk) {
      this.props.onOk(this.state.selectedRows);
    }
  }

  handleCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  handleSelectRows = (rows) => {
    console.log("handleSelectRows:",  rows, this.state.selectedRows);
    const selectedRows = rows;
    this.setState({
      selectedRows,
      selectedRowKeys: selectedRows.map(item => item.id),
    });
  }

  retrieveDataList = ({ pagination }) => {
    //const { API } = this.props;
	const { API } = this.props;
    const param = {
      current: pagination.current,
      size: pagination.pageSize,
    };
    this.toggleLoading();
    query( API, { ...param }).then(({ code, message, data }) => {
      let list = data.records ? data.records : data;
      list = list.filter(record => this.state.selectedRowKeys.find(key => key === record.id) === undefined)
                  .map(record => ({ ...record, key: record.id }));
      console.log("retrieveDataList: ", list);
      this.setState({
        list,
        current: data.current,
        total: data.total,
      });
      this.toggleLoading();
    });
  }

  render() {
    const { columns = [] } = this.props;
    const { submitText, cancelText, loading, list, current, total, selectedRowKeys } = this.state;
    const pagination = { current, total };
    //console.log("FormChildrenSelect: selectedRowKeys = ", selectedRowKeys, pagination);

    return <div>
	  <GeneralTable
      loading={loading}
      data={list}
      pagination={pagination}
      columns={columns}
      selectedRowKeys={selectedRowKeys}
      onSelectRow={this.handleSelectRows}
      onChange={this.handleStandardTableChange}
	  />
      { /*<StandardTable
        loading={loading}
        data={list}
        pagination={pagination}
        columns={columns}
        selectedRowKeys={selectedRowKeys}
        onSelectRow={this.handleSelectRows}
        onChange={this.handleStandardTableChange}
      /> */}
      <Row type="flex" justify="end">
        <Col>
          <Button type='primary' onClick={this.handleOk}>{submitText}</Button>
          <Button style={{ marginLeft: 8}} onClick={this.handleCancel}>{cancelText}</Button>
        </Col>
      </Row>
    </div>
  }
}
