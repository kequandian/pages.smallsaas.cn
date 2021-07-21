import React from 'react';
import { Table } from 'antd';

const StatisticTable = ({ rates, ...rest }) => {
  const tableProps = {
    dataSource: rates,
  };
  return <Table { ...tableProps } />
}

export default StatisticTable;