import React from 'react';
import './index.css';

export default (props) => {
  const { name, value, checkedValue, onChange, children } = props;
  const sValue = String(value);
  return <div onClick={onChange.bind(null, sValue)} className="kqd-MRadio-Item">
    <div className="kqd-MRadio-radio">
      <div className={sValue === checkedValue ? 'checked' : ''}></div>
    </div>
    <div className="kqd-MRadio-label">
      <span>{children}</span>
    </div>
  </div>
}