import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import Alert from 'antd/lib/alert';
import Icon from 'antd/lib/icon';

import './index.css';

import BodyWrapper from './wrapper/BodyWrapper';
import PropsProxy from './wrapper/PropsProxy';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach((column) => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends Component {
  constructor(props) {
    super(props);

    this.handleRowSelectChange = this.handleRowSelectChange.bind(this);
    this.cleanSelectedKeys = this.cleanSelectedKeys.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.refresh = this.refresh.bind(this);

    const { columns, size = 'default' } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: props.selectedRowKeys || [],
      needTotalList,
    };
  }

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRowKeys && nextProps.selectedRowKeys.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      this.setState({
        selectedRowKeys: [],
        needTotalList,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    console.log("handleRowSelectChange: ", selectedRowKeys, selectedRows);
    let needTotalList = [...this.state.needTotalList];
    needTotalList = needTotalList.map((item) => {
      return {
        ...item,
        total: selectedRows.reduce((sum, val) => {
          return sum + parseFloat(val[item.dataIndex], 10);
        }, 0),
      };
    });

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  }

  handleTableChange = (pagination, filters, sorter) => {
    if (this.props.onChange) {
      this.props.onChange(pagination, filters, sorter);
    }
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  refresh = () => {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  renderAlert = () => {
    const { selectedRowKeys, needTotalList } = this.state;
    const { loading = false, showAlert = true, rowSelection = true, data, pagination } = this.props;
    if (showAlert && rowSelection) {
      const total = pagination && typeof pagination === 'object' ? pagination.total : data.length;
      const totalMsg = total && `共 ${total} 项. `;
      return (
        <Alert
          message={(
            <div>
              {totalMsg}
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              {
                needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>{item.title}总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                  )
                )
              }
              {selectedRowKeys.length > 0 ?
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a> : ''}
              {this.props.onRefresh ?
                <a onClick={this.refresh} style={{ float: 'right' }}><Icon type='reload' spin={loading}></Icon></a> : ''}
            </div>
          )}
          type="info"
          showIcon
        />
      )
    }
  }

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data, pagination, loading, columns, footer, rowSelection = true } = this.props;

    const paginationProps = pagination && typeof pagination === 'object' ? {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    } : false;

    const rowSelectionProps = rowSelection ? {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    } : null;

    const BodyWrapperWithProps = PropsProxy(BodyWrapper,{ data, columns });

    return (
      <div className="kc-std-table">
        <div className="kc-std-table-alert">
        {this.renderAlert()}
        </div>
        <Table
          components={{ body: { wrapper: BodyWrapperWithProps } }}
          scroll={this.props.scroll}
          size={this.props.size}
          loading={loading}
          rowKey={record => record.key}
          rowSelection={rowSelectionProps}
          dataSource={data}
          columns={columns}
          pagination={paginationProps}
          footer={ footer }
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

StandardTable.propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.array,
    pagination: PropTypes.object,
    columns: PropTypes.array,
    loading: PropTypes.bool,
}

export default StandardTable;
