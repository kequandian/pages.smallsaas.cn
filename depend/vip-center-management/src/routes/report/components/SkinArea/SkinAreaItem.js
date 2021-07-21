import React from 'react';
import styles from './index.css';

const SkinAreaItem = (props) => {
  const { data, value } = props;
  let style = {
    background: data.color,
    fontSize: '12px',
    lineHeight: 2,
  }
  if (data.index === value) {
    style['transform'] = 'scale(1.4)';
    style['position'] = 'relative';
    style['zIndex'] = 9;
  }
  return <div className={styles.item}>
    <div style={style} className={styles.block} ></div>
    <div
      style={{ color: data.fontColor }}
      className={data.index === value ? styles.title : ''}
    >
      {data.title}
    </div>
  </div>
}
export default SkinAreaItem;