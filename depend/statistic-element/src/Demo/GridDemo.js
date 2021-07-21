import LineGrid from '../components/lineGrid/LineGrid';
import ColumnChain from '../components/columnChain/ColumnChain';
import Pie from '../components/pie/Pie';
import Bar from '../components/bar/Bar';

const GridDemo = ({

}) => {

  const columnStatisticProps1 = {
    span: 1,
    title: '今日销售额',
    subTitle: '昨日：*19000',
    value: '*18000',
    note: '下降 2%',
    iconType: 'down',
  }

  const columnStatisticProps2 = {
    span: 1,
    title: '今日销售额',
    subTitle: '昨日：*19000',
    value: '*18000',
    note: '下降 2%',
    iconType: 'down',
  }
  const pieProps = {
    span: 3,
    title: '某站点用户访问来源',
    legend: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
    series: [
        {
            name:'访问来源',
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        },
    ]
  }

  return (
    <div>
      <LineGrid>
        <Pie {...pieProps}/>
        <ColumnChain {...columnStatisticProps1}/>
      </LineGrid>
    </div>
  )
}

export default GridDemo;
