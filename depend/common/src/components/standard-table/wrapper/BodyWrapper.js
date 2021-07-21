import React, { Component } from 'react';

export default class BodyWrapper extends Component {
  state = {
    count: 0,
  };
  reRender = false;
  componentWillUnmount() {
    clearInterval(this.reRender);
  }

  getColumns = () => {
    const { columns, data } = this.props;
    let totalColumns = [];
    let render = false;

    if (data.length > 0) {
      totalColumns = [...columns.map((column, index) => {
        if (column.dataIndex !== 'operation') {
          let rst = '';

          if (column.bottomTotal) {
            render = true;

            rst = data.reduce((total, rowData) => {
              // 下面的正则主要是用于处理一些简单的夹带非数字字符的情况，比如 ￥ 123.58
              let num = rowData[column.dataIndex] || 0;
              if (typeof (num) === 'string') {
                num = num.replace(/[^0-9.]/ig, '');
              }
              return total + num;
            }, 0);
            if (column.dataIndex === 'transactionTotalSkuPrice') {
            }
            rst = +parseFloat(rst.toPrecision(14));
            if (typeof (column.format) === 'function') {
              rst = column.format(rst);
            }
          }

          return <td key={index} className="kc-std-table-total-td" style={{ textAlign: 'right' }}>{rst}</td>;
        } else {
          return <td key={index}></td>;
        }
      })
      ];
      if (columns && columns[1].dataIndex === 'total') {
        totalColumns.splice(1, 1, <td key="_total">总计</td>);
      }
    }
    if (render) {
      if (this.reRender === false) {
        this.reRender = setInterval(_ => {
          this.forceUpdate();
        }, 500);
      }
      return <tr className="ant-table-row">{totalColumns}</tr>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <tbody {...this.props}>
        <React.Fragment>
          {this.props.children}
          {this.getColumns()}
        </React.Fragment>
      </tbody>
    );
  }
}