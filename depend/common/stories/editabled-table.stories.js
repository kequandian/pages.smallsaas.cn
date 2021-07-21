import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withReadme } from 'storybook-readme';

import EditabledTable from '../src/components/editabled-table';
import README from '../src/components/editabled-table/README.md';

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        id: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const columns = [{
  title: 'name',
  dataIndex: 'name',
  width: '25%',
  editable: false,
},
{
  title: 'age',
  dataIndex: 'age',
  width: '15%',
  editable: true,
},
{
  title: 'address',
  dataIndex: 'address',
  width: '40%',
  editable: true,
}]

const loading = false;
const pagination = { current: 1, total: 50 };

storiesOf('EditabledTable', module)
  .addDecorator(withReadme(README))
  .add('Default',
    withNotes('可编辑表格')(
      () => <div style={{padding: 30}}>
              <EditabledTable
                  data={data}
                  loading={loading}
                  columns={columns}
                  onEditRow={(value) => { console.log(value) }}
                  onDeleteRow={(id) => { console.log(id) }}
                  onSelectRow={(value) => { console.log(value) }}
                  pagination={pagination}
              />
            </div>
    )
  )
    .add('Not Row Selection',
        withNotes('表格')(
            () => <div style={{padding: 30}}>
                <EditabledTable
                    data={data}
                    loading={loading}
                    columns={columns}
                    onEditRow={(value) => { console.log(value) }}
                    onDeleteRow={(id) => { console.log(id) }}
                    onSelectRow={(value) => { console.log(value) }}
                    pagination={pagination}
                    rowSelection={false}
                />
            </div>
        )
    )
