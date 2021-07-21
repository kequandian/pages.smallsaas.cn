/**
  * @author LLH
  * @editor 
  * @updated 2018年10月31日
  * @desc
  * @eg
  <ColumnChain
    rates=[
      { name: '', value: '' },
      { name: '', value: '' },
      { name: '', value: '' },
      { name: '', value: '' },
    ]
  >
  </ColumnChain>
*/


import React from 'react';
import { Icon } from 'antd';
import readStyle from '../../../utils/readStyle';

class ColumnChain extends React.Component {
  render() {
    const { fieldStyles = {}, recordStyles = [], rates = [] } = this.props;
    if (!(Array.isArray(rates) && rates.length === 4)) {
      return '预期 rates 是数组且长度为 4';
    }
    const styles = readStyle(recordStyles);
    const title = rates[0].name,
      value = rates[0].value;
    const subTitle = rates[1].name,
      subTitleValue = rates[1].value;
    const replenishTitle = rates[2].name,
      replenishValue = rates[2].value;
    const UpOrDown = rates[3].name,
      affix = rates[3].value;

    return (
      <div style={fieldStyles} className="Statistic-Num-box">
        <div style={styles(0)} className="Statistic-Num-title">{title}</div>
        <div style={styles(1)} className="Statistic-Num-value">{value}</div>
        <div style={styles(2)} className="Statistic-Num-subTitle">{`${subTitle} ${subTitleValue}`}</div>
        <div style={styles(3)} className="Statistic-Num-trend">{`${replenishTitle} ${replenishValue}${affix}`}{renderUpOrDown(UpOrDown)}</div>
      </div>
    )
  }
}

function renderUpOrDown(UpOrDown) {
  if (UpOrDown === 'up') {
    return <Icon type="arrow-up" style={{ color: 'red' }} />
  }
  if (UpOrDown === 'down') {
    return <Icon type="arrow-down" style={{ color: 'green' }} />
  }
  return UpOrDown;
}
export default ColumnChain;
