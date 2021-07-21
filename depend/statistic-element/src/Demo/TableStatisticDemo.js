import TableStatistic from '../components/tableStatistic/TableStatistic';

const TableStatisticDemo = ({}) => {

  const tableStatisticProps = {
    columns:[{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }],
    data:[{
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }],
      bordered: true,
      isRowSelection: true,
  }

  return (
    <div>
      <TableStatistic {...tableStatisticProps}/>
    </div>
  )
}

export default TableStatisticDemo;
