import Instrument from '../components/instrument/Instrument';

const InstrumentDemo = ({}) => {

  const InstrumentProps  = {
    name: '百分比',
    value: 22,
    titleType: '岁'
  }

  return (
    <div>
      <Instrument {...InstrumentProps}/>
    </div>
  )
}

export default InstrumentDemo;
