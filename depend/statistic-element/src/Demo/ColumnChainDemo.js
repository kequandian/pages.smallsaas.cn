import ColumnChain from '../components/columnChain/ColumnChain';

const ColumnChainDemo = ({}) => {

  const ColumnChainProps = {
    title: '今日销售额',
    subTitle: '昨日：*19000',
    value: '*18000',
    note: '下降 2%',
    iconType: 'down',
  }

  const columnStatisticProps1 = {
    title: '今日销单数',
    subTitle: '昨日：*16545000',
    value: '*152333000',
    note: '上升 3%',
    iconType: 'up',
  }
  const notSubTitle = {
    title: '没有副标题',
    value: 'value 123',
    note: '上升 3%',
    iconType: 'up',
  }

  return (
    <div style={{display: 'flex'}}>
      <ColumnChain {...ColumnChainProps}/>
    </div>
  )
}

export default ColumnChainDemo
