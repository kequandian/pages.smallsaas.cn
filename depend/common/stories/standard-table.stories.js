import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withReadme, withDocs } from 'storybook-readme';

import { Tag } from 'antd';

import StandardTable from '../src/components/standard-table';
import StandardTableReadme from '../src/components/standard-table/README.md';

const data = [
  {'no': '123456', 'status': 'enabled', 'description': 'Good', 'callNo': 234 },
  {'no': '123457', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123458', 'status': 'enabled', 'description': 'Good One', 'callNo': 54 },
  {'no': '123459', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123460', 'status': 'enabled', 'description': 'Good One', 'callNo': 94 },
  {'no': '123461', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123462', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123463', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123464', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123465', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123466', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123467', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
  {'no': '123468', 'status': 'enabled', 'description': 'Good One', 'callNo': 34 },
];
const pagination = { current: 1, total: 50 };
const columns = [
  {
    title: '规则编号',
    dataIndex: 'no',
    width: 150,
    fixed: 'left',
    filters: [
      { text: '12345', value: '12345' }, { text: '12346', value: '12346' }
    ],
    onFilter: (value, record) => record.no.indexOf(value) === 0,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 150,
    render: val => <Tag>{val}</Tag>
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 150,
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: (a, b) => a.callNo - b.callNo,
    align: 'right',
    render: val => `${val} 万`,
    // mark to display a total number
    needTotal: true,
    width: 150,
  }
];

const loading = false;
const scroll = { x: 900, y: 300 };

storiesOf('StandardTable', module)
  .addDecorator(withReadme(StandardTableReadme))
  .add('Default',
    withNotes('表格')(
      () => <div style={{padding: 30}}>
              <StandardTable
                    size='default'
                    loading={loading}
                    data={data}
                    pagination={pagination}
                    columns={columns}
                    selectedRowKeys={[1, 4, 5]}
                    onRefresh={() => { console.log("refreshing") }}
                    onChange={(pagination, filters, sorter) => { console.log(pagination, filters, sorter) }}
                  />
            </div>
    )
  )
  .add('Not Row Selection',
    withNotes('表格')(
      () => <div style={{padding: 30}}>
              <StandardTable
                    size='default'
                    loading={loading}
                    data={data}
                    pagination={pagination}
                    columns={columns}
                    scroll={scroll}
                    rowSelection={false}
                    onRefresh={() => { console.log("refreshing") }}
                    onChange={(pagination, filters, sorter) => { console.log(pagination, filters, sorter) }}
                  />
            </div>
    )
  )
