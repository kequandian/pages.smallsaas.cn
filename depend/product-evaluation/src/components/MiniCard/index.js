import React from 'react';
import './style.css';

export default (props) => {
  const { data, width } = props;
  return <div className={ `miniCard ${props.className}` } style={{ width }}>
    <div className={ `--ab-listItem-title-secondary miniCard-title` }>{ data.title }</div>
    <div className={ `--ab-listItem-title miniCard-value` }>{ data.value }</div>
  </div>
}