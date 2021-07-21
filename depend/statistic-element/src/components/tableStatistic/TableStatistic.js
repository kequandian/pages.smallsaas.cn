/**
    * @author Yang,YN
    * @editor
    * @updated
    * @desc   表格统计组件
    * @eg
    <TableStatistic>
      columns = []     //表头信息，必传
      data = []    //数据源
      isRowSelection = false   //表格行是否可选择，默认否
      bordered = false    //是否展示外边框和列边框，默认否
      selectedRowKeys = []  //表格行可选的时候，选中的项
      pagination = false  //表格是否分页，默认否
    </TableStatistic>
 */


import React from 'react';
import { Table } from 'antd';

class TableStatistic extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      columns: props.columns || [],
      data: props.data || [],
      isRowSelection: props.isRowSelection || false,
      bordered: props.bordered || false,
      selectedRowKeys: props.selectedRowKeys || [],
      selectedRows: [],
      pagination: props.pagination || false,
    }
  }

  selectedRows = (value) => {
    console.log('kkkkkk value = ',value);
    this.setState({
      selectedRowKeys: value.selectedRowKeys,
      selectedRows: value.selectedRows,
    })
    if(this.props.onSelectRows){
      this.props.onSelectRows(value)
    }
  }


  render() {

    let { columns,data,isRowSelection,bordered,selectedRowKeys,pagination } = this.state;

    data.length > 0 && data.map((item,index) => {
      data[index] = {
        ...item,
        key: `${index + 1}`
      }
    })

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows,selectedRowKeys);
        const data = {
          selectedRows,
          selectedRowKeys
        }
        this.selectedRows(data)
      },
      selectedRowKeys,
    };

    // const createByColumns = (columns) => columns.length>0 && columns.map((item, index) => {
    //   if(typeof(item) === 'object') {
    //     return item;
    //   } else {
    //     return ({
    //       title: item,
    //       dataIndex: item,
    //       key: item,
    //     });
    //   }
    // })

    return (
      <div>
        {
          isRowSelection ?
          <Table
             rowSelection={rowSelection}
             columns={columns}
             dataSource={data}
             bordered={bordered}
             pagination={pagination}
          />
          :
          <Table
            columns={columns}
            dataSource={data}
            bordered={bordered}
            pagination={pagination}
          />
        }
      </div>
    )
  }
}

export default TableStatistic;
