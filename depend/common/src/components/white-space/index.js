import React from 'react';
import './index.css';

export default ({ size = 'md' }) => {

  const className = 'k-white-space-' + size;
  return (
    <div className={className}></div>
  )
};
