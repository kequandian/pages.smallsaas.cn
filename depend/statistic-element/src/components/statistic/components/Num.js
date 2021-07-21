/**
  * @author LLH
  * @editor 
  * @updated 2018年10月31日
  * @desc
  * @eg
  <Num
    rates=[
      { name: '', value: '' },
      { name: '', value: '' },
    ]
  >
  </Num>
*/

import React from 'react';
import { Icon } from 'antd';
import readStyle from '../../../utils/readStyle';
import './index.css';

export default ({ fieldStyles = {}, recordStyles = [], rates = [] }) => {
  if (!(Array.isArray(rates) && rates.length === 2)) {
    return '预期 rates 是数组且长度为 2';
  }
  const styles = readStyle(recordStyles);
  const title = rates[0].name || '',
    total = rates[0].value || '0',
    percentage = rates[1].value || '0';

  return <div style={fieldStyles} className="Statistic-Num-box">
    <div style={styles(0)} className="Statistic-Num-title">{title}</div>
    <div style={styles(1)} className="Statistic-Num-value">{total}</div>
    <div style={styles(2)} className="Statistic-Num-trend">{renderIcon(percentage)} {rates[1].name || '-'}</div>
  </div>
}

function renderIcon(percentage) {
  let increase = true;
  if (percentage.indexOf('-') > -1) {
    increase = false;
    percentage = percentage.replace('-', '');
  }
  if (increase) {
    return <span style={{ color: '#f04844' }} ><Icon type="caret-up" theme="outlined" /> {percentage}%</span>
  }
  return <span style={{ color: '#00a950' }}><Icon type="caret-down" theme="outlined" /> {percentage}%</span>
}