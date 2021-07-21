import React from 'react';
import styles from './index.css';
import SkinAreaItem from './SkinAreaItem';

const SkinArea = (props) => {
  const data = [
    { color: '#f5c9d6', title: '绯红', index: 8 },
    { color: '#fff5f8', fontColor: '#333', title: '透白', index: 7 },
    { color: '#fef1e0', title: '白皙', index: 6 },
    { color: '#fadebb', title: '自然', index: 5 },
    { color: '#f5c8b4', title: '小麦', index: 4 },
    { color: '#e2ae97', title: '暗沉', index: 3 },
    { color: '#cd937a', title: '古铜', index: 2 },
    { color: '#884e35', title: '黝黑', index: 1 },
  ];
  return <div className={styles.SkinArea}>
    {data.map((item, i) => <SkinAreaItem data={item} value={props.value} key={i} />)}
  </div>
}
export default SkinArea;