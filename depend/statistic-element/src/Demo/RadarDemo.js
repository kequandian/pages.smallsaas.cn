import Radar from '../components/radar/Radar';

const RadarDemo = ({}) => {

  const radarProps = {
    indicator:[
       { name: '敏感区', max: 6500},
       { name: '表素', max: 6000},
       { name: '皱纹', max: 7000},
       { name: '毛孔', max: 8000},
       { name: '深斑', max: 9000},
       { name: '粉刺', max: 10000}
    ],
    areaBackgroundColor: ['#f5c8b4', '#e2ae97','#cd937a'],
    dataList: [4300, 1000, 2800, 3500, 5000, 1900],
    aroundBackColor: '#fadebb'
  }

  return (
    <div>
      <Radar {...radarProps}/>
    </div>
  )
}

export default RadarDemo;
