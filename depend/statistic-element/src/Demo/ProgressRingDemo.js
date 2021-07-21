import ProgressRing from '../components/progressRing/ProgressRing';

const ProgressRingDemo = ({}) => {

  const progressRingProps1 = {
    percent: 35,
    title: '综合得分',
    subTitle: '78分',
    color: 'red'
  }

  const progressRingProps2 = {
    percent: 89,
    title: '肌肤年龄',
    subTitle: '16岁',
    color: 'blue'
  }

  return (
    <div>
      <ProgressRing {...progressRingProps1}/>
      <ProgressRing {...progressRingProps2}/>
    </div>
  )
}

export default ProgressRingDemo;
