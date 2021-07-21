import React from 'react';
import './index.css';

export default (props) => {
  const { name } = props.data;
  
  return <div className={ `tabItemBox ${props.className}` }>
    <span>{ name }</span>
  </div>
}