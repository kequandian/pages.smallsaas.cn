import React from 'react';
import './index.css';

/**
 * @author LLH
 * @editor 
 * @updated 2018年9月11日
 * @desc 以上下的结构形式展示两条数据。
 * @eg
      <MiniCard
        data={{
            title: '总人数',
            value: 16,
        }}
      />
 */
export default (props) => {
  const { data, width } = props;
  return <div className={ `kqd-item-miniCard ${props.className}` } style={{ width }}>
    <div className={ `--ab-listItem-title-secondary miniCard-title` }>{ data.title }</div>
    <div className={ `--ab-listItem-title miniCard-value` }>{ data.value }</div>
  </div>
}